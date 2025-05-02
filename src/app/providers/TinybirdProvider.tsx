'use client'

import { useSession } from '@clerk/nextjs'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface TinybirdContextType {
  token: string
  setToken: (token: string) => void
}

const TinybirdContext = createContext<TinybirdContextType | undefined>(undefined)

export function TinybirdProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('')
  const { session } = useSession()

  useEffect(() => {
    if (!session) return

    async function populateToken() {
      const token = await session?.getToken({ template: 'tinybird' })

      if (!token) return
      setToken(token)
    }

    populateToken()
  }, [session])

  return (
    <TinybirdContext.Provider value={{ token, setToken }}>
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