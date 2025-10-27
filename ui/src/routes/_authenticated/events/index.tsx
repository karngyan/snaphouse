import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, Plus } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'

export const Route = createFileRoute('/_authenticated/events/')({
  component: RouteComponent,
})

function RouteComponent() {
  const handleCreateEvent = () => {
    console.log('Create event clicked')
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <EmptyState
        icon={CalendarDays}
        title="No events yet"
        description="Create an event to organize albums by occasion. Perfect for weddings, corporate events, or any shoot with multiple sessions."
        action={{
          label: 'Create Event',
          onClick: handleCreateEvent,
          icon: Plus,
        }}
      />
    </div>
  )
}
