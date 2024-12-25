/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["trpc", "auth", "db", "ui", "validators"],
};

export default nextConfig;
