/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses with gzip/brotli
  compress: true,

  // Remove X-Powered-By header (minor security + perf)
  poweredByHeader: false,

  images: {
    // Serve modern formats automatically
    formats: ['image/avif', 'image/webp'],

    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,

    // Breakpoints for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 64, 128, 256],

    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
    ],
  },

  // Aggressive caching for static assets
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
