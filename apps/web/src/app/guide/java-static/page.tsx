"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Database, Layers, Copy, Zap, Hash, FileCode, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaStaticGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Static vs Non-Static</h1>
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
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center ring-4 ring-blue-500"
                    >
                        <Layers className="w-10 h-10 text-blue-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Classifying Members</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        In Java, variables and methods can be classified as <strong className="text-blue-400">static</strong> or <strong className="text-indigo-400">non-static</strong>. 
                        However, Constructors are <strong className="text-red-400">ALWAYS</strong> non-static.
                    </p>
                </motion.section>

                {/* Side by Side Comparison */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Static Card */}
                    <div className="bg-slate-800 border-t-8 border-blue-500 p-8 rounded-3xl relative shadow-xl shadow-blue-900/20">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="w-8 h-8 text-blue-400" />
                            <h3 className="text-3xl font-bold text-white">STATIC</h3>
                        </div>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                                <div><strong className="text-white">Keyword:</strong> Declared with the `static` keyword.</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                                <div><strong className="text-white">Association:</strong> Always associated with the <strong className="text-blue-300 bg-blue-500/20 px-1 rounded">Class</strong> itself.</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                                <div><strong className="text-white">Copies:</strong> There is only exactly <strong className="text-blue-300 border-b border-blue-500">ONE COPY</strong>.</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                                <div><strong className="text-white">Memory:</strong> Stored in the <strong className="text-blue-300">Static Pool Area</strong>.</div>
                            </li>
                        </ul>
                    </div>

                    {/* Non-Static Card */}
                    <div className="bg-slate-800 border-t-8 border-indigo-500 p-8 rounded-3xl relative shadow-xl shadow-indigo-900/20">
                        <div className="flex items-center gap-3 mb-6">
                            <Copy className="w-8 h-8 text-indigo-400" />
                            <h3 className="text-3xl font-bold text-white">NON-STATIC</h3>
                        </div>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                                <div><strong className="text-white">Keyword:</strong> No keyword used (default state).</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                                <div><strong className="text-white">Association:</strong> Always associated with an <strong className="text-indigo-300 bg-indigo-500/20 px-1 rounded">Object</strong>.</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                                <div><strong className="text-white">Copies:</strong> There can be <strong className="text-indigo-300 border-b border-indigo-500">MULTIPLE COPIES</strong>.</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                                <div><strong className="text-white">Memory:</strong> Stored in <strong className="text-indigo-300">Heap Memory</strong>.</div>
                            </li>
                        </ul>
                    </div>
                </motion.section>

                {/* Multiple Classes Alert */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-brand-900/30 border border-brand-500/30 p-6 rounded-2xl flex gap-4 items-start"
                >
                    <div className="p-3 bg-brand-500/20 rounded-xl shrink-0"><FileCode className="w-6 h-6 text-brand-400" /></div>
                    <div>
                        <h4 className="text-lg font-bold text-brand-300 mb-2">Did you know? Multiple Classes in One File</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            We can develop multiple classes in a single `.java` file! <br/><br/>
                            <strong className="text-white">Rule 1:</strong> Whichever class has the `main` method dictates the filename.<br/>
                            <strong className="text-white">Rule 2:</strong> When compiled, each class gets its very own `.class` file!
                        </p>
                    </div>
                </motion.section>

                {/* Calling Static Members */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
                >
                    <div className="bg-slate-900 p-6 border-b border-slate-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Zap className="w-4 h-4" /> Syntax
                        </div>
                        <h3 className="text-2xl font-bold">Calling Static Members from Another Class</h3>
                        <p className="text-slate-400 mt-2">Use the class name itself! <code className="bg-black/30 px-2 py-1 rounded text-blue-300">Class_name.method_name()</code></p>
                    </div>

                    <div className="p-8">
                        <div className="bg-slate-950 p-6 rounded-2xl font-mono text-sm text-slate-300 border border-slate-800 overflow-x-auto relative">
                            
                            <span className="text-pink-500">class</span> Circle {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500 font-bold bg-blue-500/20 px-1 rounded">static</span> <span className="text-pink-500">void</span> area(<span className="text-pink-500">int</span> r) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">final double</span> pi = <span className="text-orange-400">3.142</span>;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(pi * r * r);<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}<br/><br/>

                            <span className="text-pink-500">class</span> Tester {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Calling area method of Circle class</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white font-bold bg-blue-500/20 px-1 rounded border-b border-blue-500">Circle</span>.<span className="text-teal-300">area</span>(<span className="text-orange-400">5</span>);<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                    </div>
                </motion.section>

                {/* Calling Non-Static Members */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
                >
                    <div className="bg-slate-900 p-6 border-b border-slate-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Copy className="w-4 h-4" /> Syntax
                        </div>
                        <h3 className="text-2xl font-bold">Calling Non-Static Members</h3>
                        <p className="text-slate-400 mt-2">You must create an Object first! <code className="bg-black/30 px-2 py-1 rounded text-indigo-300">new Class_name()</code></p>
                    </div>

                    <div className="p-8 text-center space-y-6">
                        
                        <div className="text-4xl font-mono font-bold bg-slate-950 inline-block px-8 py-6 rounded-2xl border border-slate-800 shadow-inner">
                            <span className="text-pink-500">new</span> <span className="text-indigo-400">Sample()</span>;
                        </div>

                        <div className="flex justify-center gap-8 text-sm">
                            <div className="text-right">
                                <div className="text-pink-500 font-bold mb-1 border-b border-slate-700 pb-1">new</div>
                                <div className="text-slate-400">Object Creation Operator</div>
                            </div>
                            <div className="text-left">
                                <div className="text-indigo-400 font-bold mb-1 border-b border-slate-700 pb-1">Sample()</div>
                                <div className="text-slate-400">Constructor</div>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm mt-4">
                            Once created, you can access non-static members using: <br/>
                            <code className="bg-black/30 px-2 py-1 rounded font-mono text-indigo-300 mt-2 inline-block">Object.method_name()</code>
                        </p>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg hover:bg-blue-400 shadow-xl shadow-blue-500/20 border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
