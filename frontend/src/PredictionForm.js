import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Avatar,
  Chip
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { 
  Calculate, RestartAlt, Height, FitnessCenter, Bloodtype,
  SmokingRooms, LocalDrink, DirectionsRun, MonitorHeart, Opacity
} from '@mui/icons-material';
import './App.css';

const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    gender: 2,
    height: 170,
    weight: 70,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1,
    age: 50,
  });

  const [bmi, setBmi] = useState(24.22);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => {
      const newData = { ...prev, [field]: Number(value) };
      if (field === 'height' || field === 'weight') {
        const heightM = newData.height / 100;
        setBmi((newData.weight / (heightM * heightM)).toFixed(2));
      }
      return newData;
    });
  };

  const handleSliderChange = (field) => (_, newValue) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: newValue };
      if (field === 'age') return newData;
      if (field === 'ap_hi' || field === 'ap_lo') return newData;
      // for height/weight we need bmi update
      if (field === 'height' || field === 'weight') {
        const heightM = (field === 'height' ? newValue : prev.height) / 100;
        const weight = field === 'weight' ? newValue : prev.weight;
        setBmi((weight / (heightM * heightM)).toFixed(2));
      }
      return newData;
    });
  };

  const handleSwitch = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.checked ? 1 : 0 }));
  };

  const handleReset = () => {
    setFormData({
      gender: 2,
      height: 170,
      weight: 70,
      ap_hi: 120,
      ap_lo: 80,
      cholesterol: 1,
      gluc: 1,
      smoke: 0,
      alco: 0,
      active: 1,
      age: 50,
    });
    setBmi(24.22);
  };

  const getBMICategory = (b) => {
    if (b < 18.5) return 'Underweight';
    if (b < 25) return 'Normal';
    if (b < 30) return 'Overweight';
    if (b < 35) return 'Obese I';
    if (b < 40) return 'Obese II';
    return 'Obese III';
  };

  const bmiCat = getBMICategory(bmi);
  const bmiColor = bmiCat === 'Normal' ? '#2b7a62' : bmiCat.includes('Overweight') ? '#e67e4a' : '#c44545';

  return (
    <Box>
      {/* Three‑column parameter grid */}
      <Grid container spacing={3}>
        {/* Column 1: Demographics & basic */}
        <Grid item xs={12} md={4}>
          <Paper className="param-tile" sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#1f4e7a', width: 32, height: 32, mr: 1.5 }}>
                <MonitorHeart sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1f4e7a' }}>Patient</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Gender</InputLabel>
                  <Select value={formData.gender} onChange={handleChange('gender')}>
                    <MenuItem value={1}>Female</MenuItem>
                    <MenuItem value={2}>Male</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#5f7d9e', mb: 1 }}>Age: {formData.age}</Typography>
                <Slider value={formData.age} onChange={handleSliderChange('age')} min={18} max={100} sx={{ color: '#1f4e7a' }} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={handleChange('height')}
                  variant="standard"
                  InputProps={{ startAdornment: <Height sx={{ color: '#9ab5d0', mr: 1 }} /> }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange('weight')}
                  variant="standard"
                  InputProps={{ startAdornment: <FitnessCenter sx={{ color: '#9ab5d0', mr: 1 }} /> }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2" sx={{ color: '#5f7d9e' }}>BMI</Typography>
                  <Chip label={`${bmi} (${bmiCat})`} size="small" sx={{ bgcolor: `${bmiColor}20`, color: bmiColor, fontWeight: 600 }} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Column 2: Blood pressure & Cholesterol/Glucose */}
        <Grid item xs={12} md={4}>
          <Paper className="param-tile" sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#e67e4a', width: 32, height: 32, mr: 1.5 }}>
                <Opacity sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1f4e7a' }}>Vitals</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#5f7d9e', mb: 1 }}>Systolic: {formData.ap_hi}</Typography>
                <Slider value={formData.ap_hi} onChange={handleSliderChange('ap_hi')} min={80} max={200} sx={{ color: '#e67e4a' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#5f7d9e', mb: 1 }}>Diastolic: {formData.ap_lo}</Typography>
                <Slider value={formData.ap_lo} onChange={handleSliderChange('ap_lo')} min={50} max={120} sx={{ color: '#e67e4a' }} />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Cholesterol</InputLabel>
                  <Select value={formData.cholesterol} onChange={handleChange('cholesterol')}>
                    <MenuItem value={1}>Normal</MenuItem>
                    <MenuItem value={2}>Elevated</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Glucose</InputLabel>
                  <Select value={formData.gluc} onChange={handleChange('gluc')}>
                    <MenuItem value={1}>Normal</MenuItem>
                    <MenuItem value={2}>Elevated</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Column 3: Lifestyle toggles */}
        <Grid item xs={12} md={4}>
          <Paper className="param-tile" sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#2b7a62', width: 32, height: 32, mr: 1.5 }}>
                <DirectionsRun sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1f4e7a' }}>Lifestyle</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f6faff', borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SmokingRooms sx={{ color: formData.smoke ? '#e67e4a' : '#b0c9e0', mr: 1 }} />
                    <Typography>Smoking</Typography>
                  </Box>
                  <Switch checked={formData.smoke === 1} onChange={handleSwitch('smoke')} color="warning" />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f6faff', borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalDrink sx={{ color: formData.alco ? '#e67e4a' : '#b0c9e0', mr: 1 }} />
                    <Typography>Alcohol</Typography>
                  </Box>
                  <Switch checked={formData.alco === 1} onChange={handleSwitch('alco')} color="warning" />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f6faff', borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DirectionsRun sx={{ color: formData.active ? '#2b7a62' : '#b0c9e0', mr: 1 }} />
                    <Typography>Active</Typography>
                  </Box>
                  <Switch checked={formData.active === 1} onChange={handleSwitch('active')} color="success" />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Action bar */}
      <Paper sx={{ mt: 4, p: 3, borderRadius: 4, bgcolor: '#ffffff', boxShadow: '0 10px 25px -10px rgba(0,50,80,0.15)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="body2" sx={{ color: '#5f7d9e' }}>
              All 12 parameters are set. Click Analyse to run the risk model.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button variant="outlined" startIcon={<RestartAlt />} onClick={handleReset} disabled={loading} sx={{ borderRadius: 40, borderColor: '#c0d4e8' }}>
                Reset
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                startIcon={<Calculate />}
                loading={loading}
                loadingPosition="start"
                className="cyber-button"
                onClick={() => onSubmit(formData)}
              >
                Analyse
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PredictionForm;