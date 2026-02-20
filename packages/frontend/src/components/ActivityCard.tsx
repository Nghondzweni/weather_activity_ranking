/**
 * MUI Card — activity name, score (LinearProgress), label (ScoreChip), reasoning.
 */

import { Card, CardContent, LinearProgress, Typography } from '@mui/material';
import { ScoreChip } from './ScoreChip';
import type { ActivityRanking } from '../apollo/types';

interface ActivityCardProps {
  ranking: ActivityRanking;
}

export function ActivityCard({ ranking }: ActivityCardProps) {
  const value = Math.max(0, Math.min(100, ranking.score));
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {ranking.activity}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{ height: 8, borderRadius: 1, mb: 1 }}
        />
        <ScoreChip label={ranking.label} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {ranking.reasoning}
        </Typography>
      </CardContent>
    </Card>
  );
}
