import supabase from "./client";
import { Provider, type User } from "@supabase/supabase-js";

interface AuthService {
    signInWithSSO: (provider: Provider) => Promise<void>;
    signOut: () => Promise<void>;
    getCurrentUser: () => Promise<User | null>;
}

const AuthService: AuthService = {
    async signInWithSSO(provider: Provider) {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    // You can customize redirect options here if needed
                    // redirectTo: `${window.location.origin}/dashboard`
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error("SSO Login Error:", error);
            throw error;
        }
    },

    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error("Logout Error:", error);
            throw error;
        }
    },

    async getCurrentUser() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            return user;
        } catch (error) {
            console.error("Get Current User Error:", error);
            return null;
        }
    },
};

export default AuthService;
