import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { BookOpen, BookOpenText } from "lucide-react";
import { Typography } from "../components/Typography";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-amber-300 to-pink-300">
      <div className="p-2 flex gap-2">
        <div className="grow text-center">
          <Link to="/">
            <Typography
              variant={"h1"}
              className="flex flex-row gap-2 items-center justify-center text-slate-900"
            >
              <BookOpen size={36} />
              Word of the Day!
              <BookOpenText size={36} />
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
