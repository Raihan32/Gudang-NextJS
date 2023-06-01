import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";

interface LoginProps {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin: React.FC<LoginProps> = ({ title, subtitle, subtext }) => {
  const router = useRouter();
  const [nrp, setNrp] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        nrp,
        password,
      });
      localStorage.setItem("token", response.data.token);

      // Setelah berhasil login, navigasi ke halaman dashboard
      router.push("/");
    } catch (error) {
      // Jika login gagal, tangani kesalahan di sini
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            NRP
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            value={nrp}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNrp(e.target.value)}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />
        </Box>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
