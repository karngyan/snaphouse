import { createFileRoute, Navigate } from '@tanstack/react-router'
import { SignIn, useAuth } from '@clerk/clerk-react'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex min-h-svh relative items-center justify-center">
      <BackgroundBeams className="absolute inset-0" />
      <SignIn path="/login" />
    </div>
  )
}
