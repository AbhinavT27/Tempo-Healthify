import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type UserData = {
  id?: string;
  name?: string;
  email: string;
  needs_onboarding?: boolean;
  health_goals?: string[];
  health_challenges?: string;
  activity_level?: string;
  age?: number;
  height?: number;
  weight?: number;
};

export const supabaseService = {
  /**
   * Create a new user in the database
   */
  async createUser(userData: UserData): Promise<{ data: any; error: any }> {
    try {
      // Create a new user in the users table
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            id: userData.id, // This should be the auth user id
            name: userData.name,
            email: userData.email,
            needs_onboarding: userData.needs_onboarding ?? true,
          },
        ])
        .select();

      if (error) {
        console.error("Error creating user:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Exception creating user:", error);
      return { data: null, error };
    }
  },

  /**
   * Update user data after onboarding
   */
  async updateUserAfterOnboarding(
    userId: string,
    onboardingData: Partial<UserData>,
  ): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          needs_onboarding: false,
          health_goals: onboardingData.health_goals,
          health_challenges: onboardingData.health_challenges,
          activity_level: onboardingData.activity_level,
          age: onboardingData.age,
          height: onboardingData.height,
          weight: onboardingData.weight,
        })
        .eq("id", userId)
        .select();

      if (error) {
        console.error("Error updating user after onboarding:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Exception updating user after onboarding:", error);
      return { data: null, error };
    }
  },

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      return { data, error };
    } catch (error) {
      console.error("Exception getting user by email:", error);
      return { data: null, error };
    }
  },
};
