import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getWords() {
  const wordData = await prisma.word.findMany();

  return wordData;
}

export async function getWord(word: string) {
  const wordData = await prisma.word.findUnique({
    where: {
      word,
    },
  });

  return wordData;
}
