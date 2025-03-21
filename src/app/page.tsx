import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { headers } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { Roboto_Mono } from 'next/font/google'
import { auth } from '@clerk/nextjs/server'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default async function Home() {
  const headersList = await headers()
  const token = headersList.get('x-tinybird-token') || ''
  const orgName = headersList.get('x-org-name') || ''
  const authentication = await auth()
  const { userId, sessionId, orgId, orgRole, orgPermissions } = authentication
  
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
              <button className="relative bg-[#27f795] hover:bg-[#27f795] text-black px-4 py-2 group">
                <span className="absolute left-[-5px] top-[-5px] h-2 w-2 border-l-2 border-t-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-top-left scale-0 group-hover:scale-100"></span>
                <span className="absolute right-[-5px] top-[-5px] h-2 w-2 border-r-2 border-t-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-top-right scale-0 group-hover:scale-100"></span>
                <span className="absolute left-[-5px] bottom-[-5px] h-2 w-2 border-l-2 border-b-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-bottom-left scale-0 group-hover:scale-100"></span>
                <span className="absolute right-[-5px] bottom-[-5px] h-2 w-2 border-r-2 border-b-2 border-transparent group-hover:border-[#27f795] transition-all duration-500 origin-bottom-right scale-0 group-hover:scale-100"></span>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
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
            <div className="bg-[#151515] p-4 rounded">
              <h2 className="font-semibold mb-2">Clerk User Info:</h2>
              <pre className="bg-[#151515] p-2 rounded">
{JSON.stringify({
  userId,
  sessionId,
  orgName,
  orgId,
  orgRole,
  orgPermissions,
}, null, 2)}</pre>
            </div>

            <div className="bg-[#151515] p-4 rounded">
              <h2 className="font-semibold mb-2">Organization permissions:</h2>
              <pre className="bg-[#151515] p-2 rounded">{orgPermissions || 'No specific permissions'}</pre>
            </div>

            <div className="bg-[#151515] p-4 rounded">
              <h2 className="font-semibold mb-2">Tinybird Token:</h2>
              <pre className="bg-[#151515] p-2 rounded overflow-x-auto">{token}</pre>
            </div>

            {decodedToken && (
              <div className="bg-[#151515] p-4 rounded">
                <h2 className="font-semibold mb-2">Decoded Token:</h2>
                <pre className="bg-[#151515] p-2 rounded overflow-x-auto">
                  {JSON.stringify(decodedToken, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-[#151515] p-4 rounded">
              <h2 className="font-semibold mb-2">Example Tinybird Request:</h2>
              <pre className="bg-[#151515] p-2 rounded overflow-x-auto">
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