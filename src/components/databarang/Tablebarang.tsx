import React, { useState } from "react";
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
import data from "../../../public/data/barang.json";

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
  const [barangList, setBarangList] = useState<Barang[]>(data.barang);
  const [newBarang, setNewBarang] = useState<Barang>({
    id: 0,
    name: "",
    sizes: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(-1); // Menyimpan indeks data yang akan diedit
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(-1); // Menyimpan indeks data yang akan dihapus
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Menyimpan status tampilan dialog konfirmasi hapus

  const handleTambahDataBarang = () => {
    if (newBarang.name && newBarang.sizes.length > 0) {
      if (editIndex !== -1) {
        const updatedBarangList = [...barangList];
        updatedBarangList[editIndex] = newBarang;
        setBarangList(updatedBarangList);
        setEditIndex(-1);
      } else {
        const existingBarang = barangList.find(
          (barang) => barang.name === newBarang.name
        );

        if (existingBarang) {
          const updatedSizes = [...existingBarang.sizes, ...newBarang.sizes];
          const updatedBarangList = barangList.map((barang) =>
            barang.name === existingBarang.name
              ? { ...barang, sizes: updatedSizes }
              : barang
          );
          setBarangList(updatedBarangList);
        } else {
          const updatedBarangList = [...barangList, newBarang];
          setBarangList(updatedBarangList);
        }
      }

      setNewBarang({ id: +1, name: "", sizes: [] });
      setOpenModal(false);
    } else {
      alert("Harap isi nama barang dan setidaknya satu ukuran dan stok.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBarang((prevBarang) => ({
      ...prevBarang,
      name: event.target.value,
    }));
  };

  const handleAddSize = () => {
    setNewBarang((prevBarang) => ({
      ...prevBarang,
      sizes: [...prevBarang.sizes, { size: "", stock: 0 }],
    }));
  };

  const handleSizeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBarang((prevBarang) => {
      const newSizes = [...prevBarang.sizes];
      newSizes[index].size = event.target.value;
      return { ...prevBarang, sizes: newSizes };
    });
  };

  const handleStockChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBarang((prevBarang) => {
      const newSizes = [...prevBarang.sizes];
      newSizes[index].stock = parseInt(event.target.value);
      return { ...prevBarang, sizes: newSizes };
    });
  };

  const handleEditBarang = (index: number) => {
    const selectedBarang = barangList[index];
    setNewBarang(selectedBarang);
    setEditIndex(index);
    setOpenModal(true);
  };

  const handleDeleteBarang = () => {
    const updatedBarangList = [...barangList];
    updatedBarangList.splice(deleteIndex, 1);
    setBarangList(updatedBarangList);
    handleCloseDeleteDialog();
  };

  const handleOpenDeleteDialog = (index: number) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteIndex(-1);
    setOpenDeleteDialog(false);
  };

  return (
    <DashboardCard title="Data Barang">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Tambah Data Barang
          </Button>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Cari Barang"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            fullWidth
          />
        </Box>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Kode Barang
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama Barang
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Stock
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
            {barangList
              .filter((barang) =>
                barang.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((barang, index) => (
                <TableRow key={barang.id}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "900",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {barang.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {barang.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "start" }}>
                      <Box>
                        <ul>
                          {barang.sizes.map((size, index) => (
                            <Typography key={index}>
                              {size.size}, stock: {size.stock}
                            </Typography>
                          ))}
                        </ul>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditBarang(index)}
                      color="primary"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(index)}
                      color="secondary"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setNewBarang({ id: 0, name: "", sizes: [] });
          setEditIndex(-1);
        }}
      >
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
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Nama Barang"
              value={newBarang.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
          {newBarang.sizes.map((size, index) => (
            <Box key={index} sx={{ display: "flex", marginBottom: 2 }}>
              <Box sx={{ flex: 1, marginRight: 1 }}>
                <TextField
                  label="Ukuran"
                  value={size.size}
                  onChange={(event) => handleSizeChange(index, event)}
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1, marginRight: 1 }}>
                <TextField
                  label="Stok"
                  type="number"
                  value={size.stock}
                  onChange={(event) => handleStockChange(index, event)}
                  fullWidth
                />
              </Box>
            </Box>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSize}
            >
              Tambah Ukuran
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTambahDataBarang}
            >
              {editIndex !== -1 ? "Simpan Perubahan" : "Tambah Barang"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hapus Barang"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin menghapus barang ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Batal</Button>
          <Button onClick={handleDeleteBarang} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardCard>
  );
};

export default Tabelbarang;
