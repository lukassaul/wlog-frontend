import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetTransactionsAPI } from '../api/getTransactions'

interface reportState {
    isGetReportSuccess: boolean,
    isGetReportFetching: boolean,
    errorGetReportMessage: string | null,
    transactions: any | []
}

interface ValidationErrors {
    errorGetReportMessage: string | null
}

const initialState: reportState = {
    isGetReportFetching: false,
    isGetReportSuccess: false,
    errorGetReportMessage: "",
    transactions: []
}

export const reportGetRequest = createAsyncThunk(
    'report/get',
    async (address: string, thunkAPI) => {
        const response = await GetTransactionsAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        clearLogState: (state) => {
            state.errorGetReportMessage = '';
            state.isGetReportSuccess = false;
            state.isGetReportFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(reportGetRequest.fulfilled, (state, {payload}) => {
            state.isGetReportFetching = false
            state.isGetReportSuccess = true
            state.transactions = payload
        })
        builder.addCase(reportGetRequest.rejected, (state, action) => {
            state.isGetReportFetching = false
            if (action.payload) {
                state.errorGetReportMessage = action.payload as unknown as string
              } else {
                state.errorGetReportMessage = action.error.message!
              }
        })
        builder.addCase(reportGetRequest.pending, (state) => {
            state.isGetReportFetching = true
        })
    },
})

export const { clearLogState } = reportSlice.actions;

export default reportSlice.reducer
