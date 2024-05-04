'use client';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/header/Header';
import { AppShell, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren, ReactNode } from 'react';

const RouteLayout = ({
  children,
  modal,
}: PropsWithChildren<{ modal?: ReactNode }>) => {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md">
      <Header opened={opened} toggle={toggle} />
      <AppShell.Main
        style={{
          background: theme.colors.dark[8],
          position: 'relative',
          zIndex: 1,
          marginBottom: '400px',
        }}>
        {children}
        {modal}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};

export default RouteLayout;
