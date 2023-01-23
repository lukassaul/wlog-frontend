import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RedeemRequestAPI } from '../api/redeemRequest'

interface redeemState {
    isRedeemSuccess: boolean,
    isRedeemFetching: boolean,
    errorRedeemMessage: string | null,
}

interface ValidationErrors {
    errorRedeemMessage: string | null
}

const initialState: redeemState = {
    isRedeemSuccess: false,
    isRedeemFetching: false,
    errorRedeemMessage: "",
}

export const redeemRequest = createAsyncThunk<
    any,
    { 
        amount: number,
        txid: string,
        txTimeStamp: number,
        userLogAddress: string,
        network: string
    },
    { rejectValue: ValidationErrors }
>(
    'redeem/request',
    async (formData, thunkAPI) => {
      console.log("redeem request called")
        const response = await RedeemRequestAPI(formData)
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

export const redeemSlice = createSlice({
    name: 'redeem',
    initialState,
    reducers: {
        clearLogState: (state) => {
            state.errorRedeemMessage = '';
            state.isRedeemSuccess = false;
            state.isRedeemFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(redeemRequest.fulfilled, (state, {payload}) => {
            state.isRedeemFetching = false
            state.isRedeemSuccess = true
        })
        builder.addCase(redeemRequest.rejected, (state, action) => {
            state.isRedeemFetching = false
            if (action.payload) {
                state.errorRedeemMessage = action.payload as unknown as string
              } else {
                state.errorRedeemMessage = action.error.message!
              }
        })
        builder.addCase(redeemRequest.pending, (state) => {
            state.isRedeemFetching = true
        })
    },
})

export const { clearLogState } = redeemSlice.actions;

export default redeemSlice.reducer
