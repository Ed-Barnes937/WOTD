import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  // Link,
  Outlet,
} from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { Typography } from "../components/Typography";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-gradient-to-tr from-amber-100 to-fuchsia-200">
      <div className="p-2 flex gap-2">
        <div className="grow text-center">
          <Link to="/">
            <Typography
              variant={"h1"}
              className="flex flex-row gap-2 items-center justify-center text-slate-900"
            >
              <BookOpen size={36} />
              Word of the Day!
            </Typography>
          </Link>
        </div>
      </div>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
