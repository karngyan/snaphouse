import * as React from 'react'
import {
  CalendarDays,
  Database,
  LayoutDashboard,
  Paintbrush,
  Settings2,
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavRecentEvents } from '@/components/nav-recent-events'
import { NavUser } from '@/components/nav-user'
import { OrgSwitcher } from '@/components/org-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import { useRouterState } from '@tanstack/react-router'
import { useCallback } from 'react'

const navMainItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Events',
    url: '/events',
    icon: CalendarDays,
  },
  {
    title: 'Branding',
    url: '/branding',
    icon: Paintbrush,
  },
  {
    title: 'Storage',
    url: '/storage',
    icon: Database,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings2,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const isActive = useCallback(
    (url: string) => pathname.startsWith(url),
    [pathname],
  )

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} isActive={isActive} />
        <NavRecentEvents />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
