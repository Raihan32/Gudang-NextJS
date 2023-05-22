import React from 'react';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';
const transaksi = [
  {
      kodetransaksi: "1",
      tanggal: "4 Mei 2023",
      namabarang: "Baju UTress",
      pic: "malik",
      transaksi: "Masuk",
      jumlah : 10,
  },
  {
    kodetransaksi: "2",
    tanggal: "6 Mei 2023",
    namabarang: "Aqua",
    pic: "Galih",
    transaksi: "Keluar",
    jumlah : 30,
},
{
  kodetransaksi: "3",
  tanggal: "9 Mei 2023",
  namabarang: "Baju UTress",
  pic: "Arkhan",
  transaksi: "Keluar",
  jumlah : 10
},
  
];
const RecentTransactions = () => {
  return (
    <DashboardCard title="Transaksi Terakhir">
      <>
      {transaksi.map((transaksi) => (
                            
        <Timeline key={transaksi.kodetransaksi}
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef'
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent>{transaksi.tanggal} {transaksi.pic}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{transaksi.namabarang} {transaksi.transaksi} {transaksi.jumlah} </TimelineContent>
          </TimelineItem>
        </Timeline>
        ))}
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
