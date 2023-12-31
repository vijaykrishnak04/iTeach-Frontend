import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCourseByIdApi, getPurchasedCoursesApi } from '../../../Services/Student';
import { message } from 'antd';

const initialState = {
    courseList: [],
    currentCourse: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getCourses = createAsyncThunk('courseData/getCourses', async (studentId) => {
    try {
        const response = await getPurchasedCoursesApi(studentId);
        return response.data;
    } catch (err) {
        message.error(err)
        throw err;
    }
});

export const getCourseById = createAsyncThunk('courseData/getCourseById', async (courseId) => {
    try {
        const response = await getCourseByIdApi(courseId);
        return response.data;
    } catch (err) {
        message.error(err.response.data.message);
        throw err;
    }
});

const courseSlice = createSlice({
    name: 'courseData',
    initialState,
    reducers: {
        resetCourseState: (state) => {
            return initialState;
        },
        addPurchasedCourse: (state, action) => {
            // Assuming action.payload contains the purchased course object
            state.courseList.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courseList = action.payload;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching courses list';
                state.courseList = []
            })

            .addCase(getCourseById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCourseById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentCourse = action.payload;
            })
            .addCase(getCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Error fetching course data';
            })
    },
});

export const { resetCourseState, addPurchasedCourse } = courseSlice.actions;
export default courseSlice.reducer;

