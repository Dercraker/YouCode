// import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";
import { getError } from '@/features/auth/error/auth-error-mapping';
import type { PageParams } from '@/types/next';
import { Badge, Button, Container, Group, Paper, Title } from '@mantine/core';
import Link from 'next/link';

export default async function AuthErrorPage(props: PageParams<{}>) {
  const { errorMessage, error } = getError(props.searchParams.error);

  return (
    <Container m="md">
      <Title order={1}>Authentification Error</Title>
      <Paper radius="lg" p="xl" withBorder my="md">
        <Badge color="red">{error}</Badge>
        <Title order={2}>{errorMessage}</Title>
        <Group>
          <Button component={Link} href="/">
            Home
          </Button>
          {/* <ContactSupportDialog variant="outline" /> */}
        </Group>
      </Paper>
    </Container>
  );
}
