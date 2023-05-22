import type { ReactElement } from 'react';
import { Typography, Grid } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import TransaksiForm from '../../src/components/datatransaksi/TransaksiForm';

const SamplePage = () => {
  return (
    <PageContainer title="Form Transaksi" description="this is Sample page">
      <DashboardCard title="Form Transaksi">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
              
                <TransaksiForm />
              </Grid>
            </Grid>
            
        </Grid>
      </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
SamplePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};