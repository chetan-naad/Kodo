import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Basics unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Java Basics" }
  });

  // Create Unit 4
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Java Basics",
      description: "Learn about Java features and write your first Hello Java program.",
      order: 4,
      published: true
    }
  });

  // --- LESSON 1: Java Features ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Features of Java",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following is a primary feature of Java?",
      options: ["Platform dependent", "Low performance", "Object oriented", "Not secured"],
      correctAnswer: "Object oriented",
      explanation: "Java is an object-oriented programming language, making it easier to structure and manage complex software.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Java is considered a 'Polyglot' language on the JVM. What does this imply?",
      options: [
        "It can only run Java syntax.",
        "It translates English to code.",
        "Programs written in Java syntax are understood by various languages compiling to the JVM.",
        "It is built using Python."
      ],
      correctAnswer: "Programs written in Java syntax are understood by various languages compiling to the JVM.",
      explanation: "The JVM can run multiple languages (like Kotlin or Scala) making the ecosystem polyglot.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which combination correctly describes how Java code is processed?",
      options: ["Interpreted only", "Compiled only", "Compiled and interpreted", "Neither"],
      correctAnswer: "Compiled and interpreted",
      explanation: "Java source code is compiled into bytecode, which is then interpreted by the JVM.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2: Types in Java ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The 4 Core Types",
      xpReward: 20,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of these are the 4 main types found in Java?",
      options: [
        "Class, Interface, Enum, Annotation",
        "Object, String, Integer, Float",
        "Function, Method, Variable, Literal",
        "JVM, JRE, JDK, JIT"
      ],
      correctAnswer: "Class, Interface, Enum, Annotation",
      explanation: "The structural types in Java are Class, Interface, Enum, and Annotation.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is a 'Class' in Java?",
      options: [
        "A physical object",
        "A blueprint or template to create an object",
        "A primitive data type",
        "A compiler flag"
      ],
      correctAnswer: "A blueprint or template to create an object",
      explanation: "A Class defines the properties and behaviors that its objects will have.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 3: Hello Java ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Writing Hello Java",
      xpReward: 50,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What is the correct syntax to compile a Java file named Sample.java?",
      options: ["java Sample", "compile Sample.java", "javac Sample.java", "run Sample"],
      correctAnswer: "javac Sample.java",
      explanation: "The 'javac' command stands for Java Compiler and requires the full filename with extension.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "After compiling, what is the correct syntax to interpret (run) the Sample program?",
      options: ["java Sample.class", "java Sample", "javac Sample", "run Sample"],
      correctAnswer: "java Sample",
      explanation: "To run the program, use the 'java' command followed by just the class name (no extension).",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Time to code! Write the classic program to print exactly: Hello java",
      options: [],
      correctAnswer: "Hello java\n", // The output we expect to match
      explanation: "You need a class with a main method that calls System.out.println(\"Hello java\");",
      codeTemplate: "class Sample {\n    public static void main(String[] args) {\n        // Your code here\n        \n    }\n}",
      xpReward: 30,
      order: 3,
    }
  ];

  // --- LESSON 4: Printing Literals ---
  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Printing Data Types",
      xpReward: 50,
      order: 4,
      published: true
    }
  });

  const lesson4Exercises = [
    {
      lessonId: lesson4.id,
      type: "write",
      prompt: "Print the integer 20 on the first line, and the string \"Java\" on the second line.",
      options: [],
      correctAnswer: "20\nJava\n",
      explanation: "Use two separate System.out.println() statements. One for the int, one for the String.",
      codeTemplate: "class Sample {\n    public static void main(String[] args) {\n        // Print 20\n        \n        // Print \"Java\"\n        \n    }\n}",
      xpReward: 25,
      order: 1,
    },
    {
      lessonId: lesson4.id,
      type: "write",
      prompt: "Print the decimal 20.56, followed by the character 'A' on the next line.",
      options: [],
      correctAnswer: "20.56\nA\n",
      explanation: "Use System.out.println(20.56) and System.out.println('A'). Remember that characters use single quotes!",
      codeTemplate: "class Sample {\n    public static void main(String[] args) {\n        \n    }\n}",
      xpReward: 25,
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

  console.log('Successfully seeded Java Basics unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
