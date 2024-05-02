import EditLessonCard from '@/features/admin/courses/lessons/EditLessonCard';
import { EditLessonGetQuery } from '@/features/admin/courses/lessons/EditLessonGet.query';
import { EditLessonType } from '@/lib/Zod/admin/course/lessons/EditLesson.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { PageParams } from '@/types/next';
import { Container, Divider, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  id: string;
};

const RoutePage = async ({
  params: { id: slug },
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const lesson: EditLessonType = await EditLessonGetQuery({ slug });

  return (
    <Container>
      <Stack>
        <Stack gap="xs">
          <Title>Edit Lesson</Title>
          <Divider />
        </Stack>
        <EditLessonCard lesson={lesson} />
      </Stack>
    </Container>
  );
};

export default RoutePage;
