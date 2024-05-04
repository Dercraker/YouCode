'use client';

import { useHref } from '@/hooks/useHref';
import { Button, ButtonProps } from '@mantine/core';
import Link from 'next/link';

interface SignInButtonProps {
  buttonProps?: ButtonProps;
}

const SignInButton = ({ buttonProps }: SignInButtonProps) => {
  const href = useHref();

  return (
    <Button
      component={Link}
      href={`/auth/signin?callbackUrl=${href}`}
      variant="outline"
      {...buttonProps}>
      Sign In
    </Button>
  );
};

export default SignInButton;
