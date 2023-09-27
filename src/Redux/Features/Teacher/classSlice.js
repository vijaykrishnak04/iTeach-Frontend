import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClassesApi, getClassByIdApi, addChapterApi, editChapterApi } from '../../../Services/Teacher';
import { message } from 'antd';

const initialState = {
  classList: [],
  currentClass: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getClasses = createAsyncThunk('classData/getClasses', async () => {
  try {
    const headers = {
      Authorization: localStorage.getItem("teacherToken"),
    };
    const response = await getClassesApi(headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data.message);
    throw err;
  }
});

export const getClassById = createAsyncThunk('classData/getClassById', async (id) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("teacherToken"),
    };
    const response = await getClassByIdApi(headers, id);
    return response.data;
  } catch (err) {
    message.error(err.response.data.message);
    throw err;
  }
});


export const addChapter = createAsyncThunk('classData/deleteClass', async (formData) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem("teacherToken"),
    };
    console.log(formData);
    const response = await addChapterApi(formData, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data.message);
    throw err;
  }
});

export const editChapter = createAsyncThunk('classData/editClass', async (formData) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("teacherToken"),
    };
    const response = await editChapterApi(formData, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data.message);
    throw err;
  }
});

const classSlice = createSlice({
  name: 'teacherClassData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classList = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error fetching class list';
      })

      .addCase(getClassById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentClass = action.payload;
      })
      .addCase(getClassById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error adding class';
      })

      .addCase(addChapter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addChapter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classList = state.classList.filter(classItem => classItem._id !== action.payload);
      })
      .addCase(addChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error deleting class';
      })

      .addCase(editChapter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editChapter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.classList.findIndex(classItem => classItem._id === action.payload._id);
        if (index > -1) {
          state.classList[index] = action.payload;
        }
      })
      .addCase(editChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error editing class';
      });
  },
});

export default classSlice.reducer;
