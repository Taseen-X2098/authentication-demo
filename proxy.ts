import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const isProtectedRoute= createRouteMatcher("/user-profile");
const isPublicRoute = createRouteMatcher(["/", "/sign-up(.*)", "/sign-in(.*)"]);
const isAdminRoute = createRouteMatcher("/admin");

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  if(isAdminRoute(req) && sessionClaims?.metadata?.role != "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  } 

  if (!isPublicRoute(req)) {
    if (!userId && !isPublicRoute) {
      redirectToSignIn();
    }
    // await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
