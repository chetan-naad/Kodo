import { prisma } from '@kodo/db';

export async function updateStreak(userId: string) {
    const streak = await prisma.streak.findUnique({ where: { userId } });
    const now = new Date();

    if (!streak) {
        await prisma.streak.create({
            data: { userId, lastActivity: now, currentStreak: 1, longestStreak: 1 }
        });
        return;
    }

    const msInDay = 1000 * 60 * 60 * 24;
    const daysDiff = Math.floor((now.getTime() - streak.lastActivity.getTime()) / msInDay);

    if (daysDiff === 1) {
        await prisma.streak.update({
            where: { userId },
            data: {
                currentStreak: { increment: 1 },
                longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
                lastActivity: now
            }
        });
    } else if (daysDiff > 1) {
        if (streak.freezeCount > 0) {
            await prisma.streak.update({
                where: { userId },
                data: {
                    currentStreak: { increment: 1 },
                    longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
                    freezeCount: { decrement: 1 },
                    lastActivity: now
                }
            });
        } else {
            await prisma.streak.update({
                where: { userId },
                data: { currentStreak: 1, lastActivity: now }
            });
        }
    }
}

export async function buyFreeze(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const streak = await prisma.streak.findUnique({ where: { userId } });
    if (user && user.gems >= 200) {
        if (!streak) {
            await prisma.streak.create({ data: { userId, freezeCount: 1, lastActivity: new Date() } });
        } else if (streak.freezeCount < 2) {
            await prisma.streak.update({ where: { userId }, data: { freezeCount: { increment: 1 } } });
        } else {
            return false; // Max freezes reached
        }
        await prisma.user.update({ where: { id: userId }, data: { gems: { decrement: 200 } } });
        return true;
    }
    return false;
}
