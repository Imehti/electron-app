import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { City } from './citiesSlice'

export interface Province {
  province: string
  cities: City[] // Cities belong exclusively to their own province
}

export interface ProvinceState {
  provinces: Province[]
  selectedProvince: Province | null
  errorMessage: string | null
  successMessage: string | null
  deleteSuccessMessage: string | null
}

const initialState: ProvinceState = {
  provinces: [
    {
      province: 'تهران',
      cities: [{ city: 'تهران' }, { city: 'کرج' }, { city: 'ورامین' }]
    },
    {
      province: 'اصفهان',
      cities: [{ city: 'اصفهان' }, { city: 'کاشان' }, { city: 'نجف‌آباد' }]
    },
    {
      province: 'فارس',
      cities: [{ city: 'شیراز' }, { city: 'مرودشت' }, { city: 'جهرم' }]
    }
  ],
  selectedProvince: null,
  errorMessage: null,
  successMessage: null,
  deleteSuccessMessage: null
}

const provincesSlice = createSlice({
  name: 'provinces',
  initialState,
  reducers: {
    // Add province action
    addProvince: (state, action: PayloadAction<Province>) => {
      const exists = state.provinces.some(
        (province) => province.province === action.payload.province
      )

      if (!exists) {
        state.provinces.push({ ...action.payload, cities: [] }) // Initialize cities
        state.successMessage = 'استان با موفقیت اضافه شد'
        state.errorMessage = null
      } else {
        state.successMessage = null
        state.errorMessage = 'استان از قبل وجود دارد'
      }
    },
    // Handle delete province
    handleDeleteProvince: (state, action: PayloadAction<Province>) => {
      state.provinces = state.provinces.filter(
        (province) => province.province !== action.payload.province
      )
      if (state.selectedProvince?.province === action.payload.province) {
        state.selectedProvince = null
      }
      state.deleteSuccessMessage = 'استان با موفقیت حذف شد'
      state.errorMessage = null
    },
    // Clear messages action
    clearMessages: (state) => {
      state.successMessage = null
      state.errorMessage = null
      state.deleteSuccessMessage = null
    },
    // Select province action
    selectProvince: (state, action: PayloadAction<Province | null>) => {
      const selected = state.provinces.find(
        (province) => province.province === action?.payload?.province
      )

      if (selected) {
        state.selectedProvince = selected
      } else {
        state.selectedProvince = null
      }
    },
    // Add city to a province (only for its respective province)
    addCity: (state, action: PayloadAction<{ province: string; city: City }>) => {
      const province = state.provinces.find((p) => p.province === action.payload.province)
      if (province) {
        const cityExists = province.cities.some((city) => city.city === action.payload.city.city)
        if (!cityExists) {
          province.cities.push(action.payload.city)
          state.successMessage = 'شهر با موفقیت اضافه شد'
          state.errorMessage = null
        } else {
          state.successMessage = null
          state.errorMessage = 'شهر از قبل وجود دارد'
        }
      }
    },
    // Delete city from its respective province
    deleteCity: (state, action: PayloadAction<{ province: string; city: string }>) => {
      const province = state.provinces.find((p) => p.province === action.payload.province)
      if (province) {
        province.cities = province.cities.filter((city) => city.city !== action.payload.city)
        state.deleteSuccessMessage = 'شهر با موفقیت حذف شد'
        state.errorMessage = null
      }
    },
    // Update city within its respective province
    updateCity: (
      state,
      action: PayloadAction<{ province: string; oldCity: string; newCity: string }>
    ) => {
      const province = state.provinces.find((p) => p.province === action.payload.province)
      if (province) {
        const city = province.cities.find((c) => c.city === action.payload.oldCity)
        if (city) {
          city.city = action.payload.newCity
          state.successMessage = 'نام شهر با موفقیت تغییر یافت'
          state.errorMessage = null
        } else {
          state.errorMessage = 'شهر یافت نشد'
        }
      }
    }
  }
})

export const {
  addProvince,
  handleDeleteProvince,
  clearMessages,
  selectProvince,
  addCity,
  deleteCity,
  updateCity
} = provincesSlice.actions
export const provincesReducer = provincesSlice.reducer
