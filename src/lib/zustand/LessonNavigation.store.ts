import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LessonNavigationEnum } from '../Zod/lesson/LessonNavigationState.schema';

type LessonNavigationStore = {
  state: LessonNavigationEnum;
  setState: (state: LessonNavigationEnum) => void;
};

export const useLessonNavigationStore = create(
  persist<LessonNavigationStore>(
    (set, get) => ({
      state: LessonNavigationEnum.Enum.sticky,
      setState: state => {
        set({ state });
      },
    }),
    {
      name: 'lesson-navigation-storage',
    },
  ),
);
