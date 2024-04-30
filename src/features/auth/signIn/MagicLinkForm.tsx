import { MagicLinkSchema, MagicLinkType } from '@/lib/Zod/MagicLink.schema';
import { getServerUrl } from '@/utils/server-url';
import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useQueryState } from 'nuqs';

const MagicLinkForm = () => {
  const magicLinkForm = useForm<MagicLinkType>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
    },
    validate: zodResolver(MagicLinkSchema),
  });

  const [callbackUrl] = useQueryState('callbackUrl');

  const emailSignInMutation = useMutation({
    mutationFn: async (email: string) => {
      await signIn('resend', {
        callbackUrl: callbackUrl ?? `${getServerUrl()}/`,
        redirect: true,
        email,
      });
    },
  });

  const handleSubmitForm = async () => {
    await emailSignInMutation.mutateAsync(magicLinkForm.values.email);
  };

  const handleResetForm = () => {
    magicLinkForm.reset();
  };

  return (
    <form onSubmit={handleSubmitForm} onReset={handleResetForm}>
      <Stack>
        <Text fw="600">Magic link ✨</Text>
        <TextInput
          placeholder="Email"
          {...magicLinkForm.getInputProps('email')}
        />
        <Button
          disabled={!magicLinkForm.isValid() || emailSignInMutation.isPending}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
};

export default MagicLinkForm;
