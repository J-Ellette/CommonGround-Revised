import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AUTH_TIMEOUT_MS = 3000

export function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    // Listen for the SIGNED_IN event fired after the magic-link token is exchanged
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        clearTimeout(timeoutId)
        navigate('/profile', { replace: true })
      }
    })

    // Also check for an existing session in case the exchange already completed
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/profile', { replace: true })
      } else {
        // No session and no sign-in event means the link was invalid or expired
        timeoutId = setTimeout(() => navigate('/login', { replace: true }), AUTH_TIMEOUT_MS)
      }
    })

    return () => {
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Signing you in...</p>
      </div>
    </div>
  )
}
