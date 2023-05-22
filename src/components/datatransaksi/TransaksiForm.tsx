import React, { useState } from 'react';
import { TextField, Button, FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';

interface TransaksiFormProps {
  addDataBarang: (dataTransaksi: DataTransaksi) => void;
}

interface DataTransaksi {
  tanggal: string;
  jumlah: string;
  ukuran: string;
  namaBarang: string;
  jenisTransaksi: string;
}

const TransaksiForm: React.FC<TransaksiFormProps> = ({ addDataBarang }) => {
  const [tanggal, setTanggal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [ukuran, setUkuran] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [jenisTransaksi, setJenisTransaksi] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Membuat objek data transaksi
    const dataTransaksi: DataTransaksi = {
      tanggal,
      jumlah,
      ukuran,
      namaBarang,
      jenisTransaksi,
    };

    // Memanggil fungsi addDataBarang untuk menambahkan data transaksi ke tabel barang
    addDataBarang(dataTransaksi);

    // Mereset form setelah submit
    setTanggal('');
    setJumlah('');
    setUkuran('');
    setNamaBarang('');
    setJenisTransaksi('');
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <form onSubmit={handleFormSubmit}>
        <TextField
          sx={{ marginTop: 2 }}
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          fullWidth
          required
        />
        <TextField
          sx={{ marginTop: 2 }}
          label="Jumlah"
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          fullWidth
          required
        />
        <TextField
          sx={{ marginTop: 2 }}
          label="Ukuran"
          value={ukuran}
          onChange={(e) => setUkuran(e.target.value)}
          fullWidth
          required
        />
        <TextField
          sx={{ marginTop: 2 }}
          label="Nama Barang"
          value={namaBarang}
          onChange={(e) => setNamaBarang(e.target.value)}
          fullWidth
          required
        />
        <FormControl sx={{ marginTop: 2 }} fullWidth required>
          <InputLabel>Masuk / Keluar</InputLabel>
          <Select
            value={jenisTransaksi}
            onChange={(e) => setJenisTransaksi(e.target.value as string)}
          >
            <MenuItem value="pemasukan">Pemasukan</MenuItem>
            <MenuItem value="pengeluaran">Pengeluaran</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{ marginTop: 2 }} type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default TransaksiForm;
