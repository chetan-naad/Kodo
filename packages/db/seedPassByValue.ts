import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Pass by Value / Reference unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Pass by Value & Reference" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Pass by Value & Reference",
      description: "Understand the difference between passing primitive data types versus reference variables to methods.",
      order: 12,
      published: true
    }
  });

  // --- LESSON 1: Pass by Value ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Pass by Value",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What does 'Pass by Value' mean in Java?",
      options: [
        "Passing reference variables to a method.",
        "Passing a primitive type of data to a method.",
        "Passing the entire class to a method.",
        "Returning a value from a method."
      ],
      correctAnswer: "Passing a primitive type of data to a method.",
      explanation: "Calling or invoking a method by passing primitive type of data is called as call by value or pass by value.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Create a static method 'add(int a)' that prints the value of 'a'. In the main method, declare an integer 'x' equal to 10 and call 'add(x)'.",
      options: [],
      correctAnswer: "10\n",
      explanation: "When you pass 'x' (a primitive int) to 'add(int a)', a copy of the value (10) is passed.",
      codeTemplate: "class Sample {\n    // Create static void add(int a) here\n    \n    public static void main(String[] args) {\n        // Declare x = 10 and call add(x)\n        \n    }\n}",
      xpReward: 30,
      order: 2,
    }
  ];

  // --- LESSON 2: Pass by Reference ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Pass by Reference",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What does 'Pass by Reference' mean in Java?",
      options: [
        "Passing primitive data types to a method.",
        "Passing reference variables (objects) to a method.",
        "Passing a method to another method.",
        "Passing the main method arguments."
      ],
      correctAnswer: "Passing reference variables (objects) to a method.",
      explanation: "Calling or invoking a method by passing reference variables is called as call by references or pass by references.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Complete the code. 'Sample' has an int 'y=80'. Create a static method 'cool(Sample s2)' that prints 's2.y'. In main, instantiate 'Sample s1', print 's1.y', and then call 'cool(s1)'.",
      options: [],
      correctAnswer: "80\n80\n",
      explanation: "We are passing the reference variable 's1' into 'cool'. Inside 'cool', 's2' points to the same object as 's1'.",
      codeTemplate: "class Sample {\n    int y = 80;\n    // Create static void cool(Sample s2) here\n    \n    public static void main(String[] args) {\n        Sample s1 = new Sample();\n        System.out.println(s1.y);\n        // Call cool(s1)\n        \n    }\n}",
      xpReward: 30,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "debug",
      prompt: "Fix the code to successfully pass the Amazon object reference to Cust1's method.",
      options: [],
      correctAnswer: "class Amazon {\n    void product() {\n        System.out.println(\"product\");\n    }\n}\n\nclass Cust1 {\n    static void needProduct(Amazon a2) {\n        a2.product();\n    }\n}\n\nclass FedEx {\n    public static void main(String[] args) {\n        Amazon a1 = new Amazon();\n        Cust1.needProduct(a1);\n    }\n}",
      explanation: "The method needProduct expects an Amazon reference. We create 'Amazon a1' and pass it in.",
      codeTemplate: "class Amazon {\n    void product() {\n        System.out.println(\"product\");\n    }\n}\n\nclass Cust1 {\n    static void needProduct(Amazon a2) {\n        // call product() on a2\n    }\n}\n\nclass FedEx {\n    public static void main(String[] args) {\n        // Create Amazon object and call Cust1.needProduct\n    }\n}",
      xpReward: 30,
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

  console.log('Successfully seeded Java Pass by Value / Reference unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
