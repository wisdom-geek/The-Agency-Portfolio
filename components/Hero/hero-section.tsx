"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

function Model() {
  const group = useRef()
  const { nodes, materials } = useGLTF("/assets/3d/duck.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t / 2) / 10
    group.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <group ref={group} dispose={null} scale={2}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LOD3spShape.geometry}
        material={materials.blinn3}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

function ParticleField() {
  const points = []
  const count = 1000

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 20
    const y = (Math.random() - 0.5) * 20
    const z = (Math.random() - 0.5) * 20
    points.push({ position: [x, y, z] })
  }

  return (
    <group>
      {points.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Environment preset="night" />
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <ParticleField />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            The Agency
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Where Tech Meets Imagination</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">View Our Work</Button>
            <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-500/20 px-8 py-6 text-lg">
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown className="text-white/70" size={32} />
        </motion.div>
      </div>
    </section>
  )
}