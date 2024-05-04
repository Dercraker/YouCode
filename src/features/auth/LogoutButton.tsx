'use client';

import useNotify, { NotifyDto } from '@/hooks/useNotify';
import { logger } from '@/lib/logging/logger';
import { Button, Group, rem } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const { ErrorNotify } = useNotify();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () => signOut(),
    onSettled: () => {
      router.push('/');
    },
    onError: error => {
      logger.error('Error while User try logout', error.message, error.stack, {
        label: 'Logout',
      });
      return ErrorNotify({
        title: 'Error',
        message: error.message,
      } as NotifyDto);
    },
  });

  return (
    <Group justify="end">
      <Button
        variant="default"
        onClick={() => logoutMutation.mutateAsync()}
        leftSection={
          <IconLogout
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }>
        Logout
      </Button>
    </Group>
  );
};

export default LogoutButton;
