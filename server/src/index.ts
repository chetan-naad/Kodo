import Fastify from 'fastify';
import cors from '@fastify/cors';
import { clerkPlugin } from '@clerk/fastify';

import { authRoutes } from './routes/auth';
import { curriculumRoutes } from './routes/curriculum';
import { progressRoutes } from './routes/progress';
import { gamificationRoutes } from './routes/gamification';
import { aiRoutes } from './routes/ai';
import { runRoutes } from './routes/run';

const server = Fastify({
    logger: process.env.NODE_ENV !== 'production',
});

// Environment variable validation
if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    console.error('Missing Clerk environment variables: CLERK_PUBLISHABLE_KEY or CLERK_SECRET_KEY');
    process.exit(1);
}

// Plugins
server.register(cors, {
    origin: true,
});

server.register(clerkPlugin);

// Register Routes
server.register(authRoutes, { prefix: '/api/auth' });
server.register(curriculumRoutes, { prefix: '/api' });
server.register(progressRoutes, { prefix: '/api/progress' });
server.register(gamificationRoutes, { prefix: '/api' });
server.register(aiRoutes, { prefix: '/api/ai' });
server.register(runRoutes, { prefix: '/api/run' });

server.get('/', async () => {
    return { 
        name: 'Kodo API',
        version: '1.0.0',
        status: 'online'
    };
});

server.get('/health', async () => {
    return { status: 'ok' };
});

const start = async () => {
    try {
        const port = Number(process.env.PORT) || 3001;
        await server.listen({ port, host: '0.0.0.0' });
        console.log(`Server listening on http://localhost:${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
