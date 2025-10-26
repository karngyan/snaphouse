import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings')({
  staticData: {
    breadcrumb: 'Settings',
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
