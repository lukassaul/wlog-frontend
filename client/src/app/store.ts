import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './../features/networkSlice'
import swapReducer from "./../features/swapSlice"
import redeemReducer from "./../features/redeemSlice"
import reportReducer from "./../features/reportSlice"

export const store = configureStore({
    reducer: {
        network: networkReducer,
        swap: swapReducer,
        redeem: redeemReducer,
        report: reportReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
