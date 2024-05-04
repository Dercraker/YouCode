import { LogoSvg } from '@/components/svg/LogoSvg';
import AuthButtonClient from '@/features/auth/AuthButtonClient';
import { HeaderLinks } from '@/utils/NavigationLinks';
import { SiteConfig } from '@/utils/site-config';
import {
  AppShell,
  Burger,
  Group,
  Stack,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import styles from './Header.module.css';

interface LandingHeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: LandingHeaderProps) => {
  const session = useSession();
  const router = useRouter();

  const handleClickMenuLink = useCallback(
    (link: string) => {
      if (opened) toggle();

      router.push(link);
    },
    [opened, toggle, router],
  );

  const links = useMemo(() => {
    return HeaderLinks.map(link => {
      if (link.auth && session.status !== 'authenticated') {
        return null;
      }

      return (
        <UnstyledButton
          p="xs"
          key={link.label}
          className={styles.control}
          onClick={() => handleClickMenuLink(link.href)}>
          <Group gap="3px">
            {link.icon}
            {link.label}
          </Group>
        </UnstyledButton>
      );
    });
  }, [session, handleClickMenuLink]);

  return (
    <>
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group>
              <LogoSvg size={38} />
              <Title ta="center" order={3}>
                {SiteConfig.title}
              </Title>
            </Group>
          </Group>
          <Group visibleFrom="sm">
            <Group gap="0">{links}</Group>
            <AuthButtonClient />
            {/* <SwitchThemeIcon /> */}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Stack py="md" px={4} align="center">
          {links}
          <AuthButtonClient buttonProps={{ fullWidth: true, mx: 'sm' }} />
        </Stack>
      </AppShell.Navbar>
    </>
  );
};

export default Header;
