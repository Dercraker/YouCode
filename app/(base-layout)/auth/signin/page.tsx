'use client';

import { LogoSvg } from '@/components/svg/LogoSvg';
import { SiteConfig } from '@/utils/site-config';
import { Card, Group, Space, Stack, Text, Title } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { RedirectType, redirect } from 'next/navigation';
import { SignInProviders } from '../../../../src/features/auth/signIn/SignInProviders';

const RoutePage = () => {
  const session = useSession();

  if (session.data) redirect('/', RedirectType.push);

  return (
    <Card withBorder w="50%" mx="25%" py="xl">
      <Card.Section>
        <Stack align="center">
          <Group>
            <LogoSvg size={38} />
            <Title ta="center" order={3}>
              {SiteConfig.title}
            </Title>
          </Group>
          <Text fw="700" size="2em">
            Sign in to your account
          </Text>
        </Stack>
      </Card.Section>
      <Space h="xl" />
      <Card.Section>
        <SignInProviders />
      </Card.Section>
    </Card>
  );
};

export default RoutePage;
