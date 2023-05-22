import type { ReactElement } from "react";
import FullLayout from "../../../src/layouts/full/FullLayout";
import { Grid } from "@mui/material";
import PageContainer from "../../../src/components/container/PageContainer";

import ProductPerformance from "../../../src/components/dashboard/ProductPerformance";
import Tabelbarang from "../../../src/components/databarang/Tablebarang";
import Tabletransaksi from "../../../src/components/datatransaksi/Tabletransaksi";

const TypographyPage = () => {
  return (
    <PageContainer title="Data Transaksi" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}> 
          
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Tabletransaksi />
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
