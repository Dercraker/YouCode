'use client';

import { useHref } from '@/hooks/useHref';
import { Button, ButtonProps } from '@mantine/core';

interface SignInButtonProps {
  buttonProps?: ButtonProps;
}

const SignInButton = ({ buttonProps }: SignInButtonProps) => {
  const href = useHref();

  return (
    <Button
      component="a"
      href={`/auth/signin?callbackUrl=${href}`}
      variant="outline"
      {...buttonProps}>
      Sign In
    </Button>
  );
};

export default SignInButton;
