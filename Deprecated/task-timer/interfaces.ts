/**
 * If `endedAt` is null, then the task has NOT been completed.
 */
export interface TimeEntry {
  id: number;
  createdAt: number;
  endedAt: null | number;
  name: string;
}
