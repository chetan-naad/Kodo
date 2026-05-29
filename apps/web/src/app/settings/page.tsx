import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Settings() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 p-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/profile" className="text-slate-400 hover:text-slate-600 transition-colors p-2 -ml-2">
                        <ArrowLeft className="w-7 h-7" />
                    </Link>
                    <h1 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase">Settings</h1>
                </div>
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-8 pt-10 px-4">
                <div className="bg-white rounded-[28px] border-2 border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
                        <span className="font-extrabold text-slate-800 text-lg">Daily Goal</span>
                        <span className="font-bold text-brand-500 text-lg">10 min/day</span>
                    </div>

                    <div className="p-6 border-b border-slate-100 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
                        <span className="font-extrabold text-slate-800 text-lg">Notification Time</span>
                        <span className="font-bold text-slate-500 text-lg">6:00 PM</span>
                    </div>

                    <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
                        <span className="font-extrabold text-slate-800 text-lg">Account</span>
                        <div className="scale-125 origin-right">
                            <UserButton />
                        </div>
                    </div>
                </div>

                <button className="bg-white text-red-500 border-2 border-slate-200 shadow-sm font-extrabold p-5 rounded-[24px] transition-colors active:bg-red-50 hover:bg-red-50 hover:border-red-200 hover:text-red-600 uppercase tracking-widest text-sm text-center">
                    Sign Out
                </button>
            </main>
        </div>
    );
}
