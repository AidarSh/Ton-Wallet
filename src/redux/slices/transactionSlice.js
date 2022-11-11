import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTransaction = createAsyncThunk('transaction/fetchTransactionStatus', async (address) => {
  const {data} = await axios.get(`https://toncenter.com/api/v2/getTransactions?api_key=4d6aec507fe869be222ec48ec69d06a54b6514fede7456f01d199f693c34cd81&address=${address}&limit=10&to_lt=0&archival=false`)
  return data
})

const initialState = {
  items: [],
  status: '',
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchTransaction.pending]: (state) => {
      state.status = 'Загрузка'
    },
    [fetchTransaction.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'Результат'
    },
    [fetchTransaction.rejected]: (state) => {
      state.items = []
      state.status = 'Ошибка'
    }
  }
})

export const { setItems } = transactionSlice.actions

export default transactionSlice.reducer