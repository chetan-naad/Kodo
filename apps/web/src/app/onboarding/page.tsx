"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, CheckCircle } from 'lucide-react';
import { saveOnboardingGoal } from '../actions/progress';

const GOALS = [
    { label: 'Casual',  minutes: 5,  desc: '5 min / day' },
    { label: 'Regular', minutes: 10, desc: '10 min / day', recommended: true },
    { label: 'Serious', minutes: 15, desc: '15 min / day' },
    { label: 'Intense', minutes: 20, desc: '20 min / day' },
];

export default function Onboarding() {
    const router = useRouter();
    const [selected, setSelected] = useState(10);
    const [isPending, startTransition] = useTransition();

    const handleContinue = () => {
        startTransition(async () => {
            await saveOnboardingGoal(selected);
            router.push('/home');
        });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6 pt-16">
            <div className="w-full max-w-lg flex flex-col h-full flex-1 justify-between pb-8">
                <div className="flex flex-col items-center">
                    {/* Progress Bar */}
                    <div className="w-full h-4 bg-slate-100 rounded-full mb-12 overflow-hidden border border-slate-200">
                        <div className="w-[33%] h-full bg-brand-500 rounded-full transition-all duration-1000" />
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 text-center mb-16 tracking-tight">
                        What's your daily goal?
                    </h1>

                    <div className="w-full flex flex-col gap-4 px-2">
                        {GOALS.map((goal) => {
                            const isSelected = selected === goal.minutes;
                            return (
                                <button
                                    key={goal.minutes}
                                    onClick={() => setSelected(goal.minutes)}
                                    className={`relative w-full border-2 rounded-2xl p-5 font-bold text-lg flex items-center justify-between transition-all active:scale-[0.98] ${
                                        isSelected
                                            ? 'border-brand-500 bg-brand-50 text-brand-600 ring-4 ring-brand-100'
                                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {isSelected
                                            ? <CheckCircle className="w-5 h-5 text-brand-500" />
                                            : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                                        }
                                        <span>{goal.label}</span>
                                    </div>
                                    <span className={isSelected ? 'text-brand-500' : 'text-slate-400'}>{goal.desc}</span>
                                    {goal.recommended && (
                                        <div className="absolute -right-3 -top-3 bg-orange-500 text-white rounded-full p-1.5 shadow-md border-2 border-white">
                                            <Flame className="w-4 h-4 fill-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={isPending}
                    className="mt-8 w-full bg-brand-500 hover:bg-brand-600 text-white rounded-2xl p-4 font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl border-b-[6px] border-brand-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Saving...' : 'Continue'}
                </button>
            </div>
        </div>
    );
}
