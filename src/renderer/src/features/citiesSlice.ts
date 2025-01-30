import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface City {
  city: string
}

export interface CityState {
  cities: City[]
}

const initialState: CityState = {
  cities: []
}

const citiesSlice = createSlice({
  name: 'addCity',
  initialState,
  reducers: {
    // handle creating panel
    handleAddCity: (state, action: PayloadAction<City>) => {
      state.cities.push(action.payload)
    },

    // handle deleting the panel
    handleDeleteCity: (state, action: PayloadAction<City>) => {
      state.cities = state.cities.filter((city) => city.city !== action.payload.city)
    }
  }
})

export const { handleAddCity, handleDeleteCity } = citiesSlice.actions
export const citiesReducer = citiesSlice.reducer
