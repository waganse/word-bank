import { Category, Tag, Type } from '@prisma/client';

import { pageSize } from '@/const';

import prisma from './db';

export async function getWords({
  page,
  categoryId,
  typeId,
  tagId,
}: {
  page: number;
  categoryId?: number;
  typeId?: number;
  tagId?: number;
}) {
  const where = {
    categories: categoryId ? { some: { category_id: categoryId } } : undefined,
    types: typeId ? { some: { type_id: typeId } } : undefined,
    tags: tagId ? { some: { tag_id: tagId } } : undefined,
  };

  const words = await prisma.word.findMany({
    where,
    orderBy: {
      word: 'asc',
    },
    include: {
      categories: true,
      types: true,
      tags: true,
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const totalCount = await prisma.word.count({
    where,
  });

  const types = await getTypes();
  const categories = await getCategories();
  const tags = await getTags();

  return {
    words: words.map((word) => ({
      ...word,
      types: word.types.map((type) => types.find((t) => t.id === type.type_id)) as Type[],
      categories: word.categories.map((category) =>
        categories.find((c) => c.id === category.category_id)
      ) as Category[],
      tags: word.tags.map((tag) => tags.find((t) => t.id === tag.tag_id)) as Tag[],
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

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function getTypes() {
  return await prisma.type.findMany();
}

export async function getTags() {
  return await prisma.tag.findMany();
}
