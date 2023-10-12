import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCoursesApi, addCourseApi, deleteCourseApi, hideCourseApi, unHideCourseApi, editCourseApi } from '../../../Services/Admin';
import { message } from 'antd';

const initialState = {
  courseList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getCourses = createAsyncThunk('courseData/getCourses', async () => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await getCoursesApi(headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const addCourse = createAsyncThunk('courseData/addCourse', async (course) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem("adminToken"),
    };
    const courseData = course.courseData
    const response = await addCourseApi(courseData, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const hideCourse = createAsyncThunk('courseData/hideCourse', async (courseId) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await hideCourseApi(courseId, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const unHideCourse = createAsyncThunk('courseData/unHideCourse', async (courseId) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await unHideCourseApi(courseId, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const deleteCourse = createAsyncThunk('courseData/deleteCourse', async (courseId) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await deleteCourseApi(courseId, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const editCourse = createAsyncThunk('courseData/editCourse', async ( course ) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem("adminToken"),
    };
    const courseData = course.courseData
    const response = await editCourseApi(courseData.id ,courseData, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

const courseSlice = createSlice({
  name: 'adminCourseData',
  initialState,
  reducers: {},
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
      })

      .addCase(addCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseList.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error adding course';
      })

      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseList = action.payload;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error deleting course';
      })

      .addCase(hideCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hideCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseList = action.payload;
      })
      .addCase(hideCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error hiding course';  // Changed message for hideCourse action
      })

      .addCase(unHideCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unHideCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseList = action.payload;
      })
      .addCase(unHideCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error unhiding course';  // Changed message for hideCourse action
      })

      .addCase(editCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseList.push(action.payload);
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error editing course';
      })
  },
});


export default courseSlice.reducer;
