import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "../components/Shared/SiteHeader";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-amber-300 to-pink-300">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
