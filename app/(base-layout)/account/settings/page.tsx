import UpdateUserInformationCard from '@/features/account/settings/UpdateUserInformationCard';
import { requiredAuth } from '@/lib/auth/helper';
import { Container, Divider, Stack, Title } from '@mantine/core';

const RoutePage = async () => {
  const user = await requiredAuth();

  return (
    <Container>
      <Stack gap="xs">
        <Title>Account Settings</Title>
        <Divider />
        <UpdateUserInformationCard user={user} />
      </Stack>
    </Container>
  );
};

export default RoutePage;
