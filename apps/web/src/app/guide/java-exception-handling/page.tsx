"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, ShieldX, Hammer, Bug, Zap, Layers, ChevronRight, ActivitySquare } from 'lucide-react';
import Link from 'next/link';

export default function JavaExceptionHandlingGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Exception Handling</h1>
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
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center ring-4 ring-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]"
                    >
                        <AlertTriangle className="w-10 h-10 text-red-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Exception Handling</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        An event triggered during execution which interrupts and stops the program abruptly. Handled via <code className="bg-slate-800 px-2 text-rose-400">try</code>, <code className="bg-slate-800 px-2 text-emerald-400">catch</code>, and <code className="bg-slate-800 px-2 text-sky-400">finally</code>.
                    </p>
                </motion.section>

                {/* Throwable Hierarchy */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700 shadow-2xl relative overflow-hidden"
                >
                    <div className="text-center mb-10 relative z-10">
                        <h3 className="text-3xl font-bold text-white mb-2">The Throwable Hierarchy</h3>
                        <p className="text-slate-400">All exception classes belong to the <code className="text-orange-400">java.lang</code> package.</p>
                    </div>

                    <div className="flex flex-col items-center gap-8 relative z-10 font-mono text-sm">
                        
                        {/* Throwable Level */}
                        <div className="bg-slate-900 border border-slate-600 px-8 py-3 rounded-xl text-center shadow-lg w-48">
                            <div className="text-white font-bold uppercase mb-1">Throwable</div>
                            <div className="text-xs text-slate-500">java.lang.Throwable</div>
                        </div>

                        {/* Split */}
                        <div className="w-full max-w-lg flex justify-between relative">
                            {/* Lines */}
                            <svg className="absolute inset-0 w-full h-full -top-8 pointer-events-none" style={{ zIndex: -1 }}>
                                <path d="M 256,0 L 100,32" stroke="#475569" strokeWidth="2" fill="none" />
                                <path d="M 256,0 L 412,32" stroke="#475569" strokeWidth="2" fill="none" />
                            </svg>
                            
                            {/* Error Level */}
                            <div className="bg-red-900/40 border border-red-500/50 px-8 py-3 rounded-xl text-center shadow-lg w-48 mt-8">
                                <div className="text-red-300 font-bold uppercase mb-1">Error</div>
                                <div className="text-xs text-red-400/70">java.lang.Error</div>
                            </div>

                            {/* Exception Level */}
                            <div className="bg-orange-900/40 border border-orange-500/50 px-8 py-3 rounded-xl text-center shadow-lg w-48 mt-8">
                                <div className="text-orange-300 font-bold uppercase mb-1">Exception</div>
                                <div className="text-xs text-orange-400/70">java.lang.Exception</div>
                            </div>
                        </div>

                        {/* Third Level */}
                        <div className="w-full max-w-lg flex justify-between relative">
                            
                            <div className="w-48 pt-4">
                                <ul className="text-xs text-red-300/80 space-y-2 border-l border-red-500/30 pl-4 ml-4">
                                    <li>OutOfMemoryError</li>
                                    <li>StackOverflowError</li>
                                </ul>
                            </div>

                            <div className="w-48 flex flex-col items-center pt-8 relative">
                                <svg className="absolute inset-0 w-full h-full -top-8 pointer-events-none" style={{ zIndex: -1 }}>
                                    <path d="M 96,0 L 96,32" stroke="#475569" strokeWidth="2" fill="none" />
                                </svg>
                                
                                <div className="bg-yellow-900/40 border border-yellow-500/50 px-4 py-3 rounded-xl text-center shadow-lg w-full">
                                    <div className="text-yellow-300 font-bold uppercase mb-1 text-xs">RuntimeException</div>
                                    <div className="text-[10px] text-yellow-400/70">java.lang.RuntimeException</div>
                                </div>
                            </div>
                        </div>

                        {/* Leaves */}
                        <div className="w-full max-w-lg flex justify-between">
                            <div className="w-48 text-xs text-orange-300/80 space-y-2 pl-4 ml-auto">
                                <strong className="text-orange-400 block mb-2 border-b border-orange-500/30 pb-1">Checked</strong>
                                <ul>
                                    <li>IOException</li>
                                    <li>SQLException</li>
                                    <li>ClassNotFoundException</li>
                                </ul>
                            </div>

                            <div className="w-48 text-xs text-yellow-300/80 space-y-2 pl-4">
                                <strong className="text-yellow-400 block mb-2 border-b border-yellow-500/30 pb-1">Unchecked</strong>
                                <ul>
                                    <li>ArithmeticException</li>
                                    <li>NullPointerException</li>
                                    <li>ArrayIndexOutOfBounds</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </motion.section>

                {/* Core Rules & Anatomy */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <ActivitySquare className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold mb-2">Anatomy & Rules</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="bg-slate-950 p-6 rounded-2xl border-2 border-slate-700 font-mono text-sm">
                            <span className="text-slate-500 italic">// 1. The Risky Code</span><br/>
                            <span className="text-rose-400 font-bold">try</span> {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">int</span> i = <span className="text-orange-400">1</span> / <span className="text-orange-400">0</span>; <span className="text-slate-500 italic">// BOOM!</span><br/>
                            &nbsp;&nbsp;<span className="text-slate-500 italic">// Execution stops here. Jumps to catch.</span><br/>
                            {'}'}<br/><br/>

                            <span className="text-slate-500 italic">// NO STATEMENTS ALLOWED HERE!</span><br/><br/>

                            <span className="text-slate-500 italic">// 2. The Handler</span><br/>
                            <span className="text-emerald-400 font-bold">catch</span> (ArithmeticException e) {'{'}<br/>
                            &nbsp;&nbsp;s.o.p(<span className="text-yellow-300">"Handled!"</span>);<br/>
                            {'}'}<br/><br/>

                            <span className="text-slate-500 italic">// 3. The Mandatory Cleanup</span><br/>
                            <span className="text-sky-400 font-bold">finally</span> {'{'}<br/>
                            &nbsp;&nbsp;s.o.p(<span className="text-yellow-300">"Always runs!"</span>);<br/>
                            {'}'}
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-l-red-500">
                                <h4 className="font-bold text-white">Execution Stop</h4>
                                <p className="text-sm text-slate-400">Once an exception occurs in the try block, further statements are skipped.</p>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-l-orange-500">
                                <h4 className="font-bold text-white">No In-Between Code</h4>
                                <p className="text-sm text-slate-400">We cannot develop ANY statements between a try and a catch block. It causes a compile-time error.</p>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-l-yellow-500">
                                <h4 className="font-bold text-white">Multiple Catches</h4>
                                <p className="text-sm text-slate-400">A try block can have multiple catch blocks, but <strong>only one</strong> catch block will ever get executed.</p>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-l-emerald-500">
                                <h4 className="font-bold text-white">Finally Block</h4>
                                <p className="text-sm text-slate-400">Used to close connections (e.g. database). Executes mandatorily, whether the exception is caught or not!</p>
                            </div>
                        </div>

                    </div>
                </motion.section>

                {/* Throw vs Throws */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-indigo-900/20 border-2 border-indigo-500/30 rounded-3xl p-8"
                >
                    <div className="text-center mb-8">
                        <Hammer className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-white">Throw vs Throws</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">
                            <h4 className="text-2xl font-bold text-indigo-300 mb-2">throw</h4>
                            <p className="text-slate-400 text-sm mb-4">Used <strong>inside</strong> the method body to manually trigger an exception object.</p>
                            <div className="bg-slate-950 p-4 rounded font-mono text-sm text-indigo-200 border border-slate-800">
                                <span className="text-pink-500">if</span> (age &lt; <span className="text-orange-400">21</span>) {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500 font-bold">throw new</span> MatrimonyException(<span className="text-yellow-300">"Invalid age"</span>);<br/>
                                {'}'}
                            </div>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">
                            <h4 className="text-2xl font-bold text-indigo-300 mb-2">throws</h4>
                            <p className="text-slate-400 text-sm mb-4">Used in the method <strong>signature</strong> to warn callers that this method might throw a checked exception.</p>
                            <div className="bg-slate-950 p-4 rounded font-mono text-sm text-indigo-200 border border-slate-800">
                                <span className="text-pink-500">static void</span> submit() <span className="text-pink-500 font-bold">throws</span> MatrimonyException {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-slate-500">// method logic</span><br/>
                                {'}'}
                            </div>
                        </div>

                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-500 shadow-xl shadow-red-500/20 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
