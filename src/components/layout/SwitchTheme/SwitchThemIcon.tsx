'use client';

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

const SwitchThemeIcon = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });

  const handleChangeTheme = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ActionIcon onClick={handleChangeTheme} variant="light" size="lg">
      {computedColorScheme === 'light' ? (
        <IconSun stroke={1.5} fill="currentColor" />
      ) : (
        <IconMoon stroke={1.5} />
      )}
    </ActionIcon>
  );
};

export default SwitchThemeIcon;
