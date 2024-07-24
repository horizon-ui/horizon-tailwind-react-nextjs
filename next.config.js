const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    unoptimized: true, // This should be removed if not needed
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
