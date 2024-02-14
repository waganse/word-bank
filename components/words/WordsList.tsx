import { Flex, Grid, GridItem, HStack, Mark, Stack, Tag as TagEl, Text } from '@chakra-ui/react';

import { pageSize } from '@/const';
import { getWords } from '@/lib/utils';

import PaginationControl from './PaginationControl';

type Props = {
  categoryId: number;
  page?: number;
  typeId?: number;
};

export default async function WordsList({ categoryId, page = 1, typeId }: Props) {
  const { words, totalCount } = await getWords({ page, categoryId, typeId });

  const previousPath = page > 1 ? `/words/${categoryId}?page=${page - 1}` : '';
  const nextPath = totalCount > pageSize * page ? `/words/${categoryId}?page=${page + 1}` : '';

  return words.length ? (
    <Stack spacing={6}>
      <Grid
        gap={4}
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        alignItems="center"
      >
        {words.map(
          (
            { word, meaning_en, meaning_jp, note_en, note_jp, categories, types, pronunciation },
            index
          ) => (
            <GridItem key={index} borderWidth="1px" borderRadius="md" p={4}>
              <Flex gap={4} alignItems="center">
                <Stack spacing={2} flex={2}>
                  <Flex alignItems="center" gap={4}>
                    <Text color="green" fontWeight="bold" fontSize="xl">
                      {word}
                    </Text>
                    <Text className=" tw-text-gray-500">{pronunciation}</Text>
                  </Flex>
                  <HStack spacing={2}>
                    {types.map(({ id, name_jp }) => (
                      <TagEl key={id} size="sm" variant="outline" colorScheme="blue">
                        {name_jp}
                      </TagEl>
                    ))}
                  </HStack>
                </Stack>
                <Mark bg="gray.200" px={2} whiteSpace="break-spaces" flex={3}>
                  {meaning_jp}
                </Mark>
              </Flex>
            </GridItem>
          )
        )}
      </Grid>

      <PaginationControl previousPath={previousPath} nextPath={nextPath} />
    </Stack>
  ) : (
    <Text p={6} textAlign="center">
      データがありません
    </Text>
  );
}
