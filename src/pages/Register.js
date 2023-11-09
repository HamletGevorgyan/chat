import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { registerRequest } from '../store/actions/users';
import LogoutWrapper from '../comonents/LogoutWrapper';

const defaultTheme = createTheme();

function Register() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleChange = useCallback((path) => (ev) => {
    setForm({ ...form, [path]: ev.target.value });
  }, [form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { payload } = await dispatch(registerRequest(form));
    if (payload.errors) {
      setErrors(payload.errors);
    } else {
      window.location.href = '/login';
    }
  }, [form, errors]);

  return (
    <LogoutWrapper>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleChange('firstName')}
                    value={form.firstName}
                  />
                  <p style={{ color: 'red' }}>{errors.firstName}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleChange('lastName')}
                    value={form.lastName}
                  />
                  <p style={{ color: 'red' }}>{errors.lastName}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange('email')}
                    value={form.email}
                  />
                  <p style={{ color: 'red' }}>{errors.email}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange('password')}
                    value={form.password}
                  />
                  <p style={{ color: 'red' }}>{errors.password}</p>
                </Grid>
                <Grid item xs={1} />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/login" style={{ textDecoration: 'none' }}>
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </LogoutWrapper>
  );
}

export default Register;
