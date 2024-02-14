import { pageSize } from '@/const';

import prisma from './db';

export async function getWords({
  page,
  categoryId,
  typeId,
}: {
  page: number;
  categoryId: number;
  typeId?: number;
}) {
  const where = {
    categories: categoryId ? { has: categoryId } : undefined,
    types: typeId ? { has: typeId } : undefined,
  };

  const words = await prisma.word.findMany({
    where,
    orderBy: {
      word: 'asc',
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const totalCount = await prisma.word.count({
    where,
  });

  const types = await getTypes();
  const categories = await getCategories();

  return {
    words: words.map((word) => ({
      ...word,
      types: types.filter((type) => word.types.includes(type.id)),
      categories: categories.filter((category) => word.categories.includes(category.id)),
    })),
    totalCount,
  };
}

export async function getWord(word: string) {
  const wordData = await prisma.word.findUnique({
    where: {
      word,
    },
  });

  return wordData;
}

export async function getCategories(id?: number) {
  return await prisma.category.findMany(
    id
      ? {
          where: {
            id,
          },
        }
      : undefined
  );
}

export async function getTypes(id?: number) {
  return await prisma.type.findMany(
    id
      ? {
          where: {
            id,
          },
        }
      : undefined
  );
}
