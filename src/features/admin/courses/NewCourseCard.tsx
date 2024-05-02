'use client';

import useNotify from '@/hooks/useNotify';
import { CourseSateSchema } from '@/lib/Zod/admin/course/CourseState.schema';
import {
  NewCourseSchema,
  NewCourseType,
} from '@/lib/Zod/admin/course/NewCourse.schema';
import { NewCourseAction } from '@/lib/server-actions/admin/course/NewCourse.action';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Paper, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CouseStateSelector } from './CouseStateSelector';

interface NewCourseCardProps {}

const NewCourseCard = ({}: NewCourseCardProps) => {
  const courseForm = useForm<NewCourseType>({
    validateInputOnChange: true,
    initialValues: {
      image: '',
      name: '',
      presentation: '',
      state: CourseSateSchema.Enum.DRAFT,
    },
    validate: zodResolver(NewCourseSchema),
  });

  const { ErrorNotify, SuccessNotify } = useNotify();

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ([addCourse]: [NewCourseType]) =>
      await NewCourseAction(addCourse),
    onError: error => {
      ErrorNotify({
        title: error.message,
      });
    },
    onSuccess: data => {
      if (data.serverError) return ErrorNotify({ title: 'Error' });

      SuccessNotify({
        title: 'Course Created',
        message: 'Course has been created successfully',
      });

      router.push(LINKS.Admin.AdminCourse.href.replace('{1}', data.data!.id));
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
            console.log('🚀 ~ EditCourseCard ~ value:', value);
            courseForm.setFieldValue('state', CourseSateSchema.parse(value));
            console.log('🚀 ~ EditCourseCard ~ courseForm:', courseForm.values);
          }}
          label="State"
          defaultValue={CourseSateSchema.enum.DRAFT}
        />
        <Button
          onClick={handleSubmit}
          disabled={isPending || !courseForm.isValid()}
          loading={isPending}>
          Create
        </Button>
      </Stack>
    </Paper>
  );
};

export default NewCourseCard;
