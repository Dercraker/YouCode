'use client';

import { useLessonNavigation } from '@/hooks/useLessonNavigation';
import { LessonNavigationEnum } from '@/lib/Zod/lesson/LessonNavigationState.schema';
import { useLessonNavigationStore } from '@/lib/zustand/LessonNavigation.store';
import { ActionIcon } from '@mantine/core';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';

const OpenLessonNavigationDrawerButton = () => {
  const state = useLessonNavigation();
  const setState = useLessonNavigationStore(state => state.setState);

  if (state === LessonNavigationEnum.enum.sticky) return;

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      color="#c9c9c9"
      onClick={() => setState(LessonNavigationEnum.enum.open)}>
      <IconLayoutSidebarLeftCollapse size="lg" />
    </ActionIcon>
  );
};

export default OpenLessonNavigationDrawerButton;
