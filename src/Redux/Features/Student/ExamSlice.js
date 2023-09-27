import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExamsByIdsApi } from '../../../Services/Student';
import { message } from 'antd';

const initialState = {
    examList: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getExamsByIds = createAsyncThunk('examData/getExamsByIds', async (examIds) => {
    try {
        const headers = {
            Authorization: localStorage.getItem("studentToken"),
        };
        const response = await getExamsByIdsApi(examIds, headers);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});



const examSlice = createSlice({
    name: 'studentExamData',
    initialState,
    reducers: {
        resetExamState: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExamsByIds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getExamsByIds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examList = action.payload;
            })
            .addCase(getExamsByIds.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching exams list';
                state.examList = []
                state.isSuccess = false
            })
    },
});

export const { resetExamState } = examSlice.actions;
export default examSlice.reducer;
