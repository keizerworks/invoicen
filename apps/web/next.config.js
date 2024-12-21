/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@repo/trpc",
    "@repo/auth",
    "@repo/db",
    "@repo/ui",
    "@repo/validators",
  ],
};

export default nextConfig;
