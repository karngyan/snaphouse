import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    icon?: LucideIcon
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const ActionIcon = action?.icon

  return (
    <div
      className={cn(
        'flex min-h-[400px] items-center justify-center p-8',
        className,
      )}
    >
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 rounded-2xl bg-muted/50 p-6">
          <Icon className="size-12 text-muted-foreground" strokeWidth={1.5} />
        </div>

        {/* Text content */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Action button */}
        {action && (
          <div className="mt-6">
            <Button onClick={action.onClick} size="default">
              {ActionIcon && <ActionIcon className="size-4" />}
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
