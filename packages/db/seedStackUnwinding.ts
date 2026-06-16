import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Stack Unwinding unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Exception Handling" }
  });

  if (!stage) {
    throw new Error("Stage 'Exception Handling' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Stack Unwinding & Backtraces" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Stack Unwinding & Backtraces",
      description: "Understand how exceptions propagate up the call stack, how to trace them, and the crucial differences between Errors, Exceptions, Throw, and Throws.",
      order: 25,
      published: true
    }
  });

  // --- LESSON 1: Stack Unwinding & printStackTrace ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Stack Unwinding",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is 'Stack Unwinding'?",
      options: [
        "The process of creating a new stack for every thread.",
        "When an unhandled exception propagates from the called method up to the main method, and if not handled, the JVM destroys the stack.",
        "A feature that automatically fixes code errors.",
        "The process of converting a stack to a queue."
      ],
      correctAnswer: "When an unhandled exception propagates from the called method up to the main method, and if not handled, the JVM destroys the stack.",
      explanation: "If an exception is not addressed, it propagates back through the caller methods. If it reaches the JVM with no handler, the JVM destroys the stack (Stack Unwinding).",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What does the 'printStackTrace()' method do?",
      options: [
        "It stops the program execution safely.",
        "It prints the complete back trace of the stack where the error message occurred, helping to find the root cause.",
        "It prints the values of all variables in the class.",
        "It converts the exception into an error."
      ],
      correctAnswer: "It prints the complete back trace of the stack where the error message occurred, helping to find the root cause.",
      explanation: "printStackTrace() is a non-static method of the Throwable class that outputs the exact line numbers and method calls that led to the exception.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Create a program to trace an exception. Create static method disp4() that causes ArithmeticException (1/0). Have disp3() call disp4(), disp2() call disp3(), and disp1() call disp2(). In main, call disp1() inside a try-catch block, and catch ArithmeticException e. Inside the catch, call e.printStackTrace()!",
      options: [],
      correctAnswer: "java.lang.ArithmeticException: / by zero\n",
      explanation: "You successfully allowed the exception to propagate up 4 levels before catching it and printing the full backtrace!",
      codeTemplate: "class Demo {\n    static void disp4() {\n        int i = 1 / 0;\n    }\n    static void disp3() { disp4(); }\n    static void disp2() { disp3(); }\n    static void disp1() { disp2(); }\n\n    public static void main(String[] args) {\n        // try to call disp1()\n        \n        // catch ArithmeticException and call printStackTrace()\n        \n    }\n}",
      xpReward: 40,
      order: 3,
    }
  ];

  // --- LESSON 2: Error vs Exception ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Error vs Exception",
      xpReward: 20,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is the primary cause of an 'Error' in Java?",
      options: [
        "A logical mistake made by the programmer.",
        "System configuration issues (e.g., OutOfMemory, StackOverflow).",
        "Dividing a number by zero.",
        "Trying to access an array out of bounds."
      ],
      correctAnswer: "System configuration issues (e.g., OutOfMemory, StackOverflow).",
      explanation: "Errors are unpredictable and occur due to system configuration issues, unlike Exceptions which occur due to programmer mistakes.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of the following is predictable and occurs due to mistakes done by the programmer?",
      options: [
        "Exception",
        "Error",
        "System Configuration",
        "JVM Crash"
      ],
      correctAnswer: "Exception",
      explanation: "Exceptions (like NullPointerException or ArithmeticException) are predictable results of logic errors made by the programmer.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 3: throw vs throws ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "throw vs throws Differences",
      xpReward: 20,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Which keyword can propagate MORE than 1 exception at a time?",
      options: [
        "throw",
        "throws",
        "catch",
        "finally"
      ],
      correctAnswer: "throws",
      explanation: "The 'throws' keyword (used in the method declaration) can propagate multiple exceptions (e.g., throws IOException, SQLException). 'throw' can only throw 1 object at a time.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Where is the 'throw' keyword developed?",
      options: [
        "In the method declaration/signature.",
        "Inside the class definition but outside any method.",
        "Always developed in the method body.",
        "Inside the import statements."
      ],
      correctAnswer: "Always developed in the method body.",
      explanation: "'throw' is used inside the method body to create and throw an instance of a throwable type. 'throws' is used in the method declaration.",
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

  console.log('Successfully seeded Java Stack Unwinding unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
