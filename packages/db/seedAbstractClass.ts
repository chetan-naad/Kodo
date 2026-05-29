import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Abstract Class unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage 'Introduction to Java' not found.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Abstract Class" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Abstract Class",
      description: "Learn about concrete vs abstract methods, and the strict rules governing abstract classes and their implementations.",
      order: 19,
      published: true
    }
  });

  // --- LESSON 1: Concrete vs Abstract ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Concrete vs Abstract Methods",
      xpReward: 30,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is a concrete method?",
      options: [
        "A method declared with the 'abstract' keyword.",
        "A method that has both a declaration and a definition (body).",
        "A method that cannot be overridden.",
        "A method that only has a declaration."
      ],
      correctAnswer: "A method that has both a declaration and a definition (body).",
      explanation: "Any method which has both declaration and definition is called a concrete method.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is an abstract method?",
      options: [
        "A method with a definition but no declaration.",
        "A method that cannot be called.",
        "Any method declared with the keyword 'abstract' (no body).",
        "A static method."
      ],
      correctAnswer: "Any method declared with the keyword 'abstract' (no body).",
      explanation: "An abstract method is declared with the keyword abstract and ends with a semicolon instead of a body block.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "If a class contains at least one abstract method, what must be true about the class?",
      options: [
        "The class must be declared as abstract.",
        "The class must be final.",
        "The class can be instantiated directly.",
        "The class must be declared as concrete."
      ],
      correctAnswer: "The class must be declared as abstract.",
      explanation: "If a class has an abstract method, the class must be declared as abstract. However, vice versa is not true (an abstract class can have zero abstract methods).",
      xpReward: 10,
      order: 3,
    }
  ];

  // --- LESSON 2: Abstract Rules & Instantiation ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Abstract Class Rules",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Can we create an object (instantiate) an abstract class?",
      options: [
        "Yes, by using the 'new' keyword.",
        "Yes, but only inside a static method.",
        "No, we cannot create an object for an abstract class or interface.",
        "No, unless all its methods are concrete."
      ],
      correctAnswer: "No, we cannot create an object for an abstract class or interface.",
      explanation: "We cannot instantiate an abstract class. We must inherit it and instantiate the subclass (implementation class).",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Which of the following modifiers CANNOT be applied to an abstract method?",
      options: [
        "public, protected",
        "static, final, private",
        "default",
        "void"
      ],
      correctAnswer: "static, final, private",
      explanation: "An abstract method cannot be declared as static, final, or private, because it MUST be overridden by subclasses.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create an abstract class 'Tester' with two abstract methods: 'void disp()' and 'void cool()'. Create a concrete class 'Demo' extending 'Tester' that overrides disp() to print 'hi' and cool() to print 'hello'. Finally, inside Mainclass main(), instantiate Demo and call both methods.",
      options: [],
      correctAnswer: "hi\nhello\n",
      explanation: "The 'Demo' class must provide the implementation for all abstract methods in 'Tester' to become a concrete class.",
      codeTemplate: "abstract class Tester {\n    // declare abstract methods\n    \n}\n\nclass Demo extends Tester {\n    // override disp()\n    \n    // override cool()\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        // instantiate and call\n        \n    }\n}",
      xpReward: 40,
      order: 3,
    }
  ];

  // --- LESSON 3: Partial Implementation ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "Partial Implementation",
      xpReward: 30,
      order: 3,
      published: true
    }
  });

  const lesson3Exercises = [
    {
      lessonId: lesson3.id,
      type: "mcq",
      prompt: "If a subclass inherits an abstract class but only overrides SOME of the abstract methods, what happens?",
      options: [
        "The code compiles fine as a concrete class.",
        "The subclass must also be declared as abstract.",
        "The un-implemented methods are deleted.",
        "A runtime exception is thrown."
      ],
      correctAnswer: "The subclass must also be declared as abstract.",
      explanation: "If any one of the abstract methods is not overridden in the subclass, then the subclass itself should be declared as abstract.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson3.id,
      type: "write",
      prompt: "Create abstract class Demo with abstract methods test() & cool(). Create abstract class Tester extending Demo, overriding test() to print 'hi'. Create class Sample extending Tester, overriding cool() to print 'hello'. In main, instantiate Sample and call both methods.",
      options: [],
      correctAnswer: "hi\nhello\n",
      explanation: "Tester is abstract because it doesn't implement cool(). Sample implements the final piece, becoming a concrete class.",
      codeTemplate: "abstract class Demo {\n    abstract void test();\n    abstract void cool();\n}\n\n// Tester must be abstract because it doesn't override cool()\nabstract class Tester extends Demo {\n    void test() {\n        System.out.println(\"hi\");\n    }\n}\n\nclass Sample extends Tester {\n    // override cool()\n    \n}\n\nclass Mainclass {\n    public static void main(String[] args) {\n        Sample s2 = new Sample();\n        s2.test();\n        s2.cool();\n    }\n}",
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

  console.log('Successfully seeded Java Abstract Class unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
