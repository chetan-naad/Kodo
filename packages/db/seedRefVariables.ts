import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Reference Variables unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Java Fundamentals" }
  });

  if (!stage) {
    throw new Error("Stage 'Java Fundamentals' not found. Run seedHistory.ts first.");
  }

  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Reference Variables" }
  });

  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Reference Variables",
      description: "Understand how reference variables store object addresses, declaration vs initialization, and how multiple references work.",
      order: 9,
      published: true
    }
  });

  // --- LESSON 1: What is a Reference Variable ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "What is a Reference Variable?",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What does a Reference Variable store?",
      options: [
        "The actual object data",
        "A primitive value like int or double",
        "An object address (or null)",
        "The method definition"
      ],
      correctAnswer: "An object address (or null)",
      explanation: "A reference variable is a special type of variable which stores either null or an object address.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the correct syntax for declaring a reference variable of type 'Tester'?",
      options: [
        "int t1;",
        "Tester t1;",
        "new Tester t1;",
        "ref Tester t1;"
      ],
      correctAnswer: "Tester t1;",
      explanation: "Syntax: class_name reference_variable; → Example: Tester t1;",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 2: Declaration & Initialization ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Declaration & Initialization",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which line correctly declares AND initializes a reference variable in one step?",
      options: [
        "Tester t1; t1 = new Tester();",
        "Tester t1 = new Tester();",
        "new Tester() = t1;",
        "Tester = new t1();"
      ],
      correctAnswer: "Tester t1 = new Tester();",
      explanation: "This is the homogenous type of object creation: class_name ref_variable = new constructor();",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create an object of the Tester class, store it in reference variable 't1', then call t1.disp() to print 'Hii'.",
      options: [],
      correctAnswer: "Hii\n",
      explanation: "Use: Tester t1 = new Tester(); then t1.disp();",
      codeTemplate: "class Tester {\n    void disp() {\n        System.out.println(\"Hii\");\n    }\n    public static void main(String[] args) {\n        // Create Tester object in 't1' and call disp()\n        \n    }\n}",
      xpReward: 30,
      order: 2,
    }
  ];

  // --- LESSON 3: Non-static to Static via Reference ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Calling Non-Static Methods",
      xpReward: 40,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Create an object of the Circle class using 'Circle c1 = new Circle();'. Then call c1.area() to compute and print the area.",
      options: [],
      correctAnswer: "50.272\n",
      explanation: "To call a non-static method from a static context (main), you need to create an object first: Circle c1 = new Circle(); c1.area();",
      codeTemplate: "class Circle {\n    void area() {\n        final double pi = 3.142;\n        int r = 4;\n        double result = pi * r * r;\n        System.out.println(result);\n    }\n    public static void main(String[] args) {\n        // Create Circle object in 'c1' and call area()\n        \n    }\n}",
      xpReward: 40,
      order: 1,
    }
  ];

  // --- LESSON 4: Multiple References & Address ---
  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Multiple References & Addresses",
      xpReward: 40,
      order: 4,
      published: true
    }
  });

  const lesson4Exercises = [
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "What happens when you print a reference variable directly? e.g. System.out.println(d1);",
      options: [
        "It prints the object data",
        "It prints the fully qualified path: package.class@hexadecimal",
        "It throws an error",
        "It prints null"
      ],
      correctAnswer: "It prints the fully qualified path: package.class@hexadecimal",
      explanation: "Printing a reference variable outputs its fully qualified path: package_name.class_name@hexadecimal_number, e.g., Demo@15db9742",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "If 'd1' and 'd2' are two separate objects (Demo d1 = new Demo(); Demo d2 = new Demo();), will they have the same address?",
      options: [
        "Yes, same address",
        "No, different addresses",
        "Only if they have the same values",
        "Depends on the JVM"
      ],
      correctAnswer: "No, different addresses",
      explanation: "Multiple objects stored in multiple reference variables have different addresses. Changes to one object will NOT affect the other.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "If we do 'Demo d2 = d1;' (instead of new Demo()), what happens?",
      options: [
        "d2 creates a new object",
        "d2 points to the SAME object as d1 (same address)",
        "d2 becomes null",
        "It throws an error"
      ],
      correctAnswer: "d2 points to the SAME object as d1 (same address)",
      explanation: "When we assign d2 = d1, both reference variables point to the same object in heap memory, so they share the same address.",
      xpReward: 10,
      order: 3,
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

  console.log('Successfully seeded Java Reference Variables unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
