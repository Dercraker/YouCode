import { prisma } from '@/lib/prisma/prisma';

interface EditCourseGETQuery {
  slug: string;
}

export const editCourseGETQuery = async ({ slug }: EditCourseGETQuery) => {
  const course = await prisma.course.findUnique({
    where: {
      id: slug,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      state: true,
    },
  });

  if (!course) throw new Error(`Course with id ${slug} not found`);

  return course;
};
