import type { FastifyPluginAsync } from 'fastify';
import { requireAuth } from '../middleware/authMiddleware';
import { getAuth } from '@clerk/fastify';
import { prisma } from '@kodo/db';
import { addXp } from '../services/xp';
import { updateStreak } from '../services/streaks';
import { evaluateUnlockLogic } from '../services/unlockLogic';

export const progressRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/lesson', { preHandler: [requireAuth] }, async (request: any, reply) => {
        const { userId } = getAuth(request);
        const { lessonId, perfect } = request.body as { lessonId: string, perfect: boolean };

        const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
        if (!lesson) return reply.code(404).send({ error: 'Lesson not found' });

        const xpEarned = perfect ? Math.floor(lesson.xpReward * 1.5) : lesson.xpReward;

        await prisma.userProgress.upsert({
            where: { userId_lessonId: { userId: userId as string, lessonId } },
            update: { xpEarned: Math.max(xpEarned, 0), perfect, completedAt: new Date() },
            create: { userId: userId as string, lessonId, xpEarned, perfect }
        });

        await addXp(userId as string, xpEarned);
        await updateStreak(userId as string);

        // Check if entire unit is complete
        const allUnitLessons = await prisma.lesson.findMany({ where: { unitId: lesson.unitId } });
        const userCompleted = await prisma.userProgress.findMany({
            where: { userId: userId as string, lessonId: { in: allUnitLessons.map(l => l.id) } }
        });
        if (userCompleted.length === allUnitLessons.length) {
            await evaluateUnlockLogic(userId as string, lesson.unitId);
        }

        return { success: true, xpEarned, perfect };
    });

    fastify.post('/exercise', { preHandler: [requireAuth] }, async (request: any, reply) => {
        const { userId } = getAuth(request);
        const { exerciseId, answer, correct } = request.body as { exerciseId: string, answer: string, correct: boolean };

        await prisma.exerciseAttempt.create({
            data: { userId: userId as string, exerciseId, answer, correct }
        });
        return { success: true };
    });

    fastify.get('/user', { preHandler: [requireAuth] }, async (request, reply) => {
        const { userId } = getAuth(request);
        const progress = await prisma.userProgress.findMany({ where: { userId: userId as string } });
        return { progress };
    });

    fastify.get('/streak', { preHandler: [requireAuth] }, async (request, reply) => {
        const { userId } = getAuth(request);
        const streak = await prisma.streak.findUnique({ where: { userId: userId as string } });
        return { streak };
    });
};
