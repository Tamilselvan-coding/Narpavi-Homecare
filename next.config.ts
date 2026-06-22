import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/baby-care/active-assist",
        destination: "/baby-care/nanny-angel-care",
        permanent: true,
      },
      {
        source: "/baby-care/guided-living",
        destination: "/baby-care/newborn-starter-care",
        permanent: true,
      },
      {
        source: "/baby-care/caring-hands",
        destination: "/baby-care/mother-baby-wellness",
        permanent: true,
      },
      {
        source: "/baby-care/comfort-plus",
        destination: "/baby-care/little-angels-advanced-care",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
