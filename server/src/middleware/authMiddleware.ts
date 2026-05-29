import { getAuth } from '@clerk/fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    const auth = getAuth(request);
    if (!auth.userId) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }
};

export const requireAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
    const auth = getAuth(request);
    if (!auth.userId) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }

    const adminIds = (process.env.ADMIN_USER_IDS || '').split(',');
    if (!adminIds.includes(auth.userId)) {
        return reply.status(403).send({ error: 'Forbidden: Admin access required' });
    }
};
