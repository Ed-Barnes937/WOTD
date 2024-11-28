import { RouterProvider } from "@tanstack/react-router";
import { queryClient, router } from "./main";
import { useAuthStore } from "./services/auth/authStore";
import { useEffect } from "react";

export const App = () => {
  const authStore = useAuthStore();

  useEffect(() => {
    authStore.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouterProvider
      router={router}
      context={{ queryClient: queryClient, auth: authStore }}
    />
  );
};
