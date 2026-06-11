import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/user(.*)",
  "/cart(.*)",
  "/wishlist(.*)",
  "/success(.*)",
  "/checkout(.*)",
  "/settings(.*)",
  "/admin(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// Helper function to check if user is admin
const isUserAdmin = (userEmail: string | null | undefined): boolean => {
  if (!userEmail) return false;

  const adminEmailsEnv = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!adminEmailsEnv) return false;

  try {
    const adminEmails = adminEmailsEnv
      .replace(/[\[\]]/g, "") // Remove brackets if present
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0);

    return adminEmails.includes(userEmail.toLowerCase());
  } catch (error) {
    console.error("Error parsing admin emails:", error);
    return false;
  }
};

// Check if Clerk is properly configured
const clerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() &&
    process.env.CLERK_SECRET_KEY?.trim()
);

// Create the middleware - either with Clerk or without
const clerkMiddlewareHandler = clerkMiddleware(async (auth, req) => {
  // Skip auth checks if Clerk is not configured
  if (!clerkConfigured) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Additional check for admin routes
  if (isAdminRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

export default clerkMiddlewareHandler;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
