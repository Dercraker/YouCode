import Course from '@/features/course/Course';
import { CourseByIdType } from '@/lib/Zod/course/CourseById.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { CouseByIdQuery } from '@/lib/prisma/course/CouseById.query';
import { CurrentCourseOnCurrentUserQuery } from '@/lib/prisma/course/CurrentCourseOnCurrentUser.query';
import { PageParams } from '@/types/next';
import { Container, Divider, Stack, Title } from '@mantine/core';

type RoutePageProps = {
  courseId: string;
};

const RoutePage = async ({
  params: { courseId },
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const course: CourseByIdType = await CouseByIdQuery({
    courseId: courseId,
    userId: user.id,
  });

  await new Promise(resolve => setTimeout(resolve, 1000));

  const courseOnCurrentUser = await CurrentCourseOnCurrentUserQuery({
    courseId: courseId,
    userId: user.id,
  });

  return (
    <Container size="80vw">
      <Title>Course / {course?.name}</Title>
      <Divider mb="md" />
      <Stack>
        <Course
          course={course}
          courseOnCurrentUser={courseOnCurrentUser ? true : false}
        />
      </Stack>
    </Container>
  );
};

export default RoutePage;
