import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Tokens unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Java Tokens" }
  });

  // Create Unit 2
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Java Tokens",
      description: "Learn about the smallest units of a Java program.",
      order: 2,
      published: true
    }
  });

  // --- LESSON 1 ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Tokens & Identifiers",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is defined as the smallest unit of a program in Java?",
      options: ["A Package", "A Token", "A Statement", "A Variable"],
      correctAnswer: "A Token",
      explanation: "A token is the smallest individual unit of a program.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following is NOT one of the 6 types of tokens in Java?",
      options: ["Identifiers", "Compilers", "Keywords", "Literals"],
      correctAnswer: "Compilers",
      explanation: "The 6 types of tokens are: Identifiers, Keywords, Literals, Operators, Separators, and Comments.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is an 'Identifier' in Java programming?",
      options: [
        "A pre-defined keyword",
        "A name given for the java program elements",
        "A symbol for an operation",
        "A mathematical value"
      ],
      correctAnswer: "A name given for the java program elements",
      explanation: "An Identifier is a name given for a java program, such as the name of a variable, class, or method.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2 ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Java Keywords",
      xpReward: 30,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What are 'Keywords' in Java?",
      options: [
        "Variable names chosen by the user",
        "Pre-defined words which have their own meaning",
        "Sentences used in comments",
        "Syntax formatting rules"
      ],
      correctAnswer: "Pre-defined words which have their own meaning",
      explanation: "Keywords are special pre-defined words that have specific meanings reserved by the Java language.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "As per standard Java documentation, approximately how many primary keywords are defined in Java?",
      options: ["10", "100", "50", "25"],
      correctAnswer: "50",
      explanation: "Java defines 50 core keywords, such as class, public, void, etc.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of the following sets contains ONLY Java keywords?",
      options: [
        "public, static, customName",
        "while, default, switch",
        "int, boolean, userString",
        "String, Integer, System" // These are classes, not keywords technically, but tricky
      ],
      correctAnswer: "while, default, switch",
      explanation: "'while', 'default', and 'switch' are all official Java keywords.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 3 ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Understanding Literals",
      xpReward: 40,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What is a 'Literal' in Java?",
      options: [
        "A mathematical function",
        "The value which is used in the program",
        "A type of memory allocation",
        "A hidden comment"
      ],
      correctAnswer: "The value which is used in the program",
      explanation: "Literals are raw data values directly used in Java programming, like numbers or textual strings.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "How are Character literals normally enclosed in Java?",
      options: [
        "In double quotes (\" \")",
        "In single quotes (' ')",
        "In parentheses ( )",
        "In square brackets [ ]"
      ],
      correctAnswer: "In single quotes (' ')",
      explanation: "Character literals represent a single character and are enclosed in single quotes, e.g., 'A'.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Which format is used for String literals?",
      options: [
        "In single quotes ('Hello')",
        "In double quotes (\"Hello\")",
        "With no quotes (Hello)",
        "Inside angle brackets (<Hello>)"
      ],
      correctAnswer: "In double quotes (\"Hello\")",
      explanation: "String literals represent multiple characters (words/sentences) and must be enclosed in double quotes.",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What are the Boolean literals in Java?",
      options: ["1 and 0", "TRUE and FALSE", "YES and NO", "ON and OFF"],
      correctAnswer: "TRUE and FALSE",
      explanation: "Boolean literals represent truth values and are strictly TRUE or FALSE.",
      xpReward: 10,
      order: 4,
    }
  ];

  // --- LESSON 4 ---
  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Operators & Execution",
      xpReward: 50,
      order: 4,
      published: true
    }
  });

  const lesson4Exercises = [
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "In the expression '5 + 3', what do '5' and '3' represent?",
      options: ["Operators", "Operands", "Identifiers", "Keywords"],
      correctAnswer: "Operands",
      explanation: "Operations are performed on 'operands'. The '+' is the operator, while 5 and 3 are the operands.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Which category does the Unary operator group belong to, and what does it include?",
      options: [
        "Comparison: <, >",
        "Logical: &&, ||",
        "Postfix/Prefix: ++, --",
        "Arithmetic: +, -, *"
      ],
      correctAnswer: "Postfix/Prefix: ++, --",
      explanation: "Unary operators only require one operand and include postfix/prefix operators like Expr++ or --Expr.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Which symbol represents the Ternary operator?",
      options: [">=", "&&", "==", "?"],
      correctAnswer: "?",
      explanation: "The ternary operator uses a question mark '?' to evaluate boolean conditioning in a single line.",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Which set maps exactly to Relational operators?",
      options: [
        ">> , >>>",
        "&& , ||",
        "< , > , <= , >=",
        "& , | , ^"
      ],
      correctAnswer: "< , > , <= , >=",
      explanation: "Relational operators focus on comparison and equality.",
      xpReward: 10,
      order: 4,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Which category includes the Modulus symbol (%)?",
      options: ["Shift Operator", "Arithmetic Operator", "Logical Operator", "Bitwise Operator"],
      correctAnswer: "Arithmetic Operator",
      explanation: "The % Modulus symbol calculates remainders and sits in the Arithmetic category with +, -, *, and /.",
      xpReward: 10,
      order: 5,
    }
  ];

  // --- LESSON 5 ---
  const lesson5 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Separators & Comments",
      xpReward: 40,
      order: 5,
      published: true
    }
  });

  const lesson5Exercises = [
    {
      lessonId: lesson5.id,
      type: "mcq",
      prompt: "What is the role of a built-in Separator?",
      options: [
        "To terminate the program",
        "To perform a calculation",
        "To separate the given code logically",
        "To allocate variable memory"
      ],
      correctAnswer: "To separate the given code logically",
      explanation: "Separators structure and isolate pieces of code (like brackets or semicolons).",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson5.id,
      type: "mcq",
      prompt: "Which of the following correctly pairs the separator with its name?",
      options: [
        "() -> Brackets",
        "{ } -> Braces",
        "[ ] -> Parenthesis",
        "; -> Comma"
      ],
      correctAnswer: "{ } -> Braces",
      explanation: "In Java, { } are called Braces, ( ) are Parenthesis, and [ ] are brackets.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson5.id,
      type: "mcq",
      prompt: "What is the primary usage of Comments in Java code?",
      options: [
        "To run background tasks",
        "To provide additional information and documentation for human readers",
        "To print text to the user's screen",
        "To declare new Keywords"
      ],
      correctAnswer: "To provide additional information and documentation for human readers",
      explanation: "Comments help explain logic to humans and are ignored by the compiler when executing.",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson5.id,
      type: "mcq",
      prompt: "Which symbol correctly initiates a 'Single line comment'?",
      options: ["/*", "\\\\", "//", "<!--"],
      correctAnswer: "//",
      explanation: "A double slash // marks the rest of that single line as a comment.",
      xpReward: 10,
      order: 4,
    },
    {
      lessonId: lesson5.id,
      type: "mcq",
      prompt: "How must a Block Line comment start and end?",
      options: [
        "/* and */",
        "** and **",
        "// and //",
        "{/ and /}"
      ],
      correctAnswer: "/* and */",
      explanation: "A block comment begins with /* and ends with */ allowing comments across multiple lines.",
      xpReward: 10,
      order: 5,
    }
  ];

  const allExercises = [
    ...lesson1Exercises,
    ...lesson2Exercises,
    ...lesson3Exercises,
    ...lesson4Exercises,
    ...lesson5Exercises
  ];

  for (const ex of allExercises) {
    // @ts-ignore
    await prisma.exercise.create({ data: ex });
  }

  console.log('Successfully seeded Java Tokens unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
