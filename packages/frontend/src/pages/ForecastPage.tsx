/**
 * Forecast page — useWeatherRankings(city), skeleton, error Alert, best-day summary, DayAccordions, scroll to results.
 */

import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Alert,
  Skeleton,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { useWeatherRankings } from '../hooks/useWeatherRankings';
import { DayAccordion } from '../components/DayAccordion';
import type { CityForecast } from '../apollo/types';

function formatDateShort(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function getBestDayPerActivity(forecast: CityForecast): { activity: string; date: string; score: number }[] {
  const activities = new Map<string, { date: string; score: number }>();
  for (const day of forecast.days) {
    for (const r of day.rankings) {
      const current = activities.get(r.activity);
      if (!current || r.score > current.score) {
        activities.set(r.activity, { date: day.date, score: r.score });
      }
    }
  }
  return Array.from(activities.entries()).map(([activity, { date, score }]) => ({
    activity,
    date,
    score,
  }));
}

export function ForecastPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cityFromState = (location.state as { city?: string } | null)?.city ?? null;
  const cityFromSearch = new URLSearchParams(location.search).get('city');
  const city = cityFromState ?? cityFromSearch;

  const { data, loading, error } = useWeatherRankings(city);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!city) {
      navigate('/', { replace: true });
      return;
    }
  }, [city, navigate]);

  useEffect(() => {
    if (data?.weatherRankings && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [data]);

  if (!city) {
    return null;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Alert severity="error" onClose={() => navigate('/')}>
          {error.message}
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={120} />
      </Container>
    );
  }

  const forecast = data?.weatherRankings;
  if (!forecast) {
    return null;
  }

  const bestDays = getBestDayPerActivity(forecast);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>
        {forecast.city}, {forecast.country}
      </Typography>

      <Box ref={resultsRef}>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Best day for each activity
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          {bestDays.map(({ activity, date, score }) => (
            <Typography key={activity} variant="body1" sx={{ py: 0.5 }}>
              <strong>{activity}</strong>: best on {formatDateShort(date)} (score {score})
            </Typography>
          ))}
        </Paper>

        <Typography variant="h6" sx={{ mb: 1 }}>
          7-day forecast
        </Typography>
        {forecast.days.map((day) => (
          <DayAccordion key={day.date} day={day} />
        ))}
      </Box>
    </Container>
  );
}
