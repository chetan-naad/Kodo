import { createStage } from '../../actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateStage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="flex items-center gap-4">
         <Link href="/admin/stages" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft className="w-8 h-8" />
         </Link>
         <h1 className="text-4xl font-black text-slate-800 tracking-tight">Create Stage</h1>
      </div>

      <form action={createStage} className="bg-white p-8 rounded-[24px] border-2 border-slate-200 shadow-sm flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="font-extrabold text-slate-800 text-sm uppercase tracking-widest">Title</span>
          <input name="title" required className="p-4 border-2 border-slate-200 rounded-xl font-bold text-lg text-slate-800 focus:outline-none focus:border-brand-500" placeholder="e.g. Java Basics" />
        </label>
        
        <label className="flex flex-col gap-2">
          <span className="font-extrabold text-slate-800 text-sm uppercase tracking-widest">Description</span>
          <textarea name="description" className="p-4 border-2 border-slate-200 rounded-xl font-bold text-lg text-slate-800 focus:outline-none focus:border-brand-500 h-32 resize-none" placeholder="Description of the stage..." />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-extrabold text-slate-800 text-sm uppercase tracking-widest">Order</span>
          <input name="order" type="number" defaultValue={1} required className="p-4 border-2 border-slate-200 rounded-xl font-bold text-lg text-slate-800 focus:outline-none focus:border-brand-500" />
        </label>

        <button type="submit" className="mt-4 bg-brand-500 text-white font-extrabold text-lg uppercase tracking-widest py-5 rounded-2xl border-b-[6px] border-brand-700 active:border-b-0 active:translate-y-[6px] transition-all">
          Save Stage
        </button>
      </form>
    </div>
  );
}
