import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "../components/Shared/Typography";

export const Route = createFileRoute("/logout")({
  component: Logout,
});

function Logout() {
  return (
    <div>
      <Typography>Logout</Typography>
    </div>
  );
}
