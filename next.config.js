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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic modules from server-side build
      config.externals = ['react', ...config.externals];
    }

    return config;
  },
};

module.exports = nextConfig;
