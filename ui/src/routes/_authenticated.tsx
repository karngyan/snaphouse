import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import {
  useUser,
  useOrganizationList,
  useOrganization,
} from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb'
import { Separator } from '@/components/ui/separator'
import { NoOrganization } from '@/components/no-organization'

export const Route = createFileRoute('/_authenticated')({
  component: AuthLayout,
})

function AuthLayout() {
  const { user, isSignedIn, isLoaded: isUserLoaded } = useUser()
  const { organization: activeOrg, isLoaded: isOrgLoaded } = useOrganization()
  const {
    isLoaded: isOrgListLoaded,
    userMemberships,
    setActive,
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  // Check if memberships are still being fetched
  const isMembershipsFetching =
    userMemberships?.isLoading || userMemberships?.isFetching
  const navigate = useNavigate()
  const router = useRouter()

  // Only navigate to login if Clerk has loaded and user is definitely not signed in
  useEffect(() => {
    if (isUserLoaded && !isSignedIn && !user) {
      navigate({
        to: '/login',
        search: {
          redirect: router.state.location.pathname,
        },
      })
    }
  }, [isUserLoaded, isSignedIn, user, navigate, router.state.location.pathname])

  // Automatically set the first organization as active if none is selected
  useEffect(() => {
    const autoSetFirstOrg = async () => {
      if (
        isOrgListLoaded &&
        userMemberships?.data &&
        userMemberships.data.length > 0 &&
        !activeOrg &&
        setActive
      ) {
        await setActive({
          organization: userMemberships.data[0].organization.id,
        })
      }
    }

    autoSetFirstOrg()
  }, [isOrgListLoaded, userMemberships, activeOrg, setActive])

  // Show loader while Clerk is initializing or organizations are being set up
  if (
    !isUserLoaded ||
    !user ||
    !isOrgListLoaded ||
    !isOrgLoaded ||
    isMembershipsFetching
  ) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner />
      </div>
    )
  }

  // If user has no organizations, render without sidebar
  const hasOrganizations =
    userMemberships?.data && userMemberships.data.length > 0

  if (!hasOrganizations) {
    return (
      <div className="flex min-h-screen w-full">
        <NoOrganization />
      </div>
    )
  }

  // Show loader while waiting for organization to be set
  if (!activeOrg) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
