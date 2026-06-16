import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Static unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Java Fundamentals" }
  });

  if (!stage) {
    throw new Error("Stage 'Java Fundamentals' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Static vs Non-Static" }
  });

  // Create Unit 7
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Static vs Non-Static",
      description: "Understand the difference between class-level and object-level members, memory pools, and object creation.",
      order: 7,
      published: true
    }
  });

  // --- LESSON 1: Member Classification ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Classifying Members",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following members is ALWAYS non-static?",
      options: [
        "Variables",
        "Methods",
        "Constructor",
        "None of the above"
      ],
      correctAnswer: "Constructor",
      explanation: "Variables and methods can be classified into static and non-static. However, Constructors are always non-static.",
      xpReward: 10,
      order: 1,
    }
  ];

  // --- LESSON 2: Static Concept ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Understanding Static",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Where are all static members stored in memory?",
      options: ["Heap Memory", "Static Pool Area", "Stack Memory", "Cache"],
      correctAnswer: "Static Pool Area",
      explanation: "All static members are stored in the Static Pool Area and are associated with the class itself.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "How many copies of a static member exist?",
      options: ["One copy", "Multiple copies", "Infinite copies", "Zero copies"],
      correctAnswer: "One copy",
      explanation: "Static members have exactly one copy shared across the entire class.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "In the Tester class, call the static method 'area()' from the Circle class.",
      options: [],
      correctAnswer: "result is78.55\n", // 3.142 * 5 * 5
      explanation: "To access a static member from another class, use Class_name.method_name(). So here: Circle.area();",
      codeTemplate: "class Circle {\n    static void area() {\n        final double pi = 3.142;\n        int r = 5;\n        double result = pi * r * r;\n        System.out.println(\"result is\" + result);\n    }\n}\n\nclass Tester {\n    public static void main(String[] args) {\n        // Call area() from Circle here\n        \n    }\n}",
      xpReward: 20,
      order: 3,
    }
  ];

  // --- LESSON 3: Non-Static Concept ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Understanding Non-Static",
      xpReward: 40,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Where are Non-Static members stored in memory?",
      options: ["Heap Memory", "Static Pool Area", "Stack Memory", "Cache"],
      correctAnswer: "Heap Memory",
      explanation: "All non-static members are stored in Heap memory and are associated with an object, meaning they can have multiple copies.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What is the correct syntax to create an object of a class named 'Sample'?",
      options: [
        "Sample object = Sample();",
        "new Sample();",
        "create Sample();",
        "Sample.new();"
      ],
      correctAnswer: "new Sample();",
      explanation: "The 'new' operator followed by the constructor 'Sample()' is used to instantiate an object.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Inside main, call the parameterised static method 'area(5)' from the Circle class.",
      options: [],
      correctAnswer: "result is78.55\n", // 3.142 * 5 * 5
      explanation: "Even with parameters, accessing a static method from another class is: Circle.area(5);",
      codeTemplate: "class Circle {\n    static void area(int r) {\n        final double pi = 3.142;\n        double result = pi * r * r;\n        System.out.println(\"result is\" + result);\n    }\n}\n\nclass Tester {\n    public static void main(String[] args) {\n        // Call area(5) from Circle here\n        \n    }\n}",
      xpReward: 20,
      order: 3,
    }
  ];

  const allExercises = [
    ...lesson1Exercises,
    ...lesson2Exercises,
    ...lesson3Exercises
  ];

  for (const ex of allExercises) {
    // @ts-ignore
    await prisma.exercise.create({ data: ex });
  }

  console.log('Successfully seeded Java Static unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
