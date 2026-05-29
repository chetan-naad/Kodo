import { prisma } from '@kodo/db';

export async function getWeeklyLeaderboard(userId: string) {
    const now = new Date();
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay() + 1, 0, 0, 0));

    // Determine user's league from their entry. If no entry, default to Bronze.
    let userEntry = await prisma.leaderboardWeekly.findUnique({
        where: { userId_weekStart: { userId, weekStart } }
    });

    const league = userEntry ? userEntry.league : 'Bronze';

    const entries = await prisma.leaderboardWeekly.findMany({
        where: { weekStart, league },
        orderBy: { xpThisWeek: 'desc' },
        include: { user: { select: { name: true, avatarUrl: true } } },
        take: 30
    });

    return entries;
}
