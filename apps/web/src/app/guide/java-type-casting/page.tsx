"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowDownUp, Minimize2, Maximize2, Layers, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaTypeCastingGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Type Casting</h1>
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
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-sky-500/20 rounded-full flex items-center justify-center ring-4 ring-sky-500"
                    >
                        <ArrowDownUp className="w-10 h-10 text-sky-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Type Casting</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Converting from one data type to another data type.
                    </p>
                </motion.section>

                {/* 1. Primitive Type Casting */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">1. Primitive Type Casting</h3>
                        <p className="text-slate-400">Converting from one primitive data type to another.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Widening */}
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-sky-500 transition-colors">
                            <Maximize2 className="w-10 h-10 text-sky-400 mb-4" />
                            <h4 className="text-2xl font-bold text-white mb-2">Widening</h4>
                            <p className="text-slate-400 text-sm mb-6">Converting from smaller primitive data type to any of its bigger primitive data type.</p>
                            
                            <div className="flex gap-2 mb-4">
                                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold">Implicit</span>
                                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold">Explicit</span>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300">
                                <span className="text-slate-500">// Implicit</span><br/>
                                <span className="text-pink-500">double</span> x = <span className="text-orange-400">20</span>;<br/>
                                <span className="text-slate-500">// o/p - 20.0d</span><br/><br/>
                                
                                <span className="text-slate-500">// Explicit</span><br/>
                                <span className="text-pink-500">double</span> x = (<span className="text-pink-500">double</span>) <span className="text-orange-400">20</span>;
                            </div>
                        </div>

                        {/* Narrowing */}
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-pink-500 transition-colors">
                            <Minimize2 className="w-10 h-10 text-pink-400 mb-4" />
                            <h4 className="text-2xl font-bold text-white mb-2">Narrowing</h4>
                            <p className="text-slate-400 text-sm mb-6">Converting from bigger primitive data type to any of its smaller primitive data type.</p>
                            
                            <div className="flex gap-2 mb-4">
                                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Explicit Only</span>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300">
                                <span className="text-slate-500">// Explicit</span><br/>
                                <span className="text-pink-500">int</span> x = (<span className="text-pink-500">int</span>) <span className="text-orange-400">59.9d</span>;<br/>
                                <span className="text-slate-500">// o/p - 59</span><br/><br/>
                                
                                <span className="text-pink-500">byte</span> z = (<span className="text-pink-500">byte</span>) <span className="text-orange-400">99.9f</span>;<br/>
                                <span className="text-slate-500">// o/p - 99</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 2. Class Type Casting */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <Layers className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold mb-2">2. Class / Derived Type Casting</h3>
                        <p className="text-slate-400">Converting from one class object to another class type.</p>
                    </div>

                    <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-3xl text-center">
                        <h4 className="text-xl font-bold text-indigo-300 mb-8">Upcasting & Downcasting Flow</h4>
                        
                        {/* Visual Diagram based on User Upload */}
                        <div className="flex justify-center items-stretch gap-8 relative max-w-2xl mx-auto py-8">
                            
                            {/* Left Upcasting Arrow */}
                            <div className="flex flex-col justify-center items-center text-emerald-400 font-bold">
                                <span className="mb-2">Super class type</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-32 border-l-2 border-t-2 border-b-2 border-emerald-500/50 w-4 rounded-l"></div>
                                    <span className="bg-emerald-500/20 px-3 py-1 rounded-full text-sm">(up casting)</span>
                                </div>
                                <span className="mt-2 text-sm text-emerald-300/70">Sub class object</span>
                            </div>

                            {/* Center Classes */}
                            <div className="flex flex-col items-center gap-12">
                                <div className="bg-slate-800 border-2 border-slate-600 px-8 py-3 rounded-xl text-center w-40 relative z-10 shadow-lg">
                                    <div className="font-bold text-white mb-2">DEMO ©</div>
                                    <div className="text-sm text-slate-400 border-t border-slate-700 pt-2">int a</div>
                                </div>
                                
                                {/* Center Up Arrow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <svg width="2" height="60" viewBox="0 0 2 60">
                                        <line x1="1" y1="60" x2="1" y2="0" stroke="#94a3b8" strokeWidth="2" />
                                        <polygon points="1,0 4,6 -2,6" fill="#94a3b8" />
                                    </svg>
                                </div>

                                <div className="bg-slate-800 border-2 border-slate-600 px-8 py-3 rounded-xl text-center w-40 relative z-10 shadow-lg">
                                    <div className="font-bold text-white mb-2">Sample ©</div>
                                    <div className="text-sm text-slate-400 border-t border-slate-700 pt-2">void disp()</div>
                                </div>
                            </div>

                            {/* Right Downcasting Arrow */}
                            <div className="flex flex-col justify-center items-center text-pink-400 font-bold">
                                <span className="mb-2 text-sm text-pink-300/70">Super class object</span>
                                <div className="flex items-center gap-2">
                                    <span className="bg-pink-500/20 px-3 py-1 rounded-full text-sm">(Down casting)</span>
                                    <div className="h-32 border-r-2 border-t-2 border-b-2 border-pink-500/50 w-4 rounded-r"></div>
                                </div>
                                <span className="mt-2">Sub class type</span>
                            </div>

                        </div>

                        {/* Rules of Class Casting */}
                        <div className="mt-8 text-left bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/20 text-slate-300 space-y-4">
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong className="text-emerald-400">Upcasting:</strong> Subclass object to superclass type (Implicit or Explicit).</li>
                                <li><strong className="text-pink-400">Downcasting:</strong> Superclass object to subclass type (<strong className="text-white">Explicit Only</strong>).</li>
                                <li>Without performing up casting, we cannot perform down casting (Direct down casting is not possible).</li>
                                <li>There must be an IS-A relationship to cast.</li>
                                <li><span className="text-sky-400">Note:</span> In method overriding, even though it is upcasted we will still get the overridden implementation!</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Code Example */}
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl">
                        <h4 className="text-2xl font-bold text-white mb-4">Code Example</h4>
                        <div className="bg-slate-950 p-6 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                            <span className="text-pink-500">class</span> Mainclass {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">// Upcasting (Implicit)</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Demo D1 = <span className="text-pink-500">new</span> Sample();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(D1.a);<br/><br/>
                            
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">// Downcasting (Explicit)</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Sample S1 = (Sample) D1;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(S1.a);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;S1.disp();<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-bold text-lg hover:bg-sky-400 shadow-xl shadow-sky-500/20 border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
