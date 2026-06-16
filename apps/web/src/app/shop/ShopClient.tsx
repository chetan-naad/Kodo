"use client";

import { useState, useTransition } from 'react';
import { Heart, Snowflake, Diamond, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { purchaseShopItem } from '../actions/progress';

interface Props { gems: number; hearts: number; }

export default function ShopClient({ gems, hearts }: Props) {
    const [isPending, startTransition] = useTransition();
    const [purchasingItem, setPurchasingItem] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    const handlePurchase = (item: 'heart_refill' | 'streak_freeze', cost: number, label: string) => {
        if (isPending) return;
        if (gems < cost) { showToast('error', `Not enough gems! Need ${cost} 💎`); return; }
        if (item === 'heart_refill' && hearts >= 5) { showToast('error', 'Your hearts are already full!'); return; }

        setPurchasingItem(item);
        startTransition(async () => {
            try {
                await purchaseShopItem(item);
                showToast('success', `${label} purchased! 🎉`);
            } catch (e: any) {
                showToast('error', e?.message || 'Purchase failed.');
            } finally {
                setPurchasingItem(null);
            }
        });
    };

    return (
        <>
            {/* Toast */}
            {toast && (
                <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl font-bold text-white text-sm animate-bounce-in transition-all ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {toast.message}
                </div>
            )}

            <div className="flex flex-col gap-5">
                {/* Heart Refill */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-[28px] border-2 border-slate-200 dark:border-slate-800 flex gap-5 items-center shadow-sm hover:shadow-md transition-all">
                    <div className="bg-red-50 dark:bg-red-950/30 w-24 h-24 rounded-[20px] flex items-center justify-center border border-red-100 dark:border-red-900/50 shrink-0 relative transition-colors">
                        <Heart className="w-12 h-12 fill-red-500 text-red-500 drop-shadow-md" />
                        <span className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 border-2 border-red-100 dark:border-slate-700 text-red-500 dark:text-red-400 font-bold text-xs px-2 py-0.5 rounded-full shadow transition-colors">{hearts}/5</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight mb-1 transition-colors">Heart Refill</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug font-medium transition-colors">Get full hearts right now so you can keep learning.</p>
                    </div>
                    <button
                        onClick={() => handlePurchase('heart_refill', 350, 'Heart Refill')}
                        disabled={isPending || hearts >= 5}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-b-[6px] border-slate-300 dark:border-slate-700 font-extrabold px-4 py-3 rounded-2xl transition-all active:translate-y-[6px] active:border-b-0 hover:bg-slate-200 dark:hover:bg-slate-700 uppercase tracking-widest flex items-center gap-1.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {purchasingItem === 'heart_refill' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Diamond className="w-5 h-5 text-blue-500 fill-blue-500" />}
                        350
                    </button>
                </div>

                {/* Streak Freeze */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-[28px] border-2 border-slate-200 dark:border-slate-800 flex gap-5 items-center shadow-sm hover:shadow-md transition-all">
                    <div className="bg-blue-50 dark:bg-blue-950/30 w-24 h-24 rounded-[20px] flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shrink-0 transition-colors">
                        <Snowflake className="w-12 h-12 fill-blue-300 dark:fill-blue-500/50 text-blue-300 dark:text-blue-500/50 drop-shadow-md" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight mb-1 transition-colors">Streak Freeze</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug font-medium transition-colors">Keep your streak safe for one full day of inactivity.</p>
                    </div>
                    <button
                        onClick={() => handlePurchase('streak_freeze', 200, 'Streak Freeze')}
                        disabled={isPending}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-b-[6px] border-slate-300 dark:border-slate-700 font-extrabold px-4 py-3 rounded-2xl transition-all active:translate-y-[6px] active:border-b-0 hover:bg-slate-200 dark:hover:bg-slate-700 uppercase tracking-widest flex items-center gap-1.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {purchasingItem === 'streak_freeze' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Diamond className="w-5 h-5 text-blue-500 fill-blue-500" />}
                        200
                    </button>
                </div>
            </div>
        </>
    );
}
