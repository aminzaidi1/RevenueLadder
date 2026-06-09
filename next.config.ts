import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "development" && {
    allowedDevOrigins: ["192.168.0.209"],
  }),
  serverExternalPackages: ["file-type", "isomorphic-dompurify"],
}

export default nextConfig