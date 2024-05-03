'use client';

import AvatarImage from '@/components/ui/Avatar';
import { Badge, Table, useMantineTheme } from '@mantine/core';
import SwitchCancelUserOnCourse from './SwitchCancelUserOnCourse';

interface UserTableProps {
  users: {
    canceled: boolean;
    id: string;
    image: string | null;
    email: string;
  }[];
  courseId: string;
}

const UserTable = ({ users, courseId }: UserTableProps) => {
  const theme = useMantineTheme();

  const getBadge = (canceled: boolean) => {
    return (
      <Badge
        variant={canceled ? 'outline' : 'filled'}
        color={canceled ? theme.colors.red[7] : theme.colors.green[8]}
        size="lg"
        radius="md">
        {canceled ? 'Canceled' : 'Active'}
      </Badge>
    );
  };

  const rows = users?.map(user => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <AvatarImage user={user} />
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{getBadge(user.canceled)}</Table.Td>
      <Table.Td>
        <SwitchCancelUserOnCourse
          canceled={user.canceled}
          courseId={courseId}
          userId={user.id}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Image</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default UserTable;
