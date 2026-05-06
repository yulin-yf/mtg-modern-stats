/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gatherer.wizards.com', 'cards.scryfall.io', 'cdn.dekdepe.com'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
