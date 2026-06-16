import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java History...');

  // Clean up previous seeds for all stages to avoid clutter
  await prisma.stage.deleteMany({
    where: {
      title: {
        in: [
          "Introduction to Java",
          "Java Fundamentals",
          "Object-Oriented Programming",
          "Exception Handling"
        ]
      }
    }
  });

  // 1. Create all Stages
  const stage = await prisma.stage.create({
    data: {
      title: "Introduction to Java",
      description: "Learn the fundamentals and history of Java.",
      order: 1,
      published: true
    }
  });

  await prisma.stage.create({
    data: {
      title: "Java Fundamentals",
      description: "Master variables, methods, memory, and core Java building blocks.",
      order: 2,
      published: true
    }
  });

  await prisma.stage.create({
    data: {
      title: "Object-Oriented Programming",
      description: "Explore OOP pillars — inheritance, polymorphism, abstraction, and encapsulation.",
      order: 3,
      published: true
    }
  });

  await prisma.stage.create({
    data: {
      title: "Exception Handling",
      description: "Handle errors gracefully with try-catch, custom exceptions, and stack unwinding.",
      order: 4,
      published: true
    }
  });

  // 2. Create a Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Java History",
      description: "Detailed history of how Java came to be",
      order: 1,
      published: true
    }
  });

  // --- LESSON 1 ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The Father of Java",
      xpReward: 20,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Who is known as the father of Java?",
      options: ["James Gosling", "Steve Jobs", "Bill Gates", "Dennis Ritchie"],
      correctAnswer: "James Gosling",
      explanation: "James Gosling is widely recognized as the father of Java.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "In which year was Java initially introduced?",
      options: ["1995", "1991", "1989", "2000"],
      correctAnswer: "1991",
      explanation: "Java was initially introduced in the year 1991 by James Gosling.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 2 ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Green Talk and Oak",
      xpReward: 50,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What was the initial name of the software?",
      options: ["Oak", "Java", "Green Talk", "Sun Script"],
      correctAnswer: "Green Talk",
      explanation: "The software was originally named Green Talk.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What was the name of the team that developed Green Talk?",
      options: ["Java Team", "Oak Team", "Green Team", "Sun Team"],
      correctAnswer: "Green Team",
      explanation: "The team which developed the software was called the Green Team.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Later, the software was renamed to Oak. What does Oak symbolize?",
      options: ["A symbol of strength", "A type of database", "A popular drink", "An island"],
      correctAnswer: "A symbol of strength",
      explanation: "Oak is a symbol of strength and it is a national tree for Germany.",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Oak is the national tree for which country?",
      options: ["Germany", "United States", "France", "England"],
      correctAnswer: "Germany",
      explanation: "Oak is a national tree for Germany.",
      xpReward: 10,
      order: 4,
    }
  ];

  // --- LESSON 3 ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "From Oak to Java",
      xpReward: 30,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Why was the software name changed from Oak to Java?",
      options: [
        "James Gosling preferred Java",
        "Legal issues with Oak Technology",
        "Oak was hard to spell",
        "Sun Microsystems wanted a cooler name"
      ],
      correctAnswer: "Legal issues with Oak Technology",
      explanation: "There was already an existing company called Oak Technology which had become a legal issue, so they changed the name to Java.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Where did James Gosling and his team get the inspiration for the name 'Java'?",
      options: [
        "A coffee shop on an island",
        "A random dictionary word",
        "An animal",
        "A latin phrase"
      ],
      correctAnswer: "A coffee shop on an island",
      explanation: "They went for a coffee to an island and the coffee shop was named Java.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Why did they choose a coffee bug as a logo for the Java software?",
      options: [
        "Because it was a trend",
        "To signify speed",
        "Because they went for a coffee to an island",
        "It was randomly selected"
      ],
      correctAnswer: "Because they went for a coffee to an island",
      explanation: "Since they went for a coffee at a shop named Java, they kept the coffee bug as a logo for the Java software.",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 4 ---
  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The Official Release",
      xpReward: 30,
      order: 4,
      published: true
    }
  });

  const lesson4Exercises = [
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Java is an example of what kind of programming language?",
      options: ["Low-level programming language", "Assembly language", "High-level programming language", "Hardware description language"],
      correctAnswer: "High-level programming language",
      explanation: "Java is a high-level programming language.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Which company originally developed Java and in what year was it released?",
      options: [
        "Microsoft, 1991",
        "Sun Microsystems, 1995",
        "Apple, 1995",
        "Sun Microsystems, 1991"
      ],
      correctAnswer: "Sun Microsystems, 1995",
      explanation: "Java was originally developed by Sun Microsystems and released in 1995.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson4.id,
      type: "mcq",
      prompt: "Which of the following platforms can Java run on?",
      options: [
        "Windows only",
        "Mac OS and UNIX only",
        "Windows, Mac OS, and various versions of UNIX",
        "Mobile platforms only"
      ],
      correctAnswer: "Windows, Mac OS, and various versions of UNIX",
      explanation: "Java runs on a variety of platforms, such as Windows, Mac OS, and the various versions of UNIX.",
      xpReward: 10,
      order: 3,
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

  console.log('Successfully seeded detailed Java History lessons!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
