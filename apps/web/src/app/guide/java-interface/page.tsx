"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Fingerprint, GripHorizontal, FileLock2, Wrench, ShieldCheck, AlignHorizontalSpaceBetween, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaInterfaceGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Interfaces</h1>
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
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center ring-4 ring-emerald-500"
                    >
                        <GripHorizontal className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Java Interfaces</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A Java type which is a <strong>pure abstract body</strong>, used to achieve 100% abstraction and multiple inheritance.
                    </p>
                </motion.section>

                {/* Properties of an Interface */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <Fingerprint className="w-96 h-96" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
                        <FileLock2 className="text-emerald-400" /> Default Properties
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {/* Variables */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-600 border-l-4 border-l-emerald-500">
                            <h4 className="font-bold text-xl text-emerald-300 mb-2">Variables</h4>
                            <p className="text-slate-400 text-sm mb-4">All variables in an interface are strictly constants.</p>
                            <div className="bg-slate-950 px-4 py-2 rounded-lg font-mono text-xs border border-emerald-500/30 text-emerald-200">
                                <span className="opacity-50 line-through">int a = 10;</span><br/>
                                <span className="text-emerald-400">public static final</span> int a = 10;
                            </div>
                        </div>

                        {/* Methods */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-600 border-l-4 border-l-teal-500">
                            <h4 className="font-bold text-xl text-teal-300 mb-2">Methods</h4>
                            <p className="text-slate-400 text-sm mb-4">All methods lack a body and must be implemented.</p>
                            <div className="bg-slate-950 px-4 py-2 rounded-lg font-mono text-xs border border-teal-500/30 text-teal-200">
                                <span className="opacity-50 line-through">void disp();</span><br/>
                                <span className="text-teal-400">public abstract</span> void disp();
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                        <div className="flex items-center gap-2 bg-red-900/20 text-red-400 px-4 py-3 rounded-lg border border-red-500/30 text-sm font-bold">
                            <ShieldCheck className="w-5 h-5 shrink-0" /> No Constructors
                        </div>
                        <div className="flex items-center gap-2 bg-red-900/20 text-red-400 px-4 py-3 rounded-lg border border-red-500/30 text-sm font-bold">
                            <ShieldCheck className="w-5 h-5 shrink-0" /> Cannot be Instantiated
                        </div>
                        <div className="flex items-center gap-2 bg-sky-900/20 text-sky-400 px-4 py-3 rounded-lg border border-sky-500/30 text-sm font-bold">
                            <ShieldCheck className="w-5 h-5 shrink-0" /> Does NOT extend Object
                        </div>
                    </div>
                </motion.section>

                {/* Keywords: implements vs extends */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">The Hierarchy Keywords</h3>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        
                        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col items-center w-full max-w-sm">
                            <div className="bg-slate-900 px-6 py-2 rounded-lg text-emerald-400 font-bold mb-4 shadow-lg border border-emerald-500/30">Interface</div>
                            <div className="h-8 border-l-2 border-dashed border-emerald-500/50"></div>
                            <div className="bg-emerald-500 text-slate-900 font-black text-xs uppercase px-3 py-1 -my-3 z-10 rounded-full shadow-lg">implements</div>
                            <div className="h-8 border-l-2 border-dashed border-emerald-500/50"></div>
                            <div className="bg-slate-900 px-6 py-2 rounded-lg text-white font-bold mt-4 shadow-lg border border-slate-700">Class</div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col items-center w-full max-w-sm">
                            <div className="bg-slate-900 px-6 py-2 rounded-lg text-teal-400 font-bold mb-4 shadow-lg border border-teal-500/30">Interface</div>
                            <div className="h-8 border-l-2 border-dashed border-teal-500/50"></div>
                            <div className="bg-teal-500 text-slate-900 font-black text-xs uppercase px-3 py-1 -my-3 z-10 rounded-full shadow-lg">extends</div>
                            <div className="h-8 border-l-2 border-dashed border-teal-500/50"></div>
                            <div className="bg-slate-900 px-6 py-2 rounded-lg text-teal-400 font-bold mt-4 shadow-lg border border-teal-500/30">Interface</div>
                        </div>

                    </div>
                </motion.section>

                {/* Real-World: Abstract Class vs Interface */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-indigo-900/20 border-2 border-indigo-500/30 p-8 rounded-3xl"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Wrench className="w-10 h-10 text-indigo-400" />
                        <h4 className="text-3xl font-bold text-white">Interface vs Abstract Class</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Interface */}
                        <div>
                            <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-t-xl font-bold border-b-2 border-indigo-500 text-sm">
                                <AlignHorizontalSpaceBetween className="w-4 h-4" /> 100% Abstraction (Interface)
                            </div>
                            <div className="bg-slate-950 p-6 rounded-b-xl border border-t-0 border-indigo-500/30 font-mono text-sm text-slate-300 min-h-[300px]">
                                <span className="text-pink-500 font-bold">interface</span> Audi {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-slate-500">// Cannot provide ANY concrete methods</span><br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> engine();<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> wheel();<br/>
                                {'}'}<br/><br/>
                                <span className="text-pink-500 font-bold">class</span> AudiA4 <span className="text-pink-500 font-bold">implements</span> Audi {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">public void</span> engine() {'{ ... }'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">public void</span> wheel() {'{ ... }'}<br/>
                                {'}'}
                            </div>
                        </div>

                        {/* Abstract Class */}
                        <div>
                            <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-t-xl font-bold border-b-2 border-amber-500 text-sm">
                                <BookOpen className="w-4 h-4" /> UP TO 100% Abstraction (Abstract Class)
                            </div>
                            <div className="bg-slate-950 p-6 rounded-b-xl border border-t-0 border-amber-500/30 font-mono text-sm text-slate-300 min-h-[300px]">
                                <span className="text-amber-400 font-bold">abstract class</span> Audi {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-amber-400">abstract void</span> wheel();<br/>
                                &nbsp;&nbsp;<span className="text-amber-400">abstract void</span> engine();<br/><br/>
                                &nbsp;&nbsp;<span className="text-slate-500">// Can provide a default behavior!</span><br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> color() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;s.o.p(<span className="text-yellow-300">"Black"</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}<br/><br/>
                                <span className="text-pink-500 font-bold">class</span> AudiA4 <span className="text-pink-500 font-bold">extends</span> Audi {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> wheel() {'{ ... }'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> engine() {'{ ... }'}<br/>
                                {'}'}
                            </div>
                        </div>

                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-500 shadow-xl shadow-emerald-500/20 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
