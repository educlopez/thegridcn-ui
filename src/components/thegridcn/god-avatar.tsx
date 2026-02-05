"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Convert hex to THREE.Color
function hexToThreeColor(hex: string): THREE.Color {
  return new THREE.Color(hex)
}

// Hologram shaders - hoisted outside component for performance
const hologramVertexShader = `
  uniform float uTime;
  uniform float uGlitchIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    // Glitch effect
    vec3 pos = position;
    float glitch = sin(uTime * 20.0 + position.y * 10.0) * uGlitchIntensity;
    pos.x += glitch;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const hologramFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uScanlineIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    // Base color with fresnel effect
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.0);

    // Scanlines
    float scanline = sin(vPosition.y * 50.0 + uTime * 5.0) * 0.5 + 0.5;
    scanline = pow(scanline, 3.0) * uScanlineIntensity;

    // Horizontal scan sweep
    float sweep = sin(uTime * 2.0) * 0.5 + 0.5;
    float sweepLine = smoothstep(sweep - 0.05, sweep, vUv.y) * smoothstep(sweep + 0.05, sweep, vUv.y);

    // Combine
    float alpha = 0.3 + fresnel * 0.5 + scanline + sweepLine * 0.3;
    alpha *= 0.8;

    // Flickering
    float flicker = sin(uTime * 30.0) * 0.05 + 0.95;

    gl_FragColor = vec4(uColor * flicker, alpha * flicker);
  }
`

// Shared glitch context - so all materials in an avatar glitch together
const GlitchContext = React.createContext<React.MutableRefObject<number> | null>(null)

function GlitchProvider({ children }: { children: React.ReactNode }) {
  const glitchRef = React.useRef(0)

  useFrame(() => {
    // Shared glitch calculation - affects all materials equally
    if (Math.random() > 0.99) {
      glitchRef.current = 0.1
    } else {
      glitchRef.current *= 0.92
    }
  })

  return (
    <GlitchContext.Provider value={glitchRef}>
      {children}
    </GlitchContext.Provider>
  )
}

// Hologram material with scanlines and glow
function HologramMaterial({ color, wireframe = false }: { color: string; wireframe?: boolean }) {
  const materialRef = React.useRef<THREE.ShaderMaterial>(null)
  const colorRef = React.useRef(color)
  colorRef.current = color
  const glitchRef = React.useContext(GlitchContext)

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: hexToThreeColor(color) },
      uScanlineIntensity: { value: 0.15 },
      uGlitchIntensity: { value: 0.02 },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uColor.value.set(colorRef.current)
      materialRef.current.uniforms.uGlitchIntensity.value = glitchRef?.current ?? 0
    }
  })

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={hologramVertexShader}
      fragmentShader={hologramFragmentShader}
      transparent
      side={THREE.DoubleSide}
      wireframe={wireframe}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  )
}

// Floating particles around the avatar - reduced count for performance
function AvatarParticles({ color, count = 20 }: { color: string; count?: number }) {
  const pointsRef = React.useRef<THREE.Points>(null)
  const geometryRef = React.useRef<THREE.BufferGeometry>(null)
  const materialRef = React.useRef<THREE.PointsMaterial>(null)

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 0.8 + Math.random() * 0.4
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return positions
  }, [count])

  // Cleanup
  React.useEffect(() => {
    return () => {
      geometryRef.current?.dispose()
      materialRef.current?.dispose()
    }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={color}
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Ares - God of War (Spartan Shield with Lambda)
function AresAvatar({ color }: { color: string }) {
  const groupRef = React.useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Circular shield */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.38, 0.04, 16, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Shield face */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Lambda symbol (Λ) - Spartan emblem */}
      {/* Left leg of lambda */}
      <mesh position={[-0.08, -0.05, 0.02]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.05, 0.35, 0.02]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Right leg of lambda */}
      <mesh position={[0.08, -0.05, 0.02]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.05, 0.35, 0.02]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Inner shield ring */}
      <mesh position={[0, 0, 0.01]}>
        <torusGeometry args={[0.25, 0.015, 16, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Spear behind shield - grouped for proper alignment */}
      <group position={[0.3, 0, -0.1]} rotation={[0, 0, 0.2]}>
        {/* Spear shaft */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.85, 8]} />
          <HologramMaterial color={color} />
        </mesh>
        {/* Spear tip - positioned at top of shaft */}
        <mesh position={[0, 0.48, 0]}>
          <coneGeometry args={[0.04, 0.12, 4]} />
          <HologramMaterial color={color} />
        </mesh>
      </group>
      <AvatarParticles color={color} />
    </group>
  )
}

// Tron - Security Program (Digital Head)
function TronAvatar({ color }: { color: string }) {
  const groupRef = React.useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Head - geometric */}
      <mesh>
        <icosahedronGeometry args={[0.4, 0]} />
        <HologramMaterial color={color} wireframe />
      </mesh>
      {/* Inner core */}
      <mesh>
        <icosahedronGeometry args={[0.25, 1]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Circuit lines */}
      <mesh position={[0, 0, 0.35]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <HologramMaterial color={color} />
      </mesh>
      <AvatarParticles color={color} />
    </group>
  )
}

