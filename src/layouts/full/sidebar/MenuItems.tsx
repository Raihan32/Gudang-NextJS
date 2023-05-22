import {
  IconAperture, IconArrowsUpDown, IconUser, IconLayoutDashboard, IconLogin, IconLogout , IconMoodHappy, IconBoxSeam, IconUserPlus, IconSwitchVertical 
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    navlabel: true,
    subheader: 'Table',
  },
  {
    id: uniqueId(),
    title: 'Data Barang',
    icon: IconBoxSeam,
    href: '/tabel/barang',
  },
 
  {
    id: uniqueId(),
    title: 'Daftar Transaksi',
    icon: IconArrowsUpDown,
    href: '/tabel/transaksi',
  },
  {
    id: uniqueId(),
    title: 'Data User',
    icon: IconUser ,
    href: '/tabel/user',
  },
  {
    navlabel: true,
    subheader: 'Transaksi',
  },
  
  {
    id: uniqueId(),
    title: 'Transaksi',
    icon: IconSwitchVertical  ,
    href: '/formtransaksi',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/authentication/register',
  }
];

export default Menuitems;
