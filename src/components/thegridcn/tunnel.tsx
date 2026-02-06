"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "@/components/theme"
import * as THREE from "three"

// Shared geometry for tunnel rings - created once
const ringGeometry = new THREE.TorusGeometry(3, 0.02, 6, 32)

// Instanced tunnel rings for better performance
function TunnelRings({ color, count = 15 }: { color: string; count?: number }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null)
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null)

  // Store ring data
  const ringData = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      z: -2 - i * 2,
      speed: 0.08 + Math.random() * 0.04,
      radius: 3 + Math.random() * 0.5,
      rotation: 0,
    }))
  }, [count])

  // Setup initial positions
  React.useEffect(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const scale = new THREE.Vector3()

    ringData.forEach((ring, i) => {
      scale.set(ring.radius / 3, ring.radius / 3, 1)
      matrix.makeScale(scale.x, scale.y, scale.z)
      matrix.setPosition(0, 0, ring.z)
      meshRef.current!.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [ringData])

  // Cleanup
  React.useEffect(() => {
    return () => {
      materialRef.current?.dispose()
    }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3()

    ringData.forEach((ring, i) => {
      // Move towards camera
      ring.z += ring.speed
      if (ring.z > 5) ring.z = -30

      // Update rotation
      ring.rotation += 0.001

      // Build matrix
      position.set(0, 0, ring.z)
      quaternion.setFromEuler(new THREE.Euler(0, 0, ring.rotation))
      scale.set(ring.radius / 3, ring.radius / 3, 1)
      matrix.compose(position, quaternion, scale)
      meshRef.current!.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true

    // Update opacity based on average distance
    if (materialRef.current) {
      const avgDist = ringData.reduce((sum, r) => sum + Math.abs(r.z), 0) / count
      materialRef.current.opacity = Math.max(0.2, 0.6 - avgDist / 60)
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[ringGeometry, undefined, count]}>
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.5} />
    </instancedMesh>
  )
}

// Tunnel shader - hoisted outside component
const tunnelVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const tunnelFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Grid pattern
    vec2 grid = abs(fract(vec2(vUv.x * 20.0, vUv.y * 5.0 - uTime * 0.5) - 0.5) - 0.5);
    float line = min(grid.x, grid.y);
    line = 1.0 - smoothstep(0.0, 0.05, line);

    // Fade based on depth
    float fade = smoothstep(0.0, 0.3, vUv.y) * (1.0 - smoothstep(0.7, 1.0, vUv.y));

    float alpha = line * fade * 0.4;

    gl_FragColor = vec4(uColor, alpha);
  }
`

// Grid tunnel walls
function TunnelWalls({ color }: { color: string }) {
  const meshRef = React.useRef<THREE.Mesh>(null)
  const materialRef = React.useRef<THREE.ShaderMaterial>(null)

  const colorRef = React.useRef(color)
  colorRef.current = color

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uColor.value.set(colorRef.current)
    }
  })

  // Cleanup
  React.useEffect(() => {
    return () => {
      meshRef.current?.geometry?.dispose()
      materialRef.current?.dispose()
    }
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, -15]}>
      {/* Reduced segments from 32x20 to 24x12 */}
      <cylinderGeometry args={[4, 4, 40, 24, 12, true]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={tunnelVertexShader}
        fragmentShader={tunnelFragmentShader}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Shared geometry for speed lines
const speedLineGeometry = new THREE.BoxGeometry(0.02, 0.02, 1)

// Speed lines using InstancedMesh
function SpeedLines({ color, count = 50 }: { color: string; count?: number }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null)
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null)

  // Store line data for animation
  const linesData = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2 + Math.random() * 2,
      z: Math.random() * -30,
      length: 0.5 + Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.2,
    }))
  }, [count])

  // Setup initial positions
  React.useEffect(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const scale = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()

    linesData.forEach((line, i) => {
      position.set(
        Math.cos(line.angle) * line.radius,
        Math.sin(line.angle) * line.radius,
        line.z
      )
      scale.set(1, 1, line.length)
      matrix.compose(position, quaternion, scale)
      meshRef.current!.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [linesData])

  // Cleanup
  React.useEffect(() => {
    return () => {
      materialRef.current?.dispose()
    }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const scale = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()

    linesData.forEach((line, i) => {
      // Move towards camera
      line.z += line.speed
      if (line.z > 5) line.z = -30

      // Update matrix
      position.set(
        Math.cos(line.angle) * line.radius,
        Math.sin(line.angle) * line.radius,
        line.z
      )
      scale.set(1, 1, line.length)
      matrix.compose(position, quaternion, scale)
      meshRef.current!.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[speedLineGeometry, undefined, count]}>
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.6} />
    </instancedMesh>
  )
}

// Theme colors - hoisted outside component
const themeColors: Record<string, string> = {
  ares: "#ff3333",
  tron: "#00d4ff",
  clu: "#ff6600",
  athena: "#ffd700",
  aphrodite: "#ff1493",
  poseidon: "#0066ff",
}

// Main tunnel component
interface TunnelProps {
  className?: string
  ringCount?: number
  enableSpeedLines?: boolean
}

export function Tunnel({
  className,
  ringCount = 15,
  enableSpeedLines = true,
}: TunnelProps) {
  const { theme } = useTheme()
  const color = themeColors[theme] || themeColors.tron

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // Limit DPR to max 2 for performance
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <fog attach="fog" args={["#000", 5, 35]} />

        <TunnelWalls color={color} />
        <TunnelRings color={color} count={ringCount} />
        {enableSpeedLines && <SpeedLines color={color} count={50} />}

        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
