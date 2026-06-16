/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@prisma/client', '@kodo/db'],
};

export default nextConfig;
