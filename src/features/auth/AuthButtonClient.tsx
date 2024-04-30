'use client';

import { ButtonProps } from '@mantine/core';
import { useSession } from 'next-auth/react';
import LoggedInButton from './LoggedInButton';
import SignInButton from './SignInButton';

interface AuthButtonClientProps {
  buttonProps?: ButtonProps;
}
const AuthButtonClient = ({ buttonProps }: AuthButtonClientProps) => {
  const session = useSession();

  if (session.status === 'authenticated' && session.data.user)
    return <LoggedInButton user={session.data.user} />;

  return <SignInButton buttonProps={buttonProps} />;
};

export default AuthButtonClient;
