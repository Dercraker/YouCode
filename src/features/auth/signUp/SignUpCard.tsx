'use client';

import { LogoSvg } from '@/components/svg/LogoSvg';
import { SignUpCredentialsForm } from '@/features/auth/signUp/SignUpCredentialsForm';
import { Card, Space, Stack, Text } from '@mantine/core';

const SignUpCard = () => {
  return (
    <Card withBorder w="50%" mx="25%" py="xl">
      <Card.Section>
        <Stack align="center">
          <LogoSvg size={48} />
          <Text fw="700" size="2em">
            Sign Up
          </Text>

          <SignUpCredentialsForm />

          <Text>
            You already have an account ?{' '}
            <Text
              component="a"
              href="/auth/signin"
              fs="italic"
              td="underline"
              c="blue"
              style={{ cursor: 'pointer' }}>
              Sign in
            </Text>
          </Text>
        </Stack>
      </Card.Section>
      <Space h="xl" />
    </Card>
  );
};

export default SignUpCard;
