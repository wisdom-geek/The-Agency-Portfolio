"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Calendar, ExternalLink } from "lucide-react"
import { projects } from "@/lib/data"

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.status === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "upcoming":
        return <Calendar className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "upcoming":
        return "Upcoming"
      default:
        return ""
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
      case "upcoming":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      default:
        return ""
    }
  }

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Our <span className="text-purple-500">Projects</span>
          </h2>

          <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Explore our portfolio of innovative digital solutions across various industries.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              All Projects
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Completed
            </Button>
            <Button
              variant={filter === "in-progress" ? "default" : "outline"}
              onClick={() => setFilter("in-progress")}
              className={filter === "in-progress" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
            >
              In Progress
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
              className={filter === "upcoming" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Upcoming
            </Button>
          </div>

          {/* Projects Grid */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-purple-900/10 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className={`absolute top-3 right-3 ${getStatusColor(project.status)}`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(project.status)}
                      {getStatusText(project.status)}
                    </span>
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300"
                    >
                      View Demo <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
