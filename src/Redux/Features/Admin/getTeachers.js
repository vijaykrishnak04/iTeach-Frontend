import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTeachersApi } from '../../../Services/Admin'; 
import { message } from 'antd';

const initialState = {
  teacherList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  error: '',
};

export const getTeachers = createAsyncThunk('teacherData/getTeachers', async (headers) => {
  try {
    const response = await getTeachersApi(headers); 
    return response.data;
  } catch (err) {
    message.error('Error fetching teachers list');
    console.log(err);
    throw err;
  }
});

const teacherSlice = createSlice({
  name: 'teacherData',
  initialState,
  reducers: {
    // You can add other reducers for updating or deleting teachers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teacherList = action.payload; // Assuming the payload contains the list of teachers
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error fetching teachers list';
      });
  },
});

export default teacherSlice.reducer;
