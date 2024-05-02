'use client';

import AvatarImage from '@/components/ui/Avatar';
import { Table } from '@mantine/core';

interface UserTableProps {
  users: {
    canceled: boolean;
    id: string;
    image: string | null;
    email: string;
  }[];
}

const UserTable = ({ users }: UserTableProps) => {
  const rows = users?.map(user => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <AvatarImage user={user} />
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
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
