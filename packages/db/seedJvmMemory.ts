import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java JVM Memory unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Java Fundamentals" }
  });

  if (!stage) {
    throw new Error("Stage 'Java Fundamentals' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "JVM Memory" }
  });

  // Create Unit 8
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "JVM Memory",
      description: "Dive deep into the JVM Memory Architecture: Stack, Heap, Static Pool Area, and Method Area.",
      order: 8,
      published: true
    }
  });

  // --- LESSON 1: The 4 Memory Areas ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The 4 Memory Areas",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which memory area follows the Last In First Out (LIFO) principle and is used for execution?",
      options: [
        "Heap Memory",
        "Stack",
        "Static Pool Area",
        "Method Area"
      ],
      correctAnswer: "Stack",
      explanation: "The Stack is used for execution and strictly follows the Last In First Out (LIFO) principle.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Irrespective of whether a method is static or non-static, where are all method bodies/definitions stored?",
      options: [
        "Method Area",
        "Stack",
        "Heap Memory",
        "Static Pool Area"
      ],
      correctAnswer: "Method Area",
      explanation: "Method Area is specifically used to store all method bodies and definitions.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Where are all non-static members of a class stored?",
      options: [
        "Static Pool Area",
        "Method Area",
        "Heap Memory",
        "Stack"
      ],
      correctAnswer: "Heap Memory",
      explanation: "Whenever we create an object, its non-static members are stored in Heap Memory.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2: Object Creation Lifecycle ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Object Creation Lifecycle",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "During object creation, which operator creates a random memory space in the heap memory?",
      options: ["=", "new", "()", "class"],
      correctAnswer: "new",
      explanation: "The 'new' operator is responsible for allocating random memory space inside the heap memory.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Where is the object address (reference) stored?",
      options: [
        "In the Stack (via the reference variable)",
        "In the Heap Memory",
        "In the Static Pool Area",
        "In the Method Area"
      ],
      correctAnswer: "In the Stack (via the reference variable)",
      explanation: "The object itself lives in the Heap, but its address is stored in a reference variable located in the Stack.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Inside the main method, create an object of the Employee class and store its reference in a variable named 'e1'. Then print 'Object Created!'",
      options: [],
      correctAnswer: "Object Created!\n",
      explanation: "Use 'Employee e1 = new Employee();', then System.out.println(\"Object Created!\");",
      codeTemplate: "class Employee {\n    // Some non-static members could be here\n}\n\nclass Tester {\n    public static void main(String[] args) {\n        // Create Employee object and store in 'e1'\n        \n        // Print \"Object Created!\"\n        \n    }\n}",
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

  console.log('Successfully seeded Java JVM Memory unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
