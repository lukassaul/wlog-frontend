import { createSlice } from '@reduxjs/toolkit'


interface networkState {
  network: string | any;
}

const initialState: networkState = {
    network: "Polygon-mumbai"
}

export const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setNetwork: (state, {payload}) => {
            state.network = payload
          },
    },
})

export const { setNetwork } = networkSlice.actions;

export default networkSlice.reducer
