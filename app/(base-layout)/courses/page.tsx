import PaginationComponent from '@/components/Pagination/Pagination';
import CoursesList from '@/features/explorer/CoursesList';
import { CoursesType } from '@/lib/Zod/explorer/Courses.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { searchParamsCache } from '@/lib/nusq/searchParams';
import coursesQuery from '@/lib/prisma/explorer/Courses.query';
import { prisma } from '@/lib/prisma/prisma';
import { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import { Stack } from '@mantine/core';

const RoutePage = async ({ searchParams }: PageParams) => {
  const user = await requiredAuth();
  const pageSize = 10;
  const { Page } = searchParamsCache.parse(searchParams);

  const courses: CoursesType = await coursesQuery({
    params: {
      skip: Page,
      take: pageSize,
    },
    userId: user.id,
  });

  const coursesCount = await prisma.course.count({
    where: {
      users: {
        some: {
          userId: user.id,
          canceledAt: null,
        },
      },
    },
  });

  return (
    <Stack align="center">
      <CoursesList courses={courses} />
      {coursesCount > pageSize && (
        <PaginationComponent
          baseUri={LINKS.MyCourses.href}
          total={Math.ceil(coursesCount / pageSize)}
          queryKey="Page"
        />
      )}
    </Stack>
  );
};

export default RoutePage;
