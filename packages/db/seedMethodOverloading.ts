import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Method Overloading unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Object-Oriented Programming" }
  });

  if (!stage) {
    throw new Error("Stage 'Object-Oriented Programming' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Method Overloading & Objects" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Method Overloading & Objects",
      description: "Learn how to overload methods and understand the relationship between classes, objects, and reference variables.",
      order: 14,
      published: true
    }
  });

  // --- LESSON 1: Method Overloading ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Method Overloading",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Method Overloading in Java?",
      options: [
        "Developing multiple methods with the same name and the exact same arguments.",
        "Developing multiple methods with the same name but variation in argument list.",
        "Developing multiple classes with the same name.",
        "Overriding a method from a parent class."
      ],
      correctAnswer: "Developing multiple methods with the same name but variation in argument list.",
      explanation: "Developing multiple methods with the same name but variation in argument list (data type, length, or order) is called as method overloading.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following is NOT a valid variation for Method Overloading?",
      options: [
        "Variation in the data type of arguments.",
        "Variation in the length of the arguments.",
        "Variation in the order of occurrence of the arguments.",
        "Variation only in the return type."
      ],
      correctAnswer: "Variation only in the return type.",
      explanation: "There must be variations in the argument list. There is no restriction on return type, but changing ONLY the return type is not sufficient to overload a method.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Create a 'WhatsApp' class. Write two overloaded 'send' methods. The first takes an 'int no' and prints 'sending no ' + no. The second takes a 'String msg' and prints 'sending msg ' + msg. In main, create a WhatsApp object and call both methods.",
      options: [],
      correctAnswer: "sending no 123\nsending msg hello\n",
      explanation: "Both methods have the same name 'send' but different argument types (int vs String).",
      codeTemplate: "class WhatsApp {\n    // Create void send(int no) here\n    \n    // Create void send(String msg) here\n    \n    public static void main(String[] args) {\n        WhatsApp w1 = new WhatsApp();\n        // Call send(123) and send(\"hello\")\n        \n    }\n}",
      xpReward: 30,
      order: 3,
    }
  ];

  // --- LESSON 2: Classes, Objects, and States ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Class and Object",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is an Object in Java?",
      options: [
        "A blueprint or template.",
        "A real time entity which has its own state and behaviour.",
        "A special method used to initialize data members.",
        "A static variable."
      ],
      correctAnswer: "A real time entity which has its own state and behaviour.",
      explanation: "Class is a blueprint. An object is a real-time entity which has its own state (non-static variables) and behaviour (non-static methods).",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What happens if multiple reference variables point to the SAME object address, and a change is made through one of them?",
      options: [
        "It will not affect other reference variables.",
        "It will affect other reference variables.",
        "A compilation error occurs.",
        "The object is cloned automatically."
      ],
      correctAnswer: "It will affect other reference variables.",
      explanation: "If multiple reference variables point to a single object address, any changes made through one reference variable will affect other reference variables.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Can we overload both static and non-static methods? Can we overload the main method?",
      options: [
        "Yes, we can overload both. Yes, we can overload the main method.",
        "No, we can only overload static methods. No, main cannot be overloaded.",
        "Yes, we can overload both. No, main cannot be overloaded.",
        "No, we can only overload non-static methods. Yes, we can overload main."
      ],
      correctAnswer: "Yes, we can overload both. Yes, we can overload the main method.",
      explanation: "We can overload both static and non-static methods. We can also overload the main method (though the JVM will only automatically call the one with String[] args).",
      xpReward: 10,
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

  console.log('Successfully seeded Java Method Overloading unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
