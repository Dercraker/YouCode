import PaginationComponent from '@/components/Pagination/Pagination';
import UserTable from '@/components/admin/course/UserTable';
import { LINKS } from '@/utils/NavigationLinks';
import { Group, Paper, Stack, Text } from '@mantine/core';

interface UserListProps {
  courseId: string;
  users: {
    canceled: boolean;
    id: string;
    image: string | null;
    email: string;
  }[];
  userCount: number;
}

const UserList = ({ courseId, users, userCount }: UserListProps) => {
  return (
    <Paper radius="lg" p="xl" withBorder my="md" style={{ flexGrow: 2 }}>
      <Stack>
        <Text fw="700">Users</Text>
        <UserTable users={users} courseId={courseId} />
        <Group justify="center">
          <PaginationComponent
            baseUri={`${LINKS.Admin.AdminCourses.href}/${courseId}`}
            queryKey="userPage"
            total={Math.ceil(userCount / 5)}
          />
        </Group>
      </Stack>
    </Paper>
  );
};

export default UserList;
