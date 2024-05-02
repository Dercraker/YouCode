import { EditLessonGetQuery } from '@/features/admin/courses/lessons/EditLessonGet.query';
import { EditLessonType } from '@/lib/Zod/admin/course/lessons/EditLesson.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { PageParams } from '@/types/next';
import { Stack } from '@mantine/core';
import { Container } from '@react-email/components';
import { RoutePageProps } from './page';

export const RoutePage = async ({
  params: { id: slug },
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const lesson: EditLessonType = await EditLessonGetQuery({ slug });

  return (
    <Container>
      <Stack>
        <Stack gap="xs">
          <Title>Edit Course</Title>
          <Divider />
        </Stack>
        <EditCourseCard course={course} />
      </Stack>
    </Container>
  );
};
