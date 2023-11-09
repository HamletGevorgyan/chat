import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../store/actions/users';
import LogoutWrapper from '../comonents/LogoutWrapper';

const defaultTheme = createTheme();

function Login() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleChange = useCallback((path) => (ev) => {
    setForm({ ...form, [path]: ev.target.value });
    delete errors[path];
    setErrors({ ...errors });
  }, [form, errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { payload } = await dispatch(loginRequest(form));
    if (payload.errors) {
      setErrors(payload.errors);
    } else {
      window.location.href = '/messages';
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange('email')}
                value={form.email}
              />
              <p style={{ color: 'red' }}>{errors.email}</p>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange('password')}
                value={form.password}
              />
              <p style={{ color: 'red' }}>{errors.error}</p>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <NavLink to="/register" style={{ textDecoration: 'none' }}>
                    Don't have an account? Sign Up
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

export default Login;
