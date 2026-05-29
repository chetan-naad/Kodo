import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Star, Flame, Heart, Shield, ShoppingBag, Check, RotateCcw, BookOpen, FlaskConical } from "lucide-react";
import Link from 'next/link';
import { prisma } from '@kodo/db';
import { resetUserProgress } from '../actions/progress';

export default async function Home({ searchParams }: { searchParams: { dev?: string } }) {
    const isDevMode = searchParams?.dev === 'true';
    const user = await currentUser();
    let dbUser = null;
    let userProgress = [];

    if (user) {
        dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        // Create an initial user record if they just signed up and aren't synced yet
        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.emailAddresses[0]?.emailAddress ?? "unknown@example.com",
                    name: user.firstName ? `${user.firstName} ${user.lastName || ''}` : "Player",
                    hearts: 5,
                    xpTotal: 0,
                    gems: 0,
                }
            });
        }

        userProgress = await prisma.userProgress.findMany({
            where: { userId: user.id },
            select: { lessonId: true }
        });
    }

    const completedLessonIds = new Set(userProgress.map(p => p.lessonId));

    // Fetch streak
    const streak = user ? await prisma.streak.findUnique({ where: { userId: user.id } }) : null;

    // Fetch the active stage, its units, and lessons
    const stage = await prisma.stage.findFirst({
        where: { published: true },
        orderBy: { order: 'asc' },
        include: {
            units: {
                where: { published: true },
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        where: { published: true },
                        orderBy: { order: 'asc' },
                    }
                }
            }
        }
    });

    const allLessons = stage?.units.flatMap(u => u.lessons) || [];
    const globalActiveLesson = allLessons.find((l) => !completedLessonIds.has(l.id));

    // Derive display stats
    const heartsCount = dbUser?.hearts ?? 5;
    const streakCount = streak?.currentStreak ?? 0;
    const xpCount = dbUser?.xpTotal ?? 0;

    // Path drawing helper
    const getCenter = (idx: number) => {
        const y = 88 + 120 * idx;
        let x = 250;
        if (idx === 0) x = 250;
        else if (idx % 2 === 0) x = 218; // -translate-x-8
        else x = 298; // translate-x-12
        return { x, y };
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="sticky top-0 bg-white border-b border-slate-200 z-30 p-4 flex items-center justify-between">
                <h1 className="text-xl font-extrabold text-brand-500 tracking-tight">Kodo</h1>
                <div className="flex items-center gap-4 text-slate-600 font-bold w-full justify-end max-w-sm ml-auto">
                    <Link 
                        href={isDevMode ? "/home" : "/home?dev=true"}
                        className={`text-[10px] font-black tracking-widest px-2 py-1 rounded-md border-2 uppercase transition-all ${isDevMode ? 'bg-purple-500 text-white border-purple-600 shadow-sm' : 'bg-slate-200 text-slate-400 border-slate-300'}`}
                    >
                        {isDevMode ? "Dev: ON" : "Dev: OFF"}
                    </Link>
                    <div className="flex items-center gap-1.5 text-red-500"><Heart className="w-[18px] h-[18px] fill-red-500" /> {heartsCount}</div>
                    <div className="flex items-center gap-1.5 text-orange-500"><Flame className="w-[18px] h-[18px] fill-orange-500" /> {streakCount}</div>
                    <div className="flex items-center gap-1.5 text-blue-500"><Star className="w-[18px] h-[18px] fill-blue-500" /> {xpCount}</div>
                    <UserButton />
                </div>
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-8 pb-32">
                {stage && stage.units.length > 0 ? (
                    stage.units.map((unit) => {
                        const lessons = unit.lessons || [];
                        let unitActiveIndex = lessons.findIndex((l) => !completedLessonIds.has(l.id));
                        if (unitActiveIndex === -1 && lessons.length > 0) unitActiveIndex = lessons.length;

                        const GUIDE_MAP: Record<number, string> = {
                            1: 'java-history',
                            2: 'java-tokens',
                            3: 'java-architecture',
                            4: 'java-basics',
                            5: 'java-variables',
                            6: 'java-methods',
                            7: 'java-static',
                            8: 'java-jvm-memory',
                            9: 'java-references',
                            10: 'java-composition',
                            11: 'java-blocks',
                            12: 'java-pass-by-value',
                            13: 'java-constructors',
                            14: 'java-method-overloading',
                            15: 'java-inheritance',
                            16: 'java-method-overriding',
                            17: 'java-type-casting',
                            18: 'java-polymorphism',
                            19: 'java-abstract-class',
                            20: 'java-interface',
                            21: 'java-abstraction',
                            22: 'java-encapsulation',
                            23: 'java-object-class',
                            24: 'java-exception-handling',
                            25: 'java-stack-unwinding'
                        };
                        const guideSlug = GUIDE_MAP[unit.order] || 'java-blocks';

                        const getSegmentPath = (fromIdx: number, toIdx: number) => {
                            if (fromIdx >= toIdx) return "";
                            let d = "";
                            for (let i = fromIdx; i < toIdx; i++) {
                                if (i >= lessons.length - 1) break;
                                const p1 = getCenter(i);
                                const p2 = getCenter(i + 1);
                                if (i === fromIdx) d += `M ${p1.x} ${p1.y} `;
                                d += `C ${p1.x} ${p1.y + 60}, ${p2.x} ${p2.y - 60}, ${p2.x} ${p2.y} `;
                            }
                            return d;
                        };

                        return (
                            <div key={unit.id} className="flex flex-col gap-4 mt-4 mb-8">
                                <div className="bg-brand-500 text-white rounded-2xl p-5 shadow-lg border-b-4 border-brand-700 flex justify-between items-center z-20 relative">
                                    <div>
                                        <h2 className="text-2xl font-bold">{stage.title}</h2>
                                        <p className="text-brand-100 font-medium">Unit {unit.order} • {unit.title}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {isDevMode && lessons.length > 0 && (
                                            <Link 
                                                href={`/lesson/${lessons[0].id}`} 
                                                className="bg-purple-500 hover:bg-purple-400 p-3 rounded-xl border-b-4 border-purple-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 font-bold text-white text-sm"
                                            >
                                                <FlaskConical className="w-5 h-5" />
                                                Dev Test
                                            </Link>
                                        )}
                                        <Link 
                                            href={`/guide/${guideSlug}`} 
                                            className="bg-brand-600 hover:bg-brand-400 p-3 rounded-xl border-b-4 border-brand-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 font-bold"
                                        >
                                            <BookOpen className="w-5 h-5" />
                                            Guide
                                        </Link>
                                    </div>
                                </div>

                                <div className="py-12 flex flex-col items-center gap-10 relative overflow-visible mt-4">
                                    {/* SVG dashed line drawing connecting all nodes */}
                                    <svg className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-full pointer-events-none" preserveAspectRatio="none">
                                        <style>{`
                                            @keyframes flow {
                                                from { stroke-dashoffset: 32; }
                                                to { stroke-dashoffset: 0; }
                                            }
                                            .path-flow {
                                                animation: flow 1s linear infinite;
                                            }
                                        `}</style>

                                        {/* Base Gray Line (Locked) */}
                                        <path 
                                            d={getSegmentPath(0, lessons.length)} 
                                            stroke="#e2e8f0" 
                                            strokeWidth="8" 
                                            fill="none" 
                                            strokeLinecap="round" 
                                            strokeDasharray="16 16" 
                                        />

                                        {/* Filled Golden Line (Completed) */}
                                        {unitActiveIndex > 1 && (
                                            <path 
                                                d={getSegmentPath(0, unitActiveIndex - 1)} 
                                                stroke="#facc15" 
                                                strokeWidth="8" 
                                                fill="none" 
                                                strokeLinecap="round" 
                                                strokeDasharray="16 16" 
                                                className="path-flow"
                                            />
                                        )}

                                        {/* Animated Green Line (Active Connecting to Current Lesson) */}
                                        {unitActiveIndex > 0 && unitActiveIndex < lessons.length && globalActiveLesson && lessons[unitActiveIndex].id === globalActiveLesson.id && (
                                            <path 
                                                d={getSegmentPath(unitActiveIndex - 1, unitActiveIndex)} 
                                                stroke="#10b981" 
                                                strokeWidth="8" 
                                                fill="none" 
                                                strokeLinecap="round" 
                                                strokeDasharray="16 16" 
                                                className="path-flow"
                                            />
                                        )}
                                    </svg>

                                    {lessons.map((lesson, idx) => {
                                        const isEven = idx % 2 === 0;
                                        const offsetClass = idx === 0 ? "" : (isEven ? "-translate-x-8" : "translate-x-12");
                                        
                                        const isCompleted = completedLessonIds.has(lesson.id);
                                        const isActive = globalActiveLesson?.id === lesson.id;
                                        // Still visually calculate if it's "locked" for styling
                                        const isLocked = !isCompleted && !isActive;

                                        let nodeClass = "";
                                        let icon = null;

                                        if (isCompleted) {
                                            nodeClass = "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 shadow-xl group-active:border-b-0 group-active:translate-y-2";
                                            icon = <Check className="w-10 h-10 text-white stroke-[4px]" />;
                                        } else if (isActive) {
                                            nodeClass = "bg-brand-500 border-brand-700 hover:bg-brand-600 shadow-xl animate-bounce group-active:border-b-0 group-active:translate-y-2 group-active:animate-none";
                                            icon = <Star className="w-10 h-10 text-white fill-white" />;
                                        } else {
                                            nodeClass = `bg-slate-200 border-slate-300 opacity-80 ${isDevMode ? 'hover:bg-slate-300 group-active:border-b-0 group-active:translate-y-2 transition-all' : 'cursor-not-allowed'}`;
                                            icon = <Star className="w-10 h-10 text-slate-400 fill-slate-400" />;
                                        }
                                        
                                        const LinkComponent = (isLocked && !isDevMode) ? "div" : Link;
                                        
                                        return (
                                            <LinkComponent key={lesson.id} href={(isLocked && !isDevMode) ? "#" : `/lesson/${lesson.id}`} className={`relative z-10 group ${offsetClass}`}>
                                                <div className={`w-20 h-20 rounded-full border-b-[8px] flex items-center justify-center transform transition-all ${nodeClass}`}>
                                                    {icon}
                                                </div>
                                            </LinkComponent>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-slate-500 mt-20">
                        <p className="font-bold text-xl">Coming Soon!</p>
                        <p>More lessons are being built.</p>
                    </div>
                )}
                
                {/* DEV ONLY RESET BUTTON */}
                {isDevMode && (
                    <form action={resetUserProgress} className="mt-8 flex justify-center mb-8">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-500 rounded-lg font-bold text-sm tracking-wide border-b-4 border-slate-300 active:border-b-0 active:translate-y-[4px] transition-all hover:bg-slate-300 hover:text-slate-600">
                            <RotateCcw className="w-4 h-4" /> Reset Progress (Dev)
                        </button>
                    </form>
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 z-50 rounded-t-3xl md:rounded-none pb-safe">
                <div className="max-w-md mx-auto flex justify-between p-3 px-6 text-slate-400">
                    <Link href="/home" className="text-brand-500 flex flex-col items-center transition-transform hover:scale-105 active:scale-95">
                        <Star className="w-7 h-7 fill-brand-500 mb-1" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Learn</span>
                    </Link>
                    <Link href="/leaderboard" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <Shield className="w-7 h-7 mb-1" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">League</span>
                    </Link>
                    <Link href="/shop" className="flex flex-col items-center hover:text-slate-600 transition-transform hover:scale-105 active:scale-95">
                        <ShoppingBag className="w-7 h-7 mb-1" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Shop</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
