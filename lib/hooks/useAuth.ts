"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

type User = {
  email: string
  name: string
  firstName?: string
  lastName?: string
  isLoggedIn: boolean
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    email: string
    password: string
    firstName?: string
    lastName?: string
  }) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session
    const userData = localStorage.getItem("tressmuse_user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("tressmuse_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate authentication (replace with real auth logic)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        email,
        name: email.split("@")[0],
        isLoggedIn: true,
      }

      localStorage.setItem("tressmuse_user", JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: {
    email: string
    password: string
    firstName?: string
    lastName?: string
  }) => {
    setIsLoading(true)
    try {
      // Simulate registration (replace with real auth logic)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || userData.email.split("@")[0],
        isLoggedIn: true,
      }

      localStorage.setItem("tressmuse_user", JSON.stringify(user))
      setUser(user)
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("tressmuse_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
