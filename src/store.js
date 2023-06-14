import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './redux/admin/adminSlice';
import sidebarReducer from './redux/sidebar/sidebarSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    sidebar: sidebarReducer,
  },
});
