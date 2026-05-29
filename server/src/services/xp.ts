import { prisma } from '@kodo/db';

export async function addXp(userId: string, xpAmount: number) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { xpTotal: { increment: xpAmount } }
        });
    } catch (e) {
        // maybe user doesn't exist yet, we could trigger creation
    }

    // add to weekly leaderboard
    const now = new Date();
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay() + 1, 0, 0, 0));

    try {
        await prisma.leaderboardWeekly.upsert({
            where: { userId_weekStart: { userId, weekStart } },
            update: { xpThisWeek: { increment: xpAmount } },
            create: { userId, weekStart, xpThisWeek: xpAmount, league: 'Bronze' }
        });
    } catch (e) { }
}
