import React from 'react';

import Logo from './logo';

export default function Header() {
  return (
    <header className="tw-flex tw-items-center tw-justify-between tw-bg-brand tw-border-b tw-border-white/10 tw-p-3 sm:tw-px-9">
      <Logo />
    </header>
  );
}
