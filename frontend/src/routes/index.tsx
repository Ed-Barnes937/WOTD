import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "../components/Typography";
import { LevelCard, WOTDLevelMap } from "../components/Pages/Home/LevelCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <Typography variant="h2" className="mb-4">
        What level are you at?
      </Typography>
      <div className="grid grid-cols-2 gap-4">
        {WOTDLevelMap.map((level) => (
          <LevelCard level={level} />
        ))}
      </div>
    </div>
  );
}
