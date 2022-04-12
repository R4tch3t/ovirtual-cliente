/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },*/
  images: {
    domains: ['upload.wikimedia.org','ovirtual.uagro.mx'],
  },
  experimental: {
    outputStandalone: true,
  }
  /*exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      //'/login': { page: '/login' },
      //'/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      //'/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      //'/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  },
  trailingSlash: true*/
}

module.exports = nextConfig
