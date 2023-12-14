import { Flex } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

type Props = {
  previousPath: string;
  nextPath: string;
};

const className =
  'tw-flex tw-items-center tw-gap-2 tw-border tw-border-brand tw-px-4 tw-py-2 tw-rounded-md tw-text-brand hover:tw-bg-brand hover:tw-text-white';

export default function PaginationControl({ previousPath, nextPath }: Props) {
  return (
    <Flex justifyContent="space-between" mt={8}>
      {previousPath ? (
        <Link href={previousPath} className={className}>
          <ArrowLeftIcon />
          前へ
        </Link>
      ) : (
        <div />
      )}
      {nextPath ? (
        <Link href={nextPath} className={className}>
          次へ
          <ArrowRightIcon />
        </Link>
      ) : (
        <div />
      )}
    </Flex>
  );
}
