import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Variables unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Variables" }
  });

  // Create Unit 5
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Variables",
      description: "Learn how to store data in memory, data types, and local vs global scope.",
      order: 5,
      published: true
    }
  });

  // --- LESSON 1: Understanding Variables ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "What is a Variable?",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is a Variable in Java?",
      options: [
        "A constant value that never changes",
        "A named memory location used to store values",
        "A type of loop",
        "A mathematical function"
      ],
      correctAnswer: "A named memory location used to store values",
      explanation: "A Variable is a named memory location used to store some values or data. It can change 'N' number of times during execution.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following is NOT a Primitive data type?",
      options: ["int", "double", "char", "String"],
      correctAnswer: "String",
      explanation: "String is a Non-Primitive (or reference/class) type. Primitives include byte, short, int, long, float, double, char, and boolean.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 2: Declaration & Initialization ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Declaration & Initialization",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is the correct syntax for declaring AND initializing a variable in a single line?",
      options: [
        "variable_name datatype = values;",
        "datatype variable_name = values;",
        "values = datatype variable_name;",
        "datatype = variable_name values;"
      ],
      correctAnswer: "datatype variable_name = values;",
      explanation: "Example: int a = 10;",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Declare an integer variable named 'a' and initialize it with the value 10. Then print it using System.out.println(a);",
      options: [],
      correctAnswer: "10\n",
      explanation: "Use: int a = 10; System.out.println(a);",
      codeTemplate: "class Sample {\n    public static void main(String[] args) {\n        // Declare and initialize 'a'\n        \n        // Print 'a'\n        \n    }\n}",
      xpReward: 30,
      order: 2,
    }
  ];

  // --- LESSON 3: Re-initialization & Copying ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Re-initialization & Copying",
      xpReward: 50,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Declare 'int y = 80;'. Then, re-initialize 'y' to 100. Finally, print 'y'.",
      options: [],
      correctAnswer: "100\n",
      explanation: "You don't need 'int' again when re-initializing. Just do: y = 100;",
      codeTemplate: "class Sample {\n    public static void main(String[] args) {\n        int y = 80;\n        // Re-initialize y to 100\n        \n        // Print y\n        \n    }\n}",
      xpReward: 25,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Declare 'int a = 20;'. Declare a new variable 'b' and copy the value of 'a' into it. Print 'a' then print 'b'.",
      options: [],
      correctAnswer: "20\n20\n",
      explanation: "You can copy values by doing: int b = a;",
      codeTemplate: "class Sample {\n    public static void main(String[] args) {\n        int a = 20;\n        // Copy 'a' to a new variable 'b'\n        \n        // Print a, then print b\n        \n    }\n}",
      xpReward: 25,
      order: 2,
    }
  ];

  // --- LESSON 4: Local vs Global Scope ---
  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Local vs Global Variables",
      xpReward: 60,
      order: 4,
      published: true
    }
  });

  const lesson4Exercises = [
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "What is true about Local variables?",
      options: [
        "They are declared outside methods.",
        "They have default values.",
        "They can be declared as static.",
        "They must be initialized before utilization."
      ],
      correctAnswer: "They must be initialized before utilization.",
      explanation: "Local variables are declared inside methods, do not have default values, cannot be static, and must be initialized before use.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Where is a Global variable declared?",
      options: [
        "Inside a specific loop.",
        "Outside the class.",
        "Outside any method but inside the class.",
        "Inside the main method."
      ],
      correctAnswer: "Outside any method but inside the class.",
      explanation: "Global (or member) variables are declared within the class, but outside of any methods.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Do Global variables have default values?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
      explanation: "Global variables are automatically assigned default values (like 0 for int) if not explicitly initialized.",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson4.id,
      type: "write",
      prompt: "Declare a GLOBAL variable 'static int a = 20;' outside the main method. Then, inside the main method, print 'a'.",
      options: [],
      correctAnswer: "20\n",
      explanation: "The variable 'a' is accessible inside 'main' because it's a static global variable.",
      codeTemplate: "class Sample {\n    // Declare static global variable 'a' here\n    \n    public static void main(String[] args) {\n        // Print 'a' here\n        \n    }\n}",
      xpReward: 30,
      order: 4,
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

  console.log('Successfully seeded Java Variables unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
