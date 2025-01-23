import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the interface for a single panel child
interface PanelChild {
  label: string
  path: string
}

export interface PanelChildState {
  child: PanelChild // Holds the current selected panel child
  panels: PanelChild[] // Holds the list of panels
}

const initialState: PanelChildState = {
  child: {  label: '', path: '' },
  panels: [] 
}

const panelChildSlice = createSlice({
  name: 'panelChild',
  initialState,
  reducers: {
    // Update the state with the selected panel child
    handlePanelChildClick: (state, action: PayloadAction<PanelChild>) => {
      state.child = action.payload
    },
    removePanelChild: (state, action: PayloadAction<string>) => {
      if (state.child.label === action.payload) {
        state.child = {  label: '', path: '' }
      }    }

  }
})

export const { handlePanelChildClick , removePanelChild  } = panelChildSlice.actions
export const panelChildReducer = panelChildSlice.reducer
