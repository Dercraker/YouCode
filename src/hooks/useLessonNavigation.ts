import { LessonNavigationEnum } from '@/lib/Zod/lesson/LessonNavigationState.schema';
import { useLessonNavigationStore } from '@/lib/zustand/LessonNavigation.store';
import { useMediaQuery } from '@mantine/hooks';

export const useLessonNavigation = (): LessonNavigationEnum => {
  const state = useLessonNavigationStore(state => state.state);
  const isLg = useMediaQuery('(min-width: 1024px)');

  if (isLg) {
    return state;
  }

  if (state === 'sticky') {
    return 'close';
  }

  return state;
};
