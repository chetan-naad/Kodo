import { prisma } from '@kodo/db';
import Link from 'next/link';

export default async function AdminStages() {
    const stages = await prisma.stage.findMany({
        orderBy: { order: 'asc' },
        include: { _count: { select: { units: true } } }
    });

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">Curriculum Stages</h1>
                <Link href="/admin/stages/create" className="bg-brand-500 text-white font-extrabold tracking-wide px-6 py-4 rounded-xl hover:bg-brand-600 transition-colors shadow-sm active:scale-95 uppercase text-sm inline-block">
                    Create Stage
                </Link>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 font-bold text-[11px] uppercase tracking-widest border-b-2 border-slate-200">
                        <tr>
                            <th className="p-5">Order</th>
                            <th className="p-5">Title</th>
                            <th className="p-5 flex justify-center">Units</th>
                            <th className="p-5">Status</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-100 text-slate-700 font-medium">
                        {stages.map(stage => (
                            <tr key={stage.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-5 font-bold">{stage.order}</td>
                                <td className="p-5 font-extrabold text-slate-900 text-lg">{stage.title}</td>
                                <td className="p-5 text-center font-bold">{stage._count.units}</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest ${stage.published ? 'bg-brand-100 text-brand-700' : 'bg-slate-200 text-slate-600'}`}>
                                        {stage.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-5 text-right">
                                    <Link href={`/admin/stages/${stage.id}`} className="text-blue-500 hover:text-blue-700 font-bold uppercase tracking-widest text-xs p-3">Edit</Link>
                                </td>
                            </tr>
                        ))}
                        {stages.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="font-extrabold text-xl text-slate-400 tracking-tight">No stages found</span>
                                        <span className="text-slate-400 font-medium">Click Create Stage to add one.</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
