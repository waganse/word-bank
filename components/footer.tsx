import Image from 'next/image';
import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tw-bg-brand tw-flex tw-flex-col tw-gap-5 tw-items-center tw-text-white tw-p-5">
      <Image
        src="/logo.svg"
        alt="Word Bank"
        width={194 * 1.5}
        height={64 * 1.5}
        className="tw-m-auto"
      />
      <p>© {year} Word Bank</p>
    </footer>
  );
}
