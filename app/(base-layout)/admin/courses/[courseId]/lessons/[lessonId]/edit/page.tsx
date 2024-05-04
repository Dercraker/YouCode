import EditLessonCard from '@/features/admin/courses/lessons/EditLessonCard';
import EditLessonContentCard from '@/features/admin/courses/lessons/EditLessonContentCard';
import { EditLessonGetQuery } from '@/features/admin/courses/lessons/EditLessonGet.query';
import { EditLessonType } from '@/lib/Zod/admin/course/lessons/EditLesson.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { PageParams } from '@/types/next';
import { Container, Divider, Flex, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  lessonId: string;
};

const RoutePage = async ({
  params: { lessonId },
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const lesson: EditLessonType = await EditLessonGetQuery({
    lessonId,
  });

  return (
    <Container size="xl">
      <Stack>
        <Stack gap="xs">
          <Title>Edit Lesson</Title>
          <Divider />
        </Stack>
        <Flex wrap="wrap">
          <EditLessonCard lesson={lesson} />
          <EditLessonContentCard
            lessonId={lesson.id}
            markdown={lesson.content}
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default RoutePage;
