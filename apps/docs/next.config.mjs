import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["ui"],
  reactStrictMode: true,
  images: {
    domains: ["github.com"],
  },
};

export default withMDX(config);
