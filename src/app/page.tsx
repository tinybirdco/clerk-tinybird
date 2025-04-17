'use client'

import { SignInButton, SignOutButton, SignedIn, SignedOut, OrganizationSwitcher } from '@clerk/nextjs'
import { jwtDecode } from 'jwt-decode'
import { Roboto_Mono } from 'next/font/google'
import { useTinybirdToken } from './providers/TinybirdProvider'
const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Home() {
  const { token } = useTinybirdToken()

  let decodedToken = null
  try {
    decodedToken = token ? jwtDecode(token) : null
  } catch (error) {
    console.error('Error decoding token:', error)
  }

  return (
    <main className={`min-h-screen p-8 ${robotoMono.className}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Multi-tenancy with Clerk + Tinybird JWT</h1>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="relative bg-[#27f795] hover:bg-[#27f795] text-black px-4 py-2 group flex items-center gap-2">
                <span>Sign In</span>
                <span className="absolute left-[-5px] top-[-5px] h-2 w-2 border-l-2 border-t-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-top-left scale-0 group-hover:scale-100"></span>
                <span className="absolute right-[-5px] top-[-5px] h-2 w-2 border-r-2 border-t-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-top-right scale-0 group-hover:scale-100"></span>
                <span className="absolute left-[-5px] bottom-[-5px] h-2 w-2 border-l-2 border-b-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-bottom-left scale-0 group-hover:scale-100"></span>
                <span className="absolute right-[-5px] bottom-[-5px] h-2 w-2 border-r-2 border-b-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-bottom-right scale-0 group-hover:scale-100"></span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationPreviewTextContainer: "text-white",
                }
              }}
            />
            <SignOutButton>
              <button className="relative bg-[#27f795] hover:bg-[#27f795] text-black px-4 py-2 group">
                <span className="absolute left-[-5px] top-[-5px] h-2 w-2 border-l-2 border-t-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-top-left scale-0 group-hover:scale-100"></span>
                <span className="absolute right-[-5px] top-[-5px] h-2 w-2 border-r-2 border-t-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-top-right scale-0 group-hover:scale-100"></span>
                <span className="absolute left-[-5px] bottom-[-5px] h-2 w-2 border-l-2 border-b-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-bottom-left scale-0 group-hover:scale-100"></span>
                <span className="absolute right-[-5px] bottom-[-5px] h-2 w-2 border-r-2 border-b-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-bottom-right scale-0 group-hover:scale-100"></span>
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        <SignedIn>
          <div className="space-y-6">
            <div className="bg-[var(--text-box-bg)] p-4 rounded">
              <h2 className="font-semibold mb-2">Tinybird Token:</h2>
              <pre className="bg-[var(--text-box-bg)] p-2 rounded overflow-x-auto">{token}</pre>
            </div>

            {decodedToken && (
              <div className="bg-[var(--text-box-bg)] p-4 rounded">
                <h2 className="font-semibold mb-2">Decoded Token:</h2>
                <pre className="bg-[var(--text-box-bg)] p-2 rounded overflow-x-auto">
                  {JSON.stringify(decodedToken, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-[var(--text-box-bg)] p-4 rounded">
              <h2 className="font-semibold mb-2">Example Tinybird Request:</h2>
              <pre className="bg-[var(--text-box-bg)] p-2 rounded overflow-x-auto">
                {`fetch('https://api.tinybird.co/v0/pipes/your_pipe.json', {
  headers: {
    Authorization: 'Bearer ${token}'
  }
})`}
              </pre>
            </div>
          </div>
        </SignedIn>
      </div>
    </main>
  )
} 