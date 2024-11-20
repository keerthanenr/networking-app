import { NextResponse } from "next/server";
// import { handleSignUp } from "@/lib/email";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development" },
      { status: 403 }
    );
  }

  //   try {
  //     const result = await handleSignUp("test@example.com", "Test User");
  //     return NextResponse.json(result);
  //   } catch {
  //     return NextResponse.json({ error: "Test failed" }, { status: 500 });
  //   }
}
