import CourseDetail from '@/features/course/CourseDetail';
import LessonsList from '@/features/course/LessonsList';
import { CourseBySlugType } from '@/lib/Zod/course/CourseBySlug.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { PageParams } from '@/types/next';
import { Container, Group, Title } from '@mantine/core';
import { CouseBySlugQuery } from '@/lib/prisma/course/CouseBySlug.query';

type RoutePageProps = {
  slug: string;
};

const RoutePage = async ({ params: { slug } }: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const course: CourseBySlugType = await CouseBySlugQuery({
    courseId: slug,
    userId: user.id,
  });

  return (
    <Container>
      <Title mb="md">Course / {course?.name}</Title>
      <Group align="start">
        <CourseDetail course={course} />
        <LessonsList lessons={course?.lessons} courseId={slug} />
      </Group>
    </Container>
  );
};

export default RoutePage;
