import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@kodo/db';
import { Shield, Star, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const LEAGUE_CONFIG: Record<string, { color: string; icon: string; next?: string }> = {
    Bronze: { color: 'text-amber-700', icon: '🥉', next: 'Silver' },
    Silver: { color: 'text-slate-500', icon: '🥈', next: 'Gold' },
    Gold:   { color: 'text-yellow-500', icon: '🥇' },
};

export default async function Leaderboard() {
    const user = await currentUser();

    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToMonday));

    // Fetch all users and merge in their weekly XP (0 if no entry this week)
    const allUsers = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            avatarUrl: true,
            leaderboards: {
                where: { weekStart },
                select: { xpThisWeek: true, league: true },
                take: 1,
            },
        },
        take: 50,
    });

    const entries = allUsers
        .map(u => ({
            id: u.id,
            user: { id: u.id, name: u.name, avatarUrl: u.avatarUrl },
            xpThisWeek: u.leaderboards[0]?.xpThisWeek ?? 0,
            league: u.leaderboards[0]?.league ?? 'Bronze',
        }))
        .sort((a, b) => b.xpThisWeek - a.xpThisWeek)
        .slice(0, 30);

    const league = entries.find(e => e.user.id === user?.id)?.league ?? 'Bronze';

    const leagueConf = LEAGUE_CONFIG[league] || LEAGUE_CONFIG['Bronze'];
    const cutoffRank = 5;

    const getInitials = (name: string | null) => {
        if (!name) return '?';
        const parts = name.trim().split(' ');
        return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : name[0].toUpperCase();
    };

    const rankColors = ['bg-yellow-100 text-yellow-700 ring-yellow-200', 'bg-slate-100 text-slate-600 ring-slate-200', 'bg-orange-100 text-orange-600 ring-orange-200'];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
            <header className="bg-white border-b border-slate-200 p-5 text-center sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase">Leaderboard</h1>
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-6 pt-10 px-4">
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-7xl drop-shadow-lg">{leagueConf.icon}</span>
                    <h2 className={`text-3xl font-extrabold mt-2 tracking-tight ${leagueConf.color}`}>{league} League</h2>
                    <p className="text-slate-500 font-semibold mb-2">Top {cutoffRank} advance to {leagueConf.next ?? 'the top'}</p>
                </div>

                {entries.length === 0 ? (
                    <div className="text-center py-16 flex flex-col items-center gap-3">
                        <Shield className="w-16 h-16 text-slate-200 fill-slate-200" />
                        <p className="font-bold text-slate-400 text-lg">No entries yet this week.</p>
                        <p className="text-slate-400 text-sm">Complete a lesson to appear here!</p>
                        <Link href="/home" className="mt-4 bg-brand-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors">Start Learning</Link>
                    </div>
                ) : (
                    <div className="bg-white border-2 border-slate-200 rounded-[28px] overflow-hidden shadow-sm">
                        {entries.map((entry, i) => {
                            const isCurrentUser = entry.user.id === user?.id;
                            const rank = i + 1;
                            const avatarClass = rank <= 3 ? rankColors[rank - 1] : (isCurrentUser ? 'bg-brand-100 text-brand-600 ring-brand-100' : 'bg-slate-100 text-slate-500 ring-slate-100');

                            return (
                                <div key={entry.id} className={`flex items-center gap-4 p-5 ${i !== entries.length - 1 ? 'border-b border-slate-100' : ''} ${isCurrentUser ? 'bg-brand-50' : 'hover:bg-slate-50'} transition-colors`}>
                                    <div className={`font-extrabold text-xl w-8 text-center ${rank <= 3 ? 'text-slate-700' : 'text-slate-400'}`}>{rank}</div>
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ring-4 shadow-sm ${avatarClass}`}>
                                        {getInitials(entry.user.name)}
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <span className={`font-bold text-lg ${isCurrentUser ? 'text-brand-800' : 'text-slate-800'}`}>
                                            {isCurrentUser ? 'You' : (entry.user.name || 'Unknown')}
                                        </span>
                                    </div>
                                    <div className={`font-black text-xl tracking-tight flex items-center gap-1 ${isCurrentUser ? 'text-brand-600' : 'text-brand-500'}`}>
                                        <Star className="w-4 h-4 fill-current" />
                                        {entry.xpThisWeek} <span className="text-sm font-bold text-slate-400 ml-1">XP</span>
                                    </div>
                                </div>
                            );
                        })}
                        {entries.length >= cutoffRank && (
                            <div className="h-2 w-full bg-red-50 border-t-2 border-dashed border-red-200 flex items-center justify-center">
                                <span className="text-red-400 text-[10px] font-bold uppercase tracking-widest px-2 bg-red-50">Promotion zone above</span>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 z-50 rounded-t-3xl pb-safe">
                <div className="max-w-md mx-auto flex justify-between p-3 px-6 text-slate-400">
                    <Link href="/home" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <Star className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">Learn</span>
                    </Link>
                    <Link href="/leaderboard" className="text-brand-500 flex flex-col items-center transition-transform hover:scale-105 active:scale-95">
                        <Shield className="w-7 h-7 fill-brand-500 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">League</span>
                    </Link>
                    <Link href="/shop" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <ShoppingBag className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">Shop</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
