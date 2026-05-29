import { prisma } from '@kodo/db';

const REFILL_MINUTES = 30;
export const MAX_HEARTS = 5;

export async function handleHearts(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    if (user.hearts < MAX_HEARTS) {
        const minPassed = Math.floor((new Date().getTime() - user.heartsLastRefill.getTime()) / 60000);
        if (minPassed >= REFILL_MINUTES) {
            const addedHearts = Math.min(MAX_HEARTS - user.hearts, Math.floor(minPassed / REFILL_MINUTES));
            const newHearts = Math.min(MAX_HEARTS, user.hearts + addedHearts);
            const newDate = new Date(user.heartsLastRefill.getTime() + addedHearts * REFILL_MINUTES * 60000);

            const updated = await prisma.user.update({
                where: { id: userId },
                data: { hearts: newHearts, heartsLastRefill: newDate }
            });
            return updated.hearts;
        }
    }
    return user.hearts;
}

export async function loseHeart(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.hearts <= 0) return false;

    const currentHearts = (await handleHearts(userId)) ?? user.hearts;
    if (currentHearts > 0) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                hearts: { decrement: 1 },
                heartsLastRefill: currentHearts === MAX_HEARTS ? new Date() : undefined
            }
        });
        return true;
    }
    return false;
}

export async function refillHeartsFull(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user && user.gems >= 350) {
        await prisma.user.update({
            where: { id: userId },
            data: { hearts: MAX_HEARTS, heartsLastRefill: new Date(), gems: { decrement: 350 } }
        });
        return true;
    }
    return false;
}
