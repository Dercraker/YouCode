'use client';

import useNotify from '@/hooks/useNotify';
import { JoinCourseAction } from '@/lib/server-actions/course/JoinCourse.action';
import { LINKS } from '@/utils/NavigationLinks';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface JoinButtonProps {
  courseId: string;
}

const JoinButton = ({ courseId }: JoinButtonProps) => {
  const { ErrorNotify } = useNotify();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (courseId: string) => await JoinCourseAction(courseId),
    onSuccess({ data, serverError }, courseId) {
      if (serverError || !data) {
        ErrorNotify({ title: serverError || 'Failed to join course' });
        return;
      }

      if (data.firstLessonId)
        router.push(
          LINKS.Lesson.href
            .replace('{1}', courseId)
            .replace('{2}', data.firstLessonId),
        );
      else router.refresh();
    },
  });

  return (
    <Button loading={isPending} onClick={() => mutate(courseId)}>
      Join Course
    </Button>
  );
};

export default JoinButton;
