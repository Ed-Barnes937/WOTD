import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "../components/Shared/SiteHeader";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import AuthService from "../services/supabase";
import supabase from "../services/supabase/client";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Layout,
});

function Layout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check initial user state
    AuthService.getCurrentUser().then(setUser);

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    // Choose your preferred SSO provider
    AuthService.signInWithSSO("google"); // or 'github', 'microsoft', etc.
  };

  const handleLogout = () => {
    AuthService.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-amber-300 to-pink-300">
      <SiteHeader loginCallback={handleLogin} logoutCallback={handleLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
