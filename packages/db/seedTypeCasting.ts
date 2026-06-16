import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Type Casting unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Object-Oriented Programming" }
  });

  if (!stage) {
    throw new Error("Stage 'Object-Oriented Programming' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Type Casting" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Type Casting",
      description: "Learn how to convert from one data type to another, including primitive widening/narrowing and object upcasting/downcasting.",
      order: 17,
      published: true
    }
  });

  // --- LESSON 1: Primitive Type Casting ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Primitive Type Casting",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Widening Type Casting?",
      options: [
        "Converting from a bigger primitive data type to a smaller primitive data type.",
        "Converting from a smaller primitive data type to any of its bigger primitive data types.",
        "Converting a superclass to a subclass.",
        "Converting a primitive type to a class type."
      ],
      correctAnswer: "Converting from a smaller primitive data type to any of its bigger primitive data types.",
      explanation: "Converting from smaller primitive data type to any of its bigger primitive data type is called Widening Type casting. It can happen implicitly or explicitly.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Narrowing Type Casting?",
      options: [
        "Converting from a bigger primitive data type to any of its smaller primitive data types.",
        "Converting from a smaller primitive data type to a bigger one.",
        "Converting an object to a string.",
        "Converting a subclass to a superclass."
      ],
      correctAnswer: "Converting from a bigger primitive data type to any of its smaller primitive data types.",
      explanation: "Converting from bigger primitive data type to any of its smaller primitive data type is called Narrowing Type casting. This must ALWAYS be done explicitly.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Perform explicit narrowing: Cast the double '59.9' into an int 'x', and cast the float '99.9f' into a byte 'z'. Print 'x' and 'z' on separate lines.",
      options: [],
      correctAnswer: "59\n99\n",
      explanation: "By doing (int) 59.9 and (byte) 99.9f, the decimal parts are truncated.",
      codeTemplate: "class Mainclass {\n    public static void main(String[] args) {\n        // Explicit narrowing\n        int x = (int) 59.9;\n        byte z = (byte) 99.9f;\n        \n        System.out.println(x);\n        System.out.println(z);\n    }\n}",
      xpReward: 30,
      order: 3,
    }
  ];

  // --- LESSON 2: Class Type Casting ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Class Type Casting",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is Upcasting?",
      options: [
        "Converting from a superclass object to a subclass type.",
        "Converting from a subclass object to a superclass type.",
        "Converting an int to a double.",
        "Converting a double to an int."
      ],
      correctAnswer: "Converting from a subclass object to a superclass type.",
      explanation: "Converting from subclass object to superclass type is called as up casting. It can be done implicitly or explicitly.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of the following is true regarding Downcasting?",
      options: [
        "It can be done implicitly.",
        "Direct down casting is possible without prior up casting.",
        "It must always be done explicitly, and requires prior upcasting.",
        "It converts a subclass object to a superclass type."
      ],
      correctAnswer: "It must always be done explicitly, and requires prior upcasting.",
      explanation: "Down casting should always be done explicitly. Without performing up casting we cannot perform down casting. Direct down casting is not possible.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Class 'Demo' has 'int a = 10;'. Class 'Sample' extends 'Demo' and has 'void disp()'. Perform Upcasting by assigning a new Sample() to a Demo reference 'd1'. Then, perform explicit Downcasting by casting 'd1' to a Sample reference 's1'. Call 's1.disp()'.",
      options: [],
      correctAnswer: "hey its disp..\n",
      explanation: "First upcast: Demo d1 = new Sample(); Then downcast: Sample s1 = (Sample) d1; Then you can call s1.disp();",
      codeTemplate: "class Demo {\n    int a = 10;\n}\n\nclass Sample extends Demo {\n    void disp() {\n        System.out.println(\"hey its disp..\");\n    }\n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        // Upcast\n        Demo d1 = new Sample();\n        \n        // Downcast\n        \n        \n        // Call disp()\n        \n    }\n}",
      xpReward: 40,
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

  console.log('Successfully seeded Java Type Casting unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
