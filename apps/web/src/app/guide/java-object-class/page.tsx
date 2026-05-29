"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Fingerprint, RefreshCcw, Type, Scale, DatabaseZap, AlignEndHorizontal, SearchCode, Hash, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaObjectClassGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">Object & String Classes</h1>
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
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center ring-4 ring-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.3)]"
                    >
                        <Box className="w-10 h-10 text-orange-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">The Object Class</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The super most class in Java from the <code className="bg-slate-800 px-2 py-1 rounded text-orange-400 font-bold">java.lang</code> package. Every class extends it implicitly!
                    </p>
                </motion.section>

                {/* 3 Main Methods of Object */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">The Holy Trinity of Methods</h3>
                        <p className="text-slate-400">Non-static, non-final methods inherited by everything.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <div className="bg-slate-800 border-2 border-slate-700 p-6 rounded-3xl hover:border-sky-500 transition-colors">
                            <SearchCode className="w-8 h-8 text-sky-400 mb-4" />
                            <h4 className="text-xl font-bold text-white mb-2">toString()</h4>
                            <p className="text-slate-400 text-sm mb-4">Implicitly invoked when printing a reference variable.</p>
                            <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-sky-300 border border-slate-700">
                                Returns: <br/>
                                <span className="text-pink-400">pkg.Class@hex_address</span>
                            </div>
                        </div>

                        <div className="bg-slate-800 border-2 border-slate-700 p-6 rounded-3xl hover:border-fuchsia-500 transition-colors">
                            <Hash className="w-8 h-8 text-fuchsia-400 mb-4" />
                            <h4 className="text-xl font-bold text-white mb-2">hashCode()</h4>
                            <p className="text-slate-400 text-sm mb-4">Must be explicitly invoked. Generates a unique integer hash number based on the object's address.</p>
                            <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-fuchsia-300 border border-slate-700">
                                Returns: <br/>
                                <span className="text-pink-400">12367134</span> (Example)
                            </div>
                        </div>

                        <div className="bg-slate-800 border-2 border-slate-700 p-6 rounded-3xl hover:border-amber-500 transition-colors">
                            <Scale className="w-8 h-8 text-amber-400 mb-4" />
                            <h4 className="text-xl font-bold text-white mb-2">equals()</h4>
                            <p className="text-slate-400 text-sm mb-4">Used to compare object addresses (by default).</p>
                            <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-amber-300 border border-slate-700">
                                Returns: <br/>
                                <span className="text-pink-400">true</span> or <span className="text-pink-400">false</span>
                            </div>
                        </div>

                    </div>
                </motion.section>

                {/* The String Class Section */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-indigo-900/20 border-2 border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 opacity-10 p-8">
                        <Type className="w-48 h-48 text-indigo-500" />
                    </div>

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <Type className="w-10 h-10 text-indigo-400" />
                        <div>
                            <h3 className="text-3xl font-bold text-white">The String Class</h3>
                            <p className="text-indigo-300">A <span className="font-bold underline decoration-indigo-400">final</span> class inside java.lang.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        
                        {/* Immutability */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/20">
                            <h4 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                <Fingerprint className="w-5 h-5" /> Immutability
                            </h4>
                            <p className="text-sm text-slate-300 mb-4">Strings cannot be changed. If multiple reference variables point to "cool", changing one to "hot" creates a <strong>brand new object</strong> without affecting the others.</p>
                            
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-center font-mono text-sm">
                                    <div className="text-slate-400">s1</div>
                                    <div className="h-4 border-r border-indigo-500 w-1/2"></div>
                                </div>
                                <div className="bg-indigo-500/20 px-4 py-2 border border-indigo-500/50 rounded-lg text-indigo-300 font-bold">
                                    "cool"
                                </div>
                                <div className="text-center font-mono text-sm">
                                    <div className="h-4 border-l border-indigo-500 w-1/2 ml-auto"></div>
                                    <div className="text-slate-400">s2</div>
                                </div>
                            </div>
                        </div>

                        {/* Memory Pools */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/20">
                            <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                                <DatabaseZap className="w-5 h-5" /> Memory Pools
                            </h4>
                            
                            <div className="space-y-4">
                                <div className="bg-slate-950 p-3 rounded-xl border-l-4 border-l-emerald-500">
                                    <span className="text-xs font-bold text-emerald-400 uppercase">Constant Pool Area</span>
                                    <p className="text-xs text-slate-400 mt-1">Stored here when created <strong>without</strong> `new`.</p>
                                    <code className="text-xs text-slate-300 mt-2 block">String s = "hi";</code>
                                </div>

                                <div className="bg-slate-950 p-3 rounded-xl border-l-4 border-l-rose-500">
                                    <span className="text-xs font-bold text-rose-400 uppercase">Non-Constant Pool Area</span>
                                    <p className="text-xs text-slate-400 mt-1">Stored here when created <strong>with</strong> `new`.</p>
                                    <code className="text-xs text-slate-300 mt-2 block">String s = new String("hi");</code>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.section>

                {/* == vs equals() */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <AlignEndHorizontal className="w-10 h-10 text-rose-400" />
                        <h3 className="text-3xl font-bold">== Operator vs equals() Method</h3>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-700">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-900 text-slate-300">
                                <tr>
                                    <th className="p-4 border-b border-slate-700">Comparison Operator (==)</th>
                                    <th className="p-4 border-b border-slate-700">equals() Method</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 bg-slate-800 text-slate-400">
                                <tr>
                                    <td className="p-4 font-mono text-rose-400">It is an operator.</td>
                                    <td className="p-4 font-mono text-emerald-400">It is a non-static method of Object.</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Operators cannot be overridden.</td>
                                    <td className="p-4">Methods can be overridden.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-white">It ALWAYS compares Addresses.</td>
                                    <td className="p-4 font-bold text-white">In String class, it is overridden to compare Values!</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-500 shadow-xl shadow-orange-500/20 border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
