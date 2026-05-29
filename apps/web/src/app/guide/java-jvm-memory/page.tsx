"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Layers, Database, Boxes, Code2, ArrowRight, Cog, ListOrdered, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaJvmMemoryGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">JVM Memory</h1>
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
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center ring-4 ring-emerald-500"
                    >
                        <Cpu className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">JVM Memory Architecture</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The Java Virtual Machine organizes memory into <strong className="text-emerald-400">4 distinct areas</strong> to manage execution, objects, and static data.
                    </p>
                </motion.section>

                {/* JVM Memory Layout Diagram */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-6"
                >
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm font-bold tracking-widest uppercase mb-2">
                            <Cpu className="w-4 h-4" /> Memory Layout
                        </div>
                        <h3 className="text-2xl font-bold text-slate-200">JVM Memory Architecture Diagram</h3>
                    </div>

                    {/* The Diagram */}
                    <div className="bg-slate-950 border-2 border-slate-700 rounded-3xl p-2 md:p-4 shadow-2xl shadow-emerald-900/10 relative overflow-hidden">
                        {/* Outer border glow */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-emerald-500/10 pointer-events-none" />

                        <div className="grid grid-cols-2 grid-rows-2 aspect-[2/1.2] md:aspect-[2/1] relative">
                            {/* Divider lines */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-600/80 z-10" />
                            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-600/80 z-10" />

                            {/* Stack (Top Left) */}
                            <motion.div
                                whileHover={{ backgroundColor: "rgba(236, 72, 153, 0.08)" }}
                                className="flex flex-col items-center justify-center p-4 md:p-8 border-r border-b border-transparent transition-colors relative"
                            >
                                <ListOrdered className="w-8 h-8 md:w-10 md:h-10 text-pink-400 mb-2 md:mb-3" />
                                <h4 className="text-xl md:text-2xl font-black text-pink-400 tracking-tight">Stack</h4>
                                <p className="text-[10px] md:text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">LIFO Execution</p>
                            </motion.div>

                            {/* Heap Memory (Top Right) */}
                            <motion.div
                                whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.08)" }}
                                className="flex flex-col items-center justify-center p-4 md:p-8 border-l border-b border-transparent transition-colors relative"
                            >
                                <Database className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 mb-2 md:mb-3" />
                                <h4 className="text-xl md:text-2xl font-black text-indigo-400 tracking-tight">Heap</h4>
                                <p className="text-[10px] md:text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">Memory</p>
                            </motion.div>

                            {/* Method Area (Bottom Left) */}
                            <motion.div
                                whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.08)" }}
                                className="flex flex-col items-center justify-center p-4 md:p-8 border-r border-t border-transparent transition-colors relative"
                            >
                                <Code2 className="w-8 h-8 md:w-10 md:h-10 text-orange-400 mb-2 md:mb-3" />
                                <h4 className="text-xl md:text-2xl font-black text-orange-400 tracking-tight">Method</h4>
                                <p className="text-[10px] md:text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">Area</p>
                            </motion.div>

                            {/* Static Pool Area (Bottom Right) */}
                            <motion.div
                                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.08)" }}
                                className="flex flex-col items-center justify-center p-4 md:p-8 border-l border-t border-transparent transition-colors relative"
                            >
                                <Layers className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mb-2 md:mb-3" />
                                <h4 className="text-xl md:text-2xl font-black text-blue-400 tracking-tight">Static Pool</h4>
                                <p className="text-[10px] md:text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">Area</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* 1. The 4 Quadrants */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Boxes className="w-4 h-4" /> 1. The 4 Areas
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Stack */}
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-pink-500 transition-colors relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ListOrdered className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-pink-500/20 rounded-xl"><ListOrdered className="w-6 h-6 text-pink-400" /></div>
                                <h3 className="text-2xl font-bold text-white">1. Stack</h3>
                            </div>
                            <p className="text-slate-400 mb-4">Used strictly for execution. It follows the <strong className="text-pink-400">LIFO</strong> (Last In, First Out) principle.</p>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li>• Method execution frames</li>
                                <li>• Local variables</li>
                                <li>• Object reference addresses</li>
                            </ul>
                        </div>

                        {/* Heap */}
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-indigo-500 transition-colors relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Database className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-indigo-500/20 rounded-xl"><Database className="w-6 h-6 text-indigo-400" /></div>
                                <h3 className="text-2xl font-bold text-white">2. Heap Memory</h3>
                            </div>
                            <p className="text-slate-400 mb-4">Used to store all the <strong className="text-indigo-400">non-static</strong> members of a class.</p>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li>• Objects created via `new`</li>
                                <li>• Instance variables</li>
                                <li>• Arrays</li>
                            </ul>
                        </div>

                        {/* Static Pool Area */}
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-blue-500 transition-colors relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Layers className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl"><Layers className="w-6 h-6 text-blue-400" /></div>
                                <h3 className="text-2xl font-bold text-white">3. Static Pool Area</h3>
                            </div>
                            <p className="text-slate-400 mb-4">Used to store all the <strong className="text-blue-400">static</strong> members of a class.</p>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li>• Initialized by the Class Loader</li>
                                <li>• Shared across all instances</li>
                                <li>• Static variables</li>
                            </ul>
                        </div>

                        {/* Method Area */}
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-orange-500 transition-colors relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Code2 className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-orange-500/20 rounded-xl"><Code2 className="w-6 h-6 text-orange-400" /></div>
                                <h3 className="text-2xl font-bold text-white">4. Method Area</h3>
                            </div>
                            <p className="text-slate-400 mb-4">Used to store all the <strong className="text-orange-400">method bodies</strong> and definitions.</p>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li>• Static method bodies</li>
                                <li>• Non-static method bodies</li>
                                <li>• Class structure metadata</li>
                            </ul>
                        </div>

                    </div>
                </motion.section>

                {/* 2. Object Creation Lifecycle */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-brand-900/20 rounded-3xl p-8 border border-brand-500/20 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Cog className="w-4 h-4" /> 2. Lifecycle
                        </div>
                        <h3 className="text-3xl font-bold">The Object Creation Pipeline</h3>
                        <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                            When JVM hits an object creation statement in `main`, it evaluates the equal operator from <strong className="text-brand-400">Right to Left</strong>.
                        </p>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-2xl font-mono text-lg overflow-x-auto border border-slate-800 text-center mb-12 shadow-inner">
                        <span className="text-pink-500 font-bold">Employee</span>{' '}
                        <span className="text-white font-bold border-b border-white">e1</span>{' '}
                        <span className="text-slate-400">=</span>{' '}
                        <span className="text-emerald-400 font-bold">new</span>{' '}
                        <span className="text-indigo-400 font-bold">Employee()</span>;
                    </div>

                    <div className="relative border-l-4 border-brand-500/30 ml-4 md:ml-12 space-y-12 pb-8">
                        
                        {/* Step 1 */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">1</div>
                            <h4 className="text-xl font-bold text-emerald-400 mb-2">The `new` operator</h4>
                            <p className="text-slate-400 text-sm">
                                Creates a random memory space in the <strong className="text-indigo-300">Heap Memory</strong>.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">2</div>
                            <h4 className="text-xl font-bold text-indigo-400 mb-2">The Constructor `Employee()`</h4>
                            <p className="text-slate-400 text-sm">
                                Initializes all the non-static members and injects them directly into that newly created space in the <strong className="text-indigo-300">Heap Memory</strong>.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.5)]">3</div>
                            <h4 className="text-xl font-bold text-white mb-2">The Reference Variable `e1`</h4>
                            <p className="text-slate-400 text-sm">
                                The physical address of that object in the Heap is captured and stored in the reference variable `e1`, which resides safely in the <strong className="text-pink-400">Stack</strong>.
                            </p>
                            
                            <div className="mt-6 flex flex-col md:flex-row items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-700">
                                <div className="bg-pink-500/20 p-4 rounded-lg border border-pink-500/30 text-center w-full md:w-auto">
                                    <div className="text-xs text-pink-400 font-bold uppercase tracking-widest mb-1">Stack</div>
                                    <div className="font-mono text-white">e1 = 0x8F2A</div>
                                </div>
                                <ArrowRight className="text-slate-500 hidden md:block" />
                                <div className="bg-indigo-500/20 p-4 rounded-lg border border-indigo-500/30 text-center w-full md:w-auto">
                                    <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">Heap Memory</div>
                                    <div className="font-mono text-white">[ 0x8F2A: Employee Object ]</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-emerald-500 text-emerald-950 rounded-2xl font-bold text-lg hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
