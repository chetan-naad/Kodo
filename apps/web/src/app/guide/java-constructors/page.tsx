"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, ShieldCheck, UserPlus, Fingerprint, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaConstructorsGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Constructors & `this`</h1>
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
                        className="w-24 h-24 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center ring-4 ring-amber-500"
                    >
                        <Settings className="w-10 h-10 text-amber-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Constructors</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A special type of method used specifically to initialize data members of an object when it is created.
                    </p>
                </motion.section>

                {/* 1. Rules of Constructors */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <ShieldCheck className="w-4 h-4" /> Rules
                        </div>
                        <h3 className="text-3xl font-bold">5 Rules for Constructors</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">1</span>
                                The constructor name should be exactly the <strong>same as the class name</strong>.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">2</span>
                                It will <strong>not have a return type</strong> (not even void).
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">3</span>
                                It <strong>cannot return</strong> any value.
                            </li>
                        </ul>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">4</span>
                                It is <strong>always non-static</strong>.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">5</span>
                                Whenever an object is created via <code>new</code>, the constructor is <strong>automatically invoked</strong>.
                            </li>
                        </ul>
                    </div>
                </motion.section>

                {/* 2. Constructor Syntax & Example */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl">
                        <h4 className="text-2xl font-bold text-white mb-4">Basic Syntax</h4>
                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                            <span className="text-pink-500">class</span> Sample {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-slate-400">// Constructor</span><br/>
                            &nbsp;&nbsp;Sample() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"hey I am constructor"</span>);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">return</span>;<br/>
                            &nbsp;&nbsp;{'}'}<br/><br/>
                            &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">new</span> Sample(); <span className="text-slate-500">// Invokes Constructor</span><br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                    </div>
                    
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl">
                        <UserPlus className="w-12 h-12 text-blue-400 mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-2">Parameterized Constructor</h4>
                        <p className="text-slate-400 mb-4">You can pass parameters to initialize state dynamically.</p>
                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                            <span className="text-pink-500">class</span> Sample {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">int</span> x;<br/><br/>
                            &nbsp;&nbsp;Sample(<span className="text-pink-500">int</span> y) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;x = y;<br/>
                            &nbsp;&nbsp;{'}'}<br/><br/>
                            &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Sample s1 = <span className="text-pink-500">new</span> Sample(<span className="text-orange-400">10</span>);<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                    </div>
                </motion.section>

                {/* 3. This Keyword */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-emerald-900/20 border border-emerald-500/30 p-8 rounded-3xl text-center"
                >
                    <Fingerprint className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-emerald-400 mb-4">The `this` Keyword</h3>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                        Used to point to the <strong>current object</strong>. Whenever local variable and global variable names are the same, we use <code>this</code> to differentiate them. It is the default reference variable, and should be used only in non-static contexts.
                    </p>
                    
                    <div className="bg-slate-950 p-6 rounded-2xl font-mono text-sm border border-slate-800 text-left max-w-xl mx-auto overflow-x-auto">
                        <span className="text-pink-500">class</span> Employee {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-pink-500">int</span> emp_id; <span className="text-slate-500">// Global</span><br/>
                        &nbsp;&nbsp;String emp_name;<br/><br/>
                        &nbsp;&nbsp;<span className="text-slate-400">// Constructor with same parameter names</span><br/>
                        &nbsp;&nbsp;Employee(<span className="text-pink-500">int</span> emp_id, String emp_name) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 font-bold">this</span>.emp_id = emp_id; <span className="text-slate-500">// this.emp_id = global</span><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 font-bold">this</span>.emp_name = emp_name;<br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-400 shadow-xl shadow-orange-500/20 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
