"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text } from "@react-three/drei"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { services } from "@/lib/data"

import { Code, Palette, Database } from "lucide-react"

const icons = {
    code: <Code className="h-10 w-10 text-purple-500" />,
    palette: <Palette className="h-10 w-10 text-purple-500" />,
    database: <Database className="h-10 w-10 text-purple-500" />,
}

function ServiceModel({ position, icon }) {
    return (
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <group position={position}>
          <mesh>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#8b5cf6" transparent opacity={0.2} />
          </mesh>
          <Text
            position={[0, 0, 0.8]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter_Bold.json"
          >
            {icon}
          </Text>
        </group>
      </Float>
    )
  }

  export default function ServicesSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
  
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
      <section id="services" className="py-24 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our <span className="text-purple-500">Services</span>
            </motion.h2>
  
            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-16 text-center max-w-3xl mx-auto">
              We offer comprehensive digital solutions tailored to your unique business needs.
            </motion.p>
  
            {/* 3D Services Visualization */}
            <motion.div variants={itemVariants} className="h-[300px] mb-16">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                  <Environment preset="night" />
  
                  {services.map((service, index) => (
                    <ServiceModel key={index} position={[index * 2 - 2, 0, 0]} icon={service.model} />
                  ))}
  
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
              </Canvas>
            </motion.div>
  
            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-purple-900/10 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 group"
                >
                  <div className="mb-4">{icons[service.icon]}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }