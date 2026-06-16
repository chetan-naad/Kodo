import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@kodo/db';
import { Diamond, Star, Shield, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import ShopClient from './ShopClient';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function Shop() {
    const user = await currentUser();

    let gems = 0;
    let hearts = 5;
    if (user) {
        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { gems: true, hearts: true },
        });
        gems = dbUser?.gems ?? 0;
        hearts = dbUser?.hearts ?? 5;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-5 flex justify-between items-center sticky top-0 z-10 shadow-sm transition-colors">
                <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight uppercase transition-colors">Shop</h1>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="flex items-center gap-2 font-black text-blue-500 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/50 px-4 py-2 rounded-xl shadow-sm transition-colors">
                        <Diamond className="w-5 h-5 fill-blue-500 text-blue-500" />
                        {gems.toLocaleString()}
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-10 pt-10 px-4 pb-32">
                <section>
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 tracking-tight transition-colors">Power-ups</h2>
                    <ShopClient gems={gems} hearts={hearts} />
                </section>

                {gems === 0 && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-900/50 rounded-[24px] p-6 text-center flex flex-col gap-2 transition-colors">
                        <p className="font-extrabold text-amber-800 dark:text-amber-500 text-lg transition-colors">No gems yet?</p>
                        <p className="text-amber-700 dark:text-amber-600 text-sm font-medium transition-colors">Complete lessons with a perfect score to earn gems!</p>
                        <Link href="/home" className="mt-2 inline-block bg-brand-500 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-brand-600 transition-colors">Go Learn</Link>
                    </div>
                )}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 z-50 rounded-t-3xl md:rounded-none pb-safe transition-colors">
                <div className="max-w-md mx-auto flex justify-between p-3 px-6 text-slate-400 dark:text-slate-500">
                    <Link href="/home" className="flex flex-col items-center hover:text-slate-600 dark:hover:text-slate-300 transition-transform hover:scale-105 active:scale-95">
                        <Star className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">Learn</span>
                    </Link>
                    <Link href="/leaderboard" className="flex flex-col items-center hover:text-slate-600 dark:hover:text-slate-300 transition-transform hover:scale-105 active:scale-95">
                        <Shield className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">League</span>
                    </Link>
                    <Link href="/shop" className="text-brand-500 flex flex-col items-center transition-transform hover:scale-105 active:scale-95">
                        <ShoppingBag className="w-7 h-7 fill-brand-500 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">Shop</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
