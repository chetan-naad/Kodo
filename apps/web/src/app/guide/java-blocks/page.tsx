"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Box, ArrowDown, ChevronRight, Play, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function JavaBlocksGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">Initialization Blocks</h1>
                        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Visual Study Guide</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 flex flex-col gap-24 mt-12">

                {/* Intro */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-6"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center ring-4 ring-cyan-500"
                    >
                        <Box className="w-10 h-10 text-cyan-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Initialization Blocks</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Java has <strong className="text-cyan-400">two types</strong> of initialization blocks that let you run code at specific moments in the class lifecycle.
                    </p>
                </motion.section>

                {/* Side-by-Side Comparison */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* SIB */}
                    <div className="bg-slate-800 border-t-8 border-cyan-500 p-8 rounded-3xl shadow-xl shadow-cyan-900/20 space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="w-8 h-8 text-cyan-400" />
                            <h3 className="text-2xl font-bold text-white">SIB</h3>
                        </div>
                        <p className="text-sm text-cyan-300 font-bold uppercase tracking-widest">Static Initialization Block</p>
                        
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex gap-2"><span className="text-cyan-400 font-bold">✓</span> Declared with the <code className="bg-black/30 px-1.5 rounded text-cyan-300">static</code> keyword</li>
                            <li className="flex gap-2"><span className="text-cyan-400 font-bold">✓</span> Initializes <strong className="text-white">static</strong> members</li>
                            <li className="flex gap-2"><span className="text-cyan-400 font-bold">✓</span> Executes <strong className="text-cyan-300">before main()</strong></li>
                            <li className="flex gap-2"><span className="text-cyan-400 font-bold">✓</span> N blocks → sequential order</li>
                        </ul>

                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800">
                            <span className="text-cyan-400 font-bold">static</span> {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-slate-500">// runs BEFORE main</span><br/>
                            {'}'}
                        </div>
                    </div>

                    {/* IIB */}
                    <div className="bg-slate-800 border-t-8 border-orange-500 p-8 rounded-3xl shadow-xl shadow-orange-900/20 space-y-6">
                        <div className="flex items-center gap-3">
                            <RotateCcw className="w-8 h-8 text-orange-400" />
                            <h3 className="text-2xl font-bold text-white">IIB</h3>
                        </div>
                        <p className="text-sm text-orange-300 font-bold uppercase tracking-widest">Instance Initialization Block</p>
                        
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex gap-2"><span className="text-orange-400 font-bold">✓</span> Declared <strong className="text-white">without</strong> the static keyword</li>
                            <li className="flex gap-2"><span className="text-orange-400 font-bold">✓</span> Initializes <strong className="text-white">non-static</strong> members</li>
                            <li className="flex gap-2"><span className="text-orange-400 font-bold">✓</span> Executes <strong className="text-orange-300">on every object creation</strong></li>
                            <li className="flex gap-2"><span className="text-orange-400 font-bold">✓</span> N blocks → sequential order</li>
                        </ul>

                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800">
                            {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-slate-500">// runs on new ClassName()</span><br/>
                            {'}'}
                        </div>
                    </div>
                </motion.section>

                {/* Execution Order */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-brand-900/20 rounded-3xl p-8 border border-brand-500/20 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Play className="w-4 h-4" /> Execution Order
                        </div>
                        <h3 className="text-3xl font-bold">When Does Each Block Run?</h3>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        {/* Step 1 */}
                        <div className="bg-slate-800 border-2 border-slate-600 rounded-2xl px-8 py-4 text-center w-full max-w-md">
                            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Step 1 — Class Loading</div>
                            <div className="text-lg font-bold text-cyan-400">Static members → Static Pool</div>
                        </div>
                        <ArrowDown className="w-6 h-6 text-slate-600" />

                        {/* Step 2 */}
                        <div className="bg-cyan-500/20 border-2 border-cyan-500/40 rounded-2xl px-8 py-4 text-center w-full max-w-md ring-2 ring-cyan-500/10">
                            <div className="text-xs text-cyan-400 uppercase tracking-widest mb-1">Step 2 — Before main()</div>
                            <div className="text-lg font-bold text-cyan-300">SIB Executes ⚡</div>
                        </div>
                        <ArrowDown className="w-6 h-6 text-slate-600" />

                        {/* Step 3 */}
                        <div className="bg-slate-800 border-2 border-slate-600 rounded-2xl px-8 py-4 text-center w-full max-w-md">
                            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Step 3</div>
                            <div className="text-lg font-bold text-white">main() starts executing</div>
                        </div>
                        <ArrowDown className="w-6 h-6 text-slate-600" />

                        {/* Step 4 */}
                        <div className="bg-orange-500/20 border-2 border-orange-500/40 rounded-2xl px-8 py-4 text-center w-full max-w-md ring-2 ring-orange-500/10">
                            <div className="text-xs text-orange-400 uppercase tracking-widest mb-1">Step 4 — On new ClassName()</div>
                            <div className="text-lg font-bold text-orange-300">IIB Executes 🔄</div>
                        </div>
                    </div>
                </motion.section>

                {/* SIB Code Example */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700"
                >
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5" /> SIB Example
                    </h3>
                    <div className="bg-slate-950 p-5 rounded-xl font-mono text-sm text-slate-300 border border-slate-800 leading-loose">
                        <span className="text-pink-500">class</span> Demo {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-pink-500">static int</span> a;<br/><br/>
                        &nbsp;&nbsp;<span className="text-cyan-400 font-bold bg-cyan-500/20 px-1 rounded">static</span> {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;a = <span className="text-orange-400">10</span>; <span className="text-slate-500">// Runs BEFORE main</span><br/>
                        &nbsp;&nbsp;{'}'}<br/><br/>
                        &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(a); <span className="text-slate-500">// Output: 10</span><br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </motion.section>

                {/* IIB Code Example */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700"
                >
                    <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                        <RotateCcw className="w-5 h-5" /> IIB Example
                    </h3>
                    <div className="bg-slate-950 p-5 rounded-xl font-mono text-sm text-slate-300 border border-slate-800 leading-loose">
                        <span className="text-pink-500">class</span> Demo {'{'}<br/><br/>
                        &nbsp;&nbsp;<span className="text-orange-400 font-bold bg-orange-500/20 px-1 rounded">{'{'}</span><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span className="text-orange-300">{'"----IIB----"'}</span>);<br/>
                        &nbsp;&nbsp;<span className="text-orange-400 font-bold bg-orange-500/20 px-1 rounded">{'}'}</span> <span className="text-slate-500">// Runs on EVERY new Demo()</span><br/><br/>
                        &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">new</span> Demo(); <span className="text-slate-500">// Triggers IIB</span><br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}<br/>
                        <span className="text-slate-500">// Output: ----IIB----</span>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-cyan-500 text-cyan-950 rounded-2xl font-bold text-lg hover:bg-cyan-400 shadow-xl shadow-cyan-500/20 border-b-4 border-cyan-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
