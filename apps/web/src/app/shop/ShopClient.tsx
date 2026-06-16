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
                <div className="bg-white p-5 rounded-[28px] border-2 border-slate-200 flex gap-5 items-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-red-50 w-24 h-24 rounded-[20px] flex items-center justify-center border border-red-100 shrink-0 relative">
                        <Heart className="w-12 h-12 fill-red-500 text-red-500 drop-shadow-md" />
                        <span className="absolute -bottom-2 -right-2 bg-white border-2 border-red-100 text-red-500 font-bold text-xs px-2 py-0.5 rounded-full shadow">{hearts}/5</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-extrabold text-xl text-slate-800 tracking-tight mb-1">Heart Refill</h3>
                        <p className="text-sm text-slate-500 leading-snug font-medium">Get full hearts right now so you can keep learning.</p>
                    </div>
                    <button
                        onClick={() => handlePurchase('heart_refill', 350, 'Heart Refill')}
                        disabled={isPending || hearts >= 5}
                        className="bg-slate-100 text-slate-800 border-b-[6px] border-slate-300 font-extrabold px-4 py-3 rounded-2xl transition-all active:translate-y-[6px] active:border-b-0 hover:bg-slate-200 uppercase tracking-widest flex items-center gap-1.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {purchasingItem === 'heart_refill' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Diamond className="w-5 h-5 text-blue-500 fill-blue-500" />}
                        350
                    </button>
                </div>

                {/* Streak Freeze */}
                <div className="bg-white p-5 rounded-[28px] border-2 border-slate-200 flex gap-5 items-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-blue-50 w-24 h-24 rounded-[20px] flex items-center justify-center border border-blue-100 shrink-0">
                        <Snowflake className="w-12 h-12 fill-blue-300 text-blue-300 drop-shadow-md" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-extrabold text-xl text-slate-800 tracking-tight mb-1">Streak Freeze</h3>
                        <p className="text-sm text-slate-500 leading-snug font-medium">Keep your streak safe for one full day of inactivity.</p>
                    </div>
                    <button
                        onClick={() => handlePurchase('streak_freeze', 200, 'Streak Freeze')}
                        disabled={isPending}
                        className="bg-slate-100 text-slate-800 border-b-[6px] border-slate-300 font-extrabold px-4 py-3 rounded-2xl transition-all active:translate-y-[6px] active:border-b-0 hover:bg-slate-200 uppercase tracking-widest flex items-center gap-1.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {purchasingItem === 'streak_freeze' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Diamond className="w-5 h-5 text-blue-500 fill-blue-500" />}
                        200
                    </button>
                </div>
            </div>
        </>
    );
}
