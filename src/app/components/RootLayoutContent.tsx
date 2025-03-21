'use client'

import { ReactNode } from 'react'
import { useTinybirdToken } from '../providers/TinybirdProvider'

interface RootLayoutContentProps {
  children: ReactNode
  initialToken: string
  initialOrgName: string
}

export function RootLayoutContent({ children, initialToken, initialOrgName }: RootLayoutContentProps) {
  const { setToken, setOrgName } = useTinybirdToken()

  // Set the initial values from the server
  setToken(initialToken)
  setOrgName(initialOrgName)

  return <>{children}</>
} 