import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Typography, Box } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import data from "../../../public/data/barang.json";

const EditBarang = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formValues, setFormValues] = useState({
    namaBarang: "",
    ukuran: "",
    stok: ""
  });

  useEffect(() => {
    // Mengambil data barang berdasarkan ID
    const barang = data.barang.find((item) => item.id === Number(id));

    if (barang) {
      setFormValues({
        namaBarang: barang.name,
        ukuran: "",
        stok: ""
      });
    }
  }, [id]);

  const handleUpdateBarang = () => {
    // Proses update barang
    // ...

    router.push("/tabelbarang");
  };

  const handleChangeFormValues = (event: { target: { name: any; value: any; }; }) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <DashboardCard title="Edit Barang">
      <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <TextField
          name="namaBarang"
          label="Nama Barang"
          value={formValues.namaBarang}
          onChange={handleChangeFormValues}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          name="ukuran"
          label="Ukuran"
          value={formValues.ukuran}
          onChange={handleChangeFormValues}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          name="stok"
          label="Stok"
          value={formValues.stok}
          onChange={handleChangeFormValues}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateBarang}
        >
          Update Barang
        </Button>
        <Typography variant="caption" sx={{ marginTop: 1 }}>
          ID Barang: {id}
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default EditBarang;