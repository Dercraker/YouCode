import { User } from 'next-auth';
import UserDropDown from './UserDropDown';

interface LoggedInButtonProps {
  user: User;
}

const LoggedInButton = ({ user }: LoggedInButtonProps) => {
  return <UserDropDown user={user} />;
};

export default LoggedInButton;
