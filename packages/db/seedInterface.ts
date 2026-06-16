import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Interface unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Object-Oriented Programming" }
  });

  if (!stage) {
    throw new Error("Stage 'Object-Oriented Programming' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Interfaces" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Interfaces",
      description: "Learn about pure abstract bodies, 100% abstraction, and how interfaces solve multiple inheritance in Java.",
      order: 20,
      published: true
    }
  });

  // --- LESSON 1: Interface Fundamentals ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Interface Fundamentals",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is true about the variables declared inside an interface?",
      options: [
        "They are standard instance variables.",
        "They are by default private and non-static.",
        "They are by default static and final.",
        "They can be modified by the implementing class."
      ],
      correctAnswer: "They are by default static and final.",
      explanation: "In an interface, all variables are automatically implicitly declared as public, static, and final.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What keyword is used for a class to inherit the properties of an interface?",
      options: [
        "extends",
        "implements",
        "inherits",
        "uses"
      ],
      correctAnswer: "implements",
      explanation: "Java provides the keyword 'implements' to inherit the properties from an interface to a class.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following does an interface NOT support?",
      options: [
        "Variables",
        "Methods",
        "Constructors",
        "Multiple Inheritance"
      ],
      correctAnswer: "Constructors",
      explanation: "An interface does not support constructors. We cannot instantiate an interface directly.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2: Interface Inheritance ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Interface Inheritance",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What keyword is used when an Interface inherits from another Interface?",
      options: [
        "implements",
        "extends",
        "inherits",
        "interface"
      ],
      correctAnswer: "extends",
      explanation: "From an interface to an interface, to inherit the properties we use the keyword 'extends'.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Does an interface extend the 'Object' class by default?",
      options: [
        "Yes, every type in Java extends Object.",
        "No, an interface does not extend any class; it is a super most type.",
        "Only if you explicitly write 'extends Object'.",
        "Yes, but the methods are hidden."
      ],
      correctAnswer: "No, an interface does not extend any class; it is a super most type.",
      explanation: "Each and every CLASS extends Object class. However, an INTERFACE does not extend any class. Interface itself is a super most type.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create an interface 'Tester' with two void methods: 'disp()' and 'test()'. Create class 'Sample' that IMPLEMENTS 'Tester', overriding disp() to print 'hi' and test() to print 'hello'. Finally, inside main(), instantiate Sample and call both methods.",
      options: [],
      correctAnswer: "hi\nhello\n",
      explanation: "Because interface methods are implicitly public and abstract, your overriding methods in the class MUST be explicitly declared 'public'.",
      codeTemplate: "interface Tester {\n    // declare disp() and test()\n    \n}\n\nclass Sample implements Tester {\n    // implement public void disp()\n    \n    // implement public void test()\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        // instantiate Sample and call methods\n        \n    }\n}",
      xpReward: 40,
      order: 3,
    }
  ];

  // --- LESSON 3: Interface vs Abstract Class in the Real World ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "100% Abstraction vs Partial Abstraction",
      xpReward: 30,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What level of abstraction can be achieved through an Interface?",
      options: [
        "Up to 50% abstraction.",
        "Up to 100% abstraction.",
        "100% abstraction.",
        "No abstraction."
      ],
      correctAnswer: "100% abstraction.",
      explanation: "Through an abstract class, we can achieve UP TO 100% abstraction (because it can have concrete methods). Through an interface, we achieve exactly 100% pure abstraction.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Let's build Audi! Create abstract class 'Audi' with abstract void wheel(), abstract void engine(), and a concrete void color() printing 'Black color'. Create class 'AudiA4' extending Audi, overriding wheel() to print 'super wheels' and engine() to print '5000 cc'. In main, create an AudiA4 object and call color(), engine(), and wheel().",
      options: [],
      correctAnswer: "Black color\n5000 cc\nsuper wheels\n",
      explanation: "This demonstrates why an Abstract Class is used instead of an Interface: when you want to provide a default concrete method (like color) that applies to all children, alongside abstract requirements.",
      codeTemplate: "abstract class Audi {\n    // abstract wheel() and engine()\n    \n    // concrete color()\n    \n}\n\nclass AudiA4 extends Audi {\n    // implement wheel()\n    \n    // implement engine()\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        // create a1 and call color(), engine(), wheel()\n        \n    }\n}",
      xpReward: 40,
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

  console.log('Successfully seeded Java Interface unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
