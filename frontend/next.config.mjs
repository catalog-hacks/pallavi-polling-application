/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:5500/:path*', 
        },
        {
          source: '/ws/:path*',
          destination: 'http://ws://127.0.0.1:5500/ws/:path*'
        },
      ];
    },
  };
  
 export default nextConfig;
  