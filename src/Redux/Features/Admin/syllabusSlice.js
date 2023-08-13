import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSyllabusesApi, addSyllabusApi, deleteSyllabusApi, editSyllabusApi } from '../../../Services/Admin';
import { message } from 'antd';

const initialState = {
  syllabusList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getSyllabuses = createAsyncThunk('syllabusData/getSyllabuses', async () => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await getSyllabusesApi(headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const addSyllabus = createAsyncThunk('syllabusData/addSyllabus', async (syllabus) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await addSyllabusApi(syllabus, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const deleteSyllabus = createAsyncThunk('syllabusData/deleteSyllabus', async (syllabusId) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await deleteSyllabusApi(syllabusId, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

export const editSyllabus = createAsyncThunk('syllabusData/editSyllabus', async (syllabus) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await editSyllabusApi(syllabus.id, syllabus, headers);
    return response.data;
  } catch (err) {
    message.error(err.response.data);
    throw err;
  }
});

const syllabusSlice = createSlice({
  name: 'syllabusData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSyllabuses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSyllabuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.syllabusList = action.payload;
      })
      .addCase(getSyllabuses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error fetching syllabus list';
      })
      // Similar cases for addSyllabus, deleteSyllabus, and editSyllabus
  },
});

export default syllabusSlice.reducer;
