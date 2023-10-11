import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClassByIdApi, getClassesApi } from '../../../Services/Student'; // Changed the imported functions to the "class" versions
import { message } from 'antd';

import useLogout from '../../../Components/Student/Hooks/useLogout';

const initialState = {
    classList: [], // Changed to classList
    currentClass: null, // Changed to currentClass
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getClasses = createAsyncThunk('classData/getClasses', async () => {
    try {
        const headers = {
            Authorization: localStorage.getItem("studentToken"),
        };
        const response = await getClassesApi(headers);
        return response.data;
    } catch (err) {
        const { handleLogout } = useLogout();
        if (err.response.status === 401 && err.response.data.message === 'This student is blocked.') {
            handleLogout()
        }
        message.error(err.response.data.message);
        throw err;
    }
});

export const getClassById = createAsyncThunk('classData/getClassById', async (classId) => { // Renamed the variable to classId
    try {
        const headers = {
            Authorization: localStorage.getItem("studentToken"),
        };
        const response = await getClassByIdApi(classId, headers);
        return response.data;
    } catch (err) {
        const { handleLogout } = useLogout();
        if (err.response.status === 401 && err.response.data.message === 'This student is blocked.') {
            handleLogout()
        }
        message.error(err.response.data.message);
        throw err;
    }
});

const classSlice = createSlice({
    name: 'classData',
    initialState,
    reducers: {
        resetClassState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClasses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getClasses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.classList = action.payload; // Updated to classList
            })
            .addCase(getClasses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching classes list'; // Updated the error message
            })

            .addCase(getClassById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getClassById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentClass = action.payload; // Updated to currentClass
            })
            .addCase(getClassById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching class data'; // Updated the error message
            })
    },
});

export const { resetClassState } = classSlice.actions;
export default classSlice.reducer;

