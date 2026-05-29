"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Puzzle, ArrowRight, ChevronRight, FileCode } from 'lucide-react';
import Link from 'next/link';

export default function JavaCompositionGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Composition</h1>
                        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Visual Study Guide</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 flex flex-col gap-24 mt-12">

                {/* Intro */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-6"
                >
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center ring-4 ring-amber-500"
                    >
                        <Puzzle className="w-10 h-10 text-amber-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Composition</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A class having an object of another class is called <strong className="text-amber-400">Composition</strong>. 
                        It is also known as the <strong className="text-amber-400">Has-A</strong> relationship.
                    </p>
                </motion.section>

                {/* Class Diagram */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <FileCode className="w-4 h-4" /> Class Diagram
                        </div>
                        <h3 className="text-2xl font-bold">Pictorial Representation</h3>
                        <p className="text-slate-400 mt-2 text-sm">A class diagram visually represents the members of a class.</p>
                    </div>

                    {/* The Diagram – faithful recreation */}
                    <div className="bg-slate-950 border-2 border-slate-700 rounded-3xl p-6 md:p-10 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            
                            {/* Tester Class Box */}
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="w-full md:w-56 border-2 border-slate-500 rounded-xl overflow-hidden bg-slate-900"
                            >
                                <div className="bg-slate-800 border-b-2 border-slate-500 px-4 py-3 text-center">
                                    <h4 className="text-lg font-black text-white tracking-wide">Tester</h4>
                                </div>
                                <div className="px-4 py-4 font-mono text-sm text-slate-300">
                                    <span className="text-pink-400">void</span> : <span className="text-teal-400">add</span>( )
                                </div>
                            </motion.div>

                            {/* Arrow with Label */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="text-sm font-bold text-amber-400 tracking-wide whitespace-nowrap">Has a relationship</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-12 md:w-24 h-[2px] bg-amber-500" />
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-amber-500 rotate-180" />
                                </div>
                            </motion.div>

                            {/* Sample Class Box */}
                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="w-full md:w-56 border-2 border-amber-500/50 rounded-xl overflow-hidden bg-slate-900 ring-2 ring-amber-500/20"
                            >
                                <div className="bg-amber-500/20 border-b-2 border-amber-500/30 px-4 py-3 text-center">
                                    <h4 className="text-lg font-black text-amber-400 tracking-wide">Sample</h4>
                                </div>
                                <div className="px-4 py-4 font-mono text-sm text-slate-300">
                                    <span className="text-amber-300">Tester</span> : <span className="text-white">t1</span>
                                </div>
                            </motion.div>

                        </div>

                        <p className="text-center text-sm text-slate-500 mt-8">
                            Sample <strong className="text-amber-400">HAS-A</strong> Tester object (<code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300">Tester t1</code>)
                        </p>
                    </div>
                </motion.section>

                {/* Code Example */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold">Composition in Code</h3>
                        <p className="text-slate-400 mt-2 text-sm">Sample creates and uses a Tester object inside its main method.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tester class */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-500" />
                                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Tester.java</h4>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800 leading-loose">
                                <span className="text-pink-500">class</span> Tester {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> <span className="text-teal-400">add</span>() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span className="text-orange-300">{'"hii"'}</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>

                        {/* Sample class */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-widest">Sample.java</h4>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800 leading-loose">
                                <span className="text-pink-500">class</span> Sample {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300 font-bold bg-amber-500/20 px-1 rounded">Tester t1</span> = <span className="text-emerald-400">new</span> Tester();<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white font-bold">t1</span>.<span className="text-teal-400">add</span>();<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>
                    </div>

                    {/* Flow */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                        <div className="bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-lg text-amber-300 font-bold">Sample.main()</div>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                        <div className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-white font-mono">new Tester()</div>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                        <div className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-white font-mono">t1.add()</div>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                        <div className="bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-lg text-emerald-300 font-bold">Output: hii</div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-amber-500 text-amber-950 rounded-2xl font-bold text-lg hover:bg-amber-400 shadow-xl shadow-amber-500/20 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
