import { UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@kodo/db';
import { Star, Flame, Trophy, Calendar, Shield, ShoppingBag, Award } from 'lucide-react';
import Link from 'next/link';

export default async function Profile() {
    const user = await currentUser();

    let dbUser = null;
    let streakData = null;
    let unitsCompleted = 0;
    let badges: any[] = [];
    let currentLeague = 'Bronze';

    if (user) {
        dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        streakData = await prisma.streak.findUnique({ where: { userId: user.id } });
        unitsCompleted = await prisma.unitProgress.count({ where: { userId: user.id, status: 'completed' } });
        badges = await prisma.userBadge.findMany({ where: { userId: user.id }, include: { badge: true }, orderBy: { earnedAt: 'desc' } });

        const now = new Date();
        const dayOfWeek = now.getUTCDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToMonday));
        const leaderEntry = await prisma.leaderboardWeekly.findUnique({ where: { userId_weekStart: { userId: user.id, weekStart } } });
        if (leaderEntry) currentLeague = leaderEntry.league;
    }

    const name = dbUser?.name || user?.firstName || 'Java Learner';
    const initials = name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();
    const joinedDate = dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';
    const xpTotal = dbUser?.xpTotal ?? 0;
    const currentStreak = streakData?.currentStreak ?? 0;
    const longestStreak = streakData?.longestStreak ?? 0;

    const leagueEmoji: Record<string, string> = { Bronze: '🥉', Silver: '🥈', Gold: '🥇' };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
            <header className="bg-white border-b border-slate-200 p-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase">Profile</h1>
                <UserButton />
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-8 pt-8 px-4">
                {/* Avatar card */}
                <div className="flex items-center gap-6 bg-white p-6 rounded-[28px] border-2 border-slate-200 shadow-sm">
                    <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center font-extrabold text-4xl text-brand-600 border-4 border-brand-200 shadow-inner shrink-0">
                        {initials || '?'}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{name}</h2>
                        {joinedDate && <p className="text-slate-500 font-medium">Joined {joinedDate}</p>}
                        <span className="inline-flex items-center gap-1 mt-1 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                            {leagueEmoji[currentLeague] || '🏅'} {currentLeague} League
                        </span>
                    </div>
                </div>

                {/* Stats grid */}
                <section>
                    <h3 className="font-extrabold text-2xl text-slate-800 mb-5 tracking-tight">Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-[24px] border-2 border-slate-200 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 font-extrabold text-orange-500">
                                <Flame className="w-7 h-7 fill-orange-500" />
                                <span className="text-2xl">{currentStreak}</span>
                            </div>
                            <span className="text-slate-500 font-bold text-sm tracking-wide">Day Streak</span>
                        </div>

                        <div className="bg-white p-5 rounded-[24px] border-2 border-slate-200 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 font-extrabold text-yellow-500">
                                <Star className="w-7 h-7 fill-yellow-500" />
                                <span className="text-2xl">{xpTotal.toLocaleString()}</span>
                            </div>
                            <span className="text-slate-500 font-bold text-sm tracking-wide">Total XP</span>
                        </div>

                        <div className="bg-white p-5 rounded-[24px] border-2 border-slate-200 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 font-extrabold text-blue-500">
                                <Trophy className="w-7 h-7 fill-blue-500" />
                                <span className="text-2xl">{longestStreak}</span>
                            </div>
                            <span className="text-slate-500 font-bold text-sm tracking-wide">Best Streak</span>
                        </div>

                        <div className="bg-white p-5 rounded-[24px] border-2 border-slate-200 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 font-extrabold text-brand-500">
                                <Calendar className="w-7 h-7 fill-brand-500" />
                                <span className="text-2xl">{unitsCompleted}</span>
                            </div>
                            <span className="text-slate-500 font-bold text-sm tracking-wide">Units Completed</span>
                        </div>
                    </div>
                </section>

                {/* Badges */}
                <section>
                    <h3 className="font-extrabold text-2xl text-slate-800 mb-5 tracking-tight">Badges</h3>
                    {badges.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[24px] p-8 text-center flex flex-col items-center gap-2">
                            <Award className="w-12 h-12 text-slate-200" />
                            <p className="font-bold text-slate-400">No badges yet.</p>
                            <p className="text-sm text-slate-400">Complete lessons and challenges to earn badges!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {badges.map(({ badge, earnedAt, id }) => (
                                <div key={id} className="bg-white border-2 border-slate-200 rounded-[20px] p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow text-center">
                                    <span className="text-4xl">{badge.iconUrl || '🏅'}</span>
                                    <span className="font-bold text-slate-700 text-sm leading-tight">{badge.name}</span>
                                    <span className="text-xs text-slate-400">{new Date(earnedAt).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 z-50 rounded-t-3xl pb-safe">
                <div className="max-w-md mx-auto flex justify-between p-3 px-6 text-slate-400">
                    <Link href="/home" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <Star className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">Learn</span>
                    </Link>
                    <Link href="/leaderboard" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <Shield className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">League</span>
                    </Link>
                    <Link href="/shop" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <ShoppingBag className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">Shop</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
