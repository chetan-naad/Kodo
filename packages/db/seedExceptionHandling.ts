import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Exception Handling unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Exception Handling" }
  });

  if (!stage) {
    throw new Error("Stage 'Exception Handling' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Exception Handling" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Exception Handling",
      description: "Learn how to manage runtime and compile-time errors gracefully using try, catch, finally, and throws.",
      order: 24,
      published: true
    }
  });

  // --- LESSON 1: The Basics (Try/Catch/Finally) ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Try, Catch, and Finally",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What happens when an exception occurs inside a 'try' block?",
      options: [
        "The program immediately crashes without executing any more code.",
        "The exception is ignored and the rest of the try block executes.",
        "Further statements in the try block are skipped, and control jumps to the matching 'catch' block.",
        "The code automatically retries the failing line."
      ],
      correctAnswer: "Further statements in the try block are skipped, and control jumps to the matching 'catch' block.",
      explanation: "Once an exception occurs in the try block, further statements in that block will not be executed.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following is a strict rule regarding try-catch blocks?",
      options: [
        "You can write print statements between try and catch.",
        "For one try block, you can have multiple catch blocks, but only one will execute.",
        "A try block can exist without a catch or finally block.",
        "A catch block must always throw a new exception."
      ],
      correctAnswer: "For one try block, you can have multiple catch blocks, but only one will execute.",
      explanation: "You can have multiple catch blocks to handle different exceptions, but only the first matching catch block will execute. Also, you cannot develop any statement between a try and catch block.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the purpose of the 'finally' block?",
      options: [
        "To run code only if an exception is caught.",
        "To run code only if no exception occurs.",
        "To execute code mandatorily, regardless of whether an exception occurred or was caught.",
        "To restart the try block."
      ],
      correctAnswer: "To execute code mandatorily, regardless of whether an exception occurred or was caught.",
      explanation: "The finally block is used for crucial cleanup code (like closing database connections) because it is guaranteed to execute.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2: Checked vs Unchecked Exceptions ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Checked vs Unchecked",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is a Compile Time Exception (Checked Exception)?",
      options: [
        "An exception caught by the compiler at compile time, which MUST be handled using try/catch or throws.",
        "An exception that only occurs when dividing by zero.",
        "An exception that inherits from RuntimeException.",
        "An error that cannot be recovered from (like OutOfMemoryError)."
      ],
      correctAnswer: "An exception caught by the compiler at compile time, which MUST be handled using try/catch or throws.",
      explanation: "Compile time (checked) exceptions are enforced by the compiler. You must handle them or declare them with 'throws'.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of the following is a Run Time Exception (Unchecked)?",
      options: [
        "IOException",
        "SQLException",
        "ClassNotFoundException",
        "ArithmeticException"
      ],
      correctAnswer: "ArithmeticException",
      explanation: "ArithmeticException, NullPointerException, and ArrayIndexOutOfBoundsException are unchecked (Run Time) exceptions. They are not caught by the compiler.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Handle a runtime exception! Create a try block that attempts 'int i = 1 / 0;'. Catch the 'ArithmeticException e' and print 'handled'. Add a finally block that prints 'I am finally block'.",
      options: [],
      correctAnswer: "handled\nI am finally block\n",
      explanation: "The try block fails at 1/0, jumping to the catch block to print 'handled', and then executing the mandatory finally block.",
      codeTemplate: "class Mainclass {\n    public static void main(String[] args) {\n        // try block\n        \n        // catch ArithmeticException\n        \n        // finally block\n        \n    }\n}",
      xpReward: 40,
      order: 3,
    }
  ];

  // --- LESSON 3: The 'throws' and 'throw' keywords ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Throwing Exceptions",
      xpReward: 50,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What is the difference between 'throw' and 'throws'?",
      options: [
        "'throw' is used in the method signature, while 'throws' is used to manually trigger an exception.",
        "'throw' is used to manually trigger an exception inside a method, while 'throws' is used in the method signature to declare that an exception might occur.",
        "They are the exact same keyword.",
        "'throws' handles the exception, while 'throw' ignores it."
      ],
      correctAnswer: "'throw' is used to manually trigger an exception inside a method, while 'throws' is used in the method signature to declare that an exception might occur.",
      explanation: "We use 'throw new Exception()' to create the event, and 'void myMethod() throws Exception' to warn callers that they need to handle it.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Create a custom checked exception class 'MatrimonyException' extending Exception with a constructor that takes a String msg and a 'getMessage()' method returning it. In class 'Matrimony', write 'static void submit() throws MatrimonyException'. Inside, if age=18 is < 21, 'throw new MatrimonyException(\"invalid age\");'. In main, call submit() inside a try/catch, printing the message.",
      options: [],
      correctAnswer: "invalid age\n",
      explanation: "You successfully created a custom checked exception, declared it with throws, triggered it with throw, and handled it with try/catch!",
      codeTemplate: "class MatrimonyException extends Exception {\n    String msg;\n    MatrimonyException(String msg) {\n        this.msg = msg;\n    }\n    public String getMessage() {\n        return msg;\n    }\n}\n\nclass Matrimony {\n    // static void submit() throws MatrimonyException\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        // try-catch calling Matrimony.submit()\n        \n    }\n}",
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

  console.log('Successfully seeded Java Exception Handling unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
