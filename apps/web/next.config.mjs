/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', '@kodo/db'],
    },
};

export default nextConfig;
