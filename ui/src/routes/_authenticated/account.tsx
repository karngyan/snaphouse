import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/account')({
  staticData: {
    breadcrumb: 'Account',
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
