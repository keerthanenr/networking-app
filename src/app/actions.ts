"use server";

import { z } from "zod";
// import { handleSignUp } from "@/lib/email";

const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export async function signUp(name: string, email: string) {
  try {
    const result = SignUpSchema.safeParse({ name, email });
    if (!result.success) {
      return {
        success: false,
        message: result.error.errors[0].message,
      };
    }

    // return handleSignUp(email, name);
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
