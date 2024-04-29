import { SiteConfig } from '@/site-config';
import { LayoutParams } from '@/types/next';
import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

const RootLayout = ({ children }: LayoutParams<{}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
