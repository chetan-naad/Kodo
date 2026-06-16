import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Java Object Class unit...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Object-Oriented Programming" }
  });

  if (!stage) {
    throw new Error("Stage 'Object-Oriented Programming' not found. Run seedHistory.ts first.");
  }

  // Find if unit exists and delete to avoid duplicates
  await prisma.unit.deleteMany({
    where: { stageId: stage.id, title: "Object & String Classes" }
  });

  // Create Unit
  const unit = await prisma.unit.create({
    data: {
      stageId: stage.id,
      title: "Object & String Classes",
      description: "Dive deep into the Object class (the super most class in Java) and understand how Strings are managed immutably in memory pools.",
      order: 23,
      published: true
    }
  });

  // --- LESSON 1: The Object Class & Its Methods ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The Object Class",
      xpReward: 40,
      order: 1,
      published: true
    }
  });

  const lesson1Exercises = [
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the super most class in Java?",
      options: [
        "System",
        "String",
        "Object",
        "Main"
      ],
      correctAnswer: "Object",
      explanation: "Object class belongs to java.lang package and each and every class in Java implicitly extends it.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What does the default implementation of toString() return?",
      options: [
        "The memory address of the object.",
        "The fully qualified path (package.classname) @ hexadecimal number.",
        "A random string.",
        "The values of the variables inside the object."
      ],
      correctAnswer: "The fully qualified path (package.classname) @ hexadecimal number.",
      explanation: "Whenever we print the reference variable, toString() is implicitly invoked and returns the fully qualified path @ hexadecimal hash.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What does the hashCode() method return?",
      options: [
        "A string representing the memory address.",
        "A unique integer number generated using a hashing algorithm based on the object address.",
        "A boolean indicating if the object exists.",
        "The object's size in bytes."
      ],
      correctAnswer: "A unique integer number generated using a hashing algorithm based on the object address.",
      explanation: "hashCode() is a non-static, non-final method of Object class that returns a unique integer (hash no).",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson1.id,
      type: "mcq",
      prompt: "What is the default behavior of the equals() method in the Object class?",
      options: [
        "It compares the actual values inside two objects.",
        "It compares the object addresses.",
        "It returns true if both objects are of the same class.",
        "It generates a hashcode."
      ],
      correctAnswer: "It compares the object addresses.",
      explanation: "By default, the equal method of the Object class is used to compare object addresses.",
      xpReward: 10,
      order: 4,
    }
  ];

  // --- LESSON 2: The String Class & Immutability ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit.id,
      title: "The String Class & Memory Pools",
      xpReward: 40,
      order: 2,
      published: true
    }
  });

  const lesson2Exercises = [
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Why is the String class considered 'immutable'?",
      options: [
        "Because it is declared as final.",
        "Because you cannot create new String objects.",
        "Because changing a string's value creates a new object instead of modifying the existing one, so other references pointing to the old object aren't affected.",
        "Because it is stored in the Non-Constant Pool Area."
      ],
      correctAnswer: "Because changing a string's value creates a new object instead of modifying the existing one, so other references pointing to the old object aren't affected.",
      explanation: "When multiple reference variables point to a single object, updating one reference creates a new object in memory, leaving the original object unchanged for the other references.",
      xpReward: 10,
      order: 1,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "Where are String objects stored when created WITHOUT the 'new' keyword?",
      options: [
        "Non-Constant Pool Area",
        "Stack Memory",
        "Constant Pool Area",
        "Registers"
      ],
      correctAnswer: "Constant Pool Area",
      explanation: "All String objects created WITHOUT the new operator (e.g., String s = \"hi\") are stored in the Constant Pool Area.",
      xpReward: 10,
      order: 2,
    },
    {
      lessonId: lesson2.id,
      type: "mcq",
      prompt: "What is the difference between the '==' operator and the overridden 'equals()' method in the String class?",
      options: [
        "'==' compares values, while 'equals()' compares addresses.",
        "'==' compares addresses, while the String class overrides 'equals()' to compare actual values.",
        "There is no difference.",
        "'==' is a method, 'equals()' is an operator."
      ],
      correctAnswer: "'==' compares addresses, while the String class overrides 'equals()' to compare actual values.",
      explanation: "The == operator ALWAYS compares addresses. The String class overrides the Object's equal() method to compare the actual character values instead of addresses.",
      xpReward: 10,
      order: 3,
    },
    {
      lessonId: lesson2.id,
      type: "write",
      prompt: "Create two strings: String s1 = new String(\"hi\") and String s2 = new String(\"hi\"). Print whether their addresses are equal using '==', and then print whether their values are equal using 's1.equals(s2)'.",
      options: [],
      correctAnswer: "false\ntrue\n",
      explanation: "Because they are created with 'new', they are in the non-constant pool at different addresses (== is false). However, they contain the same characters (equals() is true).",
      codeTemplate: "class Mainclass {\n    public static void main(String[] args) {\n        String s1 = new String(\"hi\");\n        String s2 = new String(\"hi\");\n        \n        // print comparison using ==\n        \n        // print comparison using .equals()\n        \n    }\n}",
      xpReward: 40,
      order: 4,
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

  console.log('Successfully seeded Java Object Class unit!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
