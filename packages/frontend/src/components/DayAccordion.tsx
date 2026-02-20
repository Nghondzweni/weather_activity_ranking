/**
 * MUI Accordion — one per day, date as summary, ActivityCards inside.
 */

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ActivityCard } from './ActivityCard';
import type { DayForecast } from '../apollo/types';

interface DayAccordionProps {
  day: DayForecast;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function DayAccordion({ day }: DayAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<span aria-hidden>▼</span>}>
        <Typography fontWeight="medium">{formatDate(day.date)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {day.rankings.map((ranking) => (
          <ActivityCard key={ranking.activity} ranking={ranking} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
