import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  images: {
    qualities: [60, 75],
    // Avoid jumping from 384px to 640px for small mobile illustrations.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
  },
=======
  output: 'standalone',
>>>>>>> 264e9de12a8679425fccaf0c91a12930999b77cb
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