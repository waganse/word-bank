import { Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { Word } from '@prisma/client';

type Props = {
  words: Word[];
};

export default function WordsList({ words }: Props) {
  return (
    <Grid gap={4} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
      {words.map((word, index) => (
        <GridItem key={index} borderWidth="1px" borderRadius="md" p={4}>
          <Text fontWeight="bold">{word.word}</Text>
          <Text>{word.meaning_jp}</Text>
          <Stack>
            <Text className=" tw-text-sm">[例文]</Text>
            <Text className="tw-whitespace-pre">{word.sentences}</Text>
          </Stack>
          <Text className=" tw-text-gray-500">{word.note}</Text>
        </GridItem>
      ))}
    </Grid>
  );
}
