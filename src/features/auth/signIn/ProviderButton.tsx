import { getServerUrl } from '@/utils/server-url';
import { Button } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useQueryState } from 'nuqs';

type ProviderButtonProps = {
  providerId: string;
};

const ProviderButton = (props: ProviderButtonProps) => {
  const [callbackUrl] = useQueryState('callbackUrl');
  const oAuthSignInMutation = useMutation({
    mutationFn: () =>
      signIn(props.providerId, {
        callbackUrl: callbackUrl ?? `${getServerUrl()}/`,
      }),
  });

  return (
    <>
      {props.providerId === 'discord' && (
        <Button
          fullWidth
          leftSection={<IconBrandDiscord />}
          my="xs"
          onClick={() => oAuthSignInMutation.mutate()}>
          Sign in with Discord
        </Button>
      )}
      {props.providerId === 'github' && (
        <Button
          fullWidth
          leftSection={<IconBrandGithub />}
          my="xs"
          onClick={() => oAuthSignInMutation.mutate()}>
          Sign in with Github
        </Button>
      )}
    </>
  );
};

export default ProviderButton;
