"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BoxSelect, SquareStack, FileWarning, ShieldAlert, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaAbstractClassGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Abstract Class</h1>
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
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center ring-4 ring-amber-500"
                    >
                        <BoxSelect className="w-10 h-10 text-amber-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Abstract Class & Methods</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Classes and methods that exist to be inherited and implemented, not instantiated directly.
                    </p>
                </motion.section>

                {/* Concrete vs Abstract Definitions */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 text-slate-700 opacity-20">
                            <SquareStack className="w-32 h-32" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Concrete</h3>
                        <p className="text-slate-400 text-sm mb-6 relative z-10">Fully defined elements ready for use.</p>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-emerald-500">
                                <h4 className="font-bold text-emerald-400 mb-1">Concrete Method</h4>
                                <p className="text-sm text-slate-400 mb-2">Has both declaration and definition.</p>
                                <code className="text-xs text-pink-400">void disp() {'{ ... }'}</code>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-emerald-500">
                                <h4 className="font-bold text-emerald-400 mb-1">Concrete Class</h4>
                                <p className="text-sm text-slate-400 mb-2">Contains only concrete methods.</p>
                                <code className="text-xs text-pink-400">class Sample {'{ ... }'}</code>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-900/10 border border-amber-500/30 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 text-amber-900 opacity-20">
                            <BoxSelect className="w-32 h-32" />
                        </div>
                        <h3 className="text-2xl font-bold text-amber-400 mb-2 relative z-10">Abstract</h3>
                        <p className="text-slate-400 text-sm mb-6 relative z-10">Declared templates lacking full implementation.</p>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-amber-500">
                                <h4 className="font-bold text-amber-400 mb-1">Abstract Method</h4>
                                <p className="text-sm text-slate-400 mb-2">Declared with <code className="bg-slate-800 px-1">abstract</code> keyword, no body.</p>
                                <code className="text-xs text-pink-400">abstract void disp();</code>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-amber-500">
                                <h4 className="font-bold text-amber-400 mb-1">Abstract Class</h4>
                                <p className="text-sm text-slate-400 mb-2">Declared with <code className="bg-slate-800 px-1">abstract</code> keyword.</p>
                                <code className="text-xs text-pink-400">abstract class Demo {'{ ... }'}</code>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Important Rules of Abstraction */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <ShieldAlert className="w-10 h-10 text-orange-400" />
                        <h3 className="text-3xl font-bold">Strict Rules of Abstraction</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            
                            <div className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">Class Requirements</h4>
                                    <p className="text-sm text-slate-400">If a class has an abstract method, the class <strong>MUST</strong> be declared abstract. (Vice versa is not true).</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">Mixed Methods</h4>
                                    <p className="text-sm text-slate-400">An abstract class can contain <strong>both</strong> concrete and abstract methods.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">Partial Implementation</h4>
                                    <p className="text-sm text-slate-400">If a subclass does not override <em>all</em> abstract methods from its parent, it too must be declared <strong>abstract</strong>.</p>
                                </div>
                            </div>
                            
                        </div>

                        <div className="space-y-4">
                            
                            <div className="flex items-start gap-3 bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-red-300">No Instantiation</h4>
                                    <p className="text-sm text-slate-400">We <strong>cannot create objects</strong> for abstract classes and interfaces.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-red-300">Forbidden Modifiers</h4>
                                    <p className="text-sm text-slate-400">An abstract method cannot be declared as <strong>static, final, or private</strong> because it must be overridden.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.section>

                {/* Example of Partial Implementation */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-3xl"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <FileWarning className="w-8 h-8 text-indigo-400" />
                        <h4 className="text-2xl font-bold text-indigo-300">Partial Implementation Example</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
                        
                        <div className="bg-slate-950 p-5 rounded-xl border border-indigo-500/30">
                            <span className="text-amber-400 font-bold">abstract class</span> Demo {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-amber-400">abstract void</span> test();<br/>
                            &nbsp;&nbsp;<span className="text-amber-400">abstract void</span> cool();<br/>
                            {'}'}<br/><br/>
                            <span className="text-slate-500 font-sans text-xs italic">// Root abstract class defines 2 methods to be built.</span>
                        </div>

                        <div className="bg-slate-950 p-5 rounded-xl border border-indigo-500/30">
                            <span className="text-amber-400 font-bold">abstract class</span> Tester <span className="text-pink-500 font-bold">extends</span> Demo {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">void</span> test() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;s.o.p(<span className="text-yellow-300">"hi"</span>);<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}<br/><br/>
                            <span className="text-slate-500 font-sans text-xs italic">// Tester only implemented test(). It must be abstract since cool() is missing.</span>
                        </div>

                        <div className="bg-slate-950 p-5 rounded-xl border-2 border-emerald-500/50">
                            <span className="text-pink-500 font-bold">class</span> Sample <span className="text-pink-500 font-bold">extends</span> Tester {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">void</span> cool() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;s.o.p(<span className="text-yellow-300">"hello"</span>);<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}<br/><br/>
                            <span className="text-slate-500 font-sans text-xs italic">// Sample implements the final piece. It is a fully concrete class!</span>
                        </div>

                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-amber-500 text-white rounded-2xl font-bold text-lg hover:bg-amber-400 shadow-xl shadow-amber-500/20 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
