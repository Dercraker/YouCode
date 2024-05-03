import NewLessonCard from '@/features/admin/courses/lessons/new/NewLessonCard';
import { PageParams } from '@/types/next';
import { Container, Divider, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  courseId: string;
};

const RoutePage = ({ params: { courseId } }: PageParams<RoutePageProps>) => {
  return (
    <Container>
      <Stack>
        <Stack gap="xs">
          <Title>New Lesson</Title>
          <Divider />
        </Stack>
        <NewLessonCard courseId={courseId} />
      </Stack>
    </Container>
  );
};

export default RoutePage;
