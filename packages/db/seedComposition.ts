import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Composition unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Java Fundamentals" }
  });

  if (!stage) {
    throw new Error("Stage 'Java Fundamentals' not found. Run seedHistory.ts first.");
  }

  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Composition" }
  });

  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Composition",
      description: "Understand Composition (Has-A relationship), class diagrams, and how one class can use objects of another.",
      order: 10,
      published: true
    }
  });

  // --- LESSON 1: What is Composition ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "What is Composition?",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Composition in Java?",
      options: [
        "A class inheriting from another class",
        "A class having an object of another class",
        "A class implementing an interface",
        "A class with only static members"
      ],
      correctAnswer: "A class having an object of another class",
      explanation: "Composition (also called Aggregation) is when a class has an object of another class. It is also called a 'Has-A' relationship.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Composition is also known as which type of relationship?",
      options: [
        "Is-A relationship",
        "Has-A relationship",
        "Uses-A relationship",
        "Extends-A relationship"
      ],
      correctAnswer: "Has-A relationship",
      explanation: "Composition is called a 'Has-A' relationship. For example: 'Sample HAS-A Tester object'.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 2: Class Diagrams ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Class Diagrams",
      xpReward: 30,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is a Class Diagram?",
      options: [
        "A diagram showing the flow of a program",
        "A pictorial representation to represent the members of a class",
        "A diagram of the JVM memory",
        "A flowchart for debugging"
      ],
      correctAnswer: "A pictorial representation to represent the members of a class",
      explanation: "A class diagram is a pictorial representation used to visually show the members (variables and methods) of a class.",
      xpReward: 10,
      order: 1,
    }
  ];

  // --- LESSON 3: Composition in Action ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Composition in Action",
      xpReward: 50,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Inside the Sample class's main method, create a Tester object stored in 't1', then call t1.add() to print 'hii'.",
      options: [],
      correctAnswer: "hii\n",
      explanation: "Use: Tester t1 = new Tester(); t1.add(); — This demonstrates composition: Sample HAS-A Tester.",
      codeTemplate: "class Tester {\n    void add() {\n        System.out.println(\"hii\");\n    }\n}\n\nclass Sample {\n    public static void main(String[] args) {\n        // Create Tester object in 't1' and call add()\n        \n    }\n}",
      xpReward: 30,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "In the example where Sample creates a Tester object, which class 'HAS-A' relationship with the other?",
      options: [
        "Tester HAS-A Sample",
        "Sample HAS-A Tester",
        "Both have each other",
        "Neither has a relationship"
      ],
      correctAnswer: "Sample HAS-A Tester",
      explanation: "Sample contains a Tester object (t1), so Sample HAS-A Tester. The arrow in the class diagram points from Sample to Tester.",
      xpReward: 20,
      order: 2,
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

  console.log('Successfully seeded Java Composition unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
