import { Spinner } from '@/components/ui/spinner'
import { useUser } from '@clerk/clerk-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isLoaded, user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && user) {
      navigate({ to: '/dashboard' })
    } else if (isLoaded && !user) {
      navigate({ to: '/login' })
    }
  }, [isLoaded, user, navigate])

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner />
    </div>
  )
}
