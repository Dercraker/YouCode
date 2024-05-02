import { prisma } from '@/lib/prisma/prisma';

interface EditLessonGETQuery {
  slug: string;
}

export const EditLessonGetQuery = async ({ slug }: EditLessonGETQuery) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: slug,
    },
    select: {
      id: true,
      name: true,
      state: true,
    },
  });

  if (!lesson) throw new Error(`lesson with id ${slug} not found`);

  return lesson;
};
