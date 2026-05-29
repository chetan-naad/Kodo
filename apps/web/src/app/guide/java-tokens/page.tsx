"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Code, Type, Fingerprint, Calculator, Braces, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function JavaTokensGuide() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/home" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">Java Tokens</h1>
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
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center ring-4 ring-brand-500"
                    >
                        <Code className="w-10 h-10 text-brand-400" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight">What is a Token?</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A <strong className="text-brand-400">Token</strong> is the absolutely smallest unit of a program. Just like cells make up your body, tokens make up your code. Every single word, symbol, or number is a token.
                    </p>
                </motion.section>

                {/* 1. Identifiers */}
                <motion.section
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Fingerprint className="w-64 h-64" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase">
                                <Fingerprint className="w-4 h-4" /> 1. Identifiers
                            </div>
                            <h3 className="text-3xl font-bold">Naming Things</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                An Identifier is the name given by you for a Java program element. It's how you identify classes, variables, and methods.
                            </p>
                        </div>
                        <div className="flex-1 w-full bg-slate-900 rounded-2xl p-6 font-mono text-sm border border-slate-700">
                            <span className="text-purple-400">class</span> <motion.span animate={{ color: ["#38bdf8", "#facc15", "#38bdf8"] }} transition={{ duration: 2, repeat: Infinity }} className="font-bold">PlayerScore</motion.span> {'{'} <br />
                            &nbsp;&nbsp;<span className="text-purple-400">int</span> <motion.span animate={{ color: ["#38bdf8", "#f472b6", "#38bdf8"] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} className="font-bold">healthPoints</motion.span> = <span className="text-orange-400">100</span>;<br />
                            {'}'}
                        </div>
                    </div>
                </motion.section>

                {/* 2. Keywords */}
                <motion.section
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
                >
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold tracking-widest uppercase">
                                <Type className="w-4 h-4" /> 2. Keywords
                            </div>
                            <h3 className="text-3xl font-bold">Reserved Language</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Keywords are pre-defined words which have their own strict meaning. You <strong className="text-white">cannot</strong> use them as identifiers. There are exactly <strong className="text-purple-400">50 keywords</strong> in Java.
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-2 w-full">
                            {[
                                'abstract',     'continue',     'for',          'new',          'switch',
                                'assert',       'default',      'goto',         'package',      'synchronized',
                                'boolean',      'do',           'implements',   'private',      'this',
                                'break',        'double',       'import',       'protected',    'throw',
                                'byte',         'else',         'instanceof',   'public',       'throws',
                                'case',         'enum',         'int',          'return',       'transient',
                                'catch',        'extends',      'interface',    'short',        'try',
                                'char',         'final',        'long',         'static',       'void',
                                'class',        'finally',      'native',       'strictfp',     'volatile',
                                'const',        'float',        'new',          'super',        'while',
                            ].map((kw, i) => (
                                <motion.div
                                    key={`${kw}-${i}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.02 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1, backgroundColor: "#a855f7", color: "#fff" }}
                                    className="bg-slate-900 border border-slate-700 text-purple-400 font-mono text-xs p-2 rounded text-center cursor-default transition-colors"
                                >
                                    {kw}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* 3. Literals */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm font-bold tracking-widest uppercase">
                            <Code className="w-4 h-4" /> 3. Literals
                        </div>
                        <h3 className="text-3xl font-bold">Raw Values</h3>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Literals are the actual values you type into the code. They are constants that do not change during execution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Integer", val: "9", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", desc: "Whole numbers" },
                            { name: "Decimal", val: "0.75", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", desc: "Floating point" },
                            { name: "Character", val: "'A'", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", desc: "Single quotes" },
                            { name: "String", val: "\"Hello\"", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", desc: "Double quotes" },
                        ].map((lit, i) => (
                            <motion.div
                                key={lit.name}
                                whileHover={{ y: -10 }}
                                className={`p-6 rounded-2xl border ${lit.bg} ${lit.border} flex flex-col items-center justify-center text-center space-y-2`}
                            >
                                <span className={`text-4xl font-mono font-bold ${lit.color}`}>{lit.val}</span>
                                <h4 className="font-bold text-slate-200">{lit.name}</h4>
                                <p className="text-xs text-slate-400">{lit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 4. Operators */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-brand-900/30 rounded-3xl p-8 border border-brand-500/20 relative overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase">
                                <Calculator className="w-4 h-4" /> 4. Operators
                            </div>
                            <h3 className="text-3xl font-bold">Action Symbols</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Operators perform actions on Operands. There are many categories: Arithmetic (<code className="text-emerald-400">+, -, *, /, %</code>), Relational (<code className="text-emerald-400">==, !=, &gt;</code>), Logical, and more!
                            </p>
                        </div>
                        <div className="flex-1 w-full flex justify-center items-center gap-4 text-4xl font-black font-mono">
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-700">5</motion.div>
                            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-emerald-400">+</motion.div>
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-700">3</motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* 5 & 6. Separators and Comments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Separators */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-slate-800 rounded-3xl p-8 border border-slate-700 space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold tracking-widest uppercase">
                            <Braces className="w-4 h-4" /> 5. Separators
                        </div>
                        <h3 className="text-2xl font-bold">Structure</h3>
                        <p className="text-slate-400">Separators isolate and structure your code.</p>
                        <div className="flex flex-wrap gap-4 mt-4 font-mono text-2xl font-bold text-yellow-400">
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-900 px-4 py-2 rounded-xl">{`{ }`}</motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-900 px-4 py-2 rounded-xl">{`[ ]`}</motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-900 px-4 py-2 rounded-xl">{`( )`}</motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-900 px-4 py-2 rounded-xl">;</motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-900 px-4 py-2 rounded-xl">,</motion.div>
                        </div>
                    </motion.section>

                    {/* Comments */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-slate-800 rounded-3xl p-8 border border-slate-700 space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/20 text-slate-400 text-sm font-bold tracking-widest uppercase">
                            <MessageSquare className="w-4 h-4" /> 6. Comments
                        </div>
                        <h3 className="text-2xl font-bold">Documentation</h3>
                        <p className="text-slate-400">Hidden from the compiler, visible to humans. Used to explain logic.</p>
                        <div className="space-y-2 font-mono text-sm text-slate-500 mt-4 bg-slate-900 p-4 rounded-xl">
                            <p>// This is a single line comment</p>
                            <p>/* <br />&nbsp;&nbsp;This is a<br />&nbsp;&nbsp;block comment<br />*/</p>
                        </div>
                    </motion.section>
                </div>

                <div className="flex justify-center pt-12 border-t border-slate-800">
                    <Link href="/home" className="px-8 py-4 bg-brand-500 text-white rounded-2xl font-bold text-lg hover:bg-brand-400 shadow-xl shadow-brand-500/20 border-b-4 border-brand-700 active:border-b-0 active:translate-y-1 transition-all">
                        Return to Map
                    </Link>
                </div>

            </main>
        </div>
    );
}
