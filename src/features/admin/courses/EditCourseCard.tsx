'use client';

import useNotify from '@/hooks/useNotify';
import { CourseStateSchema } from '@/lib/Zod/admin/course/CourseState.schema';
import {
  EditCourseSchema,
  EditCourseType,
} from '@/lib/Zod/admin/course/EditCourse.schema';
import { EditCourseGetQueryType } from '@/lib/Zod/admin/course/editCourseGetQuery.schema';
import { EditCourseAction } from '@/lib/server-actions/admin/course/EditCourse.action';
import { Button, Paper, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { CouseStateSelector } from './CouseStateSelector';

interface EditCourseCardProps {
  course: EditCourseGetQueryType;
}

const EditCourseCard = ({ course }: EditCourseCardProps) => {
  const courseForm = useForm<EditCourseType>({
    validateInputOnChange: true,
    initialValues: {
      id: course.id,
      image: course.image,
      name: course.name,
      presentation: course.presentation,
      state: course.state,
    },
    validate: zodResolver(EditCourseSchema),
  });

  const { ErrorNotify, SuccessNotify } = useNotify();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ([editCourse]: [EditCourseType]) =>
      await EditCourseAction(editCourse),
    onError: error => {
      ErrorNotify({
        title: error.message,
      });
    },
    onSuccess: () => {
      SuccessNotify({
        title: 'Course updated',
        message: 'Course has been updated successfully',
      });
    },
  });

  const handleSubmit = async () => await mutateAsync([courseForm.values]);

  return (
    <Paper shadow="xl" p="xl" withBorder>
      <Stack>
        <TextInput
          withAsterisk
          label="Image URL"
          {...courseForm.getInputProps('image')}
        />
        <TextInput
          withAsterisk
          label="Name"
          {...courseForm.getInputProps('name')}
        />
        <Textarea
          withAsterisk
          label="Presentation"
          autosize
          resize="vertical"
          {...courseForm.getInputProps('presentation')}
        />
        <CouseStateSelector
          selectedValue={(value: string) => {
            courseForm.setFieldValue('state', CourseStateSchema.parse(value));
          }}
          label="State"
          defaultValue={course.state}
        />
        <Button
          onClick={handleSubmit}
          disabled={isPending || !courseForm.isValid()}
          loading={isPending}>
          Update
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditCourseCard;
