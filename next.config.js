/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'https://securegw-stage.paytm.in/:path*',
  //     },
  //   ]
  // },
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'],
  },
}

module.exports = nextConfig
