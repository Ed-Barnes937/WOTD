import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "../components/Shared/Typography";
import { authLoader, useAuthStore } from "../services/auth/authStore";

export const Route = createFileRoute("/profile")({
  component: Profile,
  loader: authLoader,
});

function Profile() {
  const user = useAuthStore((store) => store.user);
  return (
    <div>
      <Typography variant={"h2"}>Profile</Typography>
      <Typography variant={"h3"}>{user?.user_metadata.name}</Typography>
    </div>
  );
}
