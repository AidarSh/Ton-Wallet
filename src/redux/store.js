import { configureStore } from '@reduxjs/toolkit'
import balanceReducer from './slices/balanceSlice'
import transactionReducer from './slices/transactionSlice'
import chartReducer from './slices/chartSlice'
import addressReducer from './slices/addressSlice'

export const store = configureStore({
  reducer: {
    balanceReducer,
    transactionReducer,
    chartReducer,
    addressReducer,
},
})