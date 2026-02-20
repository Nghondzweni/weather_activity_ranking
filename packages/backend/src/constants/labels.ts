/**
 * Score bands and label strings for activity rankings.
 */

export const LABEL_EXCELLENT = 'Excellent';
export const LABEL_GOOD = 'Good';
export const LABEL_FAIR = 'Fair';
export const LABEL_POOR = 'Poor';
export const LABEL_VERY_POOR = 'Very Poor';

export const SCORE_EXCELLENT_MIN = 90;
export const SCORE_GOOD_MIN = 70;
export const SCORE_FAIR_MIN = 50;
export const SCORE_POOR_MIN = 30;
// 0-29 = Very Poor

export function getLabelForScore(score: number): string {
  if (score >= SCORE_EXCELLENT_MIN) return LABEL_EXCELLENT;
  if (score >= SCORE_GOOD_MIN) return LABEL_GOOD;
  if (score >= SCORE_FAIR_MIN) return LABEL_FAIR;
  if (score >= SCORE_POOR_MIN) return LABEL_POOR;
  return LABEL_VERY_POOR;
}
