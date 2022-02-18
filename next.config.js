module.exports = {
  swcMinify: true, // Opt-in SWC for minification
  images: {
    domains: [
      'momotrik.host',
      'secure.gravatar.com',
      // This is the domain for image host
      // that comes from Instagram API
      // via the RapidAPI
      'scontent-lax3-2.cdninstagram.com',
    ],
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
