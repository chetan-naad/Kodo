import { auth } from '@clerk/nextjs/server';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { userId } = auth();

    const adminIds = (process.env.ADMIN_USER_IDS || '').split(',');
    if (!userId || !adminIds.includes(userId)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 flex-col gap-4">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">403 Forbidden</h1>
                <p className="text-slate-500 font-medium text-lg">You do not have administrative privileges.</p>
                <a href="/home" className="text-brand-500 font-bold hover:underline">Return to Learning</a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col p-6 sticky top-0 h-screen shadow-xl z-20">
                <h2 className="text-2xl font-black text-white mb-10 tracking-tight">Kodo<span className="text-brand-500">Admin</span></h2>
                <nav className="flex flex-col gap-5 font-bold tracking-widest text-xs uppercase">
                    <a href="/admin" className="hover:text-white transition-colors">Dashboard</a>
                    <a href="/admin/stages" className="hover:text-white transition-colors text-white">Curriculum</a>
                    <a href="/admin/users" className="hover:text-white transition-colors">Users</a>
                    <a href="/admin/settings" className="hover:text-white transition-colors">Settings</a>
                </nav>
            </aside>
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
