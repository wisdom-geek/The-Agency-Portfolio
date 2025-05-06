"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { timelineEvents } from "@/lib/data"

export default function AboutSection() {
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
    <section id="about" className="py-24 bg-gradient-to-b from-black to-purple-950/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-center">
            About <span className="text-purple-500">Us</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-12 text-center">
            We are a collective of digital innovators, designers, and developers dedicated to creating exceptional
            digital experiences that drive business growth and user engagement.
          </motion.p>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-300">
                To leverage cutting-edge technology and creative design to solve complex problems and deliver
                transformative digital solutions that exceed expectations.
              </p>
            </div>
            <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-300">
                To be at the forefront of digital innovation, setting new standards for excellence in web development,
                design, and blockchain solutions.
              </p>
            </div>
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-8 text-center">
            Our Journey
          </motion.h3>

          <motion.div variants={itemVariants} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-purple-500/50"></div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500"></div>

                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <div className="bg-purple-900/20 backdrop-blur-sm p-4 rounded-lg border border-purple-500/30">
                      <span className="text-purple-400 font-bold">{event.year}</span>
                      <h4 className="text-lg font-semibold">{event.title}</h4>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
