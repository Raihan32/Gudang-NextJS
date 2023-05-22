import type { ReactElement } from "react";
import FullLayout from "../../../src/layouts/full/FullLayout";
import { Typography, Grid, Button, CardContent } from "@mui/material";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import BlankCard from "../../../src/components/shared/BlankCard";
import ProductPerformance from "../../../src/components/dashboard/ProductPerformance";
import Tabletransaksi from "../../../src/components/datatransaksi/Tabletransaksi";
import Tabelbarang from "../../../src/components/databarang/Tablebarang";

const TypographyPage = () => {
  return (
    <PageContainer title="Data Barang" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
              
                <Tabelbarang />
              </Grid>
            </Grid>
            
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
TypographyPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
