/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Proxy requests starting with /api/
          destination: 'http://127.0.0.1:5500/:path*', // Proxy target (your Actix Web server)
        },
      ];
    },
  };
  
 export default nextConfig;
  