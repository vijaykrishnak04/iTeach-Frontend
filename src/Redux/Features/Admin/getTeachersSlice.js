import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { addTeacherApi, getTeachersApi, deleteTeacherApi, blockTeacherApi, unblockTeacherApi } from '../../../Services/Admin';

const initialState = {
  teacherList: [],
  isLoading: false,
  isError: false,
  message: '',
};

const handleApiError = (err) => {
  console.log(err);
  message.error(err.response?.data?.message || 'Unexpected error');
  throw err;
};

export const addTeacher = createAsyncThunk('teacherData/addTeacher', async (teacher) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await addTeacherApi(teacher, headers);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
});



export const getTeachers = createAsyncThunk('teacherData/getTeachers', async () => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await getTeachersApi(headers);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
});

export const blockTeacher = createAsyncThunk('teacherData/blockTeacher', async (teacherId) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await blockTeacherApi(teacherId, headers);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
});

export const unblockTeacher = createAsyncThunk('teacherData/unblockTeacher', async (teacherId) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await unblockTeacherApi(teacherId, headers);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
});

export const deleteTeacher = createAsyncThunk('teacherData/deleteTeacher', async (teacherId) => {
  try {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    const response = await deleteTeacherApi(teacherId, headers);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
});

const teacherSlice = createSlice({
  name: 'teacherData',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload.error) {
          state.teacherList = [...state.teacherList, action.payload]; // Assuming the payload contains the new teacher
        } else {
          state.isError = true;
          state.message = action.payload.message;
        }
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error adding teacher';
      })

      .addCase(getTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacherList = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error fetching teachers list';
      })

      .addCase(blockTeacher.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.teacherList = action.payload;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(blockTeacher.rejected, (state, action) => {
        state.message = "An unexpected error occurred";
      })

      .addCase(unblockTeacher.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.teacherList = action.payload;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(unblockTeacher.rejected, (state, action) => {
        state.message = "An unexpected error occurred";
      })

      .addCase(deleteTeacher.fulfilled, (state, action) => {
        if (!action.payload.error) {
          const updatedTeachersList = action.payload;
          state.teacherList = updatedTeachersList;  // Assuming backend returns the updated list after deletion
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.message = "An unexpected error occurred";
      });
  },
});

export const { resetState } = teacherSlice.actions;
export default teacherSlice.reducer;
