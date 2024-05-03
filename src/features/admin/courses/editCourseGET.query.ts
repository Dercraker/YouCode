import { prisma } from '@/lib/prisma/prisma';

interface EditCourseGETQuery {
  courseId: string;
}

export const editCourseGETQuery = async ({ courseId }: EditCourseGETQuery) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      state: true,
    },
  });

  if (!course) throw new Error(`Course with id ${courseId} not found`);

  return course;
};
