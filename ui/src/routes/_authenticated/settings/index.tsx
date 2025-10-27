import { createFileRoute } from '@tanstack/react-router'
import { OrganizationProfile } from '@clerk/clerk-react'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <BackgroundBeams className="pointer-events-none z-0 absolute inset-0" />
      <OrganizationProfile />
    </div>
  )
}
