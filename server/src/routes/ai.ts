import type { FastifyPluginAsync } from 'fastify';
import { requireAuth } from '../middleware/authMiddleware';
import { getHint, reviewCode, explainError, generateExercise } from '../services/aiTutor';

export const aiRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/hint', { preHandler: [requireAuth] }, async (request: any, reply) => {
        const { exercisePrompt, userCode, attemptCount } = request.body;
        const hint = await getHint(exercisePrompt, userCode, attemptCount || 1);
        return { hint };
    });

    fastify.post('/review', { preHandler: [requireAuth] }, async (request: any, reply) => {
        const { exercisePrompt, studentSolution } = request.body;
        const review = await reviewCode(exercisePrompt, studentSolution);
        return { review };
    });

    fastify.post('/explain-error', { preHandler: [requireAuth] }, async (request: any, reply) => {
        const { code, errorMessage } = request.body;
        const explanation = await explainError(code, errorMessage);
        return { explanation };
    });

    fastify.post('/generate-exercise', { preHandler: [requireAuth] }, async (request: any, reply) => {
        const { topic, difficulty, previousExercises } = request.body;
        const exercise = await generateExercise(topic, difficulty, previousExercises || []);
        return exercise;
    });
};
