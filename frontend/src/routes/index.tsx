import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "../components/Shared/Typography";
import { LevelCard, WOTDLevelMap } from "../components/Pages/Home/LevelCard";
import { useAuthStore } from "../services/auth/authStore";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const user = useAuthStore((store) => store.user);

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      {user && (
        <Typography variant={"h2"}>
          Welcome back {user.user_metadata.name}!
        </Typography>
      )}
      <Typography variant="h2" className="mb-4">
        Choose your learning level!
      </Typography>
      <div className="grid grid-cols-2 gap-4">
        {WOTDLevelMap.map((level) => (
          <LevelCard key={level} level={level} />
        ))}
      </div>
    </div>
  );
}
