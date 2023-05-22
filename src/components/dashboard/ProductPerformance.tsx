import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    TextField
} from '@mui/material';
import DashboardCard from '../shared/DashboardCard';


const products = [
    {
        kodebarang: "1",
        namabarang: "Baju Utress",
        kategori: "Pakaian",
        sisastock: 10,
    },
    {
        kodebarang: "2",
        namabarang: "Aqua",
        kategori: "Konsumsi",
        sisastock: 30,
    },
    {
        kodebarang: "3",
        namabarang: "Baju Utress",
        kategori: "Pakaian",
        sisastock: 10,
    },
    {
        kodebarang: "4",
        namabarang: "Baju Utress",
        kategori: "Pakaian",
        sisastock: 10,
    },
    {
        kodebarang: "5",
        namabarang: "Baju Utress",
        kategori: "Pakaian",
        sisastock: 10,
    },
];

const ProductPerformance = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <DashboardCard title="Data Barang">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Box sx={{ marginBottom: 2, marginTop: 1 }}>
                    <TextField
                        label="Cari Barang"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
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
                                    Kategori
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Sisa Stock
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.filter((product) =>
                                product.namabarang.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((product) => (
                                <TableRow key={product.kodebarang}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "900",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            {product.kodebarang}
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
                                                {product.namabarang}
                                            </Typography>
                                        </Box>
                                    </Box>
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
                                                {product.kategori}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>     
                                <TableCell align="right">
                                    <Typography variant="h6">{product.sisastock}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
