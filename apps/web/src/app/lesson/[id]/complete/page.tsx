import Link from 'next/link';
import { Star, Target, Zap } from 'lucide-react';
import { prisma } from '@kodo/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface Props {
    params: { id: string };
}

export default async function LessonComplete({ params }: Props) {
    const user = await currentUser();
    if (!user) {
        redirect('/');
    }

    const progress = await prisma.userProgress.findUnique({
        where: {
            userId_lessonId: {
                userId: user.id,
                lessonId: params.id
            }
        }
    });

    const xpEarned = progress?.xpEarned || 0;
    const isPerfect = progress?.perfect || false;

    return (
        <div className="min-h-screen bg-brand-400 flex flex-col items-center justify-between pt-24 px-6 overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500 opacity-50 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center z-10 w-full max-w-sm">
                <div className="mb-14 bg-white/20 p-6 rounded-full ring-8 ring-white/10 backdrop-blur-md">
                    <Target className="w-24 h-24 text-yellow-300 drop-shadow-2xl animate-[bounce_2s_infinite]" />
                </div>

                <h1 className="text-5xl font-extrabold text-white tracking-tight mb-3 text-center drop-shadow-md">
                    Great Job!
                </h1>
                <p className="text-brand-100 font-semibold text-lg mb-16 text-center px-4 leading-relaxed">
                    You finished the lesson and advanced your daily goal.
                </p>

                <div className="flex gap-4 w-full px-2">
                    <div className="flex-1 bg-white rounded-3xl p-5 flex flex-col items-center shadow-2xl shadow-brand-900/40 transform transition-transform hover:-translate-y-1 border-b-4 border-slate-200">
                        <span className="uppercase text-slate-400 font-bold text-[11px] tracking-widest mb-3">Total XP</span>
                        <div className="flex items-center gap-2 text-yellow-500 font-black text-3xl">
                            <Star className="w-7 h-7 fill-yellow-500 drop-shadow-sm" /> {xpEarned}
                        </div>
                    </div>

                    <div className={`flex-1 bg-white rounded-3xl p-5 flex flex-col items-center shadow-2xl shadow-brand-900/40 transform transition-transform hover:-translate-y-1 border-b-4 border-slate-200 ${!isPerfect && 'opacity-60 grayscale'}`}>
                        <span className="uppercase text-slate-400 font-bold text-[11px] tracking-widest mb-3">Perfect</span>
                        <div className="flex items-center gap-2 text-blue-500 font-black text-3xl">
                            <Zap className={`w-7 h-7 ${isPerfect ? 'fill-blue-500' : 'fill-slate-300 text-slate-300'} drop-shadow-sm`} /> 
                            {isPerfect ? '+Bonus' : 'Missed'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-sm mb-12 z-10 px-2">
                <Link href="/home" className="w-full flex items-center justify-center bg-white text-brand-500 p-5 rounded-2xl font-bold text-xl uppercase tracking-widest shadow-xl shadow-brand-900/40 border-b-[6px] border-slate-200 transition-all hover:bg-slate-50 active:translate-y-[6px] active:border-b-0">
                    Continue
                </Link>
            </div>
        </div>
    );
}