// Clu - System Admin (Angular Digital Head)
function CluAvatar({ color }: { color: string }) {
  const groupRef = React.useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Head - more angular */}
      <mesh>
        <octahedronGeometry args={[0.4, 0]} />
        <HologramMaterial color={color} wireframe />
      </mesh>
      {/* Crown ring */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.03, 4, 4]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Face plate */}
      <mesh position={[0, 0, 0.3]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.3, 0.3]} />
        <HologramMaterial color={color} />
      </mesh>
      <AvatarParticles color={color} />
    </group>
  )
}

// Athena - Goddess of Wisdom (Corinthian Helmet)
function AthenaAvatar({ color }: { color: string }) {
  const groupRef = React.useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Helmet dome */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Helmet crest - tall mohawk style */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.04, 0.35, 0.45]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Face guard - T shape */}
      <mesh position={[0, -0.05, 0.25]}>
        <boxGeometry args={[0.04, 0.35, 0.04]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Cheek guards */}
      <mesh position={[-0.18, -0.1, 0.15]}>
        <boxGeometry args={[0.08, 0.25, 0.04]} />
        <HologramMaterial color={color} />
      </mesh>
      <mesh position={[0.18, -0.1, 0.15]}>
        <boxGeometry args={[0.08, 0.25, 0.04]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Eye slots */}
      <mesh position={[-0.1, 0, 0.28]}>
        <boxGeometry args={[0.12, 0.04, 0.02]} />
        <meshBasicMaterial color="#000" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.1, 0, 0.28]}>
        <boxGeometry args={[0.12, 0.04, 0.02]} />
        <meshBasicMaterial color="#000" transparent opacity={0.8} />
      </mesh>
      {/* Decorative ring around helmet */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.33, 0.015, 8, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      <AvatarParticles color={color} />
    </group>
  )
}

// Aphrodite - Goddess of Love (Venus Symbol ♀)
function AphroditeAvatar({ color }: { color: string }) {
  const groupRef = React.useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Venus symbol - Circle (mirror) */}
      <mesh position={[0, 0.15, 0]}>
        <torusGeometry args={[0.25, 0.035, 16, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Inner glow of circle */}
      <mesh position={[0, 0.15, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Vertical stem */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Horizontal cross bar */}
      <mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Decorative outer ring */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.35, 0.015, 16, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Sparkle points around the symbol */}
      <mesh position={[0.3, 0.35, 0]}>
        <octahedronGeometry args={[0.04, 0]} />
        <HologramMaterial color={color} />
      </mesh>
      <mesh position={[-0.3, 0.35, 0]}>
        <octahedronGeometry args={[0.04, 0]} />
        <HologramMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <octahedronGeometry args={[0.05, 0]} />
        <HologramMaterial color={color} />
      </mesh>
      <AvatarParticles color={color} count={40} />
    </group>
  )
}

// Poseidon - God of the Sea (Trident)
function PoseidonAvatar({ color }: { color: string }) {
  const groupRef = React.useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Trident handle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Trident center prong */}
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.04, 0.25, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Trident left prong */}
      <mesh position={[-0.12, 0.45, 0]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.03, 0.2, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 0.3, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Trident right prong */}
      <mesh position={[0.12, 0.45, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.03, 0.2, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      <mesh position={[0.1, 0.3, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Cross bar */}
      <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
        <HologramMaterial color={color} />
      </mesh>
      {/* Wave rings */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.015, 8, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.01, 8, 32]} />
        <HologramMaterial color={color} />
      </mesh>
      <AvatarParticles color={color} />
    </group>
  )
}

// Avatar selector based on theme
function GodAvatar({ themeId, color }: { themeId: string; color: string }) {
  const avatars: Record<string, React.ReactNode> = {
    ares: <AresAvatar color={color} />,
    tron: <TronAvatar color={color} />,
    clu: <CluAvatar color={color} />,
    athena: <AthenaAvatar color={color} />,
    aphrodite: <AphroditeAvatar color={color} />,
    poseidon: <PoseidonAvatar color={color} />,
  }

  return avatars[themeId] || <TronAvatar color={color} />
}

// Main exported component
interface GodAvatar3DProps {
  themeId: string
  color: string
  size?: number
  className?: string
}

export function GodAvatar3D({ themeId, color, size = 64, className }: GodAvatar3DProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // Limit DPR to max 2 for performance
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <GlitchProvider>
          <GodAvatar themeId={themeId} color={color} />
        </GlitchProvider>
        <ambientLight intensity={0.2} />
        <pointLight position={[2, 2, 2]} color={color} intensity={1} />
      </Canvas>
    </div>
  )
}
