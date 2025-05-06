"use client"

// Utility functions and constants for Three.js
// This helps avoid multiple imports of Three.js

import { createContext, useContext } from "react"

// Context to share Three.js instances
export const ThreeContext = createContext(null)

export const useThreeContext = () => {
  return useContext(ThreeContext)
}

// Helper function to calculate positions in a helix
export function calculateHelixPosition(index, totalCount, layers, radius) {
  const gap = (2 * Math.PI) / (totalCount / layers)
  const layer = Math.floor(index / (totalCount / layers))
  const angle = (index % (totalCount / layers)) * gap
  const height = (layer - layers / 2) * 1.5

  const x = radius * Math.cos(angle)
  const y = height
  const z = radius * Math.sin(angle)

  return [x, y, z]
}

// Helper function to generate random positions within bounds
export function randomPosition(bounds) {
  return [
    -bounds + Math.random() * bounds * 2,
    -bounds + Math.random() * bounds * 2,
    -bounds + Math.random() * bounds * 2,
  ]
}
