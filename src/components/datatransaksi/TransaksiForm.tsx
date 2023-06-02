import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import axios from "axios";

interface TransaksiFormProps {
  addDataBarang: (dataTransaksi: DataTransaksi) => void;
}

interface DataTransaksi {
  id: number;
  tanggal: Date;
  jumlah: string;
  namaBarang: string;
  jenis: string;
  nrp: string;
  deskripsi: string;
}

const TransaksiForm: React.FC<TransaksiFormProps> = ({ addDataBarang }) => {
  const [tanggal, setTanggal] = useState<Date>(new Date());
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jenis, setJenisTransaksi] = useState("");
  const [nrp, setNRP] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Membuat objek data transaksi
    const dataTransaksi: DataTransaksi = {
      tanggal: new Date(tanggal),
      jumlah: jumlahBarang,
      namaBarang,
      jenis,
      nrp,
      deskripsi,
      id: 0,
    };

    try {
      // Mengirim data transaksi ke API menggunakan Axios
      const response = await axios.post(
        "http://localhost:8000/transaksi/tambah",
        dataTransaksi
      );
      console.log("Transaction submitted successfully!", response.data);

      // Memanggil fungsi addDataBarang untuk menambahkan data transaksi ke tabel barang
      addDataBarang(dataTransaksi);

      // Mereset form setelah submit
      setTanggal(new Date()); // Reset to initial value
      setJumlahBarang("");
      setNamaBarang("");
      setJenisTransaksi("");
      setNRP("");
      setDeskripsi("");
    } catch (error) {
      console.error("Failed to submit transaction!", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <form onSubmit={handleFormSubmit}>
        <TextField
          sx={{ marginTop: 2 }}
          type="date"
          value={tanggal.toISOString().split("T")[0]}
          onChange={(e) => setTanggal(new Date(e.target.value))}
          fullWidth
          required
        />
        <TextField
          sx={{ marginTop: 2 }}
          label="Jumlah Barang"
          type="number"
          value={jumlah}
          onChange={(e) => setJumlahBarang(e.target.value)}
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
        <TextField
          sx={{ marginTop: 2 }}
          label="PIC"
          value={nrp}
          onChange={(e) => setNRP(e.target.value)}
          fullWidth
          required
        />
        <FormControl sx={{ marginTop: 2 }} fullWidth required>
          <InputLabel>Masuk / Keluar</InputLabel>
          <Select
            value={jenis}
            onChange={(e) => setJenisTransaksi(e.target.value as string)}
          >
            <MenuItem value="masuk">Pemasukan</MenuItem>
            <MenuItem value="keluar">Pengeluaran</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ marginTop: 2 }}
          label="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 2 }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default TransaksiForm;
