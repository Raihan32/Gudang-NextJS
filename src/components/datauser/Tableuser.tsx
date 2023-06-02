import React, { useState, useEffect } from "react";
import {
  IconButton,
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardCard from "../shared/DashboardCard";
import axios from "axios";

interface User {
  nama: string;
  nrp: string;
  password: string;
  role: string;
}

const Tabletuser: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openTambahModal, setOpenTambahModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>({
    nrp: "",
    nama: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:8000/user" // Ganti dengan URL endpoint API yang sesuai
      );
      setUserList(response.data);
      setFilteredUserList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const searchUser = (term: string) => {
    const filteredList = userList.filter((user) =>
      user.nama.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUserList(filteredList);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    searchUser(event.target.value);
  };

  const handleEditUser = (nrp: string) => {
    const user = userList.find((user) => user.nrp === nrp);
    if (user) {
      setSelectedUser(user);
      setOpenEditModal(true);
    }
  };

  const handleDeleteUser = async (nrp: string) => {
    try {
      await axios.delete(`http://localhost:8000/user/hapus/${nrp}`); // Ganti dengan URL endpoint API yang sesuai
      fetchUserList();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTambahDataUser = async () => {
    try {
      await axios.post(
        `http://localhost:8000/auth/register`, // Update URL endpoint for adding new user
        selectedUser
      );
      fetchUserList();
      setOpenTambahModal(false);
      setSelectedUser({ nrp: "", nama: "", password: "", role: "" });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEditDataUser = async () => {
    try {
      await axios.put(
        `http://localhost:8000/user/edit/${selectedUser.nrp}`, // Update URL endpoint for editing user
        selectedUser
      );
      fetchUserList();
      setOpenEditModal(false);
      setSelectedUser({ nrp: "", nama: "", password: "", role: "" });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <DashboardCard title="Data User">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Cari Nama User"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flex: 1, mr: 2, marginTop: 2 }}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenTambahModal(true)}
          >
            Tambah User
          </Button>
        </Box>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  NRP
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Role
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
            {filteredUserList.map((user) => (
              <TableRow key={user.nrp}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "900",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {user.nrp}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "900",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {user.nama}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {user.role}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditUser(user.nrp)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteUser(user.nrp)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Tambah User Modal */}
        <Modal open={openTambahModal} onClose={() => setOpenTambahModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 400, // Sesuaikan lebar sesuai kebutuhan
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Tambah User
            </Typography>
            <form>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="nrp"
                  name="nrp"
                  value={selectedUser.nrp}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="nama"
                  name="nama"
                  value={selectedUser.nama}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Password"
                  name="password"
                  value={selectedUser.password}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Role"
                  name="role"
                  value={selectedUser.role}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTambahDataUser}
              >
                Simpan
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenTambahModal(false);
                  setSelectedUser({
                    nrp: "",
                    nama: "",
                    password: "",
                    role: "",
                  });
                }}
              >
                Batal
              </Button>
            </form>
          </Box>
        </Modal>
        {/* Edit User Modal */}
        <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 400, // Sesuaikan lebar sesuai kebutuhan
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Edit User
            </Typography>
            <form>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="nrp"
                  name="nrp"
                  value={selectedUser.nrp}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="nama"
                  name="nama"
                  value={selectedUser.nama}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Password"
                  name="password"
                  value={selectedUser.password}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Role"
                  name="role"
                  value={selectedUser.role}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTambahDataUser}
              >
                Simpan
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenEditModal(false);
                  setSelectedUser({
                    nrp: "",
                    nama: "",
                    password: "",
                    role: "",
                  });
                }}
              >
                Batal
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </DashboardCard>
  );
};

export default Tabletuser;
