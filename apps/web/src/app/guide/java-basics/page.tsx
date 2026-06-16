"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, ShieldCheck, Cpu, Globe, Infinity as InfinityIcon, Hexagon, Code, Blocks, Type, MessageSquare, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function JavaBasicsGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Java Basics</h1>
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
                        className="w-24 h-24 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center ring-4 ring-indigo-500"
                    >
                        <Blocks className="w-10 h-10 text-indigo-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">The Foundation</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Before we start writing code, let's look at what makes Java so special, the structural types you'll use, and the anatomy of a "Hello World" program.
                    </p>
                </motion.section>

                {/* 1. Features of Java */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Rocket className="w-4 h-4" /> 1. Features of Java
                        </div>
                        <h3 className="text-3xl font-bold">Why use Java?</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: ShieldCheck, title: "Secured", desc: "No explicit pointers." },
                            { icon: Hexagon, title: "Robust", desc: "Strong memory management." },
                            { icon: Globe, title: "Platform Indep.", desc: "Write once, run anywhere." },
                            { icon: Rocket, title: "High Perf.", desc: "Thanks to the JIT compiler." },
                            { icon: Code, title: "Compiled + Interp.", desc: "javac -> JVM" },
                            { icon: InfinityIcon, title: "Multi-threaded", desc: "Run concurrent tasks." },
                            { icon: Blocks, title: "Object Oriented", desc: "Everything is an object." },
                            { icon: MessageSquare, title: "Polyglot", desc: "JVM speaks many languages." },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center gap-3 shadow-lg hover:border-cyan-500 transition-colors"
                            >
                                <f.icon className="w-8 h-8 text-cyan-400" />
                                <h4 className="font-bold text-slate-200 leading-tight">{f.title}</h4>
                                <p className="text-xs text-slate-400">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 2. Four Types */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold tracking-widest uppercase">
                                <Type className="w-4 h-4" /> 2. Core Types
                            </div>
                            <h3 className="text-3xl font-bold">The 4 Structures</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                In Java, almost every file you create will be one of four specific types. The most common is the <strong className="text-purple-400">Class</strong>, which acts as a blueprint to create objects.
                            </p>
                        </div>
                        <div className="flex-1 w-full grid grid-cols-2 gap-4">
                            <div className="bg-purple-500/10 border-2 border-purple-500 text-purple-300 p-4 rounded-xl text-center font-bold">1. Class</div>
                            <div className="bg-slate-900 border border-slate-700 text-slate-400 p-4 rounded-xl text-center font-bold">2. Interface</div>
                            <div className="bg-slate-900 border border-slate-700 text-slate-400 p-4 rounded-xl text-center font-bold">3. Enum</div>
                            <div className="bg-slate-900 border border-slate-700 text-slate-400 p-4 rounded-xl text-center font-bold">4. Annotation</div>
                        </div>
                    </div>
                </motion.section>

                {/* 3. Hello Java Anatomy */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold">Anatomy of Hello Java</h3>
                        <p className="text-slate-400 mt-2">Every Java program starts exactly like this.</p>
                    </div>

                    <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl font-mono text-sm leading-loose overflow-x-auto relative">
                        {/* Class Declaration */}
                        <div>
                            <span className="text-slate-500 italic">// Class Declaration</span><br/>
                            <span className="text-pink-500">class</span> <span className="text-yellow-300">Sample</span> {'{'}
                        </div>
                        
                        {/* Method Declaration */}
                        <div className="ml-8 mt-4">
                            <span className="text-slate-500 italic">// Method Declaration (The entry point)</span><br/>
                            <span className="text-pink-500">public</span> <span className="text-pink-500">static</span> <span className="text-pink-500">void</span> <span className="text-blue-400">main</span>(String[] args) {'{'}
                        </div>

                        {/* Statement */}
                        <div className="ml-16 mt-4">
                            <span className="text-slate-500 italic">// Print statement</span><br/>
                            <span className="text-teal-300">System.out.println</span>(<span className="text-orange-300">"Hello java"</span>);
                        </div>

                        <div className="ml-8 mt-4">{'}'}</div>
                        <div className="mt-4">{'}'}</div>
                    </div>
                </motion.section>

                {/* 4. Compilation Commands */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-indigo-900/30 rounded-3xl p-8 border border-indigo-500/20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6">
                        <Terminal className="w-4 h-4" /> 4. Run It
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white">1. Compilation</h4>
                            <p className="text-slate-400 text-sm">Convert your .java file to bytecode (.class).</p>
                            <div className="bg-black p-4 rounded-xl border border-slate-800 font-mono text-emerald-400">
                                $ javac Sample.java
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white">2. Interpretation</h4>
                            <p className="text-slate-400 text-sm">Run the compiled bytecode using the JVM.</p>
                            <div className="bg-black p-4 rounded-xl border border-slate-800 font-mono text-emerald-400">
                                $ java Sample
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-indigo-500 text-white rounded-2xl font-bold text-lg hover:bg-indigo-400 shadow-xl shadow-indigo-500/20 border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1 transition-all">
                        Return to Map
                    </Link>
                </div>

            </main>
        </div>
    );
}
