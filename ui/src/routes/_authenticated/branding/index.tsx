import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/branding/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/branding/"!</div>
}
