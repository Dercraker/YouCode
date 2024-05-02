import { Group, Paper, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import styles from './NoLessons.module.css';

const NoLessons = () => {
  return (
    <Paper shadow="xl" p="md" withBorder className={styles.paper}>
      <Group justify="center" align="center">
        <IconAlertTriangle color="red" />
        <Text>There are no lessons yet. Please comme back later.</Text>
      </Group>
    </Paper>
  );
};

export default NoLessons;
