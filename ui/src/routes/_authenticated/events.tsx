import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/events')({
  staticData: {
    breadcrumb: 'Events',
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
