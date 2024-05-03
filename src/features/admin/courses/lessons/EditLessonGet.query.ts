import { prisma } from '@/lib/prisma/prisma';

interface EditLessonGETQuery {
  lessonId: string;
}

export const EditLessonGetQuery = async ({ lessonId }: EditLessonGETQuery) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      name: true,
      state: true,
      content: true,
    },
  });

  if (!lesson) throw new Error(`lesson with id ${lessonId} not found`);

  return lesson;
};
