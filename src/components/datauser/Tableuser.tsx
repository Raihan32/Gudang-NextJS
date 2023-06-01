import React, { useState, useEffect } from "react";
import { IconButton, Button, Modal, Box, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import axios from "axios";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const Tabletuser: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:3001/users" // Ganti dengan URL endpoint API yang sesuai
      );
      setUserList(response.data);
      setFilteredUserList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const searchUser = (term: string) => {
    const filteredList = userList.filter((user) =>
      user.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUserList(filteredList);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    searchUser(event.target.value);
  };

  const handleEditUser = (id: number) => {
    const user = userList.find((user) => user.id === id);
    if (user) {
      setNewUser(user);
      setOpenModal(true);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`); // Ganti dengan URL endpoint API yang sesuai
      fetchUserList();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTambahDataUser = async () => {
    try {
      if (newUser.id) {
        await axios.put(
          `http://localhost:3001/users/${newUser.id}`, // Ganti dengan URL endpoint API yang sesuai
          newUser
        );
      } else {
        await axios.post(
          "http://localhost:3001/users", // Ganti dengan URL endpoint API yang sesuai
          newUser
        );
      }
      fetchUserList();
      setOpenModal(false);
      setNewUser({ id: 0, username: "", password: "", role: "" });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const renderPassword = (password: string) => {
    // Logika untuk merender password
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
            onClick={() => setOpenModal(true)}
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
                  Username
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Password
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
              <TableRow key={user.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "900",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {user.username}
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
                    {renderPassword(user.password)}
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
                    onClick={() => handleEditUser(user.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
              Tambah/Edit User
            </Typography>
            <form>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Username"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Role"
                  name="role"
                  value={newUser.role}
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
            </form>
          </Box>
        </Modal>
      </Box>
    </DashboardCard>
  );
};

export default Tabletuser;
