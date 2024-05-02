import EditCourseCard from '@/features/admin/courses/EditCourseCard';
import { editCourseGETQuery } from '@/features/admin/courses/editCourseGET.query';
import { EditCourseGetQueryType } from '@/lib/Zod/admin/course/editCourseGetQuery.schema';
import { PageParams } from '@/types/next';
import { Container, Divider, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  slug: string;
};

const RoutePage = async ({ params: { slug } }: PageParams<RoutePageProps>) => {
  const course: EditCourseGetQueryType = await editCourseGETQuery({ slug });

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
