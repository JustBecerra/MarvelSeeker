/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.annihil.us",
      },
    ],
  },
};

export default nextConfig;
