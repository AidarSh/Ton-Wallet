import { createSlice} from '@reduxjs/toolkit'

const initialState = {
  items: 'dada',
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { setAddress } = addressSlice.actions

export default addressSlice.reducer