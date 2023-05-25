import React, { useState } from "react";
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
import data from "../../../public/data/user.json";

interface User {
  nrp: string;
  name: string;
  password: string;
  role: string;
}

const Tabletuser: React.FC = () => {
  const [userList, setUserList] = useState<User[]>(data.user);
  const [newUser, setNewUser] = useState<User>({
    nrp: "",
    name: "",
    password: "",
    role: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const simpanDataPengguna = (updatedUserList: User[]) => {
    const newData = { ...data, user: updatedUserList };
    const newDataJson = JSON.stringify(newData);
    // Simpan data pengguna ke file JSON menggunakan metode yang sesuai di sini (seperti fetch API atau metode penyimpanan file pada server)
    console.log(newDataJson);
  };

  const handleTambahDataUser = () => {
    if (newUser.nrp && newUser.name && newUser.password) {
      const existingUser = userList.find((user) => user.nrp === newUser.nrp);

      if (existingUser) {
        const updatedUserList = userList.map((user) =>
          user.nrp === existingUser.nrp ? newUser : user
        );
        setUserList(updatedUserList);
        simpanDataPengguna(updatedUserList); // Simpan data pengguna ke file JSON
      } else {
        const updatedUserList = [...userList, newUser];
        setUserList(updatedUserList);
        simpanDataPengguna(updatedUserList); // Simpan data pengguna ke file JSON
      }

      setNewUser({ nrp: "", name: "", password: "", role: "",});
      setOpenModal(false);
    } else {
      alert("Harap isi NRP, Nama, dan Password.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditUser = (nrp: string) => {
    const userToEdit = userList.find((user) => user.nrp === nrp);
    if (userToEdit) {
      setNewUser(userToEdit);
      setOpenModal(true);
    }
  };

  const handleDeleteUser = (nrp: string) => {
    const updatedUserList = userList.filter((user) => user.nrp !== nrp);
    setUserList(updatedUserList);
    simpanDataPengguna(updatedUserList); // Simpan data pengguna ke file JSON
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUserList = userList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPassword = (password: string) => {
    const passwordLength = password.length;
    return "*".repeat(passwordLength);
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {user.name}
                      </Typography>
                    </Box>
                  </Box>
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
              width: 400, // Adjust the width as desired
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Tambah/Edit User
            </Typography>
            <form>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="NRP"
                  name="nrp"
                  value={newUser.nrp}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Nama"
                  name="name"
                  value={newUser.name}
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
