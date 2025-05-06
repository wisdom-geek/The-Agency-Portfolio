"use client"

import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Float, PointMaterial, Points, OrbitControls, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { technologies } from "@/lib/data"
import * as THREE from "three"

// TechHelix component
function TechHelix({ count = technologies.length, radius = 4, layers = 5 }) {
  const points = useRef()
  const [hovered, setHovered] = useState(null)
  const [clicked, setClicked] = useState(null)

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const color = new THREE.Color()
  const gap = (2 * Math.PI) / (count / layers)

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(i / (count / layers))
    const angle = (i % (count / layers)) * gap
    const height = (layer - layers / 2) * 1.5

    const x = radius * Math.cos(angle)
    const y = height
    const z = radius * Math.sin(angle)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    color.setHSL(0.75, 0.8, 0.5 + Math.random() * 0.3)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    sizes[i] = 0.5 + Math.random() * 0.5
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group>
      <Points ref={points} positions={positions} colors={colors} sizes={sizes}>
        <PointMaterial
          transparent
          vertexColors
          size={15}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {technologies.map((tech, i) => {
        const layer = Math.floor(i / (count / layers))
        const angle = (i % (count / layers)) * gap
        const height = (layer - layers / 2) * 1.5

        const x = radius * Math.cos(angle)
        const y = height
        const z = radius * Math.sin(angle)

        return (
          <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <Text
              position={[x, y, z]}
              color="white"
              fontSize={0.4}
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter_Bold.json" // Ensure this file exists in public/fonts
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

// TechParticles component
function TechParticles({ count = 500 }) {
  const mesh = useRef()
  const { viewport } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])
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
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
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

// Scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} intensity={0.5} />
      <Environment preset="night" />
      <Suspense fallback={null}>
        <TechHelix />
        <TechParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Suspense>
    </>
  )
}

// TechStackSection
export default function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-purple-950/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Our <span className="text-purple-500">Tech Stack</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-16 text-center max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build powerful, scalable, and beautiful digital solutions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="h-[600px] rounded-xl overflow-hidden border border-purple-500/20"
            whileHover={{ boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
          >
            {mounted && (
              <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <Scene />
              </Canvas>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <p className="text-gray-400 text-sm">Hover over technologies to explore. Click to select.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}