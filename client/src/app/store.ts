import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './../features/networkSlice'
import swapReducer from "./../features/swapSlice"
import redeemReducer from "./../features/redeemSlice"

export const store = configureStore({
    reducer: {
        network: networkReducer,
        swap: swapReducer,
        redeem: redeemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
