import type { FastifyPluginAsync } from 'fastify';
import { requireAuth } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';
import { runCode } from '../services/codeRunner';

export const runRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/', { preHandler: [requireAuth, rateLimiter] }, async (request: any, reply) => {
        const { sourceCode } = request.body;

        // Very basic sandbox constraints blocking system exit / execution
        if (sourceCode.includes('System.exit') || sourceCode.includes('java.lang.Runtime') || sourceCode.includes('ProcessBuilder')) {
            return reply.code(400).send({ error: 'Code contains restricted operations.' });
        }

        try {
            const result = await runCode(sourceCode);
            return result;
        } catch (e) {
            return reply.code(500).send({ error: 'Failed to execute code limit.' });
        }
    });
};
