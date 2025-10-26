import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import {
  useOrganization,
  useOrganizationList,
  CreateOrganization,
} from '@clerk/clerk-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export function OrgSwitcher() {
  const { isMobile } = useSidebar()
  const { organization: activeOrg } = useOrganization()
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)

  if (!activeOrg || !userMemberships.data) {
    return null
  }

  const getOrgInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const handleOrgSwitch = async (orgId: string) => {
    if (setActive) {
      await setActive({ organization: orgId })
    }
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {activeOrg.imageUrl ? (
                    <img
                      src={activeOrg.imageUrl}
                      alt={activeOrg.name}
                      className="size-8 rounded-lg"
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {getOrgInitial(activeOrg.name)}
                    </span>
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{activeOrg.name}</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Teams
              </DropdownMenuLabel>
              {userMemberships.data.map((membership, index) => (
                <DropdownMenuItem
                  key={membership.organization.id}
                  onClick={() => handleOrgSwitch(membership.organization.id)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    {membership.organization.imageUrl ? (
                      <img
                        src={membership.organization.imageUrl}
                        alt={membership.organization.name}
                        className="size-6 rounded-md"
                      />
                    ) : (
                      <span className="text-xs font-semibold">
                        {getOrgInitial(membership.organization.name)}
                      </span>
                    )}
                  </div>
                  {membership.organization.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add team
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content className="data-[state=open]:animate-in data-[state-closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%]">
            <DialogPrimitive.Title className="sr-only">
              Create Organization
            </DialogPrimitive.Title>
            <CreateOrganization
              afterCreateOrganizationUrl="/dashboard"
              skipInvitationScreen
            />
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  )
}
