'use client';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/header/Header';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const RouteLayout = () => {
  const [opened, { toggle }] = useDisclosure();

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
          background: '#242424',
          position: 'relative',
        }}>
        Navbar is only visible on mobile, links that are rendered in the header
        on desktop are hidden on mobile in header and rendered in navbar
        instead.
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};

export default RouteLayout;
