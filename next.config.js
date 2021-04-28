module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    return config;
  },
  images: {
    domains: ['momotrikwp.wpcomstaging.com', 'secure.gravatar.com'],
    deviceSizes: [425, 640, 768, 1024, 1280, 1536]
  },
}
