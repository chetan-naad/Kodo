"use server";

import { prisma } from "@kodo/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function upsertUserProgress(lessonId: string, xpEarned: number, perfect: boolean) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    await prisma.$transaction(async (tx) => {
        // Check if this is a first-time completion (to avoid re-farming gems)
        const existing = await tx.userProgress.findUnique({
            where: { userId_lessonId: { userId: user.id, lessonId } },
        });
        const isFirstCompletion = !existing;

        await tx.userProgress.upsert({
            where: { userId_lessonId: { userId: user.id, lessonId } },
            create: { userId: user.id, lessonId, xpEarned, perfect },
            update: { xpEarned, perfect, completedAt: new Date() },
        });

        // Award XP (always) and gems (only on first perfect completion)
        const GEM_REWARD = 10;
        const gemsToAward = isFirstCompletion && perfect ? GEM_REWARD : 0;

        await tx.user.update({
            where: { id: user.id },
            data: {
                xpTotal: { increment: xpEarned },
                ...(gemsToAward > 0 && { gems: { increment: gemsToAward } }),
            },
        });

        // Update weekly leaderboard
        const now = new Date();
        const dayOfWeek = now.getUTCDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToMonday));
        await tx.leaderboardWeekly.upsert({
            where: { userId_weekStart: { userId: user.id, weekStart } },
            update: { xpThisWeek: { increment: xpEarned } },
            create: { userId: user.id, weekStart, xpThisWeek: xpEarned, league: 'Bronze' },
        });

        // Update streak
        const streak = await tx.streak.findUnique({ where: { userId: user.id } });
        const now2 = new Date();
        if (!streak) {
            await tx.streak.create({ data: { userId: user.id, lastActivity: now2, currentStreak: 1, longestStreak: 1 } });
        } else {
            const daysDiff = Math.floor((now2.getTime() - streak.lastActivity.getTime()) / 86400000);
            if (daysDiff === 0) { /* same day, no change */ }
            else if (daysDiff === 1) {
                const newStreak = streak.currentStreak + 1;
                await tx.streak.update({ where: { userId: user.id }, data: { currentStreak: newStreak, longestStreak: Math.max(streak.longestStreak, newStreak), lastActivity: now2 } });
            } else if (streak.freezeCount > 0) {
                await tx.streak.update({ where: { userId: user.id }, data: { currentStreak: { increment: 1 }, freezeCount: { decrement: 1 }, lastActivity: now2 } });
            } else {
                await tx.streak.update({ where: { userId: user.id }, data: { currentStreak: 1, lastActivity: now2 } });
            }
        }
    });

    revalidatePath("/home");
    revalidatePath("/leaderboard");
    revalidatePath("/profile");
}

export async function resetUserProgress() {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    await prisma.$transaction(async (tx) => {
        await tx.userProgress.deleteMany({ where: { userId: user.id } });
        await tx.user.update({ where: { id: user.id }, data: { xpTotal: 0, gems: 0, hearts: 5 } });
    });

    revalidatePath("/home");
}

export async function saveOnboardingGoal(minutes: number) {
    const user = await currentUser();
    if (!user) return; // Not signed in — skip silently, client will still navigate

    await prisma.user.upsert({
        where: { id: user.id },
        update: { dailyGoalMinutes: minutes },
        create: {
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress ?? "unknown@example.com",
            name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : "Player",
            dailyGoalMinutes: minutes,
        },
    });

    revalidatePath("/home");
}

export async function purchaseShopItem(item: 'heart_refill' | 'streak_freeze') {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) throw new Error("User not found");

    if (item === 'heart_refill') {
        const COST = 350;
        if (dbUser.gems < COST) throw new Error("Not enough gems");
        if (dbUser.hearts >= 5) throw new Error("Hearts already full");
        await prisma.user.update({ where: { id: user.id }, data: { hearts: 5, heartsLastRefill: new Date(), gems: { decrement: COST } } });
    } else if (item === 'streak_freeze') {
        const COST = 200;
        if (dbUser.gems < COST) throw new Error("Not enough gems");
        const streak = await prisma.streak.findUnique({ where: { userId: user.id } });
        if (streak && streak.freezeCount >= 2) throw new Error("Max freezes reached");
        if (!streak) {
            await prisma.streak.create({ data: { userId: user.id, lastActivity: new Date(), freezeCount: 1 } });
        } else {
            await prisma.streak.update({ where: { userId: user.id }, data: { freezeCount: { increment: 1 } } });
        }
        await prisma.user.update({ where: { id: user.id }, data: { gems: { decrement: COST } } });
    }

    revalidatePath("/shop");
    revalidatePath("/home");
}
