'use client';
import { Text } from '@chakra-ui/react';
import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  return (
    <Text>
      Something went wrong! <button onClick={reset}>Try again</button>
    </Text>
  );
}
