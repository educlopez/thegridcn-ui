"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "@/components/theme"
import * as THREE from "three"

// Convert hex to THREE.Color
function hexToThreeColor(hex: string): THREE.Color {
  return new THREE.Color(hex)
}

// Memoized shaders outside component to avoid recreation
const gridVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const gridFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Create grid lines
    vec2 grid = abs(fract(vPosition.xz * 0.5 - 0.5) - 0.5) / fwidth(vPosition.xz * 0.5);
    float line = min(grid.x, grid.y);
    float gridLine = 1.0 - min(line, 1.0);

    // Distance fade
    float dist = length(vPosition.xz) / 50.0;
    float fade = 1.0 - smoothstep(0.0, 1.0, dist);

    // Pulse effect
    float pulse = sin(uTime * 2.0 - length(vPosition.xz) * 0.3) * 0.2 + 0.8;

    // Combine
    float alpha = gridLine * fade * pulse * 0.6;

    gl_FragColor = vec4(uColor, alpha);
  }
`

// Grid floor component
function GridFloor({ color }: { color: string }) {
  const meshRef = React.useRef<THREE.Mesh>(null)
  const materialRef = React.useRef<THREE.ShaderMaterial>(null)

  // Keep a ref to the latest color - updated synchronously during render
  const colorRef = React.useRef(color)
  colorRef.current = color

  // Create uniforms object once using useMemo
  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: hexToThreeColor(color) },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uColor.value.set(colorRef.current)
    }
  })

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose()
        if (meshRef.current.material) {
          const mat = meshRef.current.material as THREE.Material
          mat.dispose()
        }
      }
    }
  }, [])

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      {/* Reduced segments from 100x100 to 50x50 - grid shader doesn't need high tessellation */}
      <planeGeometry args={[100, 100, 50, 50]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Floating particles - optimized with less frequent position updates
function Particles({ color, count = 100 }: { color: string; count?: number }) {
  const pointsRef = React.useRef<THREE.Points>(null)
  const geometryRef = React.useRef<THREE.BufferGeometry>(null)
  const materialRef = React.useRef<THREE.PointsMaterial>(null)

  // Store initial Y positions for oscillation
  const initialYPositions = React.useRef<Float32Array | null>(null)

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3)
    const initialY = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = Math.random() * 20 - 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      initialY[i] = positions[i * 3 + 1]
    }
    initialYPositions.current = initialY
    return positions
  }, [count])

  React.useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(particlesPosition, 3)
      )
    }
  }, [particlesPosition])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      geometryRef.current?.dispose()
      materialRef.current?.dispose()
    }
  }, [])

  useFrame((state) => {
    if (pointsRef.current && geometryRef.current && initialYPositions.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02

      // Only update positions every 2nd frame for performance
      if (Math.floor(state.clock.elapsedTime * 60) % 2 === 0) {
        const positionAttr = geometryRef.current.attributes.position
        if (positionAttr) {
          const positions = positionAttr.array as Float32Array
          const time = state.clock.elapsedTime
          for (let i = 0; i < count; i++) {
            // Use sin with initial position instead of cumulative addition
            positions[i * 3 + 1] = initialYPositions.current[i] + Math.sin(time + i * 0.1) * 0.5
          }
          positionAttr.needsUpdate = true
        }
      }
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        ref={materialRef}
        color={color}
        size={0.05}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Light beams using InstancedMesh for better performance
const BEAM_POSITIONS: [number, number, number][] = [
  [-8, 8, -5],
  [8, 8, -8],
  [0, 8, -12],
  [-5, 8, 5],
  [5, 8, 3],
]

function LightBeams({ color }: { color: string }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null)
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null)

  // Setup instance matrices once
  React.useEffect(() => {
    if (meshRef.current) {
      const matrix = new THREE.Matrix4()
      BEAM_POSITIONS.forEach((pos, i) => {
        matrix.setPosition(pos[0], pos[1], pos[2])
        meshRef.current!.setMatrixAt(i, matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose()
        materialRef.current?.dispose()
      }
    }
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      // Animate opacity for all beams at once
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.15
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BEAM_POSITIONS.length]}>
      <cylinderGeometry args={[0.02, 0.02, 20, 6]} />
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.3} />
    </instancedMesh>
  )
}

// Camera controller with cached lookAt target
const LOOK_AT_TARGET = new THREE.Vector3(0, 0, 0)

function CameraController() {
  const { camera } = useThree()

  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.1
    camera.position.x = Math.sin(time) * 2
    camera.position.z = 10 + Math.cos(time) * 2
    camera.lookAt(LOOK_AT_TARGET)
  })

  return null
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

// Main 3D scene component
interface Grid3DProps {
  className?: string
  enableParticles?: boolean
  enableBeams?: boolean
  cameraAnimation?: boolean
}

export function Grid3D({
  className,
  enableParticles = true,
  enableBeams = true,
  cameraAnimation = true,
}: Grid3DProps) {
  const { theme } = useTheme()
  const color = themeColors[theme] || themeColors.tron

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // Limit DPR to max 2 for performance
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <fog attach="fog" args={["#000", 10, 50]} />

        {cameraAnimation && <CameraController />}

        <GridFloor color={color} />

        {enableParticles && <Particles color={color} count={100} />}

        {enableBeams && <LightBeams color={color} />}

        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 0]} color={color} intensity={2} />
      </Canvas>
    </div>
  )
}
