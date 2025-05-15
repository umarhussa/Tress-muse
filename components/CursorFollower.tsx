"use client"

import { useEffect, useState } from "react"

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)

      // Check if hovering over interactive elements
      const target = e.target
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setExpanded(true)
      } else {
        setExpanded(false)
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [])

  return (
    <div
      className={`fixed w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 pointer-events-none mix-blend-screen blur-sm z-50 transition-all duration-300 ${
        visible ? "opacity-50" : "opacity-0"
      } ${expanded ? "scale-150" : "scale-100"}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${expanded ? "scale(1.5)" : "scale(1)"}`,
      }}
    ></div>
  )
}
