import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

interface Transaksi {
  id: number;
  tanggal: string;
  ukuran: string;
  namaBarang: string;
  jumlahBarang: number;
  masukKeluar: string;
  pic: string;
}

const Tabletransaksi: React.FC = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);

  useEffect(() => {
    fetch('https://example.com/api/transaksi')
      .then(response => response.json())
      .then(data => setTransaksi(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <DashboardCard title="Data Transaksi">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Barang
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama Barang
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  PIC
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Masuk/Keluar
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Aksi
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transaksi.map((transaksi) => (
              <TableRow key={transaksi.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {transaksi.tanggal}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {transaksi.jumlahBarang}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {transaksi.namaBarang}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {transaksi.pic}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{
                          color:
                            transaksi.masukKeluar === 'Masuk'
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {transaksi.masukKeluar}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default Tabletransaksi;
