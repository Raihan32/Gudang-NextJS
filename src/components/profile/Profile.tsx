import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface UserProfile {
  nrp: string;
  nama: string;
  password: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nrp: "123456",
    nama: "John Doe",
    password: "password123",
  });
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState<UserProfile>({
    nrp: "",
    nama: "",
    password: "",
  });

  const handleEditClick = () => {
    setEditValues({ ...userProfile });
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = () => {
    setUserProfile({ ...editValues });
    setEditMode(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserProfile
  ) => {
    const { value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profil Pengguna
      </Typography>
      {!editMode ? (
        <Box>
          <Typography variant="body1" gutterBottom>
            NRP: {userProfile.nrp}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nama: {userProfile.nama}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Kata Sandi: {userProfile.password}
          </Typography>
          <Button variant="contained" onClick={handleEditClick}>
            Edit Profil
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField
            label="NRP"
            value={editValues.nrp}
            onChange={(e) => handleInputChange(e, "nrp")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nama"
            value={editValues.nama}
            onChange={(e) => handleInputChange(e, "nama")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Kata Sandi"
            type="password"
            value={editValues.password}
            onChange={(e) => handleInputChange(e, "password")}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSaveClick}>
            Simpan
          </Button>
          <Button variant="contained" onClick={handleCancelClick}>
            Batal
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
