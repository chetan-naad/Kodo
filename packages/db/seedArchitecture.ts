import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Architecture unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Java Architecture" }
  });

  // Create Unit 3
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Java Architecture",
      description: "Learn about JVM, JRE, JDK, and how Java runs.",
      order: 3,
      published: true
    }
  });

  // --- LESSON 1: JVM, JRE, and JDK ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "JVM, JRE, and JDK",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What does JVM stand for?",
      options: ["Java Versatile Machine", "Java Virtual Machine", "Java Visual Model", "Just Virtual Machine"],
      correctAnswer: "Java Virtual Machine",
      explanation: "JVM stands for Java Virtual Machine, the engine that provides a runtime environment to drive the Java Code or applications.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which component physically exists and contains the JVM plus library classes?",
      options: ["JDK", "JIT", "JRE", "JVM"],
      correctAnswer: "JRE",
      explanation: "JRE (Java Runtime Environment) physically exists. It contains JVM and set of libraries and other files that JVM uses at runtime.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is required to DEVELOP Java applications?",
      options: ["JRE only", "JVM only", "JDK", "JIT"],
      correctAnswer: "JDK",
      explanation: "JDK (Java Development Kit) contains tools needed to develop the Java programs (like javac), and also includes the JRE.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2: Compilation vs Interpretation ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Compilation vs Interpretation",
      xpReward: 30,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What does the Java compiler (javac) convert source code into?",
      options: ["Machine code", "Bytecode", "Assembly language", "Binary code"],
      correctAnswer: "Bytecode",
      explanation: "The Java compiler converts .java files (source code) into .class files, which contain Bytecode.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Who is responsible for interpreting the Bytecode into machine code at runtime?",
      options: ["The Operating System", "JDK", "JVM", "JRE"],
      correctAnswer: "JVM",
      explanation: "The Java Virtual Machine (JVM) interprets the bytecode line-by-line and converts it into machine-specific code.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What component inside the JVM helps improve performance by compiling bytecode into native machine code at runtime?",
      options: ["JIT Compiler", "javac", "Garbage Collector", "Class Loader"],
      correctAnswer: "JIT Compiler",
      explanation: "The JIT (Just-In-Time) compiler is part of the JVM. It compiles parts of the bytecode that have similar functionality at the same time, reducing the amount of time needed for compilation.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 3: Platform Independence ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Platform Independence",
      xpReward: 30,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Java is often described by the acronym WORA. What does WORA stand for?",
      options: [
        "Write Once, Read Anywhere",
        "Write Once, Run Anywhere",
        "Work On, Run Always",
        "Windows Or, Run Anywhere"
      ],
      correctAnswer: "Write Once, Run Anywhere",
      explanation: "WORA means you can write Java code once on one platform and run it on any other platform equipped with a JVM.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Is the JVM platform independent?",
      options: ["Yes", "No"],
      correctAnswer: "No",
      explanation: "The JVM is platform-DEPENDENT. There are different JVMs for Windows, Mac, and Linux. However, they all understand the same platform-independent Bytecode.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What makes Java platform-independent?",
      options: ["The JDK", "The JIT compiler", "Bytecode", "The Operating System"],
      correctAnswer: "Bytecode",
      explanation: "Bytecode can run on any OS, as long as that OS has a JVM installed to interpret it.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 4: Memory Management ---
  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Memory Management (Garbage Collection)",
      xpReward: 30,
      order: 4,
      published: true
    }
  });

  const lesson4Exercises = [
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "How does Java handle memory management?",
      options: [
        "The programmer must manually allocate and free memory.",
        "Java does not use memory.",
        "Java uses an automatic Garbage Collector.",
        "The OS manages it completely without JVM involvement."
      ],
      correctAnswer: "Java uses an automatic Garbage Collector.",
      explanation: "Java has automatic memory management. The Garbage Collector automatically destroys objects that are no longer in use.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Can a programmer force the Garbage Collector to run immediately?",
      options: ["Yes, using System.gc()", "No, it's strictly up to the JVM"],
      correctAnswer: "No, it's strictly up to the JVM",
      explanation: "While you can request garbage collection using System.gc(), you cannot guarantee or force it to run immediately.",
      xpReward: 10,
      order: 2,
    }
  ];

  const allExercises = [
    ...lesson1Exercises,
    ...lesson2Exercises,
    ...lesson3Exercises,
    ...lesson4Exercises
  ];

  for (const ex of allExercises) {
    // @ts-ignore
    await prisma.exercise.create({ data: ex });
  }

  console.log('Successfully seeded Java Architecture unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
