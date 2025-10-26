import { Link, useMatches } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function DynamicBreadcrumb() {
  const matches = useMatches()

  const breadcrumbMatches = matches.filter((match) => {
    const staticData = match.staticData
    return staticData?.breadcrumb
  })

  if (breadcrumbMatches.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbMatches.map((match, index) => {
          const isLast = index === breadcrumbMatches.length - 1
          const staticData = match.staticData

          // Support both static strings and dynamic functions
          const breadcrumb =
            typeof staticData.breadcrumb === 'function'
              ? staticData.breadcrumb(match.loaderData)
              : staticData.breadcrumb

          return (
            <div key={match.id} className="contents">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={match.pathname}>{breadcrumb}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
