import { createFileRoute } from "@tanstack/react-router";
import { fetchWOTDQueryOptions } from "../api/fetchWOTD";
import { WOTDCard } from "../components/Pages/WOTD";

export const Route = createFileRoute("/wotd")({
  component: WOTD,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(fetchWOTDQueryOptions),
});

function WOTD() {
  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <WOTDCard />
    </div>
  );
}
