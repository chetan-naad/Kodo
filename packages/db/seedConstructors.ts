import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Constructors unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Constructors & This Keyword" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Constructors & This Keyword",
      description: "Learn how to initialize objects using constructors and differentiate local vs global variables with 'this'.",
      order: 13,
      published: true
    }
  });

  // --- LESSON 1: Constructors ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Introduction to Constructors",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is a Constructor in Java?",
      options: [
        "A special method used to destroy objects.",
        "A regular method that returns a value.",
        "A special method used to initialize data members.",
        "A static block of code."
      ],
      correctAnswer: "A special method used to initialize data members.",
      explanation: "A constructor is a special type of method (or member) of the class used to initialize data members.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Which of the following is a rule for writing Constructors?",
      options: [
        "It must have a return type.",
        "Its name should be the same as the class name.",
        "It must always be static.",
        "It is only invoked manually."
      ],
      correctAnswer: "Its name should be the same as the class name.",
      explanation: "Rules: 1. Name same as class. 2. No return type. 3. Cannot return a value. 4. Always non-static. 5. Invoked when an object is created.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "write",
      prompt: "Create a class 'Sample'. Add a constructor that prints 'hey I am constructor'. In main, create an object of 'Sample' using 'new Sample();'.",
      options: [],
      correctAnswer: "hey I am constructor\n",
      explanation: "When you use 'new Sample()', the constructor is automatically invoked.",
      codeTemplate: "class Sample {\n    // Create Sample() constructor here\n    \n    public static void main(String[] args) {\n        // Call constructor\n        \n    }\n}",
      xpReward: 30,
      order: 3,
    }
  ];

  // --- LESSON 2: Parameterized Constructors ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Parameterized Constructors",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create an 'Employee' class with int emp_id, String emp_name, double emp_Sal. Add a constructor to initialize them with parameters x, y, z. In main, create an Employee 'e1' with (89, \"Rakesh\", 45000.0) and print emp_id, emp_name, and emp_Sal on separate lines.",
      options: [],
      correctAnswer: "89\nRakesh\n45000.0\n",
      explanation: "You can pass arguments to the constructor to initialize object states upon creation.",
      codeTemplate: "class Employee {\n    int emp_id;\n    String emp_name;\n    double emp_Sal;\n    \n    // Create parameterized constructor here\n    \n    public static void main(String[] args) {\n        // Instantiate Employee e1 and print its variables\n        \n    }\n}",
      xpReward: 40,
      order: 1,
    }
  ];

  // --- LESSON 3: The 'this' Keyword ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The 'this' Keyword",
      xpReward: 40,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "What is the primary use of the 'this' keyword when variable names conflict?",
      options: [
        "To point to the current object and differentiate global variables from local ones.",
        "To initialize a static variable.",
        "To call a static method.",
        "To point to the parent class object."
      ],
      correctAnswer: "To point to the current object and differentiate global variables from local ones.",
      explanation: "Whenever the local variable and global variable names are same, 'this' keyword is used to differentiate them by pointing to the current object's global variables.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "In class 'Student', initialize std_id, std_name, and std_fees using a constructor with identical parameter names (std_id, std_name, std_fees). Use 'this' to assign them. In main, instantiate Student with (89, \"Rakesh\", 45000.0) and print all 3 variables.",
      options: [],
      correctAnswer: "89\nRakesh\n45000.0\n",
      explanation: "Use 'this.std_id = std_id;' etc., so Java knows which variable is the global one.",
      codeTemplate: "class Student {\n    int std_id;\n    String std_name;\n    double std_fees;\n    \n    // Constructor using 'this' keyword\n    \n    public static void main(String[] args) {\n        // Instantiate Student s1 and print properties\n        \n    }\n}",
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

  console.log('Successfully seeded Java Constructors unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
