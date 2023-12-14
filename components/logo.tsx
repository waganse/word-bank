import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Word Bank"
      width={145}
      height={48}
      className="tw-rounded-full"
      priority
    />
  );
}
