"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle, Settings, Box, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaMethodsGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">Class Members & Methods</h1>
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
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center ring-4 ring-red-500"
                    >
                        <Settings className="w-10 h-10 text-red-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">The 3 Class Members</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A Java Class is essentially made up of exactly three things.
                    </p>
                </motion.section>

                {/* 1. Class Members Breakdown */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl text-center hover:border-yellow-500 transition-colors">
                        <Box className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-2">1. Variables</h4>
                        <p className="text-slate-400">Used to <strong className="text-yellow-400">store</strong> data or values.</p>
                    </div>
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl text-center hover:border-red-500 transition-colors">
                        <Activity className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-2">2. Methods</h4>
                        <p className="text-slate-400">Used to <strong className="text-red-400">perform</strong> operations.</p>
                    </div>
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl text-center hover:border-blue-500 transition-colors">
                        <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-2">3. Constructors</h4>
                        <p className="text-slate-400">Used to <strong className="text-blue-400">initialize</strong> variables.</p>
                    </div>
                </motion.section>

                {/* 2. Method Syntax */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Activity className="w-4 h-4" /> Anatomy
                        </div>
                        <h3 className="text-3xl font-bold">Method Signature Syntax</h3>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-2xl font-mono text-lg overflow-x-auto border border-slate-800 whitespace-nowrap text-center mb-8">
                        <span className="text-pink-500 font-bold" title="Access Specifier">public</span>{' '}
                        <span className="text-purple-400 font-bold" title="Modifier">static</span>{' '}
                        <span className="text-orange-400 font-bold" title="Return Type">void</span>{' '}
                        <span className="text-blue-400 font-bold" title="Identifier/Name">main</span>
                        <span className="text-slate-300 font-bold" title="Arguments">(String[] args)</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-center">
                        <div>
                            <div className="font-bold text-pink-500 mb-2 border-b border-slate-700 pb-2">Access Specifier</div>
                            <div className="text-slate-400">public<br/>private<br/>protected<br/>default</div>
                        </div>
                        <div>
                            <div className="font-bold text-purple-400 mb-2 border-b border-slate-700 pb-2">Modifier [Optional]</div>
                            <div className="text-slate-400">static<br/>non-static</div>
                        </div>
                        <div>
                            <div className="font-bold text-orange-400 mb-2 border-b border-slate-700 pb-2">Return Type</div>
                            <div className="text-slate-400">void<br/>int, double<br/>String, boolean</div>
                        </div>
                        <div>
                            <div className="font-bold text-blue-400 mb-2 border-b border-slate-700 pb-2">Name</div>
                            <div className="text-slate-400">identifier<br/>(e.g., area)</div>
                        </div>
                        <div>
                            <div className="font-bold text-slate-300 mb-2 border-b border-slate-700 pb-2">Arguments</div>
                            <div className="text-slate-400">( )<br/>(int a)<br/>(int a, double b)</div>
                        </div>
                    </div>
                </motion.section>

                {/* 3. The "final" keyword and Division Rules */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div className="bg-yellow-500/10 rounded-3xl p-8 border border-yellow-500/30">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">The `final` Keyword</h3>
                        <p className="text-slate-300 mb-4">
                            Any variable declared with the keyword <code className="text-yellow-400 bg-black/30 px-2 py-1 rounded">final</code> is immutable. It cannot be changed after it is initialized.
                        </p>
                        <div className="bg-black/50 p-4 rounded-xl font-mono text-sm border border-slate-800">
                            <span className="text-yellow-400 font-bold">final</span> <span className="text-pink-500">double</span> pi = <span className="text-orange-400">3.142</span>;<br/>
                            <span className="text-slate-500">// pi = 3.14; ❌ ERROR!</span>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 rounded-3xl p-8 border border-blue-500/30">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">Division Rules</h3>
                        <p className="text-slate-300 mb-4">
                            If you divide two integers, Java truncates the decimal and returns an integer!
                        </p>
                        <div className="bg-black/50 p-4 rounded-xl font-mono text-sm border border-slate-800 space-y-2">
                            <div>System.out.println(<span className="text-orange-400">1/2</span>); <br/><span className="text-slate-500">→ outputs 0</span></div>
                            <div className="pt-2 border-t border-slate-800">System.out.println(<span className="text-orange-400">1/2.0</span>); <br/><span className="text-slate-500">→ outputs 0.5 (because one is a decimal)</span></div>
                        </div>
                    </div>
                </motion.section>

                {/* 4. Three Types of Methods (Visual Compare) */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold">Three Ways to Write a Method</h3>
                        <p className="text-slate-400 mt-2">Compare how inputs and outputs change the structure.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Type 1: Basic */}
                        <div className="bg-slate-800 border-l-8 border-slate-500 p-6 rounded-2xl">
                            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-slate-400" /> 1. Basic Method (No args, void)
                            </h4>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300">
                                <span className="text-pink-500">static void</span> area() {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">int</span> r = <span className="text-orange-400">4</span>;<br/>
                                &nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-orange-400">3.142</span> * r * r);<br/>
                                {'}'}
                            </div>
                        </div>

                        {/* Type 2: Parameterized */}
                        <div className="bg-slate-800 border-l-8 border-cyan-500 p-6 rounded-2xl relative">
                            <div className="absolute right-6 top-6 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Input</div>
                            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-cyan-400" /> 2. Method with Parameter
                            </h4>
                            <p className="text-slate-400 text-sm mb-4">When we want to give input to the method.</p>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300">
                                <span className="text-pink-500">static void</span> area(<span className="text-cyan-400 font-bold bg-cyan-500/20 px-1 rounded">int r</span>) {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-orange-400">3.142</span> * r * r);<br/>
                                {'}'}<br/>
                                <span className="text-slate-500">// Calling it: area(6);</span>
                            </div>
                        </div>

                        {/* Type 3: Return */}
                        <div className="bg-slate-800 border-l-8 border-emerald-500 p-6 rounded-2xl relative">
                            <div className="absolute right-6 top-6 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Output</div>
                            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-emerald-400" /> 3. Method with Return Type
                            </h4>
                            <p className="text-slate-400 text-sm mb-4">When we want the result back for further operations.</p>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300">
                                <span className="text-pink-500 font-bold">static double</span> area() {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">int</span> r = <span className="text-orange-400">5</span>;<br/>
                                &nbsp;&nbsp;<span className="text-pink-500 font-bold bg-emerald-500/20 px-1 rounded">return</span> (<span className="text-orange-400">3.142</span> * r * r);<br/>
                                {'}'}<br/>
                                <span className="text-slate-500">// Calling it: double x = area();</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-red-500 text-white rounded-2xl font-bold text-lg hover:bg-red-400 shadow-xl shadow-red-500/20 border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
