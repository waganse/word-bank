import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const words = [
  {
    id: 1,
    word: 'let',
    meaning_en: 'to allow',
    meaning_jp: '○に-させる, ○に-するのを許す',
    sentences: {
      create: [
        {
          sentence: 'I will let you know when I have made a decision.',
        },
        {
          sentence: 'I let my children stay up late on weekends.',
        },
        {
          sentence: 'Let me think about it.',
        },
        {
          sentence: 'Let me see.',
        },
      ],
    },
    note: 'let-let-let',
  },
  {
    id: 2,
    word: 'create',
    meaning_en: 'to make something new',
    meaning_jp: '-を作る, -を生み出す',
    sentences: {
      create: [
        { sentence: 'This recipe was created by a famous chef.' },
        { sentence: 'Please create a new password.' },
      ],
    },
    note: 'create-created-created, creation: 作品, 創造, creative: 創造的な',
  },
  {
    id: 3,
    word: 'cause',
    meaning_en: 'the reason why something happens, to make something happen',
    meaning_jp: '[n]原因, [v]-の原因となる, -を引き起こす',
    sentences: {
      create: [
        { sentence: 'The cause of the fire is unknown.,Smoking causes cancer.' },
        { sentence: 'The accident caused a traffic jam.' },
      ],
    },
    note: 'cause-caused-caused, 反意語: prevent',
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

const wordInTypes = [
  {
    id: 1,
    word_id: 1,
    type_id: 1,
  },
  {
    id: 2,
    word_id: 2,
    type_id: 1,
  },
  {
    id: 3,
    word_id: 3,
    type_id: 1,
  },
  {
    id: 4,
    word_id: 3,
    type_id: 2,
  },
];

const wordInCategories = [
  {
    id: 1,
    word_id: 1,
    category_id: 3,
  },
  {
    id: 2,
    word_id: 2,
    category_id: 3,
  },
  {
    id: 3,
    word_id: 3,
    category_id: 3,
  },
];

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

  for (const item of wordInTypes) {
    const result = await prisma.word_In_Types.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
    console.log(`Created word_in_types with id: ${result.id}`);
  }

  for (const item of wordInCategories) {
    const result = await prisma.word_In_Categories.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
    console.log(`Created word_in_categories with id: ${result.id}`);
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
