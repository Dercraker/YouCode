'use client';

import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const themeOverride = createTheme({
  defaultRadius: 'md',

  colors: {
    dark: [
      DEFAULT_THEME.colors.dark[0],
      DEFAULT_THEME.colors.dark[1],
      DEFAULT_THEME.colors.dark[2],
      DEFAULT_THEME.colors.dark[3],
      DEFAULT_THEME.colors.dark[4],
      DEFAULT_THEME.colors.dark[5],
      DEFAULT_THEME.colors.dark[6],
      DEFAULT_THEME.colors.dark[7],
      DEFAULT_THEME.colors.dark[8],
      DEFAULT_THEME.colors.dark[9],
    ],
  },
});

const themes = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export default themes;
