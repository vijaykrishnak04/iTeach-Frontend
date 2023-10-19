import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { teacherEditProfileApi } from "../../../Services/Teacher";
import { message } from "antd";
import { teacherLoginApi } from "../../../Services/LandingService";

const initialState = {
    teacherProfileData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}
export const teacherLogin = createAsyncThunk('teacher/teacherLogin', async (formData) => {
    try {
        const response = await teacherLoginApi(formData);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
})

export const teacherEditProfile = createAsyncThunk('teacher/teacherEditProfile', async (formData) => {
    try {
        const response = await teacherEditProfileApi(formData);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
})

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        resetState: (state) => {
            state.teacherProfileData = [];
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(teacherLogin.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(teacherLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.teacherProfileData = action.payload;
                state.message = 'Successfully logged in!';
            })
            .addCase(teacherLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message || 'Failed to log in.';
            })

            .addCase(teacherEditProfile.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(teacherEditProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.teacherProfileData = action.payload;
                state.message = 'Successfully Editted!';
            })
            .addCase(teacherEditProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message || 'Failed to edit.';
            });
    },
});

export const { resetState } = teacherSlice.actions;

export default teacherSlice.reducer;
