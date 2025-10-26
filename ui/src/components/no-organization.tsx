export function NoOrganization() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="text-center space-y-4 max-w-md px-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            No Organization Found
          </h1>
          <p className="text-muted-foreground">
            You're not part of any organization yet. Please ask an organization
            admin to add you to one.
          </p>
        </div>
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
          <p className="text-sm text-muted-foreground">
            Once you're added to an organization, you'll be able to access the
            dashboard and all features.
          </p>
        </div>
      </div>
    </div>
  )
}
