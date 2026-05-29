import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Encapsulation unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Encapsulation" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Encapsulation",
      description: "Learn how to protect data by restricting direct access and providing indirect access through getters and setters.",
      order: 22,
      published: true
    }
  });

  // --- LESSON 1: Core Concepts ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "What is Encapsulation?",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Encapsulation?",
      options: [
        "Hiding the implementation details from the user.",
        "Declaring data members as private and providing indirect access through public services.",
        "A class inheriting properties from an interface.",
        "A method changing its behavior at runtime."
      ],
      correctAnswer: "Declaring data members as private and providing indirect access through public services.",
      explanation: "Encapsulation restricts direct access to data by making it private, and provides controlled indirect access via getters and setters.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Why is Java considered 'by default encapsulated'?",
      options: [
        "Because everything is an object.",
        "Because it compiles to bytecode.",
        "Because we cannot declare variables outside a class, nor print statements outside methods.",
        "Because all variables are public."
      ],
      correctAnswer: "Because we cannot declare variables outside a class, nor print statements outside methods.",
      explanation: "Java forces you to put everything inside a class boundary, meaning it is encapsulated by default.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the primary purpose of Encapsulation?",
      options: [
        "Performance optimization.",
        "Protection and security.",
        "Achieving multiple inheritance.",
        "Code compilation speed."
      ],
      correctAnswer: "Protection and security.",
      explanation: "Encapsulation is used for protection (e.g., protecting an ATM pin or net banking password from direct external tampering).",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2: Java Bean Class ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Java Bean Class & Getters/Setters",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is a 'Java Bean class'?",
      options: [
        "A class used for making coffee applications.",
        "A class that only contains static methods.",
        "A class where data members are private and indirect access is restricted through public getters and setters.",
        "A class that cannot be instantiated."
      ],
      correctAnswer: "A class where data members are private and indirect access is restricted through public getters and setters.",
      explanation: "Declaring data members as private and restricting indirect access through public services is known as the Java Bean standard.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create a Facebook Java Bean class. Declare a private int 'pwd' initialized to 1234. Create a public 'getPwd()' that returns it, and a public 'setPwd(int pwd)' that updates it. In main, print the password, update it to 1267, and print it again.",
      options: [],
      correctAnswer: "1234\n1267\n",
      explanation: "You successfully protected the password variable and controlled access to it through getters and setters!",
      codeTemplate: "class Facebook {\n    // private pwd variable\n    \n    // public getPwd()\n    \n    // public setPwd(int pwd)\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        Facebook f1 = new Facebook();\n        // get pwd and print\n        \n        // set pwd to 1267\n        \n        // get pwd and print again\n        \n    }\n}",
      xpReward: 40,
      order: 2,
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

  console.log('Successfully seeded Java Encapsulation unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
