import React, { ReactElement } from 'react';
import { Typography, Box, Avatar, Button } from '@mui/material';
import FullLayout from '../../src/layouts/full/FullLayout';
import PageContainer from '../../src/components/container/PageContainer';
import Profile from '../../src/components/profile/Profile';
import DashboardCard from '../../src/components/shared/DashboardCard';

const ProfilePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
        <Typography>This is a sample page</Typography>
        <Profile />
    </PageContainer>
  );
};

export default ProfilePage;
ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};