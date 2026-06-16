import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', '@kodo/db'],
        outputFileTracingRoot: path.join(__dirname, '../../'),
    },
};

export default nextConfig;
