module.exports = {
  images: {
    domains: ['momotrik.host', 'secure.gravatar.com'],
    deviceSizes: [425, 640, 768, 1024, 1280, 1536],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/article/:slug',
        destination: '/artikel/:slug',
        permanent: true,
      },
    ]
  },
}
