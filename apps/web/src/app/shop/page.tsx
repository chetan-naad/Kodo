import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@kodo/db';
import { Diamond, Star, Shield, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import ShopClient from './ShopClient';

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
        <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
            <header className="bg-white border-b border-slate-200 p-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase">Shop</h1>
                <div className="flex items-center gap-2 font-black text-blue-500 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl shadow-sm">
                    <Diamond className="w-5 h-5 fill-blue-500 text-blue-500" />
                    {gems.toLocaleString()}
                </div>
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-10 pt-10 px-4">
                <section>
                    <h2 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Power-ups</h2>
                    <ShopClient gems={gems} hearts={hearts} />
                </section>

                {gems === 0 && (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-[24px] p-6 text-center flex flex-col gap-2">
                        <p className="font-extrabold text-amber-800 text-lg">No gems yet?</p>
                        <p className="text-amber-700 text-sm font-medium">Complete lessons with a perfect score to earn gems!</p>
                        <Link href="/home" className="mt-2 inline-block bg-brand-500 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-brand-600 transition-colors">Go Learn</Link>
                    </div>
                )}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 z-50 rounded-t-3xl pb-safe">
                <div className="max-w-md mx-auto flex justify-between p-3 px-6 text-slate-400">
                    <Link href="/home" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <Star className="w-7 h-7 mb-1" /><span className="text-[11px] font-bold uppercase tracking-wider">Learn</span>
                    </Link>
                    <Link href="/leaderboard" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
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
