'use client';

import useNotify from '@/hooks/useNotify';
import {
  UpdateUserInformationSchema,
  UpdateUserInformationType,
} from '@/lib/Zod/account/settings/UpdateUserInformation.schema';
import { UpdateUserInformationAction } from '@/lib/server-actions/account/settings/UpdateUserInformation.action';
import { Button, Paper, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';

interface UpdateUserInformationCardProps {
  user: User;
}

const UpdateUserInformationCard = ({
  user,
}: UpdateUserInformationCardProps) => {
  const userForm = useForm<UpdateUserInformationType>({
    validateInputOnChange: true,
    initialValues: {
      image: user.image || '',
      name: user.name || '',
    },
    validate: zodResolver(UpdateUserInformationSchema),
  });

  const { ErrorNotify } = useNotify();

  const { mutateAsync: mutateUserInfo, isPending } = useMutation({
    mutationFn: async ([userInfo]: [UpdateUserInformationType]) => {
      UpdateUserInformationAction(userInfo);
    },
    onError: error => ErrorNotify({ title: error.message }),
  });

  const handleSubmit = async () => {
    await mutateUserInfo([userForm.values]);
  };

  return (
    <Paper shadow="xl" p="xl" radius="md" withBorder>
      <Stack>
        <TextInput
          withAsterisk
          label="Image URL"
          {...userForm.getInputProps('image')}
        />
        <TextInput
          withAsterisk
          label="Name"
          {...userForm.getInputProps('name')}
        />
        <Button
          onClick={handleSubmit}
          disabled={isPending || !userForm.isValid()}
          loading={isPending}>
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};

export default UpdateUserInformationCard;
