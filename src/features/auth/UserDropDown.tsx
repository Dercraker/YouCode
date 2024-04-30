import AvatarImage from '@/components/ui/Avatar';
import { ActionIcon, Group, Menu, rem, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { User } from 'next-auth';
import LogoutButton from './LogoutButton';

interface UserDropDownProps {
  user: User;
}

const UserDropDown = ({ user }: UserDropDownProps) => {
  return (
    <Group>
      <Menu
        withArrow
        width={300}
        position="bottom-end"
        transitionProps={{ transition: 'pop' }}
        withinPortal
        trigger="click-hover">
        <Menu.Target>
          <ActionIcon variant="transparent" radius="xl" size="xl">
            <AvatarImage user={user} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            rightSection={
              <IconChevronRight
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component="a"
            href="/account">
            <Group>
              <AvatarImage user={user} />
              <div>
                <Text fw={500}>{user.name}</Text>
                <Text size="xs" c="dimmed">
                  {user.email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          {/* <Menu.Label>Application</Menu.Label>
          <Menu.Item
            leftSection={
              <IconStar
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.yellow[6]}
              />
            }
          >
            Favorite characters
          </Menu.Item> */}

          <Menu.Label>Settings</Menu.Label>
          {/* <Menu.Item
            leftSection={
              <IconSettings
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component="a"
            href="/account"
          >
            Account settings
          </Menu.Item> */}
          <LogoutButton />
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default UserDropDown;
