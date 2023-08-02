import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StudentSignupApi } from '../../../Services/LandingService'
import { message} from 'antd'




const initialState = {
    studentData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    confimObj: "",
    error: ""
}


export const StudentAuth = createAsyncThunk(
    "studentData/StudentAuth",
    async (values) => {
        try {
            
            const response = await StudentSignupApi(values)
            return response.data
        } catch (err) {
            message.error(err.response.data.error)
            console.log(err);
        }
    }
)

export const AuthSlice = createSlice({
    name: "studentData",
    initialState,
    reducers: {

        StudentAuthReset: (state) => {
            // eslint-disable-next-line no-unused-vars
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(StudentAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(StudentAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.studentData = action.payload;
            })
            .addCase(StudentAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { StudentAuthReset } = AuthSlice.actions
export default AuthSlice.reducer