'use client';

import { adventurer } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Avatar } from '@mantine/core';
import { User } from 'next-auth';

interface AvatarProps {
  user: User;
}

const AvatarImage = ({ user }: AvatarProps) => {
  const generateAvatar = (seed: string) => {
    const isFlip = Math.random() > 0.5;
    const avatar = createAvatar(adventurer, {
      randomizeIds: true,
      seed: seed,
      flip: isFlip,
      hairProbability: 95,
      glassesProbability: 30,
      featuresProbability: 20,
      earringsProbability: 70,
    }).toDataUriSync();

    return avatar;
  };

  if (user.image)
    return (
      <Avatar src={user.image} alt={user.name ?? 'User Avatar'} size={38} />
    );

  let avatar = '';

  if (user.name) avatar = generateAvatar(user.name);

  if (user.email) avatar = generateAvatar(user.email);

  return <Avatar src={avatar} radioGroup="xl" size={38} />;
};

export default AvatarImage;
