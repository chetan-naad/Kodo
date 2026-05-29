"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Monitor, Zap, Layers, Server, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function JavaArchitectureGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Java Architecture</h1>
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
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center ring-4 ring-emerald-500"
                    >
                        <Layers className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">How Java Works</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        To master Java, you must understand the architecture underneath. Meet the holy trinity of Java: <strong className="text-emerald-400">JDK, JRE, and JVM</strong>. Let's see how they fit together.
                    </p>
                </motion.section>

                {/* 1. The Big Picture Diagram */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold">The Russian Doll Architecture</h3>
                        <p className="text-slate-400 mt-2">Each layer wraps the inner layer with more tools.</p>
                    </div>

                    <div className="relative p-6 bg-slate-900 border-2 border-dashed border-teal-500/50 rounded-3xl flex flex-col items-center">
                        <div className="absolute top-4 left-6 font-bold tracking-widest text-teal-400 uppercase">JDK</div>
                        <div className="text-xs text-slate-500 mb-2 mt-4 text-center">Java Development Kit <br/>(Compiler, Debugger, Tools)</div>

                        <div className="relative p-6 w-[90%] bg-slate-800 border-2 border-emerald-500/50 rounded-2xl flex flex-col items-center mt-4">
                            <div className="absolute top-3 left-4 font-bold tracking-widest text-emerald-400 uppercase">JRE</div>
                            <div className="text-xs text-slate-400 mb-2 mt-4 text-center">Java Runtime Environment <br/>(Library Classes, Core Packages)</div>

                            <div className="relative p-6 w-[80%] bg-emerald-500 text-white rounded-xl flex flex-col items-center justify-center mt-4 shadow-lg shadow-emerald-500/20">
                                <Cpu className="w-10 h-10 mb-2" />
                                <div className="font-bold tracking-widest uppercase text-xl">JVM</div>
                                <div className="text-xs text-emerald-100 mt-1 text-center font-medium">Java Virtual Machine <br/>(JIT Compiler, Interpreter, Garbage Collector)</div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 2. Compilation vs Interpretation */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase">
                                <Zap className="w-4 h-4" /> 2. Bytecode & JIT
                            </div>
                            <h3 className="text-3xl font-bold">Compilation <span className="text-slate-500 font-medium">vs</span> Interpretation</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Java uses BOTH! The compiler (<code className="text-blue-400">javac</code>) turns your code into <strong className="text-white">Bytecode</strong> (.class). Then, the JVM interprets it. To speed things up, the <strong className="text-blue-400">JIT (Just-In-Time) Compiler</strong> compiles hot bytecode into native machine code on the fly!
                            </p>
                        </div>
                        <div className="flex-1 w-full flex justify-center items-center font-mono text-sm gap-2 flex-wrap">
                            <div className="bg-slate-900 border border-slate-600 p-4 rounded-xl text-center">
                                <span className="text-purple-400 font-bold">Code</span><br/>.java
                            </div>
                            <ArrowLeft className="w-6 h-6 text-slate-500 rotate-180" />
                            <div className="bg-blue-500/20 border border-blue-500 p-4 rounded-xl text-center text-blue-300">
                                <span className="font-bold">Bytecode</span><br/>.class
                            </div>
                            <ArrowLeft className="w-6 h-6 text-slate-500 rotate-180" />
                            <div className="bg-emerald-500/20 border border-emerald-500 p-4 rounded-xl text-center text-emerald-300">
                                <span className="font-bold">Machine</span><br/>Native
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 3. WORA */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm font-bold tracking-widest uppercase">
                                <Monitor className="w-4 h-4" /> 3. WORA
                            </div>
                            <h3 className="text-3xl font-bold">Write Once, Run Anywhere</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                This is Java's superpower. Because of <strong className="text-pink-400">Bytecode</strong>, you don't compile for Windows, Mac, or Linux specifically. You compile for the JVM. 
                                <br/><br/>
                                <strong className="text-white">Note:</strong> Java is platform-independent, but the JVM itself is platform-dependent!
                            </p>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 w-full text-center">
                            <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col items-center">
                                <Server className="w-8 h-8 text-slate-400 mb-2" />
                                <span className="font-bold text-slate-300">Linux JVM</span>
                            </div>
                            <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col items-center">
                                <Monitor className="w-8 h-8 text-slate-400 mb-2" />
                                <span className="font-bold text-slate-300">Windows JVM</span>
                            </div>
                            <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col items-center col-span-2">
                                <ShieldCheck className="w-8 h-8 text-pink-400 mb-2" />
                                <span className="font-bold text-pink-300">Same Bytecode (.class)</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 4. Garbage Collection */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center bg-brand-900/20 rounded-3xl p-8 border border-brand-500/20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold tracking-widest uppercase mb-4">
                        <Zap className="w-4 h-4" /> 4. Memory Management
                    </div>
                    <h3 className="text-3xl font-bold mb-4">The Garbage Collector</h3>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        In older languages (like C), you have to manually delete objects to free up memory. In Java, the <strong className="text-brand-400">Garbage Collector (GC)</strong> runs in the background and automatically destroys objects that are no longer in use. You can ask it to run (<code className="text-brand-300">System.gc()</code>), but you cannot force it!
                    </p>
                </motion.section>

                {/* Knowledge Check */}
                <div className="bg-slate-800 rounded-3xl p-8 border-t-4 border-emerald-500 mt-12 shadow-2xl">
                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-6 text-emerald-400">
                        <HelpCircle className="w-6 h-6" /> Quick Knowledge Check
                    </h3>
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex gap-4 items-start bg-slate-900 p-4 rounded-xl border border-slate-700">
                            <span className="font-black text-emerald-500">Q.</span>
                            <div>
                                <span className="font-bold text-white block mb-1">What is the difference between JDK and JRE?</span>
                                JDK contains tools for DEVELOPING code (like the compiler). JRE contains tools for RUNNING code (like library classes). JDK physically contains the JRE inside it.
                            </div>
                        </li>
                        <li className="flex gap-4 items-start bg-slate-900 p-4 rounded-xl border border-slate-700">
                            <span className="font-black text-emerald-500">Q.</span>
                            <div>
                                <span className="font-bold text-white block mb-1">Is Java purely compiled or purely interpreted?</span>
                                Both! It is compiled into bytecode, and then interpreted/JIT-compiled by the JVM at runtime.
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all">
                        Return to Map
                    </Link>
                </div>

            </main>
        </div>
    );
}
