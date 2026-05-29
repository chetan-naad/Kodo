"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Tornado, Search, Flame, Bug, Layers, PlayCircle, GitBranch, ShieldAlert, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaStackUnwindingGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Stack Unwinding</h1>
                        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Visual Study Guide</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 flex flex-col gap-24 mt-12">

                {/* Intro Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-6"
                >
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center ring-4 ring-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                    >
                        <Tornado className="w-10 h-10 text-purple-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Stack Unwinding</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        When an unhandled exception propagates up the call stack. If it reaches the JVM without a handler, <strong className="text-rose-400">the JVM destroys the stack!</strong>
                    </p>
                </motion.section>

                {/* Stack Trace Visualization */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                            <Search className="text-purple-400" /> printStackTrace()
                        </h3>
                        <p className="text-slate-400">A non-static method of Throwable that prints the complete back trace to find the root cause.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* The Code */}
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-700 font-mono text-sm text-slate-300">
                            <span className="text-pink-500 font-bold">static void</span> disp4() {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-slate-500 italic">// The origin of the error</span><br/>
                            &nbsp;&nbsp;<span className="text-pink-500">int</span> i = <span className="text-orange-400">1</span> / <span className="text-orange-400">0</span>;<br/>
                            {'}'}<br/>
                            <span className="text-pink-500 font-bold">static void</span> disp3() {'{'} disp4(); {'}'}<br/>
                            <span className="text-pink-500 font-bold">static void</span> disp2() {'{'} disp3(); {'}'}<br/>
                            <span className="text-pink-500 font-bold">static void</span> disp1() {'{'} disp2(); {'}'}<br/><br/>
                            
                            <span className="text-pink-500 font-bold">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-emerald-400 font-bold">try</span> {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;disp1();<br/>
                            &nbsp;&nbsp;{'}'} <span className="text-emerald-400 font-bold">catch</span> (ArithmeticException e) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;e.<span className="text-purple-400 font-bold">printStackTrace()</span>;<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>

                        {/* The Propagation Flow */}
                        <div className="flex flex-col items-center justify-center relative py-8">
                            {/* Line connecting them */}
                            <div className="absolute top-12 bottom-12 w-1 bg-slate-700 z-0"></div>

                            <div className="bg-rose-500 text-white font-bold px-6 py-2 rounded-full relative z-10 shadow-lg border border-rose-400 mb-6 flex gap-2 items-center">
                                <Flame className="w-4 h-4" /> disp4() <span className="text-xs opacity-80">(Exception Occurs)</span>
                            </div>
                            
                            <div className="bg-slate-800 text-slate-300 px-6 py-2 rounded-full relative z-10 border border-slate-600 mb-6 flex gap-2 items-center">
                                disp3() <span className="text-xs text-rose-400 font-bold">↓ propagates</span>
                            </div>

                            <div className="bg-slate-800 text-slate-300 px-6 py-2 rounded-full relative z-10 border border-slate-600 mb-6 flex gap-2 items-center">
                                disp2() <span className="text-xs text-rose-400 font-bold">↓ propagates</span>
                            </div>

                            <div className="bg-slate-800 text-slate-300 px-6 py-2 rounded-full relative z-10 border border-slate-600 mb-6 flex gap-2 items-center">
                                disp1() <span className="text-xs text-rose-400 font-bold">↓ propagates</span>
                            </div>

                            <div className="bg-emerald-500 text-white font-bold px-6 py-2 rounded-full relative z-10 shadow-lg border border-emerald-400 flex gap-2 items-center">
                                main() <span className="text-xs opacity-80">(Caught & Handled!)</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Differences Tables */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-12"
                >
                    {/* Error vs Exception */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <ShieldAlert className="w-8 h-8 text-orange-400" />
                            <h3 className="text-2xl font-bold">Error vs Exception</h3>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-slate-700">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-900 text-slate-300">
                                    <tr>
                                        <th className="p-4 border-b border-slate-700 w-1/2">
                                            <div className="flex items-center gap-2 text-rose-400 text-lg"><Flame className="w-5 h-5"/> ERROR</div>
                                        </th>
                                        <th className="p-4 border-b border-slate-700 w-1/2">
                                            <div className="flex items-center gap-2 text-amber-400 text-lg"><Bug className="w-5 h-5"/> EXCEPTION</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700 bg-slate-800 text-slate-300">
                                    <tr>
                                        <td className="p-4">Error is <strong>unpredictable</strong>.</td>
                                        <td className="p-4">Exception is <strong>predictable</strong>.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Occurs due to <strong>system configuration</strong> (e.g. OutOfMemory).</td>
                                        <td className="p-4">Occurs due to <strong>mistakes done by the programmer</strong>.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-xs italic opacity-70">Can be handled (technically, though highly discouraged).</td>
                                        <td className="p-4 text-xs italic opacity-70">Can be handled (and is expected to be).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* throw vs throws */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <GitBranch className="w-8 h-8 text-sky-400" />
                            <h3 className="text-2xl font-bold">throw vs throws</h3>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-slate-700">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-900 text-slate-300">
                                    <tr>
                                        <th className="p-4 border-b border-slate-700 w-1/2 font-mono text-sky-400 text-lg">throw</th>
                                        <th className="p-4 border-b border-slate-700 w-1/2 font-mono text-sky-400 text-lg">throws</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700 bg-slate-800 text-slate-300">
                                    <tr>
                                        <td className="p-4">Used to <strong>create</strong> and throw the instance of a throwable type.</td>
                                        <td className="p-4">Used to <strong>propagate</strong> the exception from one method to the caller.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Always developed in the <strong>method body</strong>.</td>
                                        <td className="p-4">Always developed in the <strong>method declaration/signature</strong>.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Can throw only <strong>1 object</strong> at a time.</td>
                                        <td className="p-4">Can propagate <strong>more than 1</strong> exception (comma separated).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-500 shadow-xl shadow-purple-500/20 border-b-4 border-purple-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
