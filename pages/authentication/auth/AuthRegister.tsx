import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

import CustomTextField from '../../../src/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface RegisterType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: RegisterType) => {
  const [nrp, setNrp] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', {
        nrp,
        password,
        role,
      });
      console.log('Registration successful!', response.data);
      // Redirect to login page
      // Replace "/authentication/login" with your desired login page URL
      window.location.href = '/authentication/login';
    } catch (error) {
      console.error('Registration failed!', error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            NRP
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={nrp}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNrp(e.target.value)}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="role"
            mb="5px"
            mt="25px"
          >
            Role
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
