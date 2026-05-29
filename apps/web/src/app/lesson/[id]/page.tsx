import { prisma } from '@kodo/db';
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from 'next/navigation';
import LessonClient from './LessonClient';

export default async function LessonPage({ params }: { params: { id: string } }) {
    const user = await currentUser();
    let hearts = 5; // Default

    if (user) {
        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { hearts: true }
        });
        if (dbUser) hearts = dbUser.hearts;
    }

    // Fetch the lesson and its exercises
    const lesson = await prisma.lesson.findUnique({
        where: { id: params.id },
        include: {
            exercises: {
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!lesson || !lesson.exercises || lesson.exercises.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-slate-800">Lesson not found or has no exercises yet.</h1>
            </div>
        );
    }

    return (
        <LessonClient 
            lessonId={lesson.id} 
            exercises={lesson.exercises as any[]} 
            initialHearts={hearts} 
        />
    );
}
