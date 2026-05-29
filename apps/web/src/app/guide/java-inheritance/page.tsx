"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Network, GitBranch, ArrowDown, Share2, ChevronRight, CornerDownRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaInheritanceGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Inheritance</h1>
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
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center ring-4 ring-emerald-500"
                    >
                        <Network className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Inheritance</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Inheriting the property from one class to another class. We use inheritance primarily for <strong>code reusability</strong>.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap text-sm font-bold text-slate-500 mt-4">
                        <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Parent class = Super class = Base class</span>
                        <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Child class = Sub class = Derived class</span>
                    </div>
                </motion.section>

                {/* The 5 Types of Inheritance */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-12"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold">5 Types of Inheritance</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* 1. Single Level */}
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">1</div>
                                <h4 className="text-xl font-bold text-white">Single Level</h4>
                            </div>
                            <p className="text-slate-400 mb-6 text-sm">A subclass inheriting the properties from only one super class.</p>
                            
                            {/* Visual Diagram */}
                            <div className="flex flex-col items-center gap-2 mb-6">
                                <div className="bg-emerald-900/40 border border-emerald-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-emerald-300 text-xs uppercase mb-1">Demo ©</div>
                                    <div className="text-xs text-slate-300 border-t border-emerald-500/30 pt-1">int a</div>
                                </div>
                                <ArrowDown className="text-slate-500 w-5 h-5" />
                                <div className="bg-blue-900/40 border border-blue-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-blue-300 text-xs uppercase mb-1">Sample ©</div>
                                    <div className="text-xs text-slate-300 border-t border-blue-500/30 pt-1">void disp()</div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto">
                                <span className="text-pink-500">class</span> Demo {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">int</span> a = <span className="text-orange-400">10</span>;<br/>
                                {'}'}<br/><br/>
                                <span className="text-pink-500">class</span> Sample <span className="text-emerald-400 font-bold">extends</span> Demo {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> disp() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">System.out.println</span>(<span className="text-yellow-300">"hello"</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>

                        {/* 2. Multi Level */}
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">2</div>
                                <h4 className="text-xl font-bold text-white">Multi - Level</h4>
                            </div>
                            <p className="text-slate-400 mb-6 text-sm">A subclass inherits from a super class, which in turn inherits from its own super class.</p>
                            
                            {/* Visual Diagram */}
                            <div className="flex flex-col items-center gap-2 mb-6">
                                <div className="bg-emerald-900/40 border border-emerald-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-emerald-300 text-xs uppercase mb-1">Tester ©</div>
                                    <div className="text-xs text-slate-300 border-t border-emerald-500/30 pt-1">int y</div>
                                </div>
                                <ArrowDown className="text-slate-500 w-5 h-5" />
                                <div className="bg-blue-900/40 border border-blue-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-blue-300 text-xs uppercase mb-1">Sample ©</div>
                                    <div className="text-xs text-slate-300 border-t border-blue-500/30 pt-1">void add()</div>
                                </div>
                                <ArrowDown className="text-slate-500 w-5 h-5" />
                                <div className="bg-purple-900/40 border border-purple-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-purple-300 text-xs uppercase mb-1">Demo ©</div>
                                    <div className="text-xs text-slate-300 border-t border-purple-500/30 pt-1">void disp()</div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto">
                                <span className="text-pink-500">class</span> Tester {'{'} <span className="text-pink-500">int</span> y=<span className="text-orange-400">10</span>; {'}'}<br/>
                                <span className="text-pink-500">class</span> Sample <span className="text-blue-400 font-bold">extends</span> Tester {'{'} ... {'}'}<br/>
                                <span className="text-pink-500">class</span> Demo <span className="text-purple-400 font-bold">extends</span> Sample {'{'} ... {'}'}
                            </div>
                        </div>

                        {/* 3. Hierarchical */}
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-purple-500 transition-colors md:col-span-2 max-w-2xl mx-auto w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</div>
                                <h4 className="text-xl font-bold text-white">Hierarchical</h4>
                            </div>
                            <p className="text-slate-400 mb-6 text-sm">Multiple subclasses inheriting the properties from only one common super class.</p>
                            
                            {/* Visual Diagram */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="bg-emerald-900/40 border border-emerald-500/50 px-6 py-2 rounded-lg text-center w-32 relative mb-6">
                                    <div className="font-bold text-emerald-300 text-xs uppercase mb-1">Tester ©</div>
                                    <div className="text-xs text-slate-300 border-t border-emerald-500/30 pt-1">int y</div>
                                    
                                    {/* Lines */}
                                    <div className="absolute top-full left-1/2 w-full h-6 border-b-2 border-l-2 border-slate-500 rounded-bl-lg -translate-x-full"></div>
                                    <div className="absolute top-full left-1/2 w-full h-6 border-b-2 border-r-2 border-slate-500 rounded-br-lg"></div>
                                </div>
                                <div className="flex justify-between w-full max-w-[280px]">
                                    <div className="bg-blue-900/40 border border-blue-500/50 px-6 py-2 rounded-lg text-center w-32">
                                        <div className="font-bold text-blue-300 text-xs uppercase mb-1">Demo ©</div>
                                        <div className="text-xs text-slate-300 border-t border-blue-500/30 pt-1">void add()</div>
                                    </div>
                                    <div className="bg-purple-900/40 border border-purple-500/50 px-6 py-2 rounded-lg text-center w-32">
                                        <div className="font-bold text-purple-300 text-xs uppercase mb-1">Sample ©</div>
                                        <div className="text-xs text-slate-300 border-t border-purple-500/30 pt-1">void disp()</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto text-center">
                                <span className="text-pink-500">class</span> Demo <span className="text-purple-400 font-bold">extends</span> Tester {'{'} ... {'}'}<br/>
                                <span className="text-pink-500">class</span> Sample <span className="text-purple-400 font-bold">extends</span> Tester {'{'} ... {'}'}
                            </div>
                        </div>

                    </div>
                </motion.section>

                {/* 4. Multiple Inheritance */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-orange-500 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">4</div>
                        <h4 className="text-xl font-bold text-white">Multiple Inheritance</h4>
                    </div>
                    <p className="text-slate-400 mb-8 text-sm">A sub class inheriting the properties from multiple super classes.</p>
                    
                    {/* Visual Diagram */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex justify-center gap-16 w-full max-w-[350px] mb-8">
                            <div className="bg-blue-900/40 border border-blue-500/50 px-6 py-2 rounded-lg text-center w-32 relative">
                                <div className="font-bold text-blue-300 text-xs uppercase mb-1">Sample ©</div>
                                <div className="text-xs text-slate-300 border-t border-blue-500/30 pt-1">void add()</div>
                            </div>
                            <div className="bg-purple-900/40 border border-purple-500/50 px-6 py-2 rounded-lg text-center w-32 relative">
                                <div className="font-bold text-purple-300 text-xs uppercase mb-1">Demo ©</div>
                                <div className="text-xs text-slate-300 border-t border-purple-500/30 pt-1">void disp()</div>
                            </div>
                        </div>
                        
                        <div className="relative flex justify-center w-full">
                            {/* SVG Arrows from Tester up to Sample and Demo */}
                            <svg className="absolute bottom-full left-1/2 -translate-x-1/2 w-[220px] h-12" style={{ transform: 'translate(-50%, 0)' }}>
                                <defs>
                                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                                        <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                                    </marker>
                                </defs>
                                <line x1="110" y1="48" x2="40" y2="0" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="110" y1="48" x2="180" y2="0" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            </svg>

                            <div className="bg-emerald-900/40 border border-emerald-500/50 px-6 py-2 rounded-lg text-center w-32 relative z-10">
                                <div className="font-bold text-emerald-300 text-xs uppercase mb-1">Tester ©</div>
                                <div className="text-xs text-slate-300 border-t border-emerald-500/30 pt-1">int x</div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 5. Hybrid Inheritance */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-rose-500 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">5</div>
                        <h4 className="text-xl font-bold text-white">Hybrid Inheritance</h4>
                    </div>
                    <p className="text-slate-400 mb-8 text-sm">A combination of single level, multi-level, and hierarchical inheritance.</p>
                    
                    {/* Visual Diagram */}
                    <div className="flex justify-center relative min-h-[280px]">
                        
                        {/* SVG Arrows connecting the nodes */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                            <defs>
                                <marker id="arrowhead-rose" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                                    <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                                </marker>
                            </defs>
                            
                            {/* Demo 4 -> Tester 4 */}
                            <line x1="200" y1="120" x2="200" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-rose)" />
                            
                            {/* Sample 4 -> Demo 4 */}
                            <line x1="200" y1="220" x2="200" y2="160" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-rose)" />

                            {/* Sample 6 -> Tester 4 */}
                            <line x1="400" y1="160" x2="260" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-rose)" />
                        </svg>

                        <div className="w-full max-w-[600px] relative z-10 flex">
                            
                            {/* Left Column (Tester 4, Demo 4, Sample 4) */}
                            <div className="flex flex-col gap-10 items-center pl-16">
                                <div className="bg-emerald-900/40 border border-emerald-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-emerald-300 text-xs uppercase mb-1">Tester 4 ©</div>
                                    <div className="text-xs text-slate-300 border-t border-emerald-500/30 pt-1">int x</div>
                                </div>
                                <div className="bg-blue-900/40 border border-blue-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-blue-300 text-xs uppercase mb-1">Demo 4 ©</div>
                                    <div className="text-xs text-slate-300 border-t border-blue-500/30 pt-1">void add()</div>
                                </div>
                                <div className="bg-purple-900/40 border border-purple-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-purple-300 text-xs uppercase mb-1">Sample 4 ©</div>
                                    <div className="text-xs text-slate-300 border-t border-purple-500/30 pt-1">void disp()</div>
                                </div>
                            </div>
                            
                            {/* Right Column (Sample 6) */}
                            <div className="ml-auto flex items-center pr-16 mt-20">
                                <div className="bg-rose-900/40 border border-rose-500/50 px-6 py-2 rounded-lg text-center w-32">
                                    <div className="font-bold text-rose-300 text-xs uppercase mb-1">Sample 6 ©</div>
                                    <div className="text-xs text-slate-300 border-t border-rose-500/30 pt-1">int x</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
