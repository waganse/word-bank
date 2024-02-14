import { Grid, GridItem, SkeletonText } from '@chakra-ui/react';
import React from 'react';

export default function Loading() {
  return (
    <Grid gap={4} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <GridItem key={index} borderWidth="1px" borderRadius="md" px={4} py={6}>
            <SkeletonText noOfLines={1} />
          </GridItem>
        ))}
    </Grid>
  );
}
