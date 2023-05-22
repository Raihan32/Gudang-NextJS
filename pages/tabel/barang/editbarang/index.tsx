import type { ReactElement } from "react";
import FullLayout from "../../../../src/layouts/full/FullLayout";
import { Typography, Grid, Button, CardContent } from "@mui/material";
import PageContainer from "../../../../src/components/container/PageContainer";
import Editbarang from "../../../../src/components/databarang/Editbarang";

const Editbarangpage = () => {
  return (
    <PageContainer title="Edit Barang" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
              
                <Editbarang />
              </Grid>
            </Grid>
            
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Editbarangpage;
Editbarangpage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
