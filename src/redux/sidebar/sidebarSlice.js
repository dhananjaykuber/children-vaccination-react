import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: 'Children Registration',
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload.active;
    },
  },
});

export const { setActive } = sidebarSlice.actions;

export default sidebarSlice.reducer;
