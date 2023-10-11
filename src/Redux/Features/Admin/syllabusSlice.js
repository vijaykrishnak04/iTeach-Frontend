import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSyllabusApi, deleteSyllabusApi, addSyllabusApi, editSyllabusApi } from '../../../Services/Admin';
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
    const response = await getSyllabusApi(headers);
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
      "Content-Type": "multipart/form-data",
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

      .addCase(addSyllabus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSyllabus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.syllabusList.push(action.payload); // or update it as required
      })
      .addCase(addSyllabus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error adding syllabus';
      })


      .addCase(deleteSyllabus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSyllabus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.syllabusList = state.syllabusList.filter(syllabus => syllabus._id !== action.payload); // Assuming the payload includes the deleted syllabus
      })
      .addCase(deleteSyllabus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error deleting syllabus';
      })
      .addCase(editSyllabus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSyllabus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.syllabusList.findIndex(syllabus => syllabus._id === action.payload._id); // Assuming the payload includes the updated syllabus with an _id field
        if (index > -1) {
          state.syllabusList[index] = action.payload; // Replace the existing syllabus with the updated one
        }
      })
      .addCase(editSyllabus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error editing syllabus';
      });
  },
});

export default syllabusSlice.reducer;
