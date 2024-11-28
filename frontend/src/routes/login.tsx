import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "../components/Shared/Typography";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <div>
      <Typography>Login</Typography>
    </div>
  );
}
