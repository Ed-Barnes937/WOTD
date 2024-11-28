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
    <div className="px-6 py-2 flex flex-col justify-center items-center">
      {user && (
        <Typography variant={"h3"} className="mt-1">
          Welcome back {user.user_metadata.name}!
        </Typography>
      )}
      <Typography variant="h2" className="mb-4 mt-4">
        Pick a level, any level!
      </Typography>
      <div className="grid grid-cols-2 gap-4">
        {WOTDLevelMap.map((level) => (
          <LevelCard key={level} level={level} />
        ))}
      </div>
    </div>
  );
}
