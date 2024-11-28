import { createFileRoute } from "@tanstack/react-router";
import { fetchWOTDQueryOptions } from "../api/fetchWOTD";
import { WOTDCard } from "../components/Pages/WOTD";
import { z } from "zod";
import { WOTDLevelMap } from "../components/Pages/Home/LevelCard";

const wotdSearchSchema = z.object({
  level: z.enum(WOTDLevelMap).catch("beginner"),
});
// type WotdSearch = z.infer<typeof wotdSearchSchema>;

export const Route = createFileRoute("/wotd")({
  component: WOTD,
  validateSearch: wotdSearchSchema,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(fetchWOTDQueryOptions),
});

function WOTD() {
  const { level } = Route.useSearch();

  console.log(level);
  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <WOTDCard />
    </div>
  );
}
