"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shapes, Zap, Clock, Code2, Link as LinkIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaPolymorphismGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">Polymorphism</h1>
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
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-fuchsia-500/20 rounded-full flex items-center justify-center ring-4 ring-fuchsia-500"
                    >
                        <Shapes className="w-10 h-10 text-fuchsia-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Polymorphism</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        An object showing different behaviour at different stages of its lifecycle. <br/>
                        <span className="text-fuchsia-400 font-bold">Poly = Many, Morphism = Forms</span>
                    </p>
                </motion.section>

                {/* 1. Compile vs Runtime */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl">
                        <Code2 className="w-10 h-10 text-sky-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Compile Time Polymorphism</h3>
                        <p className="text-slate-400 text-sm mb-6">Binding at compile time by the compiler based on arguments.</p>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm">
                                <Zap className="w-4 h-4 text-sky-400" />
                                <span>Also known as <strong>Early Binding</strong></span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm">
                                <LinkIcon className="w-4 h-4 text-sky-400" />
                                <span>Cannot be rebinded = <strong>Static Binding</strong></span>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-sky-900/20 border border-sky-500/30 rounded-xl text-sky-300 font-bold text-center">
                            Example: Method Overloading
                        </div>
                    </div>

                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl">
                        <Clock className="w-10 h-10 text-fuchsia-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Run Time Polymorphism</h3>
                        <p className="text-slate-400 text-sm mb-6">Binding at run time by the JVM based on the actual object created.</p>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm">
                                <Zap className="w-4 h-4 text-fuchsia-400" />
                                <span>Also known as <strong>Late Binding</strong></span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm">
                                <LinkIcon className="w-4 h-4 text-fuchsia-400" />
                                <span>Dynamically bound = <strong>Dynamic Binding</strong></span>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-fuchsia-900/20 border border-fuchsia-500/30 rounded-xl text-fuchsia-300 font-bold text-center">
                            Example: Method Overriding
                        </div>
                    </div>
                </motion.section>

                {/* 2. The Stimulator Pattern (Animal Hierarchy) */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">Generalization & Loose Coupling</h3>
                        <p className="text-slate-400">Why we use Run Time Polymorphism (The Stimulator Pattern)</p>
                    </div>

                    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
                        {/* Visual Hierarchy Diagram matching user's image */}
                        <div className="flex justify-center items-center py-8 relative">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                                <defs>
                                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                                        <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                                    </marker>
                                </defs>
                                {/* Cat to Animal */}
                                <line x1="200" y1="180" x2="350" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                {/* Dog to Animal */}
                                <line x1="400" y1="180" x2="400" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                {/* Snake to Animal */}
                                <line x1="600" y1="180" x2="450" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            </svg>

                            <div className="w-full max-w-[800px] relative z-10 flex flex-col items-center gap-12">
                                
                                {/* Parent */}
                                <div className="bg-fuchsia-900/40 border border-fuchsia-500/50 px-6 py-2 rounded-lg text-center w-40 shadow-lg">
                                    <div className="font-bold text-fuchsia-300 text-xs uppercase mb-1">Animal ©</div>
                                    <div className="text-xs text-slate-300 border-t border-fuchsia-500/30 pt-1">void noise()</div>
                                </div>

                                {/* Children */}
                                <div className="flex justify-between w-full gap-4">
                                    <div className="bg-slate-900 border border-slate-600 px-6 py-2 rounded-lg text-center w-36 shadow-lg">
                                        <div className="font-bold text-white text-xs uppercase mb-1">Cat ©</div>
                                        <div className="text-xs text-slate-400 border-t border-slate-700 pt-1">void noise()</div>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-600 px-6 py-2 rounded-lg text-center w-36 shadow-lg">
                                        <div className="font-bold text-white text-xs uppercase mb-1">Dog ©</div>
                                        <div className="text-xs text-slate-400 border-t border-slate-700 pt-1">void noise()</div>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-600 px-6 py-2 rounded-lg text-center w-36 shadow-lg">
                                        <div className="font-bold text-white text-xs uppercase mb-1">Snake ©</div>
                                        <div className="text-xs text-slate-400 border-t border-slate-700 pt-1">void noise()</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stimulator Box & Main Class */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-slate-950 p-6 rounded-xl border border-slate-700 text-center flex flex-col justify-center items-center">
                                <div className="font-bold text-slate-300 uppercase mb-2">Main Class ©</div>
                                <div className="text-sm text-slate-400 space-y-1">
                                    <div>Cat c1</div>
                                    <div>Dog d1</div>
                                    <div>Snake s1</div>
                                </div>
                            </div>
                            
                            <div className="bg-teal-900/20 p-6 rounded-xl border border-teal-500/30 text-center flex flex-col justify-center items-center">
                                <div className="font-bold text-teal-300 uppercase mb-2">Stimulator ©</div>
                                <div className="text-sm text-teal-100 bg-teal-900/50 p-2 rounded w-full">
                                    void anisum (Animal a1)
                                </div>
                                <p className="text-xs text-slate-400 mt-4">
                                    Pass any child of Animal into `anisum()`, and JVM runs the correct `noise()` dynamically!
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-fuchsia-500 text-white rounded-2xl font-bold text-lg hover:bg-fuchsia-400 shadow-xl shadow-fuchsia-500/20 border-b-4 border-fuchsia-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
