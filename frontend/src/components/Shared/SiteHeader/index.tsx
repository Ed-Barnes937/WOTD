import { BookOpen, BookOpenText } from "lucide-react";
import { Typography } from "../Typography";
import { Button } from "../Button";
import { Link } from "@tanstack/react-router";
import { Avatar } from "../Avatar";
import { useUser } from "../../../hooks/useUser";

type SiteHeaderProps = {
  loginCallback: () => void;
  logoutCallback: () => void;
};
export const SiteHeader = ({
  loginCallback,
  logoutCallback,
}: SiteHeaderProps) => {
  const user = useUser();
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
        <div className="absolute right-4 flex gap-2">
          {user ? (
            <>
              <Button variant={"secondary"} onClick={logoutCallback}>
                {/* <Link to="/logout">Login</Link> */}
                Logout
              </Button>
              <Avatar variant={"rounded"} url={user.user_metadata.avatar_url} />
            </>
          ) : (
            <Button variant={"secondary"} onClick={loginCallback}>
              {/* <Link to="/login">Login</Link> */}
              Login
            </Button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
