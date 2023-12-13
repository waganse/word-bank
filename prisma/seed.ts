import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const words = [
  {
    id: 1,
    word: 'let',
    meaning_en: 'to allow',
    meaning_jp: '○に-させる, ○に-するのを許す',
    types: '1',
    sentences:
      'I will let you know when I have made a decision.,I let my children stay up late on weekends.,Let me think about it.,Let me see.',
    note: 'let-let-let',
    categories: '3',
    tags: '',
  },
  {
    id: 2,
    word: 'create',
    meaning_en: 'to make something new',
    meaning_jp: '-を作る, -を生み出す',
    types: '1',
    sentences: 'This recipe was created by a famous chef.,Please create a new password.',
    note: 'create-created-created, creation: 作品, 創造, creative: 創造的な',
    categories: '3',
    tags: '',
  },
  {
    id: 3,
    word: 'cause',
    meaning_en: 'the reason why something happens, to make something happen',
    meaning_jp: '原因, -の原因となる, -を引き起こす',
    types: '1,2',
    sentences:
      'The cause of the fire is unknown.,Smoking causes cancer.,The accident caused a traffic jam.',
    note: 'cause-caused-caused, 反意語: prevent',
    categories: '3',
    tags: '',
  },
];

const types = [
  {
    id: 1,
    name_en: 'verb',
    name_jp: '動詞',
  },
  {
    id: 2,
    name_en: 'noun',
    name_jp: '名詞',
  },
  {
    id: 3,
    name_en: 'adjective',
    name_jp: '形容詞',
  },
  {
    id: 4,
    name_en: 'adverb',
    name_jp: '副詞',
  },
  {
    id: 5,
    name_en: 'preposition',
    name_jp: '前置詞',
  },
  {
    id: 6,
    name_en: 'conjunction',
    name_jp: '接続詞',
  },
  {
    id: 7,
    name_en: 'other',
    name_jp: 'その他',
  },
];

const categories = [
  {
    id: 1,
    name_en: 'Eiken Grade 1',
    name_jp: '英検1級',
  },
  {
    id: 2,
    name_en: 'Eiken Grade Pre-1',
    name_jp: '英検準1級',
  },
  {
    id: 3,
    name_en: 'Eiken Grade 2',
    name_jp: '英検2級',
  },
  {
    id: 4,
    name_en: 'Eiken Grade Pre-2',
    name_jp: '英検準2級',
  },
  {
    id: 5,
    name_en: 'Eiken Grade 3',
    name_jp: '英検3級',
  },
  {
    id: 6,
    name_en: 'Eiken Grade 4',
    name_jp: '英検4級',
  },
  {
    id: 7,
    name_en: 'Eiken Grade 5',
    name_jp: '英検5級',
  },
  {
    id: 8,
    name_en: 'TOEIC',
    name_jp: 'TOEIC',
  },
  {
    id: 9,
    name_en: 'TOEFL',
    name_jp: 'TOEFL',
  },
  {
    id: 10,
    name_en: 'other',
    name_jp: 'その他',
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const word of words) {
    const result = await prisma.word.upsert({
      where: { id: word.id },
      update: {},
      create: word,
    });
    console.log(`Created word with id: ${result.id}`);
  }

  for (const type of types) {
    const result = await prisma.type.upsert({
      where: { id: type.id },
      update: {},
      create: type,
    });
    console.log(`Created type with id: ${result.id}`);
  }

  for (const category of categories) {
    const result = await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
    console.log(`Created category with id: ${result.id}`);
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
