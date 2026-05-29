"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, Users, History, TreePine, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function JavaHistoryGuide() {
    return (
        <div className="min-h-screen bg-amber-950 text-amber-50 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-amber-950/80 backdrop-blur-md border-b border-amber-900 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-amber-900 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Java History</h1>
                        <p className="text-xs text-amber-500/80 font-medium tracking-widest uppercase">Visual Study Guide</p>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6 flex flex-col gap-24 mt-12 relative">
                
                {/* Visual Timeline Line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-48 w-1 bg-amber-900/50 rounded-full hidden md:block"></div>

                {/* 1. James Gosling */}
                <motion.section 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-8 items-center relative z-10"
                >
                    <div className="flex-1 text-center md:text-right space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase mb-2">
                            <History className="w-4 h-4" /> 1991
                        </div>
                        <h3 className="text-3xl font-black text-amber-100">The Father of Java</h3>
                        <p className="text-amber-200/70 text-lg leading-relaxed">
                            <strong className="text-amber-400">James Gosling</strong> initiates the Java language project. He is widely recognized across the world as the absolute <em>Father of Java</em>.
                        </p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-amber-900 bg-amber-950 flex items-center justify-center hidden md:flex shrink-0 z-20">
                        <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex justify-center md:justify-start">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-amber-900/40 p-6 rounded-3xl border border-amber-800/50 shadow-2xl"
                        >
                            <Users className="w-24 h-24 text-amber-500/80" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* 2. Green Team & Oak */}
                <motion.section 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col md:flex-row-reverse gap-8 items-center relative z-10"
                >
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-2">
                            <TreePine className="w-4 h-4" /> Green Talk
                        </div>
                        <h3 className="text-3xl font-black text-emerald-100">The Green Team</h3>
                        <p className="text-amber-200/70 text-lg leading-relaxed">
                            The software was initially named <strong className="text-emerald-400">Green Talk</strong> by a group called the <em>Green Team</em>. It was later renamed to <strong className="text-amber-400">Oak</strong>, symbolizing strength (like the national tree of Germany).
                        </p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-amber-900 bg-amber-950 flex items-center justify-center hidden md:flex shrink-0 z-20">
                        <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex justify-center md:justify-end">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-emerald-900/20 p-6 rounded-3xl border border-emerald-800/50 shadow-2xl"
                        >
                            <TreePine className="w-24 h-24 text-emerald-500/80" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* 3. The Coffee Shop */}
                <motion.section 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col md:flex-row gap-8 items-center relative z-10"
                >
                    <div className="flex-1 text-center md:text-right space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold tracking-widest uppercase mb-2">
                            <Coffee className="w-4 h-4" /> Re-branding
                        </div>
                        <h3 className="text-3xl font-black text-orange-100">Oak to Java</h3>
                        <p className="text-amber-200/70 text-lg leading-relaxed">
                            Due to legal trademark issues with "Oak Technologies", the team needed a new name. During a trip to an island coffee shop named <strong className="text-orange-400">Java</strong>, they found their inspiration. They kept the coffee bug as their legendary logo!
                        </p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-amber-900 bg-amber-950 flex items-center justify-center hidden md:flex shrink-0 z-20">
                        <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex justify-center md:justify-start">
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-orange-900/20 p-6 rounded-3xl border border-orange-800/50 shadow-2xl relative"
                        >
                            <motion.div 
                                animate={{ opacity: [0, 1, 0], y: [10, -20] }} 
                                transition={{ duration: 2, repeat: Infinity }} 
                                className="absolute -top-4 right-8 w-2 h-6 bg-white/20 rounded-full blur-sm" 
                            />
                            <Coffee className="w-24 h-24 text-orange-500/80" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* 4. Official Release */}
                <motion.section 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col md:flex-row-reverse gap-8 items-center relative z-10"
                >
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-2">
                            <Rocket className="w-4 h-4" /> 1995
                        </div>
                        <h3 className="text-3xl font-black text-blue-100">Write Once, Run Anywhere</h3>
                        <p className="text-amber-200/70 text-lg leading-relaxed">
                            Java officially releases by <strong className="text-blue-400">Sun Microsystems</strong> in 1995 as a High-Level Programming Language capable of running on Windows, Mac OS, and UNIX!
                        </p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-amber-900 bg-amber-950 flex items-center justify-center hidden md:flex shrink-0 z-20">
                        <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex justify-center md:justify-end">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-blue-900/20 p-6 rounded-3xl border border-blue-800/50 shadow-2xl relative overflow-hidden group"
                        >
                            <motion.div 
                                className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" 
                            />
                            <Rocket className="w-24 h-24 text-blue-500/80 relative z-10" />
                        </motion.div>
                    </div>
                </motion.section>

                <div className="flex justify-center pt-12">
                    <Link href="/home" className="px-8 py-4 bg-amber-600 text-amber-50 rounded-2xl font-bold text-lg hover:bg-amber-500 shadow-xl shadow-amber-900/50 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all z-20 relative">
                        Return to Map
                    </Link>
                </div>

            </main>
        </div>
    );
}
