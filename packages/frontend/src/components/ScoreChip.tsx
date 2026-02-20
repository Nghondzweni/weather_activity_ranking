/**
 * MUI Chip — color by label (Excellent/Good=green, Fair=orange, Poor/Very Poor=red).
 */

import { Chip } from '@mui/material';
import { getColorForLabel } from '../constants/labels';

interface ScoreChipProps {
  label: string;
}

export function ScoreChip({ label }: ScoreChipProps) {
  const color = getColorForLabel(label);
  return <Chip label={label} color={color} size="small" />;
}
