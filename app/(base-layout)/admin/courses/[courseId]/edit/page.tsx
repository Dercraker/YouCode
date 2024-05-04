import EditCourseCard from '@/features/admin/courses/EditCourseCard';
import { editCourseGETQuery } from '@/features/admin/courses/editCourseGET.query';
import { EditCourseGetQueryType } from '@/lib/Zod/admin/course/editCourseGetQuery.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { PageParams } from '@/types/next';
import { Container, Divider, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  courseId: string;
};

const RoutePage = async ({
  params: { courseId },
}: PageParams<RoutePageProps>) => {
  const user = requiredAuth();

  const course: EditCourseGetQueryType = await editCourseGETQuery({
    courseId,
  });

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

export default RoutePage;
