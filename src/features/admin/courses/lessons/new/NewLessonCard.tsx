'use client';

import useNotify from '@/hooks/useNotify';
import { NewCourseSchema } from '@/lib/Zod/admin/course/NewCourse.schema';
import { NewLessonType } from '@/lib/Zod/admin/course/lessons/new/NewLesson.schema';
import { LessonStateSchema } from '@/lib/Zod/lesson/LessonState.schema';
import { NewLessonAction } from '@/lib/server-actions/admin/courses/lessons/new/NewLesson.action';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Paper, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LessonStateSelector } from '../LessonStateSelector';

interface NewLessonCardProps {
  courseId: string;
}

const NewLessonCard = ({ courseId }: NewLessonCardProps) => {
  const lessonForm = useForm<NewLessonType>({
    validateInputOnChange: true,
    initialValues: {
      courseId: courseId,
      name: 'Draft Lesson',
      state: LessonStateSchema.Enum.HIDDEN,
    },
    validate: zodResolver(NewCourseSchema),
  });

  const { ErrorNotify, SuccessNotify } = useNotify();

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ([addLesson]: [NewLessonType]) =>
      await NewLessonAction(addLesson),
    onError: error => {
      ErrorNotify({
        title: error.message,
      });
    },
    onSuccess: data => {
      if (data.serverError) return ErrorNotify({ title: 'Error' });

      SuccessNotify({
        title: 'Lesson Created',
        message: 'Lesson has been created successfully',
      });

      router.push(
        LINKS.Admin.AdminLesson.href
          .replace('{1}', courseId)
          .replace('{2}', data.data!.id),
      );
    },
  });

  const handleSubmit = async () => await mutateAsync([lessonForm.values]);

  return (
    <Paper shadow="xl" p="xl" withBorder>
      <Stack>
        <TextInput
          withAsterisk
          label="Name"
          {...lessonForm.getInputProps('name')}
        />
        <LessonStateSelector
          selectedValue={(value: string) => {
            lessonForm.setFieldValue('state', LessonStateSchema.parse(value));
          }}
          label="State"
          defaultValue={LessonStateSchema.enum.HIDDEN}
        />
        <Button onClick={handleSubmit} disabled={isPending} loading={isPending}>
          Create
        </Button>
      </Stack>
    </Paper>
  );
};

export default NewLessonCard;
