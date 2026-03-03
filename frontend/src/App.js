import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Fade,
  Avatar,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import { Refresh, Warning, CheckCircle, Error, MonitorHeart, Speed } from '@mui/icons-material';
import PredictionForm from './PredictionForm';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = process.env.REACT_APP_API_URL;

  const handlePrediction = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const fixedFormData = {
        ...formData,
        smoke: formData.smoke === 1 ? 0 : 1,
        alco: formData.alco === 1 ? 0 : 1
      };
      const response = await fetch(`${api}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fixedFormData),
      });
      const data = await response.json();
      if (data.success) setResult(data);
      else setError(data.error || 'Prediction failed');
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (prob) => {
    if (prob < 30) return '#2b7a62';
    if (prob < 60) return '#e67e4a';
    if (prob < 80) return '#c44545';
    return '#9e2b2b';
  };

  const getRiskGradient = (prob) => {
    if (prob < 30) return 'linear-gradient(145deg, #2b7a62, #3fa385)';
    if (prob < 60) return 'linear-gradient(145deg, #e67e4a, #f09f70)';
    if (prob < 80) return 'linear-gradient(145deg, #c44545, #dc6b6b)';
    return 'linear-gradient(145deg, #9e2b2b, #c44c4c)';
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4, px: { xs: 2, md: 4 }, bgcolor: '#f3f7fc' }}>
      <Container maxWidth="xl" disableGutters>
        {/* Header with branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#1f4e7a', width: 56, height: 56, mr: 2 }}>
              <Speed sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#1f4e7a', letterSpacing: '-0.5px' }}>
                AETHER<span style={{ color: '#e67e4a' }}>RISK</span>
              </Typography>
              <Typography sx={{ color: '#5f7d9e', fontWeight: 400 }}>cardiovascular insight engine</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Chip label="v2.0" sx={{ bgcolor: '#1f4e7a', color: 'white', borderRadius: 2, px: 1.5 }} />
            <Chip label="12‑factor" sx={{ bgcolor: '#2b7a62', color: 'white', borderRadius: 2 }} />
            <Chip label="73% acc" sx={{ bgcolor: '#e67e4a', color: 'white', borderRadius: 2 }} />
          </Box>
        </Box>

        {/* Three‑column parameter tiles (the form) */}
        <PredictionForm onSubmit={handlePrediction} loading={loading} />

        {/* Error display */}
        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mt: 3, borderRadius: 4 }} action={
              <IconButton size="small" onClick={() => setError(null)}><Refresh fontSize="small" /></IconButton>
            }>
              {error}
            </Alert>
          </Fade>
        )}

        {/* Result area – full width below */}
        <Box sx={{ mt: 5 }}>
          <Card sx={{ borderRadius: 6, boxShadow: '0 25px 45px -15px rgba(0,50,80,0.2)' }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: '#2b7a62', width: 40, height: 40, mr: 2 }}>
                  <MonitorHeart />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f4e7a' }}>Assessment result</Typography>
                {result && (
                  <Button
                    size="small"
                    startIcon={<Refresh />}
                    onClick={handleClear}
                    sx={{ ml: 'auto', borderRadius: 20, color: '#6b8aac' }}
                  >
                    Clear
                  </Button>
                )}
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                  <CircularProgress size={70} thickness={3} sx={{ color: '#e67e4a', mb: 4 }} />
                  <Typography variant="h6" sx={{ color: '#1f4e7a' }}>Running analysis…</Typography>
                  <Box sx={{ width: '40%', mt: 3 }}>
                    <LinearProgress sx={{ height: 8, borderRadius: 4, bgcolor: '#d7e4f0' }} />
                  </Box>
                </Box>
              ) : result ? (
                <Fade in>
                  <Box>
                    {/* Large gauge */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                      <Box sx={{ position: 'relative', width: 260, height: 260 }}>
                        <CircularProgress
                          variant="determinate"
                          value={result.probability}
                          size={260}
                          thickness={4}
                          sx={{ color: getRiskColor(result.probability), transform: 'rotate(-90deg)' }}
                        />
                        <Box sx={{
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Typography variant="h1" sx={{ fontWeight: 800, color: '#1f4e7a', lineHeight: 1 }}>
                            {result.probability}%
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#5f7d9e', fontWeight: 500 }}>
                            {result.risk_category}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Status chip */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Chip
                        icon={
                          result.probability < 30 ? <CheckCircle /> :
                          result.probability < 60 ? <Warning /> : <Error />
                        }
                        label={result.prediction}
                        sx={{
                          bgcolor: `${getRiskColor(result.probability)}15`,
                          color: getRiskColor(result.probability),
                          fontWeight: 700,
                          borderRadius: 3,
                          px: 2,
                          py: 3,
                          fontSize: '1.1rem'
                        }}
                      />
                    </Box>

                    {/* Recommendations */}
                    {result.recommendations?.length > 0 && (
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="overline" sx={{ color: '#1f4e7a', fontWeight: 700, letterSpacing: 1 }}>
                          recommendations
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          {result.recommendations.map((rec, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                              <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, borderLeft: `6px solid #e67e4a`, height: '100%' }}>
                                <Typography variant="body2">{rec}</Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}

                    {/* Metrics row */}
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#f2f8ff' }}>
                          <Typography variant="caption" sx={{ color: '#5f7d9e' }}>CONFIDENCE</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Box sx={{ flex: 1, mr: 1 }}>
                              <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4, bgcolor: '#d0e0f0' }} />
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>85%</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#f2f8ff' }}>
                          <Typography variant="caption" sx={{ color: '#5f7d9e' }}>SEVERITY</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800, color: getRiskColor(result.probability) }}>
                            {result.probability < 30 ? 'LOW' :
                             result.probability < 60 ? 'MODERATE' :
                             result.probability < 80 ? 'HIGH' : 'CRITICAL'}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#f2f8ff' }}>
                          <Typography variant="caption" sx={{ color: '#5f7d9e' }}>RISK INDEX</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800, color: '#1f4e7a' }}>
                            {result.probability}/100
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#f2f8ff' }}>
                          <Typography variant="caption" sx={{ color: '#5f7d9e' }}>MODEL</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800, color: '#1f4e7a' }}>RF v1.2</Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Fade>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Avatar sx={{ bgcolor: '#ecf5ff', width: 80, height: 80, mx: 'auto', mb: 2 }}>
                    <MonitorHeart sx={{ fontSize: 40, color: '#a0c0dd' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#1f4e7a' }}>No result yet</Typography>
                  <Typography variant="body2" sx={{ color: '#8aa9c4', maxWidth: 300, mx: 'auto', mt: 1 }}>
                    Fill in the parameter tiles above and click ANALYSE.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#b2c9de' }}>
            AetherRisk • AI‑driven • not for clinical use
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;