export const Auth = () => (
  <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-6 shadow-lg">
    <h3 className="text-xl font-semibold text-foreground">Login</h3>
    <p className="text-sm text-text-secondary">Demo placeholder. Hook to backend auth service.</p>
    <form className="mt-4 space-y-3 text-sm text-foreground">
      <label className="flex flex-col gap-1">
        <span className="text-text-secondary">Email</span>
        <input type="email" className="rounded-lg border border-border bg-bg-secondary px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-text-secondary">Password</span>
        <input
          type="password"
          className="rounded-lg border border-border bg-bg-secondary px-3 py-2"
        />
      </label>
      <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover">
        Sign in
      </button>
    </form>
  </div>
);
