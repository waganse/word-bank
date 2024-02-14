import { Flex, Text } from '@chakra-ui/react';
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { z } from 'zod';

import Loading from '@/components/Loading';
import WordsList from '@/components/words/WordsList';
import { getCategories, getTypes } from '@/lib/utils';

type Props = {
  params: { categoryId: string };
  searchParams: { page: string; type: string | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const categoryId = parseInt(params.categoryId, 10);
  const categories = await getCategories(categoryId);

  const category = categories.length ? categories[0].name_jp : '';
  const title = `Words - ${category}`;
  const description = `Words - ${category}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.yourdomain.com/words/${params.categoryId}/page/${searchParams.page}`,
    },
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function WordsPage({ params, searchParams }: Props) {
  const parsedPage = pageNumberSchema.safeParse(searchParams.page ?? 1);
  const categoryId = parseInt(params.categoryId, 10);
  const typeId = searchParams.type ? parseInt(searchParams.type, 10) : undefined;

  const categories = await getCategories(categoryId);
  const types = await getTypes(typeId);

  if (!parsedPage.success) {
    throw new Error('Invalid page number');
  }

  return (
    <>
      {/* heading */}
      <Flex alignItems="baseline" justifyContent="space-between">
        <Text as="h2" fontSize="2xl" fontWeight="bold" mb={4}>
          {categories[0].name_jp}
        </Text>
        <Text fontSize="sm">Page: {parsedPage.data}</Text>
      </Flex>

      {/* main contents */}
      <Suspense key={`${params.categoryId}-${parsedPage.data}`} fallback={<Loading />}>
        <WordsList categoryId={categoryId} page={parsedPage.data} typeId={typeId} />
      </Suspense>
    </>
  );
}
