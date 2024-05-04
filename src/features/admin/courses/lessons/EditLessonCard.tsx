'use client';

import useNotify from '@/hooks/useNotify';
import {
  EditLessonSchema,
  EditLessonType,
} from '@/lib/Zod/admin/course/lessons/EditLesson.schema';
import { LessonStateSchema } from '@/lib/Zod/lesson/LessonState.schema';
import { EditLessonAction } from '@/lib/server-actions/admin/courses/lessons/EditLesson.action';
import { Button, Paper, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { LessonStateSelector } from './LessonStateSelector';

interface EditLessonCardProps {
  lesson: EditLessonType;
}

const EditLessonCard = ({ lesson }: EditLessonCardProps) => {
  const lessonForm = useForm<EditLessonType>({
    validateInputOnChange: true,
    initialValues: {
      id: lesson.id,
      name: lesson.name,
      state: lesson.state,
    },
    validate: zodResolver(EditLessonSchema),
  });

  const { ErrorNotify, SuccessNotify } = useNotify();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ([editCourse]: [EditLessonType]) =>
      await EditLessonAction(editCourse),
    onError: error => {
      ErrorNotify({
        title: error.message,
      });
    },
    onSuccess: () => {
      SuccessNotify({
        title: 'Lesson updated',
        message: 'Lesson has been updated successfully',
      });
    },
  });

  const handleSubmit = async () => await mutateAsync([lessonForm.values]);

  return (
    <Paper shadow="xl" m="md" p="xl" withBorder flex={1} miw={250}>
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
          defaultValue={lesson.state}
        />
        <Button
          onClick={handleSubmit}
          disabled={isPending || !lessonForm.isValid()}
          loading={isPending}>
          Update
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditLessonCard;
