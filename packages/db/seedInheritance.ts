import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Inheritance unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Inheritance" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Inheritance",
      description: "Learn how to inherit properties from one class to another for code reusability. Explore the 5 types of inheritance.",
      order: 15,
      published: true
    }
  });

  // --- LESSON 1: Intro to Inheritance & Single Level ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Introduction & Single Level",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the main purpose of Inheritance in Java?",
      options: [
        "To run code faster.",
        "To achieve code reusability.",
        "To hide data from users.",
        "To allocate memory dynamically."
      ],
      correctAnswer: "To achieve code reusability.",
      explanation: "We go for inheritance primarily for code reusability by inheriting the property from one class to another class.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Single Level Inheritance?",
      options: [
        "A subclass inheriting properties from multiple super classes.",
        "Multiple subclasses inheriting from one super class.",
        "A subclass inheriting the properties from only one super class.",
        "A subclass inheriting from another subclass."
      ],
      correctAnswer: "A subclass inheriting the properties from only one super class.",
      explanation: "A subclass inheriting the properties from only super class is called as single level inheritance.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Create a 'Demo' class with 'int a = 10;'. Create a 'Sample' class that extends 'Demo' and has a 'void disp()' method printing 'hello'. In main, create a Sample object, call 'disp()', and print 'a'.",
      options: [],
      correctAnswer: "hello\n10\n",
      explanation: "Sample inherits the variable 'a' from Demo. When we create a Sample object, we can access both 'disp()' and 'a'.",
      codeTemplate: "class Demo {\n    int a = 10;\n}\n\nclass Sample extends Demo {\n    // Write void disp() here\n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        // Create Sample s1, call disp(), print s1.a\n    }\n}",
      xpReward: 30,
      order: 3,
    }
  ];

  // --- LESSON 2: Multi-Level & Hierarchical Inheritance ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Multi-Level & Hierarchical",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of the following describes Multi-level Inheritance?",
      options: [
        "A -> B, A -> C (One superclass, multiple subclasses)",
        "A -> B -> C (A subclass inherits from a subclass)",
        "B -> A, C -> A (Multiple superclasses, one subclass)",
        "A -> B, B -> C, C -> A (Circular inheritance)"
      ],
      correctAnswer: "A -> B -> C (A subclass inherits from a subclass)",
      explanation: "A subclass inheriting from its super class, which in turn inherits from its super class is called multi-level inheritance.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of the following describes Hierarchical Inheritance?",
      options: [
        "A subclass inheriting properties from multiple super classes.",
        "Multiple sub classes inheriting properties from only one common super class.",
        "A combination of single and multi-level inheritance.",
        "A subclass inheriting from a subclass."
      ],
      correctAnswer: "Multiple sub classes inheriting properties from only one common super class.",
      explanation: "Multiple sub classes inheriting the properties from only one common super class is called hierarchical inheritance.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "debug",
      prompt: "Fix the Hierarchical inheritance code. Class 'Sample' is supposed to inherit from 'Tester', but currently it extends itself!",
      options: [],
      correctAnswer: "class Tester {\n    int y = 10;\n}\nclass Demo extends Tester {\n    void add() { System.out.println(\"hi\"); }\n}\nclass Sample extends Tester {\n    void add() { System.out.println(\"hi\"); }\n}\nclass Mainclass {\n    public static void main(String[] args) {\n        System.out.println(\"Demo object\");\n        Demo d3 = new Demo();\n    }\n}",
      explanation: "In hierarchical inheritance, both Demo and Sample must extend Tester. 'class Sample extends Sample' is invalid.",
      codeTemplate: "class Tester {\n    int y = 10;\n}\nclass Demo extends Tester {\n    void add() { System.out.println(\"hi\"); }\n}\nclass Sample extends Sample { // FIX ME\n    void add() { System.out.println(\"hi\"); }\n}\nclass Mainclass {\n    public static void main(String[] args) {\n        System.out.println(\"Demo object\");\n        Demo d3 = new Demo();\n    }\n}",
      xpReward: 30,
      order: 3,
    }
  ];

  // --- LESSON 3: Multiple & Hybrid Inheritance ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Multiple & Hybrid Inheritance",
      xpReward: 30,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What is Multiple Inheritance?",
      options: [
        "A sub class inheriting properties from multiple super classes.",
        "A super class inheriting from multiple sub classes.",
        "Multiple classes inheriting from one class.",
        "Inheriting properties over multiple levels."
      ],
      correctAnswer: "A sub class inheriting properties from multiple super classes.",
      explanation: "A sub class inheriting the properties from multiple super classes is called as Multiple Inheritance (Note: Java does not support this with classes, only interfaces).",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What is Hybrid Inheritance?",
      options: [
        "It is a combination of single level, multi-level and hierarchical inheritance.",
        "It is inheritance used strictly for web applications.",
        "It is when a child class becomes a parent class automatically.",
        "It is a type of inheritance that uses only interfaces."
      ],
      correctAnswer: "It is a combination of single level, multi-level and hierarchical inheritance.",
      explanation: "Hybrid inheritance is the combination of two or more types of inheritance like single, multi-level, and hierarchical inheritance.",
      xpReward: 10,
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

  console.log('Successfully seeded Java Inheritance unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
