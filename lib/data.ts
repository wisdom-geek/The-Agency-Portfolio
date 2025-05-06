"use client";
import { Search, Lightbulb, Code, Rocket } from "lucide-react";
export const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export const timelineEvents = [
  {
    year: "2018",
    title: "Founded",
    description:
      "The Agency was established with a vision to transform digital experiences.",
  },
  {
    year: "2020",
    title: "Expansion",
    description:
      "Expanded our team and services to include blockchain solutions.",
  },
  {
    year: "2022",
    title: "Global Reach",
    description:
      "Started working with international clients across 15+ countries.",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description:
      "Launched our innovation lab focusing on emerging technologies.",
  },
];

// Services Section
export const services = [
  {
    icon: "code",
    title: "Full-Stack Development",
    description:
      "We build robust, scalable applications using cutting-edge technologies that deliver exceptional user experiences.",
    features: [
      "Custom Web Applications",
      "Mobile App Development",
      "API Development",
      "E-commerce Solutions",
    ],
    model: "</>",
  },
  {
    icon: "palette",
    title: "UI/UX & Product Design",
    description:
      "We create intuitive, engaging interfaces that delight users and drive business results.",
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Usability Testing",
    ],
    model: "UI",
  },
  {
    icon: "database",
    title: "Blockchain Solutions",
    description:
      "We develop secure, transparent blockchain applications that revolutionize how businesses operate.",
    features: [
      "Smart Contract Development",
      "DApp Creation",
      "NFT Platforms",
      "Blockchain Integration",
    ],
    model: "BC",
  },
];

// Projects Section
export const projects = [
    {
      id: 1,
      name: "Fintech Dashboard",
      description: "A comprehensive financial analytics dashboard with real-time data visualization.",
      image: "/fintech2.jpg?height=300&width=600",
      status: "completed",
      techStack: ["React", "Node.js", "D3.js", "MongoDB"],
      demoLink: "#",
    },
    {
      id: 2,
      name: "E-commerce Platform",
      description: "A scalable e-commerce solution with integrated payment processing and inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      status: "completed",
      techStack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      demoLink: "#",
    },
    {
      id: 3,
      name: "NFT Marketplace",
      description: "A blockchain-based platform for creating, buying, and selling digital collectibles.",
      image: "/placeholder.svg?height=400&width=600",
      status: "in-progress",
      techStack: ["React", "Solidity", "Ethers.js", "IPFS"],
      demoLink: null,
    },
    {
      id: 4,
      name: "AI Content Generator",
      description: "An AI-powered tool that generates high-quality content for marketing and social media.",
      image: "/placeholder.svg?height=400&width=600",
      status: "in-progress",
      techStack: ["Python", "TensorFlow", "Next.js", "OpenAI API"],
      demoLink: null,
    },
    {
      id: 5,
      name: "Virtual Reality Experience",
      description: "An immersive VR experience for architectural visualization and virtual tours.",
      image: "/placeholder.svg?height=400&width=600",
      status: "upcoming",
      techStack: ["Three.js", "WebXR", "React Three Fiber", "Blender"],
      demoLink: null,
    },
    {
      id: 6,
      name: "Health & Fitness App",
      description: "A mobile application for tracking fitness goals, nutrition, and health metrics.",
      image: "/placeholder.svg?height=400&width=600",
      status: "upcoming",
      techStack: ["React Native", "Firebase", "GraphQL", "TensorFlow Lite"],
      demoLink: null,
    },

  ]  

// Tech Stack Section
export const technologies = [
  { name: "React", position: [-4, 2, 0] },
  { name: "Next.js", position: [-2, 3, -2] },
  { name: "TypeScript", position: [0, 4, -4] },
  { name: "Node.js", position: [2, 3, -2] },
  { name: "Tailwind", position: [4, 2, 0] },
  { name: "Three.js", position: [-3, 0, -3] },
  { name: "GraphQL", position: [-1, 1, -5] },
  { name: "MongoDB", position: [1, 1, -5] },
  { name: "PostgreSQL", position: [3, 0, -3] },
  { name: "Solidity", position: [-4, -2, 0] },
  { name: "Docker", position: [-2, -3, -2] },
  { name: "AWS", position: [0, -4, -4] },
  { name: "Firebase", position: [2, -3, -2] },
  { name: "Vercel", position: [4, -2, 0] },
]

// Process Section
export const processSteps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We start by understanding your business goals...",
  },
  {
    icon: Lightbulb,
    title: "Design",
    description: "Our designers create intuitive, engaging interfaces...",
  },
  {
    icon: Code,
    title: "Build",
    description: "Our development team brings designs to life...",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "We deploy your solution and offer support...",
  },
];

// Team Section
export const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "10+ years of experience in tech leadership and product development.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Award-winning designer with expertise in UI/UX and brand identity.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Developer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Full-stack developer specializing in React, Node.js, and cloud architecture.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Emily Taylor",
    role: "Blockchain Specialist",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Expert in blockchain technologies, smart contracts, and decentralized applications.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]


// Testimonials Section
export const testimonials = [
  {
    quote:
      "The Agency transformed our digital presence with a stunning website that perfectly captures our brand identity. Their attention to detail and technical expertise is unmatched.",
    author: "Jessica Williams",
    company: "Innovate Tech",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Working with The Agency was a game-changer for our business. Their blockchain solution streamlined our operations and increased transparency with our customers.",
    author: "David Chen",
    company: "Future Finance",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The team at The Agency delivered our project on time and exceeded our expectations. Their collaborative approach made the entire process smooth and enjoyable.",
    author: "Maria Rodriguez",
    company: "Global Solutions",
    image: "/placeholder.svg?height=100&width=100",
  },
]
