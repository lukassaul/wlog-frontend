import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SwapRequestAPI } from '../api/swapRequest'

interface swapState {
    isLogSuccess: boolean,
    isLogFetching: boolean,
    errorLogMessage: string | null,
    txid: string | null
}

interface ValidationErrors {
    errorLogMessage: string | null
}

const initialState: swapState = {
    isLogSuccess: false,
    isLogFetching: false,
    errorLogMessage: "",
    txid: ""
}

export const swapRequest = createAsyncThunk<
    any,
    { 
        txid: string,
        userWlogAddress: string,
        depositAddress: string,
        network: string
    },
    { rejectValue: ValidationErrors }
>(
    'swap/request',
    async (formData, thunkAPI) => {
      console.log("swap request called")
        const response = await SwapRequestAPI(formData)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) {
            return thunkAPI.rejectWithValue(await response.data.message)
          } else {
            return thunkAPI.rejectWithValue(await response.data)
          }
        }
        return await response.data
    }
)

export const swapSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {
        clearLogState: (state) => {
            state.errorLogMessage = "";
            state.isLogSuccess = false;
            state.isLogFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(swapRequest.fulfilled, (state, {payload}) => {
            state.isLogFetching = false
            state.isLogSuccess = true
            state.txid = payload
        })
        builder.addCase(swapRequest.rejected, (state, action) => {
            state.isLogFetching = false
            console.log("action:  ", action)
            if (action.payload) {
                state.errorLogMessage = action.payload as unknown as string
              } else {
                state.errorLogMessage = action.error.message!
              }
        })
        builder.addCase(swapRequest.pending, (state) => {
            state.isLogFetching = true
        })
    },
})

export const { clearLogState } = swapSlice.actions;

export default swapSlice.reducer
