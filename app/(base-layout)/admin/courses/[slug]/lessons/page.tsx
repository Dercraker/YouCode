import AdminLessonsList from '@/features/admin/course/lessons/AdminLessonsList';
import { LessonsType } from '@/lib/Zod/admin/course/lessons/Lessons.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { searchParamsCache } from '@/lib/nusq/searchParams';
import { LessonQuery } from '@/lib/prisma/admin/courses/lessons/Lesson.query';
import { prisma } from '@/lib/prisma/prisma';
import { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import { Box, Breadcrumbs, Container, Stack } from '@mantine/core';
import { IconSlash } from '@tabler/icons-react';
import Link from 'next/link';

type RoutePageProps = {
  slug: string;
};

const RoutePage = async ({
  params: { slug },
  searchParams,
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();
  const { lessonsPage } = searchParamsCache.parse(searchParams);

  const lessons: LessonsType = await LessonQuery({
    id: slug,
    ownerId: user.id,
    take: 5,
    skip: lessonsPage,
  });
  const lessonsCount: number = await prisma.lesson.count({
    where: {
      courseId: slug,
      course: {
        creatorId: user.id,
      },
    },
  });

  const items = [
    {
      title: LINKS.Admin.AdminCourses.label,
      href: LINKS.Admin.AdminCourses.href,
    },
    {
      title: lessons[0].course.name,
      href: `${LINKS.Admin.AdminCourses.href}/${slug}?userPage=1`,
    },
    {
      title: 'Lessons',
      href: `${LINKS.Admin.AdminLessons.href.replace(
        '{1}',
        slug,
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
        <AdminLessonsList
          lessons={lessons}
          lessonsPage={lessonsPage}
          totalLessons={lessonsCount}
          courseId={slug}
        />
      </Stack>
    </Container>
  );
};

export default RoutePage;
