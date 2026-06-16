import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Methods unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Java Fundamentals" }
  });

  if (!stage) {
    throw new Error("Stage 'Java Fundamentals' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Class Members & Methods" }
  });

  // Create Unit 6
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Class Members & Methods",
      description: "Discover variables, methods, and constructors. Learn how to write methods with parameters and return types.",
      order: 6,
      published: true
    }
  });

  // --- LESSON 1: Class Members ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Members of a Class",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What are the 3 main members of a Class in Java?",
      options: [
        "Variables, Methods, Constructor",
        "Strings, Integers, Booleans",
        "Classes, Interfaces, Enums",
        "Loops, Conditionals, Arrays"
      ],
      correctAnswer: "Variables, Methods, Constructor",
      explanation: "Variables store data, Methods perform operations, and Constructors initialize variables.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the primary purpose of a Method?",
      options: [
        "To initialize variables.",
        "To store data in memory.",
        "To perform some operations when called.",
        "To define the class structure."
      ],
      correctAnswer: "To perform some operations when called.",
      explanation: "A Method is a block of statements which gets executed whenever it is called or invoked to perform a specific operation.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 2: Basic Methods & Final Variables ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Basic Methods & Final",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is the output of: System.out.println(1/2);",
      options: ["0.5", "0", "1", "Error"],
      correctAnswer: "0",
      explanation: "In Java, dividing two integers results in an integer. 1 divided by 2 is 0.5, but the decimal is truncated, resulting in 0.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is the output of: System.out.println(1/2.0);",
      options: ["0", "0.5", "1", "Error"],
      correctAnswer: "0.5",
      explanation: "If one of the operands is a decimal (like 2.0), the result will be a decimal.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Write a static method called 'area()' that calculates the area of a circle with radius 4. Use a 'final double pi = 3.142;' inside the method.",
      options: [],
      correctAnswer: "50.272\n", // 3.142 * 4 * 4
      explanation: "Create static void area() { final double pi = 3.142; int r = 4; double result = pi * r * r; System.out.println(result); }",
      codeTemplate: "class Circle {\n    // Create static void area() method here\n    \n    public static void main(String[] args) {\n        area();\n    }\n}",
      xpReward: 20,
      order: 3,
    }
  ];

  // --- LESSON 3: Method Parameters ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Methods with Parameters",
      xpReward: 40,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Update the area method to accept the radius as an input parameter: 'static void area(int r)'. In main, call 'area(6)'.",
      options: [],
      correctAnswer: "113.112\n", // 3.142 * 6 * 6
      explanation: "Change the method signature to area(int r). Remove 'int r=4' from inside the method.",
      codeTemplate: "class Circle {\n    static void area(int r) {\n        final double pi = 3.142;\n        double result = pi * r * r;\n        System.out.println(result);\n    }\n    public static void main(String[] args) {\n        // Call area with 6 here\n        \n    }\n}",
      xpReward: 40,
      order: 1,
    }
  ];

  // --- LESSON 4: Return Types ---
  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Methods with Return Types",
      xpReward: 40,
      order: 4,
      published: true
    }
  });

  const lesson4Exercises = [
    {
      lessonId: lesson4.id,
      type: "write",
      prompt: "Write an 'area' method that RETURNS the double result instead of printing it. The radius 'r' is 5 inside the method. Print the returned value in main.",
      options: [],
      correctAnswer: "area is 78.55\n", // 3.142 * 5 * 5
      explanation: "Use 'static double area()' and 'return result;'. In main, do 'double x = area(); System.out.println(\"area is \" + x);'",
      codeTemplate: "class Circle {\n    // Create static double area() method here\n    \n    public static void main(String[] args) {\n        // Call area(), store it in a variable, and print it\n        \n    }\n}",
      xpReward: 40,
      order: 1,
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

  console.log('Successfully seeded Java Methods unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
