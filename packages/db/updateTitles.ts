import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating unit titles...');

  const stage = await prisma.stage.findFirst({
    where: { title: "Introduction to Java" }
  });

  if (!stage) {
    throw new Error("Stage not found.");
  }

  const updates = [
    { order: 1, title: "History of Java",              description: "Discover Java's origins, from Oak to the world's most popular language." },
    { order: 2, title: "Tokens & Keywords",            description: "Learn identifiers, literals, operators, separators, and all 50 reserved keywords." },
    { order: 3, title: "JVM, JRE & JDK",               description: "Understand the Java Architecture: compilation, interpretation, and platform independence." },
    { order: 4, title: "Hello World & Java Types",      description: "Write your first Java program and explore Classes, Interfaces, Enums & Annotations." },
    { order: 5, title: "Variables & Data Types",        description: "Primitive vs Non-Primitive types, declaration, initialization, and local vs global scope." },
    { order: 6, title: "Methods & Return Types",        description: "Method syntax, the final keyword, parameters, and returning values." },
    { order: 7, title: "Static vs Non-Static",          description: "Class-level vs Object-level members, Static Pool vs Heap, and cross-class access." },
    { order: 8, title: "JVM Memory Architecture",       description: "Dive into Stack, Heap, Static Pool Area, Method Area, and the object creation lifecycle." },
    { order: 9, title: "Reference Variables",           description: "Object addresses, reference declaration, shared vs separate references, and fully qualified paths." },
    { order: 10, title: "Composition & Has-A",          description: "Class diagrams, the Has-A relationship, and using objects of another class." },
    { order: 11, title: "SIB & IIB Blocks",             description: "Static Initialization Blocks, Instance Initialization Blocks, and their execution order." },
  ];

  for (const u of updates) {
    await prisma.unit.updateMany({
      where: { stageId: stage.id, order: u.order },
      data: { title: u.title, description: u.description }
    });
    console.log(`  ✓ Unit ${u.order}: "${u.title}"`);
  }

  console.log('All unit titles updated!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
