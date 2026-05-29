"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, EyeOff, Lightbulb, BoxSelect, GripHorizontal, Code, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaAbstractionGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Abstraction</h1>
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
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-violet-500/20 rounded-full flex items-center justify-center ring-4 ring-violet-500"
                    >
                        <EyeOff className="w-10 h-10 text-violet-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Abstraction</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Hiding the complexity of the system and exposing only the required functionality to the end user.
                    </p>
                </motion.section>

                {/* How to Achieve Abstraction */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <Lightbulb className="w-96 h-96" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-8 relative z-10">How do we achieve it?</h3>

                    <div className="space-y-6 relative z-10">
                        <div className="flex items-start gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-600">
                            <div className="bg-violet-500/20 p-3 rounded-full text-violet-400 shrink-0">
                                <span className="font-bold">1</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-violet-300 mb-2">Declare the Contract</h4>
                                <p className="text-slate-300">Declare all the essential properties (methods) in an <strong>Interface</strong>. This tells the user <em>what</em> it can do, without showing <em>how</em> it does it.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-600">
                            <div className="bg-violet-500/20 p-3 rounded-full text-violet-400 shrink-0">
                                <span className="font-bold">2</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-violet-300 mb-2">Provide the Implementation</h4>
                                <p className="text-slate-300">Provide the actual logic (the complexity) hidden away inside the <strong>Implementation Subclass</strong>.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-600">
                            <div className="bg-violet-500/20 p-3 rounded-full text-violet-400 shrink-0">
                                <span className="font-bold">3</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-violet-300 mb-2">Reference the Interface</h4>
                                <p className="text-slate-300">Create a reference variable of the <strong>Interface type</strong>, and initialize it with the <strong>Subclass Object</strong>. The user only ever sees the Interface.</p>
                                <div className="mt-4 bg-slate-950 p-3 rounded font-mono text-sm text-emerald-400 border border-slate-800">
                                    <span className="text-slate-400">// Interface Reference = Subclass Object</span><br/>
                                    Animal a1 = <span className="text-pink-500">new</span> Cat();
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* When to use Which */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">Which tool for the job?</h3>
                        <p className="text-slate-400">Deciding between Interfaces and Abstract Classes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-emerald-500 transition-colors">
                            <GripHorizontal className="w-12 h-12 text-emerald-400 mb-6" />
                            <h4 className="text-2xl font-bold text-white mb-2">Interface</h4>
                            <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 inline-block rounded font-bold text-sm mb-6">
                                100% Abstraction
                            </div>
                            <p className="text-slate-300">
                                <strong>When to use:</strong> When we <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-4">do not know the 100% implementation</span>. We only know the requirements (the contract).
                            </p>
                        </div>

                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-amber-500 transition-colors">
                            <BoxSelect className="w-12 h-12 text-amber-400 mb-6" />
                            <h4 className="text-2xl font-bold text-white mb-2">Abstract Class</h4>
                            <div className="bg-amber-500/20 text-amber-300 px-3 py-1 inline-block rounded font-bold text-sm mb-6">
                                Up to 100% Abstraction
                            </div>
                            <p className="text-slate-300">
                                <strong>When to use:</strong> When we <span className="text-amber-400 underline decoration-amber-500/30 underline-offset-4">know partial implementation</span> (default behaviors) but still have some unknown logic to leave abstract.
                            </p>
                        </div>

                    </div>
                </motion.section>

                {/* The Animal Interface Example */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-indigo-900/20 border-2 border-indigo-500/30 rounded-3xl p-8"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-white">Abstraction in Action</h3>
                        <p className="text-indigo-300 mt-2">Notice how Animal is now an <strong>(I)nterface</strong>, not a Class!</p>
                    </div>

                    {/* Visual Hierarchy Diagram matching user's image */}
                    <div className="flex justify-center items-center py-8 relative">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                            <defs>
                                <marker id="arrowhead-indigo" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                                    <polygon points="0 0, 6 3, 0 6" fill="#818cf8" />
                                </marker>
                            </defs>
                            {/* Cat to Animal */}
                            <line x1="200" y1="180" x2="350" y2="80" stroke="#818cf8" strokeDasharray="4" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                            {/* Dog to Animal */}
                            <line x1="400" y1="180" x2="400" y2="90" stroke="#818cf8" strokeDasharray="4" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                            {/* Snake to Animal */}
                            <line x1="600" y1="180" x2="450" y2="80" stroke="#818cf8" strokeDasharray="4" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                        </svg>

                        <div className="w-full max-w-[800px] relative z-10 flex flex-col items-center gap-12">
                            
                            {/* Parent (Interface) */}
                            <div className="bg-emerald-900/40 border border-emerald-500/50 px-6 py-2 rounded-lg text-center w-40 shadow-lg ring-2 ring-emerald-500/20">
                                <div className="font-bold text-emerald-300 text-xs uppercase mb-1">Animal (I)</div>
                                <div className="text-xs text-slate-300 border-t border-emerald-500/30 pt-1">void noise()</div>
                            </div>

                            {/* Children (Classes implementing Interface) */}
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
                            <p className="text-xs text-slate-400 mt-4 text-left">
                                The Stimulator is completely abstracted from the logic. It only interacts with the Interface (the contract), hiding all subclass complexity!
                            </p>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-500 shadow-xl shadow-violet-500/20 border-b-4 border-violet-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
