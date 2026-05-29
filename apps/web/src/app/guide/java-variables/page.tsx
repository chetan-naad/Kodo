"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Database, Code, ShieldCheck, Box, RefreshCcw, Copy, Globe, Lock } from 'lucide-react';
import Link from 'next/link';

export default function JavaVariablesGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Java Variables</h1>
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
                        className="w-24 h-24 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center ring-4 ring-yellow-500"
                    >
                        <Database className="w-10 h-10 text-yellow-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Memory Buckets</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A variable is a <strong className="text-yellow-400">named memory location</strong> used to store data. Its value can change <strong className="text-yellow-400">N number of times</strong> during execution.
                    </p>
                </motion.section>

                {/* 1. Types of Variables */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Box className="w-4 h-4" /> 1. The Two Types
                        </div>
                        <h3 className="text-3xl font-bold">Primitive vs Non-Primitive</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Primitive */}
                        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck className="w-32 h-32" />
                            </div>
                            <h4 className="text-2xl font-bold text-orange-400 mb-2">1. Primitive Types</h4>
                            <p className="text-slate-400 mb-6">The basic building blocks of data. They hold their values directly.</p>
                            <div className="flex flex-wrap gap-2">
                                {['byte', 'short', 'int', 'long', 'float', 'double', 'char', 'boolean'].map(t => (
                                    <span key={t} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-orange-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Non-Primitive */}
                        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Box className="w-32 h-32" />
                            </div>
                            <h4 className="text-2xl font-bold text-blue-400 mb-2">2. Non-Primitive</h4>
                            <p className="text-slate-400 mb-6">Also known as Reference or Class types. They point to objects in memory.</p>
                            <div className="flex flex-wrap gap-2">
                                {['Arrays', 'Strings', 'Any Class Type'].map(t => (
                                    <span key={t} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-blue-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 2. Lifecycle */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <RefreshCcw className="w-4 h-4" /> 2. Variable Lifecycle
                        </div>
                        <h3 className="text-3xl font-bold">Declaring, Initializing & Utilizing</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 text-center">
                            <h4 className="font-bold text-lg mb-2 text-slate-300">1. Declaration</h4>
                            <p className="text-sm text-slate-400 mb-4">Create the bucket.</p>
                            <div className="bg-black/50 p-3 rounded-lg font-mono text-green-400 text-sm">
                                int a;
                            </div>
                        </div>
                        <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 text-center">
                            <h4 className="font-bold text-lg mb-2 text-slate-300">2. Initialization</h4>
                            <p className="text-sm text-slate-400 mb-4">Put a value in.</p>
                            <div className="bg-black/50 p-3 rounded-lg font-mono text-green-400 text-sm">
                                a = 10;
                            </div>
                        </div>
                        <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 text-center">
                            <h4 className="font-bold text-lg mb-2 text-slate-300">3. Utilization</h4>
                            <p className="text-sm text-slate-400 mb-4">Use the value.</p>
                            <div className="bg-black/50 p-3 rounded-lg font-mono text-green-400 text-sm">
                                System.out.println(a);
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
                        <h4 className="font-bold text-green-400 mb-2">⚡ Pro Tip: All in one line</h4>
                        <div className="font-mono text-lg bg-black/50 inline-block px-4 py-2 rounded-lg text-white">
                            <span className="text-green-400">int</span> a = <span className="text-orange-400">10</span>;
                        </div>
                    </div>
                </motion.section>

                {/* 3. Re-initialization and Copying */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-purple-500/20 rounded-xl"><RefreshCcw className="w-6 h-6 text-purple-400" /></div>
                            <h3 className="text-2xl font-bold">Re-initialization</h3>
                        </div>
                        <p className="text-slate-400 mb-6">You can change the value of a variable at any time without re-declaring its type.</p>
                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm leading-loose border border-slate-800">
                            <span className="text-pink-500">int</span> <span className="text-white">y</span> = <span className="text-orange-300">80</span>;<br/>
                            <span className="text-white">y</span> = <span className="text-orange-300">100</span>; <span className="text-slate-500">// Note: no 'int' here!</span><br/>
                            <span className="text-teal-300">System.out.println</span>(y); <span className="text-slate-500">// Outputs 100</span>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-cyan-500/20 rounded-xl"><Copy className="w-6 h-6 text-cyan-400" /></div>
                            <h3 className="text-2xl font-bold">Copying Values</h3>
                        </div>
                        <p className="text-slate-400 mb-6">You can copy the value from one variable directly into a brand new variable.</p>
                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm leading-loose border border-slate-800">
                            <span className="text-pink-500">int</span> <span className="text-white">a</span> = <span className="text-orange-300">20</span>;<br/>
                            <span className="text-pink-500">int</span> <span className="text-white">b</span> = a; <span className="text-slate-500">// b is now 20</span><br/>
                            <span className="text-teal-300">System.out.println</span>(b); <span className="text-slate-500">// Outputs 20</span>
                        </div>
                    </div>
                </motion.section>

                {/* 4. Local vs Global Scope */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-brand-900/20 rounded-3xl p-8 border border-brand-500/20"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Globe className="w-4 h-4" /> 4. Scope
                        </div>
                        <h3 className="text-3xl font-bold">Local vs Global Variables</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Local */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-slate-700 pb-2">
                                <Lock className="w-5 h-5 text-slate-400" /> 1. Local Variables
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Declared <strong className="text-white">within</strong> a method.</li>
                                <li>• Scope is limited to that method.</li>
                                <li>• Cannot be static or non-static.</li>
                                <li>• <strong className="text-red-400">No default values.</strong> Must be initialized before use!</li>
                            </ul>
                            <div className="bg-black/50 p-4 rounded-xl font-mono text-xs text-slate-300 border border-slate-800">
                                <span className="text-pink-500">class</span> Sample {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">int</span> x = <span className="text-orange-400">20</span>; <span className="text-slate-500">// Local!</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(x);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>

                        {/* Global */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-slate-700 pb-2">
                                <Globe className="w-5 h-5 text-brand-400" /> 2. Global Variables
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Declared <strong className="text-white">outside</strong> any method, inside the class.</li>
                                <li>• Scope spans the entire class.</li>
                                <li>• Can be static or non-static.</li>
                                <li>• <strong className="text-green-400">Has default values!</strong> (e.g. int defaults to 0).</li>
                            </ul>
                            <div className="bg-black/50 p-4 rounded-xl font-mono text-xs text-slate-300 border border-slate-800">
                                <span className="text-pink-500">class</span> Sample {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">static int</span> a = <span className="text-orange-400">20</span>; <span className="text-slate-500">// Global!</span><br/><br/>
                                &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(a);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-yellow-500 text-yellow-950 rounded-2xl font-bold text-lg hover:bg-yellow-400 shadow-xl shadow-yellow-500/20 border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 transition-all">
                        Return to Map
                    </Link>
                </div>

            </main>
        </div>
    );
}
