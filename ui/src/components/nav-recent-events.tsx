import { Calendar, Forward, MoreHorizontal, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useRecentEvents } from '@/hooks/use-recent-events'

export function NavRecentEvents() {
  const { isMobile, state } = useSidebar()
  const { events, removeRecentEvent } = useRecentEvents()

  // Hide the section entirely when there are no events
  if (events.length === 0) {
    return null
  }

  // When sidebar is collapsed, show a popover with all recent events
  if (state === 'collapsed') {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Recent Events">
                  <Calendar />
                  <span>Recent</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-64 p-2">
                <div className="flex flex-col gap-1">
                  <div className="px-2 py-1.5 text-sm font-semibold">
                    Recent Events
                  </div>
                  {events.map((item) => (
                    <Link
                      key={item.id}
                      to={item.url}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      <Calendar className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  // When sidebar is expanded, show the full list
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Events</SidebarGroupLabel>
      <SidebarMenu>
        {events.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <Calendar />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem asChild>
                  <Link to={item.url}>
                    <Calendar className="text-muted-foreground" />
                    <span>View Event</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Event</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => removeRecentEvent(item.id)}>
                  <Trash2 className="text-muted-foreground" />
                  <span>Remove from Recent</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
