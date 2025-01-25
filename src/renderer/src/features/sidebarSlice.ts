import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  isSidebarOpen: boolean;
}

const initialState: SidebarState = {
  isSidebarOpen: false,
};

// Create a slice for managing the sidebar state
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen; // Toggle sidebar state
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload; // Set sidebar state
    },
  },
});

export const { toggleSidebar, setSidebarOpen } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
