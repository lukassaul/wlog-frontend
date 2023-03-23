import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RedeemRequestAPI } from '../api/redeemRequest'
import { GetLogBalanceBEAPI } from '../api/getLogBalanceBackend'

interface redeemState {
    isRedeemSuccess: boolean,
    isRedeemFetching: boolean,
    errorRedeemMessage: string | null,
    isGetLogBalanceSuccess: boolean,
    isGetLogBalanceFetching: boolean,
    errorGetLogBalanceMessage: string | null,
    maxRedeemAmount: number | null
}

interface ValidationErrors {
    errorRedeemMessage: string | null
}

const initialState: redeemState = {
    isRedeemSuccess: false,
    isRedeemFetching: false,
    errorRedeemMessage: "",
    isGetLogBalanceFetching: false,
    isGetLogBalanceSuccess: false,
    errorGetLogBalanceMessage: "",
    maxRedeemAmount: 0
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

export const logBalanceGetRequest = createAsyncThunk(
    'redeem/log_balance',
    async (address: string, thunkAPI) => {
        const response = await GetLogBalanceBEAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
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

        builder.addCase(logBalanceGetRequest.fulfilled, (state, {payload}) => {
            state.isGetLogBalanceFetching = false
            state.isGetLogBalanceSuccess = true
            state.maxRedeemAmount = payload.balance
        })
        builder.addCase(logBalanceGetRequest.rejected, (state, action) => {
            state.isGetLogBalanceFetching = false
            if (action.payload) {
                state.errorGetLogBalanceMessage = action.payload as unknown as string
              } else {
                state.errorGetLogBalanceMessage = action.error.message!
              }
        })
        builder.addCase(logBalanceGetRequest.pending, (state) => {
            state.isGetLogBalanceFetching = true
        })
    },
})

export const { clearLogState } = redeemSlice.actions;

export default redeemSlice.reducer
