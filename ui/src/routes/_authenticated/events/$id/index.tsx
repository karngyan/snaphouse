import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useRecentEvents } from '@/hooks/use-recent-events'

export const Route = createFileRoute('/_authenticated/events/$id/')({
  component: EventDetailPage,
})

function EventDetailPage() {
  const { id } = Route.useParams()
  const { addRecentEvent } = useRecentEvents()

  useEffect(() => {
    // Add this event to recent events when the page loads
    addRecentEvent({
      id,
      name: `Event ${id}`,
      url: `/events/${id}`,
    })
  }, [id, addRecentEvent])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Event {id}</h1>
        <p className="text-muted-foreground">
          Event details will be loaded from the backend once it's ready.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Event ID</h2>
          <code className="rounded bg-muted px-2 py-1 text-sm font-mono w-fit">
            {id}
          </code>
        </div>
      </div>
    </div>
  )
}
