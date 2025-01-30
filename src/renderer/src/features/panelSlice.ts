import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Panel {
  branchName: string
  branchCode: string
  uploadCode: number
  wanIp: string
  localIp: string
  wanPort: number
  localPort: number
  panelType: string
  serialNumber: string
  description?: string
}

export interface PanelState {
  panels: Panel[]
  errorMessage: string | null
  successMessage: string | null
  deleteSuccessMessage: string | null
}

const initialState: PanelState = {
  panels: [],
  errorMessage: null,
  successMessage: null,
  deleteSuccessMessage: null
}

const panelSlice = createSlice({
  name: 'createPanel',
  initialState,
  reducers: {
    // handle creating panel
    handleCreatePanel: (state, action: PayloadAction<Panel>) => {
      const exists = state.panels.some((panel) => panel.branchName === action.payload.branchName)
      if (!exists) {
        state.panels.push(action.payload)
        state.successMessage = 'پنل با موفقیت ایجاد شد'
        state.errorMessage = null
      } else {
        state.successMessage = null
        state.errorMessage = 'پنل از قبل وجود دارد'
      }
    },

    // handle deleting the panel
    handleDeletePanel: (state, action: PayloadAction<{ branchName: string }>) => {
      state.panels = state.panels.filter((panel) => panel.branchName !== action.payload.branchName)
      state.deleteSuccessMessage = 'پنل با موفقیت حذف شد'
      state.errorMessage = null
    },

    // handle editing the panel
    handleEditPanel(state, action: PayloadAction<Panel>) {
      const updatedPanel = action.payload
      const index = state.panels.findIndex((panel) => panel.serialNumber === updatedPanel.serialNumber)

      if (index !== -1) {
        state.panels[index] = updatedPanel
        state.successMessage = 'پنل با موفقیت ویرایش شد'
      } else {
        state.errorMessage = 'پنل یافت نشد'
      }
    },
    // clear messages
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
      state.deleteSuccessMessage = null;
    }
  }
})

export const { handleCreatePanel, handleDeletePanel, handleEditPanel, clearMessages } = panelSlice.actions
export const panelReducer = panelSlice.reducer
