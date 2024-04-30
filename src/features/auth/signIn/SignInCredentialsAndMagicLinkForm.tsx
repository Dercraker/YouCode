'use client';

import { CredentialSchema, CredentialType } from '@/lib/Zod/Credentials.schema';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';
import { signIn } from 'next-auth/react';
import { useQueryState } from 'nuqs';

export const SignInCredentialsAndMagicLinkForm = () => {
  const loginFrom = useForm<CredentialType>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(CredentialSchema),
  });

  const [callbackUrl] = useQueryState('callbackUrl');

  const [isUsingCredentials, setIsUsingCredentials] = useLocalStorage<Boolean>({
    key: 'sign-in-with-credentials',
    defaultValue: false,
  });

  const handleSubmitForm = async () => {
    if (isUsingCredentials) {
      await signIn('credentials', {
        email: loginFrom.values.email,
        password: loginFrom.values.password,
        callbackUrl: callbackUrl ?? undefined,
      });
    } else {
      await signIn('resend', {
        email: loginFrom.values.email,
        callbackUrl: callbackUrl ?? undefined,
      });
    }
  };

  return (
    <form>
      <Stack>
        <Text fw="600">
          {isUsingCredentials
            ? 'Authenticate with credentials'
            : 'Magic link ✨'}
        </Text>
        <TextInput
          label={isUsingCredentials ? 'Email' : null}
          withAsterisk={isUsingCredentials ? true : false}
          placeholder="Email"
          {...loginFrom.getInputProps('email')}
        />
        {isUsingCredentials ? (
          <TextInput
            label="Password"
            withAsterisk
            placeholder="Password"
            {...loginFrom.getInputProps('password')}
          />
        ) : (
          <Text
            fs="italic"
            c="blue"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsUsingCredentials(!isUsingCredentials)}>
            Use password
          </Text>
        )}
        <Button onClick={handleSubmitForm}>
          {isUsingCredentials
            ? 'Login with Password'
            : 'Login with MagicLink ✨'}
        </Button>

        {isUsingCredentials && (
          <Group>
            <Text>
              Forgot password ?{' '}
              <Text
                fs="italic"
                c="blue"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsUsingCredentials(!isUsingCredentials)}>
                Login with MagicLink ✨
              </Text>
            </Text>
          </Group>
        )}
      </Stack>
    </form>
  );
};
