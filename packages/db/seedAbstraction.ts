import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Abstraction unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Object-Oriented Programming" }
  });

  if (!stage) {
    throw new Error("Stage 'Object-Oriented Programming' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Abstraction" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Abstraction",
      description: "Learn how to hide the complexity of the system and expose only the required functionality to the end user.",
      order: 21,
      published: true
    }
  });

  // --- LESSON 1: What is Abstraction? ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "What is Abstraction?",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the primary definition of Abstraction in Java?",
      options: [
        "Inheriting properties from multiple super classes.",
        "Hiding the complexity of the system and exposing only the required functionality.",
        "Creating an object that exhibits different behaviors.",
        "Making all variables public."
      ],
      correctAnswer: "Hiding the complexity of the system and exposing only the required functionality.",
      explanation: "Abstraction is about hiding the implementation details and only exposing the essential features to the user.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "How is Abstraction typically achieved?",
      options: [
        "Declare essential properties in an interface and provide implementation in a subclass.",
        "Declare everything as public concrete methods.",
        "Create objects of the interface type directly.",
        "Do not use inheritance."
      ],
      correctAnswer: "Declare essential properties in an interface and provide implementation in a subclass.",
      explanation: "By keeping the interface clean and hiding the logic inside the subclass, we achieve abstraction. The user interacts with the interface reference, completely unaware of the complex subclass logic.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 2: Interface vs Abstract Class Revisited ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "When to use Interface vs Abstract Class",
      xpReward: 30,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "When should we go for an Interface instead of an Abstract Class?",
      options: [
        "When we know partial implementation.",
        "When we do not know the 100% implementation at all.",
        "When we want to create objects directly.",
        "When we want to use private methods."
      ],
      correctAnswer: "When we do not know the 100% implementation at all.",
      explanation: "If you only know the required functionalities (the contract) but none of the actual implementation, you should use an Interface (100% abstraction).",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "When should we go for an Abstract Class?",
      options: [
        "When we want 100% pure abstraction.",
        "When we know the partial implementation (default behaviors) but still want some abstract methods.",
        "When we don't know any implementation.",
        "When we want multiple inheritance."
      ],
      correctAnswer: "When we know the partial implementation (default behaviors) but still want some abstract methods.",
      explanation: "If you have some concrete logic that all subclasses should share, but some methods still need to be abstract, you use an Abstract Class (up to 100% abstraction).",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 3: Abstraction Implementation ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Achieving Abstraction in Code",
      xpReward: 50,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Create an INTERFACE 'Animal' with 'void noise();'. Create 'Cat' implementing Animal, overriding noise() to print 'meow'. Create 'Stimulator' with static method 'void anisum(Animal a1)' that calls a1.noise(). In main, create a Cat 'c1', and pass it to Stimulator.anisum().",
      options: [],
      correctAnswer: "meow\n",
      explanation: "This is identical to our polymorphism example, but notice how Animal is now an Interface! The Stimulator doesn't know HOW the noise is made, it just knows the Animal contract. This hides the complexity (Abstraction)!",
      codeTemplate: "interface Animal {\n    void noise();\n}\nclass Cat implements Animal {\n    // override noise() to print \"meow\"\n    \n}\nclass Stimulator {\n    static void anisum(Animal a1) {\n        // call noise() on a1\n        \n    }\n}\nclass Mainclass {\n    public static void main(String[] args) {\n        // instantiate Cat and pass to Stimulator.anisum()\n        \n    }\n}",
      xpReward: 50,
      order: 1,
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

  console.log('Successfully seeded Java Abstraction unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
