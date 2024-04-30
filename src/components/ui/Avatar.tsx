import { Avatar } from '@mantine/core';
import { User } from 'next-auth';

interface AvatarProps {
  user: User;
}

const AvatarImage = ({ user }: AvatarProps) => {
  return user.image ? (
    <Avatar src={user.image} alt={user.name ?? 'User Avatar'} />
  ) : user.email ? (
    <Avatar color="cyan" radioGroup="xl">
      {user.email.slice(0, 2).toUpperCase()}
    </Avatar>
  ) : user.name ? (
    <Avatar color="cyan" radioGroup="xl">
      {user.name.slice(0, 2).toUpperCase()}
    </Avatar>
  ) : (
    <Avatar color="cyan" radioGroup="xl" />
  );
};

export default AvatarImage;
