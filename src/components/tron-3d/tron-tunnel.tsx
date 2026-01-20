"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "@/components/theme"
import * as THREE from "three"

// Tunnel ring component
function TunnelRing({
  color,
  radius,
  z,
  speed,
}: {
  color: string
  radius: number
  z: number
  speed: number
}) {
  const ringRef = React.useRef<THREE.Mesh>(null)
  const initialZ = React.useRef(z)

  useFrame((state) => {
    if (ringRef.current) {
      // Move towards camera and reset
      ringRef.current.position.z += speed
      if (ringRef.current.position.z > 5) {
        ringRef.current.position.z = -30
      }

      // Pulse opacity based on position
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      const distFromCenter = Math.abs(ringRef.current.position.z)
      mat.opacity = Math.max(0.1, 1 - distFromCenter / 30)

      // Subtle rotation
      ringRef.current.rotation.z += 0.001
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, z]}>
      <torusGeometry args={[radius, 0.02, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

// Grid tunnel walls
function TunnelWalls({ color }: { color: string }) {
  const meshRef = React.useRef<THREE.Mesh>(null)
  const materialRef = React.useRef<THREE.ShaderMaterial>(null)

  // Keep a ref to the latest color - updated synchronously during render
  const colorRef = React.useRef(color)
  colorRef.current = color

  // Create uniforms once
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
      // Always update color from ref (which is always current)
      materialRef.current.uniforms.uColor.value.set(colorRef.current)
    }
  })

  const tunnelShader = {
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
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
    `,
  }

  return (
    <mesh ref={meshRef} position={[0, 0, -15]}>
      <cylinderGeometry args={[4, 4, 40, 32, 20, true]} />
      <shaderMaterial
        ref={materialRef}
        {...tunnelShader}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Speed lines
function SpeedLines({ color, count = 50 }: { color: string; count?: number }) {
  const linesRef = React.useRef<THREE.Group>(null)

  const lines = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2 + Math.random() * 2,
      z: Math.random() * -30,
      length: 0.5 + Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.2,
    }))
  }, [count])

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        line.position.z += lines[i].speed
        if (line.position.z > 5) {
          line.position.z = -30
        }
      })
    }
  })

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(line.angle) * line.radius,
            Math.sin(line.angle) * line.radius,
            line.z,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, line.length]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Main tunnel component
interface TronTunnelProps {
  className?: string
  ringCount?: number
  enableSpeedLines?: boolean
}

export function TronTunnel({
  className,
  ringCount = 15,
  enableSpeedLines = true,
}: TronTunnelProps) {
  const { theme } = useTheme()

  const themeColors: Record<string, string> = {
    ares: "#ff3333",
    tron: "#00d4ff",
    clu: "#ff6600",
    athena: "#ffd700",
    aphrodite: "#ff1493",
    poseidon: "#0066ff",
  }

  const color = themeColors[theme] || themeColors.ares

  const rings = React.useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      radius: 3 + Math.random() * 0.5,
      z: -2 - i * 2,
      speed: 0.08 + Math.random() * 0.04,
    }))
  }, [ringCount])

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <fog attach="fog" args={["#000", 5, 35]} />

        <TunnelWalls color={color} />

        {rings.map((ring, i) => (
          <TunnelRing
            key={i}
            color={color}
            radius={ring.radius}
            z={ring.z}
            speed={ring.speed}
          />
        ))}

        {enableSpeedLines && <SpeedLines color={color} count={60} />}

        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
