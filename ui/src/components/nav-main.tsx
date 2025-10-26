import { ChevronRight, type LucideIcon } from 'lucide-react'

import { Link } from '@tanstack/react-router'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function NavMain({
  items,
  isActive,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  isActive: (url: string) => boolean
}) {
  const { state } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0

          // If no children, render a simple menu item
          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive(item.url)}
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          // If has children and sidebar is collapsed, show popover
          if (state === 'collapsed') {
            return (
              <SidebarMenuItem key={item.title}>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive(item.url)}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    align="start"
                    className="w-48 p-2"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="px-2 py-1.5 text-sm font-semibold">
                        {item.title}
                      </div>
                      {item.items!.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.url}
                          className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            )
          }

          // If has children and sidebar is expanded, use collapsible
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive(item.url)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items!.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
