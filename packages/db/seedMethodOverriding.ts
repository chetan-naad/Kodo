import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Method Overriding unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Method Overriding & Super" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Method Overriding & Super",
      description: "Learn how to provide new implementations for old features using method overriding and the super keyword.",
      order: 16,
      published: true
    }
  });

  // --- LESSON 1: Method Overriding Rules ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Method Overriding Rules",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Method Overriding in Java?",
      options: [
        "Developing multiple methods with the same name but variation in argument list.",
        "Developing a method in the sub class with the same name and signature but different implementation.",
        "Calling a method recursively.",
        "A class inheriting from multiple super classes."
      ],
      correctAnswer: "Developing a method in the sub class with the same name and signature but different implementation.",
      explanation: "Developing a method in the sub class with the same name and signature as in the superclass but with different implementation is called method overriding.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following is NOT a rule for method overriding?",
      options: [
        "The method name and signature should be exactly the same.",
        "There should be an IS-A relationship (inheritance).",
        "The method must be non-static.",
        "The method must have a different return type."
      ],
      correctAnswer: "The method must have a different return type.",
      explanation: "The return type must be the same (or covariant). Changing the return type is not a rule for overriding; the signature (name and arguments) must be identical.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Create a 'WhatsApp_v1' class with a 'void status()' method printing 'status with text'. Create 'WhatsApp_v2' extending v1, overriding 'status()' to print 'status with text, images, videos'. In main, create WhatsApp_v2 object and call status().",
      options: [],
      correctAnswer: "status with text, images, videos\n",
      explanation: "This demonstrates how WhatsApp_v2 provides a new implementation for an old feature (status) from WhatsApp_v1.",
      codeTemplate: "class WhatsApp_v1 {\n    void status() {\n        System.out.println(\"status with text\");\n    }\n}\n\nclass WhatsApp_v2 extends WhatsApp_v1 {\n    // Override status() here\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        // Instantiate WhatsApp_v2 and call status()\n        \n    }\n}",
      xpReward: 30,
      order: 3,
    }
  ];

  // --- LESSON 2: The 'super' Keyword ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The Super Keyword",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is the 'super' keyword used for during method overriding?",
      options: [
        "To invoke the subclass method.",
        "To invoke the superclass implementation of the overridden method.",
        "To stop a method from being overridden.",
        "To call a static method from the parent."
      ],
      correctAnswer: "To invoke the superclass implementation of the overridden method.",
      explanation: "If we need the superclass implementation along with the subclass implementation, we go for 'super.methodName()'.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create 'Phonepe_v1' with 'void rewards()' printing 'rewards by money'. Create 'Phonepe_v2' extending v1. Override 'rewards()' to print 'rewards by coupon' and then call the parent's implementation using 'super.rewards()'. Instantiate v2 and call it.",
      options: [],
      correctAnswer: "rewards by coupon\nrewards by money\n",
      explanation: "By calling super.rewards(), Phonepe_v2 retains the old reward logic while adding the new coupon logic.",
      codeTemplate: "class Phonepe_v1 {\n    void rewards() {\n        System.out.println(\"rewards by money\");\n    }\n}\n\nclass Phonepe_v2 extends Phonepe_v1 {\n    // Override rewards() and call super.rewards()\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        Phonepe_v2 p2 = new Phonepe_v2();\n        p2.rewards();\n    }\n}",
      xpReward: 40,
      order: 2,
    }
  ];

  // --- LESSON 3: Understanding System.out.println ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Deconstructing System.out.println",
      xpReward: 30,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "In the statement 'System.out.println()', what does 'System' represent?",
      options: [
        "A package.",
        "A class.",
        "An object.",
        "A global static reference variable."
      ],
      correctAnswer: "A class.",
      explanation: "'System' is a built-in class in Java.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "In the statement 'System.out.println()', what does 'out' represent?",
      options: [
        "A class.",
        "A method.",
        "A global static reference variable.",
        "A local variable."
      ],
      correctAnswer: "A global static reference variable.",
      explanation: "'out' is a global static reference variable inside the System class that points to an object of PrintStream.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "In the statement 'System.out.println()', what does 'println' represent?",
      options: [
        "A class.",
        "A global static reference variable.",
        "A non-static method of PrintStream.",
        "A static method of the System class."
      ],
      correctAnswer: "A non-static method of PrintStream.",
      explanation: "'println' is a non-static method inside the PrintStream class. Because 'out' holds the address of the PrintStream object, we can invoke 'println' on it.",
      xpReward: 10,
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

  console.log('Successfully seeded Java Method Overriding unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
