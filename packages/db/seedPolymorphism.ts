import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Polymorphism unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Polymorphism" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Polymorphism",
      description: "Learn how objects exhibit different behaviors at different stages, including compile-time and run-time polymorphism.",
      order: 18,
      published: true
    }
  });

  // --- LESSON 1: Compile Time Polymorphism ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Compile Time Polymorphism",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is Compile Time Polymorphism?",
      options: [
        "Method declaration binding to its definition at run time.",
        "Method declaration getting binded to its definition at compile time based on arguments.",
        "An object changing its type dynamically.",
        "A class inheriting from multiple classes."
      ],
      correctAnswer: "Method declaration getting binded to its definition at compile time based on arguments.",
      explanation: "Compile time polymorphism (early/static binding) happens when the compiler binds the method declaration to its definition at compile time. Method overloading is an example.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "Why is Compile Time Polymorphism also called 'Static Binding'?",
      options: [
        "Because the methods must be static.",
        "Because it is bound at run time.",
        "Because once binded, it cannot be rebinded.",
        "Because it doesn't use variables."
      ],
      correctAnswer: "Because once binded, it cannot be rebinded.",
      explanation: "Once the method declaration gets binded to its definition by the compiler, it cannot be rebinded, hence it is called 'static binding'.",
      xpReward: 10,
      order: 2,
    }
  ];

  // --- LESSON 2: Run Time Polymorphism ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Run Time Polymorphism",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is Run Time Polymorphism?",
      options: [
        "Binding happening at compile time.",
        "Method declaration getting binded to its definition at run time based on the object created.",
        "Overloading a method in the same class.",
        "Declaring a method as static."
      ],
      correctAnswer: "Method declaration getting binded to its definition at run time based on the object created.",
      explanation: "Run time polymorphism (late/dynamic binding) happens when the JVM binds the method declaration at run time based on the actual object type. Method overriding is an example.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create class 'Demo' with void cool() printing 'hello java'. Create class 'Tester' extending Demo, overriding cool() to print 'Hello java'. In main, do an upcast: Demo d1 = new Tester(); and call d1.cool().",
      options: [],
      correctAnswer: "Hello java\n",
      explanation: "Because of dynamic binding (Run Time Polymorphism), even though the reference is of type Demo, the overridden method in Tester is executed because the object is actually a Tester.",
      codeTemplate: "class Demo {\n    void cool() {\n        System.out.println(\"hello java\");\n    }\n}\nclass Tester extends Demo {\n    // override cool()\n    \n}\nclass Mainclass {\n    public static void main(String[] args) {\n        // upcast and call\n        \n    }\n}",
      xpReward: 40,
      order: 2,
    }
  ];

  // --- LESSON 3: The Stimulator Pattern (Loose Coupling) ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Generalization & Loose Coupling",
      xpReward: 50,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "Why do we use Run Time Polymorphism?",
      options: [
        "To make the code run faster.",
        "To achieve single point of contact, loose coupling, and generalization.",
        "To avoid creating classes.",
        "To prevent inheritance."
      ],
      correctAnswer: "To achieve single point of contact, loose coupling, and generalization.",
      explanation: "Run time polymorphism allows for loose coupling (internal enhancements don't affect usage), generalization, and a single point of contact (like a Stimulator class taking a superclass reference).",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Create an 'Animal' class with void noise() printing 'some noise'. Create a 'Cat' class extending Animal overriding noise() to print 'meow'. Create a 'Stimulator' class with a static method 'void anisum(Animal a1)' that calls a1.noise(). In main, create a Cat 'c1', and call Stimulator.anisum(c1).",
      options: [],
      correctAnswer: "meow\n",
      explanation: "By passing the Cat object into the Stimulator which expects an Animal, upcasting happens implicitly. Run time polymorphism ensures the Cat's noise is played! This is loose coupling and generalization.",
      codeTemplate: "class Animal {\n    void noise() { System.out.println(\"some noise\"); }\n}\nclass Cat extends Animal {\n    // override noise() to print \"meow\"\n    \n}\nclass Stimulator {\n    static void anisum(Animal a1) {\n        // call noise() on a1\n        \n    }\n}\nclass Mainclass {\n    public static void main(String[] args) {\n        // instantiate Cat and pass to Stimulator.anisum()\n        \n    }\n}",
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

  console.log('Successfully seeded Java Polymorphism unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
