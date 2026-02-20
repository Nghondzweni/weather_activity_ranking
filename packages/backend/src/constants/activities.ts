/**
 * Activity names used in ranking and GraphQL.
 */

export const SKIING = 'SKIING';
export const SURFING = 'SURFING';
export const OUTDOOR_SIGHTSEEING = 'OUTDOOR SIGHTSEEING';
export const INDOOR_SIGHTSEEING = 'INDOOR SIGHTSEEING';

export const ACTIVITIES = [
  SKIING,
  SURFING,
  OUTDOOR_SIGHTSEEING,
  INDOOR_SIGHTSEEING,
] as const;

export type ActivityName = (typeof ACTIVITIES)[number];
