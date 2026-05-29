import type { FastifyRequest, FastifyReply } from 'fastify';
import { getAuth } from '@clerk/fastify';

// Fast basic in-memory counter for demo purposes. Upstash Redis connection string applies similarly in prod.
const memoryStore: Record<string, { count: number, resetAt: number }> = {};

export const rateLimiter = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = getAuth(request);
    if (!userId) return;

    const key = `rate-limit:${userId}:${request.routeOptions.url || request.url}`;
    const now = Date.now();

    let record = memoryStore[key];
    if (!record || record.resetAt < now) {
        record = { count: 1, resetAt: now + 60000 }; // 1 min window
        memoryStore[key] = record;
    } else {
        record.count++;
    }

    // PRD: 100 req/min globally. If /run, 20 req/min
    const isRunRoute = request.routeOptions.url?.includes('/api/run') || request.url.includes('/api/run');
    const limit = isRunRoute ? 20 : 100;

    if (record.count > limit) {
        return reply.status(429).send({ error: 'Rate limit exceeded' });
    }
};
