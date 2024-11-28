import { useEffect, useState } from "react";
import AuthService from "../services/supabase";
import type { User } from "@supabase/supabase-js";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        AuthService.getCurrentUser().then(setUser);
    }, []);

    return user;
};
