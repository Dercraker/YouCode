import AvatarImage from '@/components/ui/Avatar';
import LogoutButton from '@/features/auth/LogoutButton';
import { requiredAuth } from '@/lib/auth/helper';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';

const UserCard = async () => {
  const user = await requiredAuth();
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
          <Button
            variant="outline"
            fullWidth
            component="a"
            href={LINKS.Account.Settings.href}>
            {LINKS.Account.Settings.label}
          </Button>
          <Button
            variant="outline"
            fullWidth
            component="a"
            href={LINKS.Admin.Admin.href}>
            Admin
          </Button>
        </Stack>
        <LogoutButton />
      </Stack>
    </Paper>
  );
};

export default UserCard;
