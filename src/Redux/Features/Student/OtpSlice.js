import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StudentOtpApi } from '../../../Services/LandingService'


const initialState = {
    otp: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const otpData = createAsyncThunk(
    "otp/otpData",
    async (StudentAuth) => {
        try {
            const response = await StudentOtpApi(StudentAuth)
            console.log(response.data, "otp data responce");
            if (response) {
                console.log(response.data);
                
            }
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const OtpSlice = createSlice({
    name: "otpData",
    initialState,
    reducers: {
        StudentOtpReset: (state) => {
            // eslint-disable-next-line no-unused-vars
            state = initialState
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(otpData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(otpData.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
    
            })
            .addCase(otpData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { StudentOtpReset } = OtpSlice.actions
export default OtpSlice.reducer