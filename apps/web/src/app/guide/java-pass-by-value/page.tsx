"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle, Settings, Box, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaPassByValueGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Pass By Value & Reference</h1>
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
                        className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center ring-4 ring-blue-500"
                    >
                        <Settings className="w-10 h-10 text-blue-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">How Data is Passed</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Understand the fundamental difference between passing primitive data types versus reference variables to methods.
                    </p>
                </motion.section>

                {/* 1. Pass by Value Breakdown */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-yellow-500 transition-colors">
                        <Box className="w-12 h-12 text-yellow-400 mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-2">Pass By Value</h4>
                        <p className="text-slate-400 mb-4">
                            Calling or invoking a method by passing <strong className="text-yellow-400">primitive type</strong> of data is called <strong>call by value</strong> or <strong>pass by value</strong>.
                        </p>
                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                            <span className="text-pink-500">class</span> Sample {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">static void</span> add(<span className="text-pink-500">int</span> a) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(a);<br/>
                            &nbsp;&nbsp;{'}'}<br/><br/>
                            &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">int</span> x = <span className="text-orange-400">10</span>;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;add(x); <span className="text-slate-500">// Passed by value</span><br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                    </div>

                    <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-cyan-500 transition-colors">
                        <Activity className="w-12 h-12 text-cyan-400 mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-2">Pass By Reference</h4>
                        <p className="text-slate-400 mb-4">
                            Calling or invoking a method by passing <strong className="text-cyan-400">reference variables</strong> is called <strong>call by reference</strong> or <strong>pass by reference</strong>.
                        </p>
                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                            <span className="text-pink-500">class</span> Sample {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">int</span> y = <span className="text-orange-400">80</span>;<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">static void</span> cool(Sample s2) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(s2.y);<br/>
                            &nbsp;&nbsp;{'}'}<br/><br/>
                            &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Sample s1 = <span className="text-pink-500">new</span> Sample();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;cool(s1); <span className="text-slate-500">// Passed by reference</span><br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                    </div>
                </motion.section>

                {/* 2. Complex Example */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <ShieldCheck className="w-4 h-4" /> Objects
                        </div>
                        <h3 className="text-3xl font-bold">Passing Objects Across Classes</h3>
                        <p className="text-slate-400 mt-2">When working with multiple classes, we pass object references to access their behaviors.</p>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-2xl font-mono text-sm border border-slate-800 flex flex-col md:flex-row gap-6 justify-around">
                        <div>
                            <span className="text-pink-500">class</span> Amazon {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">void</span> product() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"product"</span>);<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                        <div className="hidden md:block w-px bg-slate-800"></div>
                        <div>
                            <span className="text-pink-500">class</span> Cust1 {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">static void</span> needProduct(Amazon a2) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;a2.product();<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                        <div className="hidden md:block w-px bg-slate-800"></div>
                        <div>
                            <span className="text-pink-500">class</span> FedEx {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Amazon a1 = <span className="text-pink-500">new</span> Amazon();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Cust1.needProduct(a1);<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg hover:bg-blue-400 shadow-xl shadow-blue-500/20 border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
