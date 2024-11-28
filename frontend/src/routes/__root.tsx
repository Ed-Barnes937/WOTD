import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "../components/Shared/SiteHeader";
import type { useAuthStore } from "../services/auth/authStore";

type RouterContext = {
  queryClient: QueryClient;
  auth: ReturnType<typeof useAuthStore>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Layout,
});

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-amber-300 to-pink-300">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
