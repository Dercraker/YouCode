import AvatarImage from '@/components/ui/Avatar';
import { LINKS } from '@/utils/NavigationLinks';
import { ActionIcon, Group, Menu, rem, Text } from '@mantine/core';
import {
  IconBook,
  IconChevronRight,
  IconShieldLock,
} from '@tabler/icons-react';
import { User } from 'next-auth';
import Link from 'next/link';
import LogoutMenuItem from './LogoutMenuItem';

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
            component={Link}
            href={LINKS.Account.Settings.href}>
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

          <Menu.Label>Admin</Menu.Label>
          <Menu.Item
            leftSection={
              <IconShieldLock
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component={Link}
            href={LINKS.Admin.Admin.href}>
            Dashboard
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconBook
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component={Link}
            href={LINKS.Admin.AdminCourses.href}>
            Courses List
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <LogoutMenuItem />
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default UserDropDown;
