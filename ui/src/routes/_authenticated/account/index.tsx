import { createFileRoute } from '@tanstack/react-router'
import { UserProfile } from '@clerk/clerk-react'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'

export const Route = createFileRoute('/_authenticated/account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <BackgroundBeams className="absolute inset-0" />
      <UserProfile />
    </div>
  )
}
