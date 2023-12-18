import { PrismaClient } from '@prisma/client';

import { categories } from './data/categories';
import { types } from './data/types';
import { words } from './data/words';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const item of types) {
    const result = await prisma.type.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
    console.log(`Created type with id: ${result.id}`);
  }

  for (const item of categories) {
    const result = await prisma.category.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
    console.log(`Created category with id: ${result.id}`);
  }

  for (const item of words) {
    const result = await prisma.word.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
    console.log(`Created word with id: ${result.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
