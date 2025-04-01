'use client'

import { ReactNode } from 'react'
import { useTinybirdToken } from '../providers/TinybirdProvider'

interface RootLayoutContentProps {
  children: ReactNode
  initialToken: string
}

export function RootLayoutContent({ children, initialToken }: RootLayoutContentProps) {
  const { setToken } = useTinybirdToken()

  // Set the initial values from the server
  setToken(initialToken)

  return <>{children}</>
} 