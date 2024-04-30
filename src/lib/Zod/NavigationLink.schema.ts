import React from 'react';
import { z } from 'zod';

export const NavigationLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.custom<React.ReactNode>(),
  auth: z.boolean().optional(),
});

export type NavigationLinkType = z.infer<typeof NavigationLinkSchema>;
