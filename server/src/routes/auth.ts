import type { FastifyPluginAsync } from 'fastify';
import { requireAuth } from '../middleware/authMiddleware';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/register', async (request, reply) => { reply.send({ stub: true }) });
    fastify.post('/login', async (request, reply) => { reply.send({ stub: true }) });
    fastify.post('/oauth', async (request, reply) => { reply.send({ stub: true }) });
    fastify.post('/logout', async (request, reply) => { reply.send({ stub: true }) });
    fastify.get('/me', { preHandler: [requireAuth] }, async (request, reply) => { reply.send({ stub: true }) });
};
