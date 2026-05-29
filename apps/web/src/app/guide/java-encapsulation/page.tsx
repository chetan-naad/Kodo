"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Unlock, Database, KeyRound, Coffee, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaEncapsulationGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Encapsulation</h1>
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
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center ring-4 ring-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
                    >
                        <Shield className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Encapsulation</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Declaring data members as <strong className="text-rose-400">private</strong> to restrict direct access, and providing indirect access through <strong className="text-emerald-400">public services (Getters/Setters)</strong>.
                    </p>
                </motion.section>

                {/* Default Encapsulation */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700 relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <Lock className="w-96 h-96" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-6 relative z-10">Java is by default Encapsulated!</h3>
                    <p className="text-slate-400 mb-8 relative z-10">You've been using encapsulation since day one without realizing it.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-600 border-l-4 border-l-rose-500">
                            <h4 className="font-bold text-rose-300 mb-2 line-through decoration-rose-500/50">Outside the Class</h4>
                            <p className="text-slate-400 text-sm">We cannot declare any variable outside the class boundaries.</p>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-600 border-l-4 border-l-rose-500">
                            <h4 className="font-bold text-rose-300 mb-2 line-through decoration-rose-500/50">Outside the Method</h4>
                            <p className="text-slate-400 text-sm">We cannot have any print statements outside of a method.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Getters and Setters */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">The Gateway: Get & Set</h3>
                        <p className="text-slate-400">It is an industrial convention to use these prefixes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-sky-500 transition-colors">
                            <Database className="w-12 h-12 text-sky-400 mb-6" />
                            <h4 className="text-2xl font-bold text-white mb-2">GET</h4>
                            <div className="bg-sky-500/20 text-sky-300 px-3 py-1 inline-block rounded font-bold text-sm mb-6">
                                Read Access
                            </div>
                            <p className="text-slate-300 mb-4">
                                Used to retrieve or read the value of a private variable.
                            </p>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800">
                                <span className="text-sky-400">public int</span> getA() {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">return</span> a;<br/>
                                {'}'}
                            </div>
                        </div>

                        <div className="bg-slate-800 border-2 border-slate-700 p-8 rounded-3xl hover:border-amber-500 transition-colors">
                            <Unlock className="w-12 h-12 text-amber-400 mb-6" />
                            <h4 className="text-2xl font-bold text-white mb-2">SET</h4>
                            <div className="bg-amber-500/20 text-amber-300 px-3 py-1 inline-block rounded font-bold text-sm mb-6">
                                Write Access
                            </div>
                            <p className="text-slate-300 mb-4">
                                Used to update or modify the value of a private variable safely.
                            </p>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800">
                                <span className="text-amber-400">public void</span> setA(<span className="text-pink-500">int</span> a) {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">this</span>.a = a;<br/>
                                {'}'}
                            </div>
                        </div>

                    </div>
                </motion.section>

                {/* Java Bean Class & Real World Examples */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-cyan-900/20 border-2 border-cyan-500/30 rounded-3xl p-8"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Coffee className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h4 className="text-3xl font-bold text-white">Java Bean Class</h4>
                            <p className="text-cyan-300 text-sm mt-1">A class built entirely on encapsulation.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-cyan-500/20">
                                <h5 className="font-bold text-white mb-2">Why encapsulate?</h5>
                                <p className="text-sm text-slate-400">Encapsulation is used for <strong>protection</strong>. Just like an ATM pin or Net Banking password, we provide security and only grant access to authorized people.</p>
                            </div>
                            
                            <div className="flex justify-center">
                                <KeyRound className="w-32 h-32 text-cyan-500/20" />
                            </div>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-xl border border-cyan-500/30 font-mono text-sm text-slate-300">
                            <span className="text-slate-500">// Example: ICICI Bank ATM</span><br/><br/>
                            <span className="text-pink-500 font-bold">class</span> ICICI {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-rose-400">private</span> <span className="text-pink-500">int</span> pin = <span className="text-orange-400">1234</span>;<br/><br/>
                            
                            &nbsp;&nbsp;<span className="text-emerald-400">public</span> <span className="text-pink-500">int</span> getAtmPin() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">return</span> pin;<br/>
                            &nbsp;&nbsp;{'}'}<br/><br/>

                            &nbsp;&nbsp;<span className="text-emerald-400">public void</span> setAtmPin(<span className="text-pink-500">int</span> pin) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">this</span>.pin = pin;<br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'}<br/><br/>
                            
                            <span className="text-slate-500">// We cannot do: card.pin = 0000;</span><br/>
                            <span className="text-slate-500">// We MUST use: card.setAtmPin(0000);</span>
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
