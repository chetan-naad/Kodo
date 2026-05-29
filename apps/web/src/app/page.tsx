import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 bg-gradient-to-b from-brand-50 to-white pt-24 pb-12 overflow-hidden relative">
            {/* Decorative Blob */}
            <div className="absolute top-0 -translate-y-12 w-[600px] h-[400px] bg-brand-400 opacity-20 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-center space-x-3 mb-4 z-10">
                <div className="bg-brand-500 p-3 rounded-2xl shadow-xl shadow-brand-500/30">
                    <Code2 className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Kodo</h1>
            </div>

            <div className="max-w-[400px] space-y-4 z-10">
                <h2 className="text-2xl font-bold text-slate-800">Learn Java for Free.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                    Bite-sized, gamified lessons to master Java programming from scratch. Earn XP, build streaks, and climb the leaderboard!
                </p>
            </div>

            <div className="w-full max-w-[320px] pt-8 z-10 flex flex-col gap-4">
                <SignedIn>
                    <Link href="/home" className="flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 text-white p-4 rounded-2xl font-bold text-lg shadow-lg shadow-brand-500/25 transition-transform active:scale-95">
                        Continue Learning
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 text-white p-4 rounded-2xl font-bold text-lg shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
                            Get Started
                        </button>
                    </SignInButton>

                    <SignInButton mode="modal">
                        <button className="w-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 p-4 rounded-2xl font-bold text-lg transition-colors active:scale-95 flex items-center justify-center">
                            I already have an account
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    );
}
