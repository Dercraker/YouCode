import CoursesTable from '@/features/admin/CoursesTable';
import { requiredAuth } from '@/lib/auth/helper';
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Title,
} from '@mantine/core';

const RoutePage = async () => {
  const user = await requiredAuth();

  return (
    <Container>
      <Stack>
        <Box>
          <Group justify="space-between">
            <Title>Courses</Title>
            <Button>New Course</Button>
          </Group>
          <Divider />
        </Box>
        <CoursesTable user={user} />
      </Stack>
    </Container>
  );
};

export default RoutePage;
