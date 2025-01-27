import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "../supabase";
import { type Provider, User } from "@supabase/supabase-js";
import { redirect } from "@tanstack/react-router";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    login: (provider?: Provider) => Promise<void>;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: true,

            initialize: async () => {
                set({ isLoading: true });
                try {
                    const user = await supabase.getCurrentUser();
                    set({ user, isLoading: false });
                } catch (error) {
                    console.info(error);
                    set({ user: null, isLoading: false });
                }
            },

            login: async (provider = "google") => {
                set({ isLoading: true });
                try {
                    await supabase.signInWithSSO(provider);
                } catch (error) {
                    console.error("Login Error:", error);
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await supabase.signOut();
                    set({ user: null, isLoading: false });
                } catch (error) {
                    console.error("Logout Error:", error);
                    set({ isLoading: false });
                    throw error;
                }
            },
        }),
        {
            name: "auth-storage", // unique name for localStorage
            partialize: (state) => ({
                user: state.user, // only persist user information
            }),
        },
    ),
);

// Authentication loader for Tanstack Router
export const authLoader = async () => {
    const { user, initialize } = useAuthStore.getState();

    // Initialize auth state if not already done
    if (!user) {
        await initialize();
    }

    // If still no user, redirect to login
    if (!user) {
        throw redirect({
            to: "/",
            search: {
                redirect: location.href,
            },
        });
    }

    return { user };
};
