import { Grid, GridItem, Skeleton, Stack } from '@chakra-ui/react';
import React, { Suspense } from 'react';

import WordsList from '@/components/words/WordsList';

type Props = {
  params: { categoryId: string };
  searchParams: { page: string };
};

export default async function WordsPage({ params, searchParams }: Props) {
  const page = parseInt(searchParams.page, 10) || 1;

  return (
    <Suspense
      key={`${params.categoryId}-${page}`}
      fallback={
        <Grid gap={4} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <GridItem key={index} borderWidth="1px" borderRadius="md" px={4} py={6}>
                <Stack spacing={4}>
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} height="15px" />
                    ))}
                </Stack>
              </GridItem>
            ))}
        </Grid>
      }
    >
      <WordsList categoryId={params.categoryId} page={page} />
    </Suspense>
  );
}
