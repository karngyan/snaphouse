import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useOrganization } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated/settings')({
  staticData: {
    breadcrumb: 'Settings',
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { membership } = useOrganization()
  const navigate = useNavigate()

  // Redirect non-admins to dashboard
  useEffect(() => {
    if (membership && membership.role !== 'org:admin') {
      navigate({ to: '/dashboard', replace: true })
    }
  }, [membership, navigate])

  // Don't render anything if not an admin
  if (membership?.role !== 'org:admin') {
    return null
  }

  return <Outlet />
}
