/**
 * Search page — hero-style, TextField + Button, navigate to forecast with city.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

export function SearchPage() {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      navigate('/forecast', { state: { city: trimmed } });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom align="center">
          Weather Activity Ranking
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }} align="center">
          Enter a city to see 7-day activity recommendations
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <TextField
            label="City or town"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. London, Paris"
            fullWidth
            autoFocus
            variant="outlined"
          />
          <Button type="submit" variant="contained" size="large" disabled={!city.trim()}>
            Get forecast
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
