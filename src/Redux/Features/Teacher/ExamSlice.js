import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createExamApi, getExamsApi, editExamApi, cancelExamApi } from '../../../Services/Teacher';
import { message } from 'antd';

const initialState = {
    examList: [],
    currentExam: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const createExam = createAsyncThunk('examData/createExam', async (formData) => {
    try {
        const headers = {
            Authorization: localStorage.getItem("teacherToken"),
        };
        const response = await createExamApi(formData, headers);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});

export const getExams = createAsyncThunk('examData/getExams', async () => {
    try {
        const headers = {
            Authorization: localStorage.getItem("teacherToken"),
        };
        const response = await getExamsApi(headers);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});

export const editExam = createAsyncThunk('examData/editExam', async (formData) => {
    try {
        const headers = {
            Authorization: localStorage.getItem("teacherToken"),
        };
        const response = await editExamApi(formData, headers);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});

export const cancelExam = createAsyncThunk('examData/cancelExam', async (id) => {
    try {
        const headers = {
            Authorization: localStorage.getItem("teacherToken"),
        };
        const response = await cancelExamApi(id, headers);
        console.log(response);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});

const examSlice = createSlice({
    name: 'teacherExamData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createExam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examList.push(action.payload);
            })
            .addCase(createExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error creating exam';
            })

            .addCase(getExams.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getExams.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examList = action.payload;
            })
            .addCase(getExams.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching exams';
            })

            .addCase(editExam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.examList.findIndex(exam => exam._id === action.payload._id);
                if (index > -1) {
                    state.examList[index] = action.payload;
                }
            })
            .addCase(editExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error editing exam';
            })

            .addCase(cancelExam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examList = state.examList.filter(exam => exam._id !== action.payload);
            })
            .addCase(cancelExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error canceling exam';
            });
    },
});

export default examSlice.reducer;
