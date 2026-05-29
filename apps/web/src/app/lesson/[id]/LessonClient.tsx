"use client";

import { Heart, X, CheckCircle, XCircle, Lightbulb, Play, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useTransition } from 'react';
import { useAuth } from '@clerk/nextjs';
import { upsertUserProgress } from '../../actions/progress';

type ExerciseType = 'mcq' | 'fill_blank' | 'arrange' | 'debug' | 'write';

interface Exercise {
    id: string;
    type: ExerciseType;
    prompt: string;
    codeTemplate?: string | null;
    options?: any;
    correctAnswer: string;
    explanation?: string | null;
    xpReward: number;
}

interface CodeResult {
    stdout?: string;
    stderr?: string;
    compile_output?: string;
    status?: { description: string };
}

export default function LessonClient({
    lessonId,
    exercises,
    initialHearts,
}: {
    lessonId: string;
    exercises: Exercise[];
    initialHearts: number;
}) {
    const { getToken } = useAuth();
    const [dynamicExercises, setDynamicExercises] = useState<Exercise[]>(exercises);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Per-type answer state
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [textInput, setTextInput] = useState('');
    const [arrangedTokens, setArrangedTokens] = useState<string[]>([]);
    const [availableTokens, setAvailableTokens] = useState<string[]>([]);
    const [userCode, setUserCode] = useState('');

    // Code runner
    const [codeResult, setCodeResult] = useState<CodeResult | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    // Check state
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [hearts, setHearts] = useState(initialHearts);
    const [isPending, startTransition] = useTransition();

    // AI Hint
    const [hint, setHint] = useState<string | null>(null);
    const [isLoadingHint, setIsLoadingHint] = useState(false);
    const [attemptCounts, setAttemptCounts] = useState<Record<number, number>>({});

    const activeExercise = dynamicExercises[currentIndex];
    const progressPercent = dynamicExercises.length > 0 ? (currentIndex / dynamicExercises.length) * 100 : 0;
    const exerciseType: ExerciseType = activeExercise?.type ?? 'mcq';
    const currentAttempts = attemptCounts[currentIndex] || 0;

    // Reset per-exercise state when index changes
    useEffect(() => {
        if (!activeExercise) return;
        setSelectedOption(null);
        setTextInput('');
        setIsChecked(false);
        setIsCorrect(false);
        setHint(null);
        setCodeResult(null);

        if (activeExercise.type === 'arrange') {
            const tokens: string[] = Array.isArray(activeExercise.options)
                ? activeExercise.options
                : activeExercise.correctAnswer.split(' ');
            setAvailableTokens([...tokens].sort(() => Math.random() - 0.5));
            setArrangedTokens([]);
        } else if (activeExercise.type === 'write' || activeExercise.type === 'debug') {
            setUserCode(activeExercise.codeTemplate || '');
            setAvailableTokens([]);
            setArrangedTokens([]);
        } else {
            setAvailableTokens([]);
            setArrangedTokens([]);
            setUserCode('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    if (!activeExercise) return null;

    // ─── Answer helpers ───────────────────────────────────────────────────────

    const getAnswer = (): string => {
        switch (exerciseType) {
            case 'mcq':
            case 'debug':
                return selectedOption ?? '';
            case 'fill_blank':
                return textInput.trim();
            case 'arrange':
                return arrangedTokens.join(' ');
            case 'write':
                return userCode.trim();
        }
    };

    const hasAnswer = (): boolean => {
        switch (exerciseType) {
            case 'mcq':
            case 'debug':
                return !!selectedOption;
            case 'fill_blank':
                return textInput.trim().length > 0;
            case 'arrange':
                return arrangedTokens.length > 0;
            case 'write':
                return userCode.trim().length > 0;
        }
    };

    const checkCorrect = (answer: string): boolean => {
        const correct = activeExercise.correctAnswer;
        if (exerciseType === 'fill_blank') return answer.toLowerCase() === correct.toLowerCase();
        if (exerciseType === 'write') {
            // Check if the run output matches the expected answer
            return !!codeResult && !!codeResult.stdout && codeResult.stdout.trim() === correct.trim();
        }
        return answer === correct;
    };

    // ─── Handlers ─────────────────────────────────────────────────────────────

    const handleCheck = () => {
        const answer = getAnswer();
        const correct = checkCorrect(answer);
        setIsCorrect(correct);
        setIsChecked(true);
        setHint(null);
        if (!correct) {
            setHearts(prev => Math.max(0, prev - 1));
            setAttemptCounts(prev => ({ ...prev, [currentIndex]: (prev[currentIndex] || 0) + 1 }));
            setDynamicExercises(prev => [...prev, activeExercise]);
        }
    };

    const handleNext = () => {
        if (currentIndex < dynamicExercises.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            startTransition(async () => {
                const totalXp = exercises.reduce((acc, ex) => acc + (ex.xpReward || 10), 0);
                const perfect = hearts === initialHearts;
                try { await upsertUserProgress(lessonId, totalXp, perfect); } catch {}
                window.location.href = `/lesson/${lessonId}/complete`;
            });
        }
    };

    const handleGetHint = async () => {
        setIsLoadingHint(true);
        try {
            const token = await getToken();
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
            const codeForHint = (exerciseType === 'write' || exerciseType === 'debug') ? userCode : getAnswer();
            const res = await fetch(`${serverUrl}/api/ai/hint`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ exercisePrompt: activeExercise.prompt, userCode: codeForHint, attemptCount: currentAttempts }),
            });
            if (res.ok) { const data = await res.json(); setHint(data.hint); }
        } catch {}
        finally { setIsLoadingHint(false); }
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setCodeResult(null);
        try {
            const token = await getToken();
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
            const res = await fetch(`${serverUrl}/api/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ sourceCode: userCode }),
            });
            if (res.ok) { setCodeResult(await res.json()); }
            else { setCodeResult({ stderr: 'Failed to run code. Check server configuration.' }); }
        } catch { setCodeResult({ stderr: 'Could not connect to code runner.' }); }
        finally { setIsRunning(false); }
    };

    // ─── Option button styles ─────────────────────────────────────────────────

    const getOptionStyle = (option: string, mono = false) => {
        const base = `relative p-5 border-2 rounded-2xl text-left font-bold ${mono ? 'font-mono text-sm' : 'text-lg'} transition-all`;
        if (isChecked) {
            if (option === activeExercise.correctAnswer) return `${base} border-green-500 bg-green-50 text-green-700`;
            if (selectedOption === option) return `${base} border-red-500 bg-red-50 text-red-700`;
            return `${base} border-slate-200 text-slate-400 opacity-60`;
        }
        if (selectedOption === option) return `${base} border-brand-500 bg-brand-50 text-brand-600 ring-4 ring-brand-100`;
        return `${base} border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]`;
    };

    const OptionIndicator = ({ option }: { option: string }) => {
        if (!isChecked && selectedOption !== option) return null;
        if (isChecked && option === activeExercise.correctAnswer)
            return <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-green-500" />;
        if (isChecked && selectedOption === option)
            return <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-red-500" />;
        return (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-brand-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-brand-500 rounded-full" />
            </div>
        );
    };

    // ─── Exercise renderers ────────────────────────────────────────────────────

    const renderMCQ = () => (
        <div className="flex flex-col gap-4">
            {(activeExercise.options as string[])?.map((option, idx) => (
                <button key={idx} className={getOptionStyle(option)} onClick={() => !isChecked && setSelectedOption(option)} disabled={isChecked}>
                    <OptionIndicator option={option} />
                    {option}
                </button>
            ))}
        </div>
    );

    const renderFillBlank = () => {
        const parts = activeExercise.prompt.split('____');
        return (
            <div className="flex flex-col gap-6">
                <div className="text-xl font-bold text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
                    {parts.map((part, i) => (
                        <span key={i}>
                            {part}
                            {i < parts.length - 1 && (
                                <input
                                    type="text"
                                    value={textInput}
                                    onChange={e => !isChecked && setTextInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && hasAnswer() && !isChecked) handleCheck(); }}
                                    disabled={isChecked}
                                    className={`inline-block mx-2 px-3 py-1 border-b-4 rounded-lg font-mono text-base w-32 text-center focus:outline-none transition-colors ${
                                        isChecked
                                            ? isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'
                                            : 'border-brand-500 bg-brand-50 text-brand-700'
                                    }`}
                                    placeholder="type here"
                                />
                            )}
                        </span>
                    ))}
                </div>
                {isChecked && !isCorrect && (
                    <p className="text-sm font-bold text-slate-500">Correct answer: <span className="text-green-600 font-mono bg-green-50 px-2 py-1 rounded">{activeExercise.correctAnswer}</span></p>
                )}
            </div>
        );
    };

    const renderArrange = () => (
        <div className="flex flex-col gap-6">
            <div className={`min-h-16 p-4 border-2 border-dashed rounded-2xl flex flex-wrap gap-2 transition-colors ${
                isChecked ? (isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50') : 'border-brand-300 bg-brand-50/50'
            }`}>
                {arrangedTokens.length === 0
                    ? <span className="text-slate-400 font-medium text-sm">Tap tokens below to arrange them here</span>
                    : arrangedTokens.map((token, i) => (
                        <button
                            key={i}
                            className="bg-brand-500 text-white px-3 py-2 rounded-xl font-mono font-bold text-sm shadow-md active:scale-95 transition-transform"
                            onClick={() => { if (isChecked) return; setArrangedTokens(p => p.filter((_, j) => j !== i)); setAvailableTokens(p => [...p, token]); }}
                            disabled={isChecked}
                        >{token}</button>
                    ))
                }
            </div>
            <div className="flex flex-wrap gap-2">
                {availableTokens.map((token, i) => (
                    <button
                        key={i}
                        className="bg-white border-2 border-slate-300 px-3 py-2 rounded-xl font-mono font-bold text-sm shadow-sm hover:border-brand-400 hover:bg-brand-50 active:scale-95 transition-all"
                        onClick={() => { if (isChecked) return; setAvailableTokens(p => p.filter((_, j) => j !== i)); setArrangedTokens(p => [...p, token]); }}
                        disabled={isChecked}
                    >{token}</button>
                ))}
            </div>
            {isChecked && !isCorrect && (
                <p className="text-sm font-bold text-slate-500">Correct: <span className="text-green-600 font-mono bg-green-50 px-2 py-1 rounded">{activeExercise.correctAnswer}</span></p>
            )}
        </div>
    );

    const renderDebug = () => (
        <div className="flex flex-col gap-5">
            {activeExercise.codeTemplate && (
                <pre className="bg-slate-900 text-green-400 p-5 rounded-2xl font-mono text-sm overflow-x-auto shadow-xl leading-relaxed whitespace-pre-wrap">
                    {activeExercise.codeTemplate}
                </pre>
            )}
            <p className="font-bold text-slate-500 text-xs uppercase tracking-widest">Choose the fix:</p>
            <div className="flex flex-col gap-3">
                {(activeExercise.options as string[])?.map((option, idx) => (
                    <button key={idx} className={getOptionStyle(option, true)} onClick={() => !isChecked && setSelectedOption(option)} disabled={isChecked}>
                        <OptionIndicator option={option} />
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderWrite = () => (
        <div className="flex flex-col gap-4">
            <textarea
                value={userCode}
                onChange={e => !isChecked && setUserCode(e.target.value)}
                disabled={isChecked}
                spellCheck={false}
                rows={10}
                className="w-full bg-slate-900 text-green-400 p-5 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xl leading-relaxed"
                placeholder="// Write your Java code here..."
            />
            <div className="flex gap-3">
                <button
                    onClick={handleRunCode}
                    disabled={isRunning || userCode.trim().length === 0}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                    {isRunning ? 'Running...' : 'Run Code'}
                </button>
                {codeResult && (
                    <div className={`flex-1 px-4 py-2 rounded-xl text-xs font-mono font-bold ${codeResult.stderr || codeResult.compile_output ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                        {codeResult.stdout || codeResult.stderr || codeResult.compile_output || codeResult.status?.description || 'No output'}
                    </div>
                )}
            </div>
            {codeResult && (codeResult.stderr || codeResult.compile_output) && (
                <p className="text-xs text-red-500 font-medium">⚠ Check your code for errors and try again.</p>
            )}
        </div>
    );

    const renderExercise = () => {
        switch (exerciseType) {
            case 'mcq':        return renderMCQ();
            case 'fill_blank': return renderFillBlank();
            case 'arrange':    return renderArrange();
            case 'debug':      return renderDebug();
            case 'write':      return renderWrite();
        }
    };

    // For fill_blank the prompt is rendered inline — so show a different heading
    const showPromptAbove = exerciseType !== 'fill_blank';
    const typeLabel: Record<ExerciseType, string> = {
        mcq: 'Multiple Choice', fill_blank: 'Fill in the Blank',
        arrange: 'Arrange the Code', debug: 'Debug the Code', write: 'Write the Code',
    };

    const footerBg = isChecked
        ? (isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200')
        : 'bg-white border-slate-200';

    return (
        <div className="min-h-screen bg-white flex flex-col pt-4">
            <header className="px-4 max-w-3xl mx-auto w-full flex items-center gap-4 mb-8">
                <Link href="/home" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-8 h-8" />
                </Link>
                <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="flex items-center gap-1.5 text-red-500 font-bold text-lg">
                    <Heart className="w-6 h-6 fill-red-500" /> {hearts}
                </div>
            </header>

            <main className="flex-1 px-6 max-w-3xl mx-auto w-full flex flex-col pb-40">
                <span className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">{typeLabel[exerciseType]}</span>

                {showPromptAbove && (
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mb-8">
                        {activeExercise.prompt}
                    </h1>
                )}

                {renderExercise()}

                {/* Hint panel */}
                {hint && (
                    <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-amber-800 font-medium text-sm leading-relaxed">{hint}</p>
                    </div>
                )}
            </main>

            <footer className={`fixed bottom-0 left-0 right-0 p-4 border-t-2 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] transition-colors ${footerBg}`}>
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    {isChecked && (
                        <div className={`font-bold text-base ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrect ? '✅ Correct!' : '❌ Incorrect.'}
                            {activeExercise.explanation && (
                                <p className="text-sm mt-1 font-medium opacity-90">{activeExercise.explanation}</p>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between items-center w-full">
                        {/* Hint button — shown after first wrong attempt, before checking */}
                        {!isChecked && currentAttempts > 0 ? (
                            <button
                                onClick={handleGetHint}
                                disabled={isLoadingHint}
                                className="flex items-center gap-2 font-bold text-amber-600 hover:text-amber-700 uppercase tracking-widest text-sm p-2 transition-colors disabled:opacity-50"
                            >
                                {isLoadingHint ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                                Hint
                            </button>
                        ) : <div />}

                        {!isChecked ? (
                            <button
                                onClick={handleCheck}
                                disabled={!hasAnswer()}
                                className={`rounded-2xl px-12 py-4 font-bold text-xl uppercase tracking-wider transition-all shadow-lg ${
                                    hasAnswer()
                                        ? 'bg-brand-500 hover:bg-brand-600 border-b-[6px] border-brand-700 text-white active:translate-y-[6px] active:border-b-0'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                Check
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={isPending}
                                className={`rounded-2xl px-12 py-4 font-bold text-xl uppercase tracking-wider transition-all shadow-lg border-b-[6px] active:translate-y-[6px] active:border-b-0 text-white ${isPending ? 'opacity-50 cursor-not-allowed' : ''} ${isCorrect ? 'bg-green-500 hover:bg-green-600 border-green-700' : 'bg-red-500 hover:bg-red-600 border-red-700'}`}
                            >
                                {isPending ? 'Saving...' : 'Continue'}
                            </button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
}
