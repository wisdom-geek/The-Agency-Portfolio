"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Float, PointMaterial, Points, OrbitControls, Environment } from "@react-three/drei"
import { Object3D, Color, AdditiveBlending } from "three"
import { technologies } from "@/lib/data"
import { calculateHelixPosition } from "@/lib/three-utils"

export function TechHelix({ count = technologies.length, radius = 4, layers = 5 }) {
  const points = useRef()
  const [hovered, setHovered] = useState(null)
  const [clicked, setClicked] = useState(null)

  // Generate points in a helix pattern
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const [x, y, z] = calculateHelixPosition(i, count, layers, radius)
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
    }
    return pos
  }, [count, layers, radius])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const color = new Color()
    for (let i = 0; i < count; i++) {
      color.setHSL(0.75, 0.8, 0.5 + Math.random() * 0.3)
      cols[i * 3] = color.r
      cols[i * 3 + 1] = color.g
      cols[i * 3 + 2] = color.b
    }
    return cols
  }, [count])

  const sizes = useMemo(() => {
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      sz[i] = 0.5 + Math.random() * 0.5
    }
    return sz
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1
    if (points.current) {
      points.current.rotation.y = t
    }
  })

  return (
    <group>
      <Points ref={points} positions={positions} colors={colors} sizes={sizes}>
        <PointMaterial
          transparent
          vertexColors
          size={15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </Points>

      {technologies.map((tech, i) => {
        const [x, y, z] = calculateHelixPosition(i, count, layers, radius)

        return (
          <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <Text
              position={[x, y, z]}
              color="white"
              fontSize={0.4}
              font="/fonts/Inter_Bold.json"
              anchorX="center"
              anchorY="middle"
              onPointerOver={() => setHovered(i)}
              onPointerOut={() => setHovered(null)}
              onClick={() => setClicked(i)}
              scale={hovered === i || clicked === i ? 1.5 : 1}
            >
              {tech.name}
            </Text>
          </Float>
        )
      })}
    </group>
  )
}

export function TechParticles({ count = 300 }) {
  const mesh = useRef()
  const { viewport } = useThree()

  // Generate random particles
  const dummy = useMemo(() => new Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const s = Math.cos(t)

      dummy.position.set(
        (particle.mx / 10) * viewport.width + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * viewport.height + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * viewport.width + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
      )
      dummy.scale.set(s * 0.1, s * 0.1, s * 0.1)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.15, 10, 10]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} />
    </instancedMesh>
  )
}

export function TechScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} intensity={0.5} />
      <Environment preset="night" />

      <TechHelix />
      <TechParticles count={300} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}
