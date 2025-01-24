/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["trpc", "auth", "db", "ui", "validators"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  //webpack: (config) => {
  //  config.externals = config.externals || [];
  //  config.externals.push(
  //    'C:/Users/Pranshu/Desktop/KZR/invoicen/apps/web/.next/server/edge-runtime-webpack.js',
  //    'C:/Users/Pranshu/Desktop/KZR/invoicen/apps/web/.next/server/src/middleware.js'
  //  );
  //  return config;
  //},
};

export default nextConfig;
