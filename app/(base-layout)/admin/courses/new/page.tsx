import NewCourseCard from '@/features/admin/courses/NewCourseCard';
import { requiredAuth } from '@/lib/auth/helper';
import { Container, Divider, Stack, Title } from '@mantine/core';

const RoutePage = async () => {
  const user = await requiredAuth();

  return (
    <Container>
      <Stack>
        <Stack gap="xs">
          <Title>Edit Course</Title>
          <Divider />
        </Stack>
        <NewCourseCard />
      </Stack>
    </Container>
  );
};

export default RoutePage;
