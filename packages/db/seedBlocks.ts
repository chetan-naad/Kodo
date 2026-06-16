import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Blocks unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Java Fundamentals" }
  });

  if (!stage) {
    throw new Error("Stage 'Java Fundamentals' not found. Run seedHistory.ts first.");
  }

  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Initialization Blocks" }
  });

  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Initialization Blocks",
      description: "Learn about Static Initialization Blocks (SIB) and Instance Initialization Blocks (IIB), their execution order, and use cases.",
      order: 11,
      published: true
    }
  });

  // --- LESSON 1: Static Initialization Block ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Static Initialization Block (SIB)",
      xpReward: 40,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "When does a Static Initialization Block (SIB) get executed?",
      options: [
        "After the main method",
        "Before the main method",
        "When an object is created",
        "Never, it must be called manually"
      ],
      correctAnswer: "Before the main method",
      explanation: "SIB gets executed before the main method. It is used to initialize static members of the class.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is SIB used for?",
      options: [
        "To initialize non-static members",
        "To initialize static members",
        "To create objects",
        "To define methods"
      ],
      correctAnswer: "To initialize static members",
      explanation: "SIB is specifically designed to initialize static members of the class.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "If there are multiple SIBs in a class, in what order do they execute?",
      options: [
        "Random order",
        "Reverse order",
        "Sequential order (top to bottom)",
        "Only the first one executes"
      ],
      correctAnswer: "Sequential order (top to bottom)",
      explanation: "We can have N number of SIBs and they execute sequentially from top to bottom.",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Declare a static variable 'a'. Use a static block to initialize 'a' to 10. Then print 'a' inside main.",
      options: [],
      correctAnswer: "10\n",
      explanation: "Use: static int a; then static { a = 10; } and finally System.out.println(a); in main.",
      codeTemplate: "class Demo {\n    static int a;\n    // Write a static block to set a = 10\n    \n    public static void main(String[] args) {\n        System.out.println(a);\n    }\n}",
      xpReward: 10,
      order: 4,
    }
  ];

  // --- LESSON 2: Instance Initialization Block ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Instance Initialization Block (IIB)",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "When does an Instance Initialization Block (IIB) get executed?",
      options: [
        "Before the main method",
        "After the program ends",
        "Whenever an object is created",
        "Only once during class loading"
      ],
      correctAnswer: "Whenever an object is created",
      explanation: "IIB gets executed every time an object of the class is created using the 'new' keyword.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is IIB used for?",
      options: [
        "To initialize static members",
        "To initialize non-static members",
        "To define constructors",
        "To override methods"
      ],
      correctAnswer: "To initialize non-static members",
      explanation: "IIB is specifically designed to initialize non-static (instance) members of the class.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Write an IIB (instance block without the 'static' keyword) that prints '----IIB----'. Then in main, create a new Demo object to trigger it.",
      options: [],
      correctAnswer: "----IIB----\n",
      explanation: "Use: { System.out.println(\"----IIB----\"); } as the instance block, and new Demo(); in main to trigger it.",
      codeTemplate: "class Demo {\n    // Write an instance initialization block here\n    \n    public static void main(String[] args) {\n        // Create a Demo object to trigger the IIB\n        \n    }\n}",
      xpReward: 20,
      order: 3,
    }
  ];

  const allExercises = [
    ...lesson1Exercises,
    ...lesson2Exercises
  ];

  for (const ex of allExercises) {
    // @ts-ignore
    await prisma.exercise.create({ data: ex });
  }

  console.log('Successfully seeded Java Blocks unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
