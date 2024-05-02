import NewLessonCard from '@/features/admin/courses/lessons/new/NewLessonCard';
import { PageParams } from '@/types/next';
import { Container, Divider, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  slug: string;
};

const RoutePage = ({ params: { slug } }: PageParams<RoutePageProps>) => {
  return (
    <Container>
      <Stack>
        <Stack gap="xs">
          <Title>New Lesson</Title>
          <Divider />
        </Stack>
        <NewLessonCard courseId={slug} />
      </Stack>
    </Container>
  );
};

export default RoutePage;
