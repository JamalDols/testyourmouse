/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.testyourmouse.com" }],
        destination: "https://testyourmouse.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
