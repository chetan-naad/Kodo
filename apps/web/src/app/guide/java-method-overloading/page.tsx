"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GitMerge, FileCode, Users, Share2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaMethodOverloadingGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Method Overloading & Objects</h1>
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
                        className="w-24 h-24 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center ring-4 ring-purple-500"
                    >
                        <GitMerge className="w-10 h-10 text-purple-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Method Overloading</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Developing multiple methods with the same name but variation in the argument list.
                    </p>
                </motion.section>

                {/* 1. Overloading Rules */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold">Variations & Rules</h3>
                        <p className="text-slate-400 mt-2">How to properly overload methods in Java.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                            <h4 className="text-xl font-bold text-white mb-4">Variation in argument list means:</h4>
                            <ul className="space-y-3 list-disc list-inside text-indigo-300">
                                <li>Variation in the <strong>data type</strong>.</li>
                                <li>Variation in the <strong>length</strong> of the arguments.</li>
                                <li>Variation in the <strong>order</strong> of occurrence.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                            <h4 className="text-xl font-bold text-white mb-4">Core Rules:</h4>
                            <ul className="space-y-3 list-disc list-inside text-purple-300">
                                <li>Method name must be the <strong>same</strong>.</li>
                                <li>No restriction on access specifier, modifier, and return type.</li>
                                <li>We can overload both static and non-static methods.</li>
                                <li>We can even overload the main method!</li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* 2. Overloading Example */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl"
                >
                    <h4 className="text-2xl font-bold text-white mb-4">Example: WhatsApp Message Sender</h4>
                    <div className="bg-slate-950 p-6 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                        <span className="text-pink-500">class</span> WhatsApp {'{'}<br/><br/>
                        &nbsp;&nbsp;<span className="text-slate-400">// 1. Takes an int</span><br/>
                        &nbsp;&nbsp;<span className="text-pink-500">void</span> send(<span className="text-pink-500">int</span> no) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"sending no "</span> + no);<br/>
                        &nbsp;&nbsp;{'}'}<br/><br/>
                        &nbsp;&nbsp;<span className="text-slate-400">// 2. Takes a String (Variation in Data Type)</span><br/>
                        &nbsp;&nbsp;<span className="text-pink-500">void</span> send(String msg) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"sending msg "</span> + msg);<br/>
                        &nbsp;&nbsp;{'}'}<br/><br/>
                        &nbsp;&nbsp;<span className="text-slate-400">// 3. Takes int AND String (Variation in Length)</span><br/>
                        &nbsp;&nbsp;<span className="text-pink-500">void</span> send(<span className="text-pink-500">int</span> no, String msg) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"sending no and msg "</span> + no + <span className="text-yellow-300">" "</span> + msg);<br/>
                        &nbsp;&nbsp;{'}'}<br/><br/>
                        &nbsp;&nbsp;<span className="text-slate-400">// 4. Takes String AND int (Variation in Order)</span><br/>
                        &nbsp;&nbsp;<span className="text-pink-500">void</span> send(String msg, <span className="text-pink-500">int</span> no) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"sending msg and no "</span> + msg + <span className="text-yellow-300">" "</span> + no);<br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </motion.section>

                {/* 3. Class and Object */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-4xl font-black tracking-tight">Class and Object</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-3xl">
                            <FileCode className="w-10 h-10 text-blue-400 mb-4" />
                            <h4 className="text-2xl font-bold text-blue-300 mb-2">Class</h4>
                            <p className="text-slate-300">A blueprint or a template to create objects.</p>
                        </div>
                        <div className="bg-emerald-900/20 border border-emerald-500/30 p-8 rounded-3xl">
                            <Share2 className="w-10 h-10 text-emerald-400 mb-4" />
                            <h4 className="text-2xl font-bold text-emerald-300 mb-2">Object</h4>
                            <p className="text-slate-300">A real time entity which has its own state and behaviour.</p>
                            <ul className="mt-4 list-disc list-inside text-sm text-emerald-200/70 space-y-2">
                                <li><strong>State:</strong> Defines non-static variables (what data it holds).</li>
                                <li><strong>Behaviour:</strong> Defines non-static methods (how it behaves).</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 mt-6">
                        <h4 className="text-xl font-bold text-white mb-4">Reference Variables & Objects</h4>
                        <div className="space-y-4 text-slate-300">
                            <p>🔹 The object address is stored in a reference variable.</p>
                            
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex gap-4 overflow-x-auto text-sm">
                                <div>
                                    <strong className="text-indigo-400 block mb-1">Scenario A: Separate Objects</strong>
                                    <code>Ref1 → address1 → Object1</code><br/>
                                    <code>Ref2 → address2 → Object2</code><br/>
                                    <em className="text-slate-400 mt-2 block">Any changes made through Ref1 will <strong>not</strong> affect Ref2.</em>
                                </div>
                                <div className="w-px bg-slate-700"></div>
                                <div>
                                    <strong className="text-pink-400 block mb-1">Scenario B: Shared Object</strong>
                                    <code>Ref1 → address1 → Object1</code><br/>
                                    <code>Ref2 ↗</code><br/>
                                    <em className="text-slate-400 mt-2 block">Multiple reference variables point to the single object address. Changes made through one <strong>will affect</strong> the other.</em>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-bold text-lg hover:bg-purple-400 shadow-xl shadow-purple-500/20 border-b-4 border-purple-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
