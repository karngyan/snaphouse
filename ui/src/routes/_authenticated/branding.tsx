import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/branding')({
  staticData: {
    breadcrumb: 'Branding',
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
