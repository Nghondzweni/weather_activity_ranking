/**
 * Label-to-color mapping for ScoreChip (no hardcoded strings in components).
 */

export const LABEL_EXCELLENT = 'Excellent';
export const LABEL_GOOD = 'Good';
export const LABEL_FAIR = 'Fair';
export const LABEL_POOR = 'Poor';
export const LABEL_VERY_POOR = 'Very Poor';

export type ScoreColor = 'success' | 'warning' | 'error';

export const LABEL_COLOR_MAP: Record<string, ScoreColor> = {
  [LABEL_EXCELLENT]: 'success',
  [LABEL_GOOD]: 'success',
  [LABEL_FAIR]: 'warning',
  [LABEL_POOR]: 'error',
  [LABEL_VERY_POOR]: 'error',
};

export function getColorForLabel(label: string): ScoreColor {
  return LABEL_COLOR_MAP[label] ?? 'warning';
}
