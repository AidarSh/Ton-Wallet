import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchBalance = createAsyncThunk('balance/fetchBalanceStatus', async (address) => {
  const {data} = await axios.get(`https://toncenter.com/api/v2/getAddressBalance?api_key=4d6aec507fe869be222ec48ec69d06a54b6514fede7456f01d199f693c34cd81&address=${address}`)
  return data
})

const initialState = {
  items: 0,
  status: '',
}

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchBalance.pending]: (state) => {
      state.status = 'Загрузка'
    },
    [fetchBalance.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'Результат'
    },
    [fetchBalance.rejected]: (state) => {
      state.items = 0
      state.status = 'Ошибка'
    }
  }
})

export const { setItems } = balanceSlice.actions

export default balanceSlice.reducer