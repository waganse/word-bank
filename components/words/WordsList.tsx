import { Flex, Grid, GridItem, HStack, Mark, Stack, Tag as TagEl, Text } from '@chakra-ui/react';

import { pageSize } from '@/const';
import { getWords } from '@/lib/utils';

import PaginationControl from './PaginationControl';

type Props = {
  categoryId: number;
  page: number;
  typeId?: number;
};

export default async function WordsList({ categoryId, page, typeId }: Props) {
  const { words, totalCount } = await getWords({ page, categoryId, typeId });

  const previousPath = page > 1 ? `/words/${categoryId}?page=${page - 1}` : '';
  const nextPath = totalCount > pageSize * page ? `/words/${categoryId}?page=${page + 1}` : '';

  return (
    <>
      <Text>{totalCount}</Text>
      <Grid gap={4} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
        {words.map(
          (
            { word, meaning_en, meaning_jp, note_en, note_jp, categories, types, pronunciation },
            index
          ) => (
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
                    <Text className=" tw-text-gray-500">{pronunciation}</Text>
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
                  <Mark bg="gray.200" px={2} whiteSpace="break-spaces">
                    {meaning_jp}
                  </Mark>
                  <Mark bg="gray.200" px={2} whiteSpace="break-spaces">
                    {meaning_en}
                  </Mark>
                </Stack>
                <Stack>
                  <Text className=" tw-text-gray-500" whiteSpace="break-spaces">
                    {note_jp}
                  </Text>
                  <Text className=" tw-text-gray-500" whiteSpace="break-spaces">
                    {note_en}
                  </Text>
                </Stack>
              </Stack>
            </GridItem>
          )
        )}
      </Grid>

      <PaginationControl previousPath={previousPath} nextPath={nextPath} />
    </>
  );
}
