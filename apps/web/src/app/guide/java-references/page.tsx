"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Link2, Split, ArrowRight, Copy, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JavaReferencesGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Reference Variables</h1>
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
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto bg-violet-500/20 rounded-full flex items-center justify-center ring-4 ring-violet-500"
                    >
                        <MapPin className="w-10 h-10 text-violet-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">Reference Variables</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A reference variable is a special variable that stores an <strong className="text-violet-400">object address</strong>. It can hold either <code className="bg-black/30 px-2 py-1 rounded text-red-400">null</code> or a valid object address.
                    </p>
                </motion.section>

                {/* 1. Lifecycle: Declaration → Initialization → Combined */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Link2 className="w-4 h-4" /> 1. Lifecycle
                        </div>
                        <h3 className="text-3xl font-bold">Declaration, Initialization & Combined</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 text-center">
                            <h4 className="font-bold text-lg mb-2 text-slate-300">1. Declaration</h4>
                            <p className="text-xs text-slate-400 mb-4">Create the reference bucket.</p>
                            <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                                <span className="text-violet-400">Tester</span> <span className="text-white">t1</span>;
                            </div>
                        </div>
                        <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 text-center">
                            <h4 className="font-bold text-lg mb-2 text-slate-300">2. Initialization</h4>
                            <p className="text-xs text-slate-400 mb-4">Assign an object to it.</p>
                            <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                                <span className="text-white">t1</span> = <span className="text-emerald-400">new</span> <span className="text-violet-400">Tester()</span>;
                            </div>
                        </div>
                        <div className="bg-slate-900 border-2 border-violet-500/30 rounded-2xl p-6 text-center ring-2 ring-violet-500/20">
                            <h4 className="font-bold text-lg mb-2 text-violet-400">3. Combined ⚡</h4>
                            <p className="text-xs text-slate-400 mb-4">Both in one line (homogenous).</p>
                            <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                                <span className="text-violet-400">Tester</span> <span className="text-white">t1</span> = <span className="text-emerald-400">new</span> <span className="text-violet-400">Tester()</span>;
                            </div>
                        </div>
                    </div>

                    {/* Syntax Breakdown */}
                    <div className="mt-8 bg-violet-500/10 border border-violet-500/30 rounded-2xl p-6">
                        <h4 className="font-bold text-violet-400 mb-4 text-center">Anatomy of Object Creation</h4>
                        <div className="bg-slate-950 p-4 rounded-xl font-mono text-lg overflow-x-auto text-center border border-slate-800">
                            <span className="text-violet-400 font-bold" title="Class Name">Tester</span>{' '}
                            <span className="text-white font-bold border-b-2 border-white" title="Reference Variable">t1</span>{' '}
                            <span className="text-slate-400">=</span>{' '}
                            <span className="text-emerald-400 font-bold" title="Operator">new</span>{' '}
                            <span className="text-orange-400 font-bold" title="Constructor">Tester()</span>;
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs text-center">
                            <div><span className="text-violet-400 font-bold">Class Name</span><br/><span className="text-slate-500">Type of object</span></div>
                            <div><span className="text-white font-bold">Ref Variable</span><br/><span className="text-slate-500">Stores address</span></div>
                            <div><span className="text-emerald-400 font-bold">new Operator</span><br/><span className="text-slate-500">Allocates heap</span></div>
                            <div><span className="text-orange-400 font-bold">Constructor</span><br/><span className="text-slate-500">Initializes members</span></div>
                        </div>
                    </div>
                </motion.section>

                {/* 2. Calling Non-Static Methods */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-6"
                >
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-4">
                            2. Usage
                        </div>
                        <h3 className="text-3xl font-bold">Calling Non-Static Methods</h3>
                        <p className="text-slate-400 mt-2">Use the reference variable to call methods on your object.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
                            <h4 className="text-lg font-bold text-white mb-4">Example: Tester.disp()</h4>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800 leading-loose">
                                <span className="text-pink-500">class</span> Tester {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> <span className="text-teal-400">disp</span>() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span className="text-orange-300">{'"Hii"'}</span>);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;Tester <span className="text-white font-bold">t1</span> = <span className="text-emerald-400">new</span> Tester();<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white font-bold">t1</span>.<span className="text-teal-400">disp</span>();<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
                            <h4 className="text-lg font-bold text-white mb-4">Example: Circle.area()</h4>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-sm text-slate-300 border border-slate-800 leading-loose">
                                <span className="text-pink-500">class</span> Circle {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">void</span> <span className="text-teal-400">area</span>() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;...<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(result);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                &nbsp;&nbsp;<span className="text-pink-500">public static void</span> main(String[] args) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;Circle <span className="text-white font-bold">c1</span> = <span className="text-emerald-400">new</span> Circle();<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white font-bold">c1</span>.<span className="text-teal-400">area</span>();<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 3. Multiple References */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-brand-900/20 rounded-3xl p-8 border border-brand-500/20 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Split className="w-4 h-4" /> 3. Multiple References
                        </div>
                        <h3 className="text-3xl font-bold">Different Objects vs Same Object</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Scenario A: Different objects */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                <Copy className="w-5 h-5 text-blue-400" /> A. Separate Objects
                            </h4>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 leading-loose">
                                Demo d1 = <span className="text-emerald-400">new</span> Demo();<br/>
                                Demo d2 = <span className="text-emerald-400">new</span> Demo();<br/>
                                <span className="text-slate-500">// d1 and d2 → DIFFERENT addresses</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-pink-500/20 px-3 py-2 rounded-lg text-xs font-mono text-pink-300 border border-pink-500/30">d1</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="bg-indigo-500/20 px-3 py-2 rounded-lg text-xs font-mono text-indigo-300 border border-indigo-500/30">@15db9742</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="bg-slate-800 px-3 py-2 rounded-lg text-xs font-mono text-white border border-slate-600">Object 1</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-pink-500/20 px-3 py-2 rounded-lg text-xs font-mono text-pink-300 border border-pink-500/30">d2</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="bg-indigo-500/20 px-3 py-2 rounded-lg text-xs font-mono text-indigo-300 border border-indigo-500/30">@06d69c</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="bg-slate-800 px-3 py-2 rounded-lg text-xs font-mono text-white border border-slate-600">Object 2</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">Changes to one object do NOT affect the other.</p>
                        </div>

                        {/* Scenario B: Same object */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                <Link2 className="w-5 h-5 text-yellow-400" /> B. Shared Reference
                            </h4>
                            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 leading-loose">
                                Demo d1 = <span className="text-emerald-400">new</span> Demo();<br/>
                                Demo d2 = <span className="text-yellow-400 font-bold">d1</span>; <span className="text-slate-500">// NOT new!</span><br/>
                                <span className="text-slate-500">// d1 and d2 → SAME address</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-pink-500/20 px-3 py-2 rounded-lg text-xs font-mono text-pink-300 border border-pink-500/30">d1</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="bg-yellow-500/20 px-3 py-2 rounded-lg text-xs font-mono text-yellow-300 border border-yellow-500/30">@15db9742</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="bg-slate-800 px-3 py-2 rounded-lg text-xs font-mono text-white border border-slate-600 ring-2 ring-yellow-500/30">Same Object</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-pink-500/20 px-3 py-2 rounded-lg text-xs font-mono text-pink-300 border border-pink-500/30">d2</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="bg-yellow-500/20 px-3 py-2 rounded-lg text-xs font-mono text-yellow-300 border border-yellow-500/30">@15db9742</div>
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                    <div className="text-xs text-yellow-400 font-bold">↑ Points here too!</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">Both reference variables point to the SAME heap object.</p>
                        </div>

                    </div>
                </motion.section>

                {/* 4. Fully Qualified Path */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8"
                >
                    <h3 className="text-2xl font-bold text-amber-400 mb-4 text-center">What Happens When You Print a Reference?</h3>
                    <p className="text-slate-300 text-center mb-6">
                        Printing a reference variable outputs its <strong className="text-amber-300">Fully Qualified Path</strong>:
                    </p>
                    <div className="bg-slate-950 p-4 rounded-xl font-mono text-center border border-slate-800 text-lg mb-4">
                        <span className="text-slate-400">package_name</span>.<span className="text-violet-400">class_name</span><span className="text-amber-400">@</span><span className="text-emerald-400">hexadecimal_no</span>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-slate-500">Example: <code className="bg-black/30 px-2 py-1 rounded text-amber-300">non_static.Demo@1bcfc76</code></p>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-violet-500 text-white rounded-2xl font-bold text-lg hover:bg-violet-400 shadow-xl shadow-violet-500/20 border-b-4 border-violet-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                        Return to Map <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
