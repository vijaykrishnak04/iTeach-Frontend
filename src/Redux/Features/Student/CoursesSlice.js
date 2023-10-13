import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCourseByIdApi, getPurchasedCoursesApi } from '../../../Services/Student';
import { message } from 'antd';
import useLogout from '../../../Components/Student/Hooks/useLogout';

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
        const headers = {
            Authorization: localStorage.getItem("studentToken"),
        };
        const response = await getPurchasedCoursesApi(studentId, headers);
        return response.data;
    } catch (err) {
        const { handleLogout } = useLogout();
        if (err.response.status === 401 && err.response.data.message === 'This student is blocked.') {
            handleLogout()
        }
        throw err;
    }
});

export const getCourseById = createAsyncThunk('courseData/getCourseById', async (courseId) => {
    try {
        const headers = {
            Authorization: localStorage.getItem("studentToken"),
        };
        const response = await getCourseByIdApi(courseId, headers);
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

