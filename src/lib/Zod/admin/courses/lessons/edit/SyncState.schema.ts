import { z } from 'zod';

export const SyncStateSchema = z.enum(['Sync', 'Not-Sync', 'Syncing', 'Error']);

export type SyncStateType = z.infer<typeof SyncStateSchema>;
