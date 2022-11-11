import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchСhart = createAsyncThunk('chart/fetchСhartStatus', async () => {
  const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=USD&days=1')
  return data
})

const initialState = {
  items: [],
  status: '',
}

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchСhart.pending]: (state) => {
      state.status = 'Загрузка'
    },
    [fetchСhart.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'Результат'
    },
    [fetchСhart.rejected]: (state) => {
      state.items = []
      state.status = 'Ошибка'
    }
  }
})

export const { setItems } = chartSlice.actions

export default chartSlice.reducer