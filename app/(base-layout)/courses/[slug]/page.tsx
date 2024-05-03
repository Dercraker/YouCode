import CourseDetail from '@/features/course/CourseDetail';
import JoinButton from '@/features/course/JoinButton';
import LessonsList from '@/features/course/LessonsList';
import { CourseBySlugType } from '@/lib/Zod/course/CourseBySlug.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { CouseBySlugQuery } from '@/lib/prisma/course/CouseBySlug.query';
import { CurrentCourseOnCurrentUserQuery } from '@/lib/prisma/course/CurrentCourseOnCurrentUser.query';
import { PageParams } from '@/types/next';
import { Container, Group, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  slug: string;
};

const RoutePage = async ({ params: { slug } }: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const course: CourseBySlugType = await CouseBySlugQuery({
    courseId: slug,
    userId: user.id,
  });

  const courseOnCurrentUser = await CurrentCourseOnCurrentUserQuery({
    courseId: slug,
    userId: user.id,
  });

  return (
    <Container>
      <Title mb="md">Course / {course?.name}</Title>
      <Stack>
        <Group align="start">
          <CourseDetail course={course} />
          <LessonsList lessons={course?.lessons} courseId={slug} />
        </Group>
        {!courseOnCurrentUser && <JoinButton courseId={slug} />}
      </Stack>
    </Container>
  );
};

export default RoutePage;
