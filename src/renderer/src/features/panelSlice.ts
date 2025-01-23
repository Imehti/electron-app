import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Panel {
  panelName: string
}

export interface PanelState {
  panels: Panel[]
}

const initialState: PanelState = {
  panels: []
}

const panelSlice = createSlice({
  name: 'createPanel',
  initialState,
  reducers: {

    // handle creating panel
    handleCreatePanel: (state, action: PayloadAction<Panel>) => {
      state.panels.push(action.payload)
    },


    // handle deleting the panel 
    handleDeletePanel: (state, action: PayloadAction<Panel>) => {
      state.panels = state.panels.filter((panel) => panel.panelName !== action.payload.panelName)
    },
    
  }
})

export const { handleCreatePanel, handleDeletePanel } = panelSlice.actions
export const panelReducer = panelSlice.reducer
