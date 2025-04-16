// Auth Imports
import { IRoute } from '@/types/types';
import {
  HiOutlineHome,
  HiOutlineCpuChip,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineCog8Tooth,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar
} from 'react-icons/hi2';

export const routes: IRoute[] = [
  // {
  //   name: 'Main Dashboard',
  //   path: '/dashboard/main',
  //   icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
  //   collapse: false
  // },
  {
    name: 'Stories',
    path: '/dashboard2/main',
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Prompts',
    path: '/dashboard2/prompts',
    icon: (
      <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false
  },
  {
    name: 'AI Chat',
    path: '/dashboard/ai-chat',
    icon: (
      <HiOutlineCpuChip className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false
  },
  {
    name: 'Profile Settings',
    path: '/dashboard2/settings',
    icon: (
      <HiOutlineCog8Tooth className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false
  }
  // {
  //   name: 'AI Generator',
  //   path: '/dashboard/ai-generator',
  //   icon: (
  //     <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // },
  // {
  //   name: 'AI Assistant',
  //   path: '/dashboard/ai-assistant',
  //   icon: <HiOutlineUser className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
  //   collapse: false,
  //   disabled: true
  // },
  // {
  //   name: 'Users List',
  //   path: '/dashboard/users-list',
  //   icon: (
  //     <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // },
  // {
  //   name: 'Subscription',
  //   path: '/dashboard/subscription',
  //   icon: (
  //     <HiOutlineCreditCard className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // },
  // {
  //   name: 'Landing Page',
  //   path: '/home',
  //   icon: (
  //     <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // },
  // {
  //   name: 'Pricing Page',
  //   path: '/pricing',
  //   icon: (
  //     <HiOutlineCurrencyDollar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // }
];
