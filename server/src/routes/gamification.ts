import type { FastifyPluginAsync } from 'fastify';
import { requireAuth } from '../middleware/authMiddleware';
import { getAuth } from '@clerk/fastify';
import { getWeeklyLeaderboard } from '../services/leaderboard';
import { buyFreeze } from '../services/streaks';
import { refillHeartsFull } from '../services/hearts';
import { prisma } from '@kodo/db';

export const gamificationRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/leaderboard/weekly', { preHandler: [requireAuth] }, async (request, reply) => {
        const { userId } = getAuth(request);
        const entries = await getWeeklyLeaderboard(userId as string);
        return { leaderboard: entries };
    });

    fastify.post('/shop/purchase', { preHandler: [requireAuth] }, async (request: any, reply) => {
        const { userId } = getAuth(request);
        const { item } = request.body as { item: 'heart_refill' | 'streak_freeze' };

        let success = false;
        if (item === 'heart_refill') {
            success = await refillHeartsFull(userId as string);
        } else if (item === 'streak_freeze') {
            success = await buyFreeze(userId as string);
        }

        if (!success) {
            return reply.code(400).send({ error: 'Purchase failed or insufficient gems' });
        }
        return { success: true };
    });

    fastify.get('/badges/user', { preHandler: [requireAuth] }, async (request, reply) => {
        const { userId } = getAuth(request);
        const badges = await prisma.userBadge.findMany({
            where: { userId: userId as string },
            include: { badge: true }
        });
        return { badges };
    });

    fastify.get('/gems/balance', { preHandler: [requireAuth] }, async (request, reply) => {
        const { userId } = getAuth(request);
        const user = await prisma.user.findUnique({ where: { id: userId as string }, select: { gems: true } });
        return { gems: user?.gems || 0 };
    });
};
