import { prisma } from '@kodo/db';

export default async function AdminDashboard() {
    const stageCount = await prisma.stage.count();
    const userCount = await prisma.user.count();

    return (
        <div className="flex flex-col gap-8 flex-1 w-full max-w-5xl items-start justify-start">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Stages</span>
                    <span className="text-5xl font-black text-slate-800">{stageCount}</span>
                </div>
                <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Registered Users</span>
                    <span className="text-5xl font-black text-brand-600">{userCount}</span>
                </div>
            </div>
        </div>
    );
}
