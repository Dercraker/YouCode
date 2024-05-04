import { auth } from '@/lib/auth/helper';
import { ButtonProps } from '@mantine/core';
import LoggedInButton from './LoggedInButton';
import SignInButton from './SignInButton';

interface AuthButtonProps {
  buttonProps?: ButtonProps;
}
const AuthButton = async ({ buttonProps }: AuthButtonProps) => {
  const user = await auth();

  if (user) return <LoggedInButton user={user} />;

  return <SignInButton buttonProps={buttonProps} />;
};

export default AuthButton;
