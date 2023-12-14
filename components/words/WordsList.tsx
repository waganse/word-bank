import { Flex, Grid, GridItem, HStack, Mark, Stack, Tag as TagEl, Text } from '@chakra-ui/react';

import { pageSize } from '@/const';
import { getWords } from '@/lib/utils';

import PaginationControl from './PaginationControl';

type Props = {
  categoryId: string;
  page: number;
};

export default async function WordsList({ categoryId, page }: Props) {
  const { words, totalCount } = await getWords({ page });

  const previousPath = page > 1 ? `/words/${categoryId}?page=${page - 1}` : '';
  const nextPath = totalCount > pageSize * page ? `/words/${categoryId}?page=${page + 1}` : '';

  return (
    <>
      <Grid gap={4} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
        {words.map(({ word, meaning_en, meaning_jp, note, categories, types }, index) => (
          <GridItem key={index} borderWidth="1px" borderRadius="md" p={4}>
            <Stack gap={4}>
              <Flex justifyContent="space-between">
                <Flex gap={4}>
                  <Text color="green" fontWeight="bold" fontSize="xl">
                    {word}
                  </Text>
                  <HStack spacing={2}>
                    {types.map(({ id, name_jp }) => (
                      <TagEl key={id} size="sm" variant="outline" colorScheme="blue">
                        {name_jp}
                      </TagEl>
                    ))}
                  </HStack>
                </Flex>
                <HStack spacing={2}>
                  {categories.map(({ id, name_jp }) => (
                    <TagEl key={id} size="sm" colorScheme="green">
                      {name_jp}
                    </TagEl>
                  ))}
                </HStack>
              </Flex>
              <Stack>
                <Mark bg="gray.200" px={2}>
                  {meaning_jp}
                </Mark>
                <Mark bg="gray.200" px={2}>
                  {meaning_en}
                </Mark>
              </Stack>
              <Text className=" tw-text-gray-500">{note}</Text>
            </Stack>
          </GridItem>
        ))}
      </Grid>

      <PaginationControl previousPath={previousPath} nextPath={nextPath} />
    </>
  );
}
