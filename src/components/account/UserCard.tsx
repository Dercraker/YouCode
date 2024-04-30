import AvatarImage from '@/components/ui/Avatar';
import LogoutButton from '@/features/auth/LogoutButton';
import { auth } from '@/lib/auth/helper';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { RedirectType, redirect } from 'next/navigation';

const UserCard = async () => {
  const user = await auth();
  if (!user) {
    redirect('/auth/signin?callbackUrl=/account', RedirectType.push);
  }
  return (
    <Paper radius="lg" shadow="xl" p="xl" withBorder>
      <Stack>
        <Group>
          <AvatarImage user={user} />
          <Stack gap="0">
            <Text fw="700">{user.email}</Text>
            <Text>{user.name}</Text>
          </Stack>
        </Group>
        <Stack>
          <Button variant="outline" fullWidth>
            Settings
          </Button>
          <Button variant="outline" fullWidth>
            Admin
          </Button>
        </Stack>
        <LogoutButton />
      </Stack>
    </Paper>
  );
};

export default UserCard;