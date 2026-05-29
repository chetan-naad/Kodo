import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '@kodo/db';
import { requireAuth } from '../middleware/authMiddleware';
import { getAuth } from '@clerk/fastify';
import { getUnitStatuses } from '../services/unlockLogic';

export const curriculumRoutes: FastifyPluginAsync = async (fastify) => {
    // Get all published stages (publicly visible)
    fastify.get('/stages', async (request, reply) => {
        const stages = await prisma.stage.findMany({
            where: { published: true },
            orderBy: { order: 'asc' },
        });
        return { stages };
    });

    // Get units for a stage with their status
    fastify.get<{ Params: { id: string } }>('/stages/:id/units', { preHandler: [requireAuth] }, async (request, reply) => {
        const { id } = request.params;
        const auth = getAuth(request);

        const units = await prisma.unit.findMany({
            where: { stageId: id, published: true },
            orderBy: { order: 'asc' },
        });

        if (!auth.userId) return { units };

        // Merge unit statuses
        const statuses = await getUnitStatuses(auth.userId, units.map(u => u.id));
        const merged = units.map(unit => ({
            ...unit,
            status: statuses[unit.id] || 'locked'
        }));

        return { units: merged };
    });

    // Get lessons for a unit
    fastify.get<{ Params: { id: string } }>('/units/:id/lessons', { preHandler: [requireAuth] }, async (request, reply) => {
        const { id } = request.params;
        const lessons = await prisma.lesson.findMany({
            where: { unitId: id, published: true },
            orderBy: { order: 'asc' },
        });
        return { lessons };
    });

    // Get exercises for a lesson
    fastify.get<{ Params: { id: string } }>('/lessons/:id/exercises', { preHandler: [requireAuth] }, async (request, reply) => {
        const { id } = request.params;
        const exercises = await prisma.exercise.findMany({
            where: { lessonId: id },
            orderBy: { order: 'asc' },
            // Omit correct answers and explanations dynamically on the client later or keep them depending on auth/logic. 
            // For Judge0 proxy we might send it all to client or handle strictly on server. 
            // We will send all metadata for now.
        });
        return { exercises };
    });
};
