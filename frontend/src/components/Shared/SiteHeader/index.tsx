import { BookOpen, BookOpenText } from "lucide-react";
import { Typography } from "../Typography";
import { Link } from "@tanstack/react-router";
import { Button } from "../Button";

export const SiteHeader = () => {
  return (
    <>
      <div className="relative flex flex-row justify-center h-16 p-2 gap-2 items-center">
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
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
        <div className="absolute right-4">
          <Button asChild variant={"secondary"}>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
};
