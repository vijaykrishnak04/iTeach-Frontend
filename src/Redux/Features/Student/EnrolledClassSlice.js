import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkIfStudentHasEnrolledApi } from '../../../Services/Student';
import { message } from 'antd';

const initialState = {
    enrolledClass: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const checkIfStudentHasEnrolled = createAsyncThunk(
    'enrollmentData/checkIfStudentHasEnrolled',
    async (studentId) => {
        try {
            const response = await checkIfStudentHasEnrolledApi(studentId);
            return response.data;
        } catch (err) {
            message.error(err.response.data.message);
            throw err;
        }
    }
);

const enrollmentSlice = createSlice({
    name: 'enrollmentData',
    initialState,
    reducers: {
        resetEnrollmentState: (state) => {
            state.enrolledClass = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkIfStudentHasEnrolled.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkIfStudentHasEnrolled.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.enrolledClass = action.payload.data;
            })
            .addCase(checkIfStudentHasEnrolled.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message || 'Error checking enrollment status';

                // Resetting the state when error occurs
                state.enrolledClass = null;
                state.isSuccess = false;
            })
    },
});

export const { resetEnrollmentState } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;

