import AdminLessonsList from '@/features/admin/course/lessons/AdminLessonsList';
import { LessonsType } from '@/lib/Zod/admin/course/lessons/Lessons.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { LessonQuery } from '@/lib/prisma/admin/courses/lessons/Lesson.query';
import { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import { Box, Breadcrumbs, Container, Stack } from '@mantine/core';
import { IconSlash } from '@tabler/icons-react';
import Link from 'next/link';

type RoutePageProps = {
  courseId: string;
};

const RoutePage = async ({
  params: { courseId },
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const lessons: LessonsType = await LessonQuery({
    id: courseId,
    ownerId: user.id,
  });

  const items = [
    {
      title: LINKS.Admin.AdminCourses.label,
      href: LINKS.Admin.AdminCourses.href,
    },
    {
      title: lessons[0].course.name,
      href: `${LINKS.Admin.AdminCourses.href}/${courseId}?userPage=1`,
    },
    {
      title: 'Lessons',
      href: `${LINKS.Admin.AdminLessons.href.replace(
        '{1}',
        courseId,
      )}?lessonsPage=1`,
    },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <Container>
      <Stack>
        <Box>
          <Breadcrumbs separator={<IconSlash />} separatorMargin={0}>
            {items}
          </Breadcrumbs>
        </Box>
        <AdminLessonsList lessons={lessons} courseId={courseId} />
      </Stack>
    </Container>
  );
};

export default RoutePage;
