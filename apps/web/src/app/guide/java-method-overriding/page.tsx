"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Smartphone, Layers, SearchCode, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function JavaMethodOverridingGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">Method Overriding & Super</h1>
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
                        animate={{ rotate: -180 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center ring-4 ring-red-500"
                    >
                        <RefreshCw className="w-10 h-10 text-red-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Method Overriding</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Developing a method in the sub class with the <strong>same name and signature</strong> as in the superclass, but providing a <strong>new implementation</strong>.
                    </p>
                </motion.section>

                {/* Rules Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <h3 className="text-3xl font-bold text-center mb-10">The 3 Rules of Overriding</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                            <div className="bg-red-500/20 p-3 rounded-full text-red-400 mb-4">
                                <Check className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-white mb-2">Same Signature</h4>
                            <p className="text-sm text-slate-400">Method name and arguments must be identical to the parent class.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                            <div className="bg-pink-500/20 p-3 rounded-full text-pink-400 mb-4">
                                <Check className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-white mb-2">IS-A Relationship</h4>
                            <p className="text-sm text-slate-400">Can only occur between classes that are inherited (extends).</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                            <div className="bg-orange-500/20 p-3 rounded-full text-orange-400 mb-4">
                                <Check className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-white mb-2">Non-Static</h4>
                            <p className="text-sm text-slate-400">The method must be non-static. Static methods cannot be overridden.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Real-world Examples */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <Smartphone className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                        <h3 className="text-4xl font-black tracking-tight">Real-World Examples</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* WhatsApp Example */}
                        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 text-slate-700 opacity-20">
                                <RefreshCw className="w-32 h-32" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-6 relative z-10">WhatsApp Update</h4>
                            <div className="bg-slate-950 p-6 rounded-xl font-mono text-sm text-slate-300 relative z-10">
                                <span className="text-pink-500">class</span> WhatsApp_v1 {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> status() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"text"</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}<br/><br/>
                                <span className="text-slate-400">// Overriding the status feature</span><br/>
                                <span className="text-pink-500">class</span> WhatsApp_v2 <span className="text-pink-500 font-bold">extends</span> WhatsApp_v1 {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> status() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"text, images, videos"</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>

                        {/* Android Example */}
                        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 text-slate-700 opacity-20">
                                <Layers className="w-32 h-32" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-6 relative z-10">Android Cameras</h4>
                            <div className="bg-slate-950 p-6 rounded-xl font-mono text-sm text-slate-300 relative z-10">
                                <span className="text-pink-500">class</span> KitKat {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> camera() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"Back camera"</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}<br/><br/>
                                <span className="text-slate-400">// Upgrading the camera feature</span><br/>
                                <span className="text-pink-500">class</span> Lollipop <span className="text-pink-500 font-bold">extends</span> KitKat {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> camera() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"front & back camera"</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* SUPER Keyword */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center"
                >
                    <div className="flex-1 space-y-4">
                        <h3 className="text-4xl font-bold text-indigo-300">The `super` Keyword</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Used during method overriding. If we want to <strong>keep the superclass implementation</strong> alongside the subclass implementation, we call <code>super.methodName()</code>.
                        </p>
                        
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <span className="px-2 py-1 bg-slate-800 rounded font-bold text-white">Inheritance</span> For code reusability
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <span className="px-2 py-1 bg-slate-800 rounded font-bold text-white">Overriding</span> For new implementation of old feature
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <span className="px-2 py-1 bg-slate-800 rounded font-bold text-white">Overloading</span> For common tasks/operations
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-slate-950 p-6 rounded-xl font-mono text-sm text-slate-300 w-full border border-indigo-500/30 shadow-2xl">
                        <span className="text-pink-500">class</span> PhonePe_v1 {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-pink-500">void</span> rewards() {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"money"</span>);<br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}<br/><br/>
                        <span className="text-pink-500">class</span> PhonePe_v2 <span className="text-pink-500 font-bold">extends</span> PhonePe_v1 {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-pink-500">void</span> rewards() {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"coupon"</span>);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400 font-bold">super</span>.rewards(); <span className="text-slate-500">// Calls parent</span><br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </motion.section>

                {/* System.out.println Anatomy */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl text-center"
                >
                    <SearchCode className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-8">What is System.out.println?</h3>
                    
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xl font-mono mb-8">
                        <div className="bg-teal-900/40 border border-teal-500/50 px-4 py-2 rounded-lg text-teal-300">
                            <span className="block text-xs font-sans text-slate-400 mb-1 uppercase tracking-wider">Class</span>
                            System
                        </div>
                        <span className="text-slate-500 font-bold">.</span>
                        <div className="bg-blue-900/40 border border-blue-500/50 px-4 py-2 rounded-lg text-blue-300">
                            <span className="block text-xs font-sans text-slate-400 mb-1 uppercase tracking-wider">Static Ref Var</span>
                            out
                        </div>
                        <span className="text-slate-500 font-bold">.</span>
                        <div className="bg-purple-900/40 border border-purple-500/50 px-4 py-2 rounded-lg text-purple-300">
                            <span className="block text-xs font-sans text-slate-400 mb-1 uppercase tracking-wider">Non-Static Method</span>
                            println()
                        </div>
                    </div>

                    <p className="text-slate-400 max-w-xl mx-auto text-sm">
                        <strong>System</strong> is a class. <strong>out</strong> is a global static reference variable of type PrintStream. <strong>println</strong> is a non-static method belonging to the PrintStream class!
                    </p>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-red-500 text-white rounded-2xl font-bold text-lg hover:bg-red-400 shadow-xl shadow-red-500/20 border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
