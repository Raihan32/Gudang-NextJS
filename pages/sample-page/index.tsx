import type { ReactElement } from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import Profile from '../../src/components/profile/Profile';

const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      
        <Typography>This is a sample page</Typography>
        <> </>
        <Profile />
      
    </PageContainer>
  );
};

export default SamplePage;
SamplePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};