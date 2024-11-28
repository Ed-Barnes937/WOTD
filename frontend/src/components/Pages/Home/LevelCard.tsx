import {
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Rocket,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Typography } from "../../Shared/Typography";
import { Link } from "@tanstack/react-router";

export const WOTDLevelMap = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

const WOTDLevelColorMap: Record<(typeof WOTDLevelMap)[number], string> = {
  beginner: "bg-emerald-500",
  intermediate: "bg-indigo-500",
  advanced: "bg-amber-500",
  expert: "bg-rose-500",
};

const WOTDLevelIconMap: Record<(typeof WOTDLevelMap)[number], LucideIcon> = {
  beginner: Lightbulb,
  intermediate: Star,
  advanced: Zap,
  expert: Rocket,
};

const WOTDLevelDescriptionMap: Record<(typeof WOTDLevelMap)[number], string> = {
  beginner: "Typically KS1 - Ages 6-8.",
  intermediate: "Typically KS2 - Ages 8-10.",
  advanced: "Typically KS3 - Ages 10-12.",
  expert: "Typically KS4 - Ages 12+.",
};

interface LevelCardProps {
  level: (typeof WOTDLevelMap)[number];
}

export const LevelCard = ({ level }: LevelCardProps) => {
  const Icon = WOTDLevelIconMap[level];

  return (
    <Link
      className={`
        relative cursor-pointer transform transition-all duration-300 
        hover:scale-105 hover:shadow-2xl rounded-2xl p-6 
        ${WOTDLevelColorMap[level]} text-white overflow-hidden group
      `}
      to="/wotd"
      from="/"
      search={{
        level,
      }}
    >
      {/* Background Sparkles */}
      <Sparkles
        className="absolute top-4 left-4 text-white/30 group-hover:rotate-45 transition-transform"
        size={24}
      />
      <Sparkles
        className="absolute bottom-4 right-4 text-white/30 group-hover:-rotate-45 transition-transform"
        size={24}
      />

      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-4">
          <Icon size={48} className="group-hover:animate-bounce" />
        </div>
        <Typography variant={"h3"}>{level}</Typography>
        <Typography>{WOTDLevelDescriptionMap[level]}</Typography>
        <div className="mt-4 flex justify-center bg-white/30 px-4 py-2 rounded-full group-hover:bg-white/50 transition-all">
          Select Level <ArrowRight size={20} className="inline ml-2" />
        </div>
      </div>
    </Link>
  );
};
