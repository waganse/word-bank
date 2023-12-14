import './globals.css';

import Footer from '@/components/footer';
import Header from '@/components/header';

import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header />
          <main className="tw-p-4 md:tw-p-8 tw-min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
