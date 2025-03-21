'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TinybirdContextType {
  token: string
  orgName: string
  setToken: (token: string) => void
  setOrgName: (orgName: string) => void
}

const TinybirdContext = createContext<TinybirdContextType | undefined>(undefined)

export function TinybirdProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('')
  const [orgName, setOrgName] = useState('')

  return (
    <TinybirdContext.Provider value={{ token, orgName, setToken, setOrgName }}>
      {children}
    </TinybirdContext.Provider>
  )
}

export function useTinybirdToken() {
  const context = useContext(TinybirdContext)
  if (context === undefined) {
    throw new Error('useTinybirdToken must be used within a TinybirdProvider')
  }
  return context
} 