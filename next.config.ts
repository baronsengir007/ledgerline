import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ledgerline",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
