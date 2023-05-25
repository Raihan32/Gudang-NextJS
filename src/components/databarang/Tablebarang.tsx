import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton, Button, Modal, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";

interface Size {
  size: string;
  stock: number;
}

interface Barang {
  id: number;
  name: string;
  sizes: Size[];
}

const Tabelbarang: React.FC = () => {
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [newBarang, setNewBarang] = useState<Barang>({
    id: 0,
    name: "",
    sizes: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    fetchBarangData();
  }, []);

  const fetchBarangData = async () => {
    try {
      const response = await axios.get("your_api_url");
      const data = response.data;
      setBarangList(data.barang);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTambahDataBarang = async () => {
    if (newBarang.name && newBarang.sizes.length > 0) {
      try {
        if (editIndex !== -1) {
          const response = await axios.put(
            `your_api_url/${newBarang.id}`,
            newBarang
          );
          const updatedBarangList = [...barangList];
          updatedBarangList[editIndex] = response.data;
          setBarangList(updatedBarangList);
          setEditIndex(-1);
        } else {
          const response = await axios.post("your_api_url", newBarang);
          const updatedBarangList = [...barangList, response.data];
          setBarangList(updatedBarangList);
        }

        setNewBarang({ id: 0, name: "", sizes: [] });
        setOpenModal(false);
      } catch (error) {
        console.error("Error adding/editing data:", error);
      }
    } else {
      alert("Harap isi nama barang dan setidaknya satu ukuran dan stok.");
    }
  };

  const handleEditBarang = (index: number) => {
    const selectedBarang = barangList[index];
    setNewBarang(selectedBarang);
    setEditIndex(index);
    setOpenModal(true);
  };

  const handleDeleteBarang = async () => {
    try {
      await axios.delete(`your_api_url/${barangList[deleteIndex].id}`);
      const updatedBarangList = [...barangList];
      updatedBarangList.splice(deleteIndex, 1);
      setBarangList(updatedBarangList);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleOpenDeleteDialog = (index: number) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteIndex(-1);
    setOpenDeleteDialog(false);
  };

  function handleSizeChange(index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    throw new Error("Function not implemented.");
  }

  function handleStockChange(index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <DashboardCard title="Data Barang">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Cari Barang"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Tambah Data Barang
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nama Barang</TableCell>
            <TableCell>Ukuran</TableCell>
            <TableCell>Stok</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {barangList
            .filter((barang) =>
              barang.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((barang, index) => (
              <TableRow key={barang.id}>
                <TableCell>{barang.id}</TableCell>
                <TableCell>{barang.name}</TableCell>
                <TableCell>
                  {barang.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex}>
                      {size.size} - {size.stock}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditBarang(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleOpenDeleteDialog(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editIndex !== -1 ? "Edit Barang" : "Tambah Barang"}
          </Typography>
          <TextField
            label="Nama Barang"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newBarang.name}
            onChange={(e) =>
              setNewBarang((prevBarang) => ({
                ...prevBarang,
                name: e.target.value,
              }))
            }
          />
          {newBarang.sizes.map((size, index) => (
            <div key={index}>
              <TextField
                label="Ukuran"
                variant="outlined"
                size="small"
                margin="normal"
                value={size.size}
                onChange={(e) => handleSizeChange(index, e)}
              />
              <TextField
                label="Stok"
                variant="outlined"
                size="small"
                margin="normal"
                type="number"
                value={size.stock}
                onChange={(e) => handleStockChange(index, e)}
              />
            </div>
          ))}
          <Button
            variant="contained"
            onClick={handleTambahDataBarang}
            style={{ marginRight: "10px" }}
          >
            {editIndex !== -1 ? "Simpan" : "Tambah"}
          </Button>
          <Button variant="outlined" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </Box>
      </Modal>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Konfirmasi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus barang ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteBarang}>Hapus</Button>
          <Button onClick={handleCloseDeleteDialog}>Batal</Button>
        </DialogActions>
      </Dialog>
    </DashboardCard>
  );
};

export default Tabelbarang;
