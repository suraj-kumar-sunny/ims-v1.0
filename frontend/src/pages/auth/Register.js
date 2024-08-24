import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  AccountCircle as AccountCircleIcon,
  LocationOn as LocationOnIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { Country, State, City } from 'country-state-city';

const Register = () => {
  const navigate = useNavigate();

  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '+91',
    password: '',
    confirmPassword: '',
    locality: '',
    country: 'IN',
    state: '',
    city: '',
    gender: '',
    storeName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCountries(Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  useEffect(() => {
    if (formData.country) {
      setStates(State.getStatesOfCountry(formData.country).sort((a, b) => a.name.localeCompare(b.name)));
      setFormData(prevData => ({ ...prevData, state: '', city: '' }));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      setCities(City.getCitiesOfState(formData.country, formData.state).sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, [formData.state]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handlePhoneChange = useCallback((value) => {
    setFormData(prevData => ({ ...prevData, mobile: value }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.locality) newErrors.locality = 'Locality is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Form Data:', formData);
      setIsSubmitting(false);
      navigate('/success');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const renderFormFields = () => (
    <Grid container spacing={2}>
      {formType && (
        <>
          {formType === 'Single User' ? (
            <Grid item xs={12}>
              <TextField
                label="Owner Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon color="primary" />
                    </InputAdornment>
                  ),
                  style: { color: 'text.primary' }
                }}
              />
            </Grid>
          ) : (
            <>
              {(formType === 'Company' || formType === 'Store') && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={formType === 'Store' ? 'Store Name' : 'Company Name'}
                    variant="outlined"
                    fullWidth
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    error={!!errors.storeName}
                    helperText={errors.storeName}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                    InputLabelProps={{ style: { color: 'text.secondary' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon color="primary" />
                        </InputAdornment>
                      ),
                      style: { color: 'text.primary' }
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Owner Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: 'primary.main' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                    },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  InputLabelProps={{ style: { color: 'text.secondary' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon color="primary" />
                      </InputAdornment>
                    ),
                    style: { color: 'text.primary' }
                  }}
                />
              </Grid>
            </>
          )}
        </>
      )}
    </Grid>
  );

  const countryOptions = useMemo(() => (
    countries.map(c => (
      <MenuItem key={c.isoCode} value={c.isoCode}>
        {c.name}
      </MenuItem>
    ))
  ), [countries]);

  const stateOptions = useMemo(() => (
    states.map(s => (
      <MenuItem key={s.isoCode} value={s.isoCode}>
        {s.name}
      </MenuItem>
    ))
  ), [states]);

  const cityOptions = useMemo(() => (
    cities.length === 0 ? (
      <MenuItem value="">No Cities Available</MenuItem>
    ) : (
      cities.map(c => (
        <MenuItem key={c.name} value={c.name}>
          {c.name}
        </MenuItem>
      ))
    )
  ), [cities]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
      px: { xs: 2, sm: 4 }, // Padding on X axis for responsive design
      py: { xs: 4, sm: 8 }  // Padding on Y axis for responsive design
    }}>
      <Box sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        px: 3,  // Padding inside the box
        py: 3,  // Padding inside the box
        textAlign: 'center',
        width: '100%',
        maxWidth: '800px',
        mt: 2,   // Margin top for separation from other elements
        mb: 2    // Margin bottom for separation from other elements
      }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Register
        </Typography>

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Registration Type</InputLabel>
          <Select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            label="Registration Type"
          >
            <MenuItem value="Single User">Single User</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
            <MenuItem value="Store">Store</MenuItem>
          </Select>
        </FormControl>

        {renderFormFields()}

        {formType && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <PhoneInput
                country={'in'}
                value={formData.mobile}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: '100%',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  padding: '12px', // Padding inside PhoneInput
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                  style: { color: 'text.primary' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { color: 'text.primary' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { color: 'text.primary' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Locality"
                variant="outlined"
                fullWidth
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                error={!!errors.locality}
                helperText={errors.locality}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
                  style: { color: 'text.primary' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Country</InputLabel>
                <Select
                  value={formData.country}
                  onChange={handleInputChange}
                  label="Country"
                  name="country"
                >
                  {countryOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>State</InputLabel>
                <Select
                  value={formData.state}
                  onChange={handleInputChange}
                  label="State"
                  name="state"
                >
                  {stateOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>City</InputLabel>
                <Select
                  value={formData.city}
                  onChange={handleInputChange}
                  label="City"
                  name="city"
                >
                  {cityOptions}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {formType && (
          <>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="I agree to the terms and conditions"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister}
              disabled={isSubmitting}
              sx={{
                mt: 2,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'scale(0.98)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Button onClick={() => navigate('/login')} sx={{ textDecoration: 'none', color: 'primary.main' }}>
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
