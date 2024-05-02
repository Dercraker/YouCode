import CoursesList from '@/features/explorer/CoursesList';
import { CoursesType } from '@/lib/Zod/explorer/Courses.schema';
import { searchParamsCache } from '@/lib/nusq/searchParams';
import coursesQuery from '@/lib/prisma/explorer/Courses.query';
import { prisma } from '@/lib/prisma/prisma';
import { PageParams } from '@/types/next';

const RoutePage = async ({ searchParams }: PageParams) => {
  const { explorerPage } = searchParamsCache.parse(searchParams);

  const courses: CoursesType = await coursesQuery({
    params: {
      skip: explorerPage,
      take: 10,
    },
  });

  const coursesCount = await prisma.course.count();

  return (
    <>
      <CoursesList courses={courses} coursesCount={coursesCount} />
    </>
  );
};

export default RoutePage;
