import React from 'react';
import { Typography, Box, Avatar, Button } from '@mui/material';

const ProfilePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ width: 120, height: 120, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        John Doe
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Web Developer
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 400, mt: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non ligula at turpis volutpat
        tincidunt. Curabitur at condimentum nisl, nec rhoncus ipsum. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; Praesent tempor tellus a rutrum
        malesuada.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default ProfilePage;