import { Text } from '@chakra-ui/react';
import React, { Suspense } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import WordsList from '@/components/words/WordsList';
import { getWords } from '@/lib/utils';

async function Words() {
  const words = await getWords();
  return <WordsList words={words} />;
}

export default async function WordsPage() {
  return (
    <>
      <Header />
      <main className="tw-p-4 tw-min-h-screen">
        <Suspense
          fallback={
            <Text textAlign="center" className="tw-animate-pulse">
              Loading...
            </Text>
          }
        >
          <Words />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
