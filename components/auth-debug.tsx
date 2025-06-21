"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"

interface CurrentUserData {
  id: string;
  email: string;
  name: string;
  picture: string;
  googleId: string;
  loginTime: string;
}

export default function AuthDebug() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData | null>(null)
  const [loadingUserData, setLoadingUserData] = useState(false)

  // Fetch current user data from the database for debugging
  const fetchCurrentUser = async () => {
    setLoadingUserData(true)
    try {
      const response = await fetch('/api/auth/user')
      if (response.ok) {
        const data = await response.json()
        setCurrentUserData(data.currentUser)
      }
    } catch (error) {
      console.error('Error fetching current user:', error)
    } finally {
      setLoadingUserData(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentUser()
    }
  }, [isAuthenticated])

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">Auth Debug Panel</h3>
      
      <div className="text-xs space-y-1">
        <div>
          <strong>Status:</strong> {isLoading ? 'Loading...' : isAuthenticated ? 'Authenticated' : 'Not authenticated'}
        </div>
        
        {user && (
          <>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>ID:</strong> {user.id}</div>
            <div><strong>Picture URL:</strong> {user.picture ? 'Yes' : 'No'}</div>
            {user.picture && (
              <div className="text-xs text-gray-600 break-all mb-1">
                <strong>URL:</strong> {user.picture.substring(0, 60)}...
                <div className="mt-2 flex gap-2">
                  <a 
                    href={user.picture} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Test URL
                  </a>
                  <button
                    onClick={() => {
                      const img = new Image();
                      img.onload = () => console.log('✅ Image loads fine:', user.picture);
                      img.onerror = () => console.log('❌ Image failed to load:', user.picture);
                      img.src = user.picture;
                    }}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    JS Test
                  </button>
                </div>
              </div>
            )}
            <div className="text-xs text-gray-500">
              <strong>Full User Object:</strong>
              <pre className="text-xs mt-1 p-1 bg-gray-100 rounded overflow-auto max-h-20">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-xs">Current User in Database</h4>
            <button
              onClick={fetchCurrentUser}
              disabled={loadingUserData}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loadingUserData ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {currentUserData ? (
            <div className="text-xs p-2 border rounded bg-gray-50">
              <div><strong>{currentUserData.name}</strong></div>
              <div className="text-gray-600">{currentUserData.email}</div>
              <div className="text-gray-500">Login time: {new Date(currentUserData.loginTime).toLocaleString()}</div>
              <div className="text-gray-500">Google ID: {currentUserData.googleId}</div>
            </div>
          ) : (
            <div className="text-xs text-gray-500">No user data found in database</div>
          )}
        </div>
      )}
    </div>
  )
} 