import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StudentSignupApi, studentLoginApi } from '../../../Services/LandingService'
import { editStudentApi, getStudentByIdApi } from '../../../Services/Student';



const initialState = {
    studentData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    confimObj: "",
    error: ""
}


export const StudentAuth = createAsyncThunk(
    "studentData/StudentAuth",
    async (values, thunkAPI) => {
        try {
            const response = await StudentSignupApi(values);
            if (response.status !== 200) { // Assuming 200 is the success code
                throw new Error(response.data.error || 'Unexpected error occurred.');
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // Use thunkAPI.rejectWithValue to dispatch a rejected action
                return thunkAPI.rejectWithValue(error.response.data);
            }
            // If there's no detailed error, throw a more generic one
            return thunkAPI.rejectWithValue('An error occurred while signing up.');
        }
    }
);


export const StudentLogin = createAsyncThunk(
    "studentData/StudentLogin",
    async (credentials, thunkAPI) => {
        try {
            const response = await studentLoginApi(credentials);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // Use thunkAPI.rejectWithValue to dispatch a rejected action
                return thunkAPI.rejectWithValue(error.response.data);
            }
            // If there's no detailed error, just throw a generic one
            throw error;
        }
    }
);

export const getStudentById = createAsyncThunk(
    "studentData/getStudentById",
    async (studentId, thunkAPI) => {
        try {
          
            const response = await getStudentByIdApi(studentId);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

// Async thunk for editing student data
export const editStudent = createAsyncThunk(
    "studentData/editStudent",
    async ({ studentId, studentData }, thunkAPI) => {
        try {

            const response = await editStudentApi(studentId, studentData);

            if (response.status !== 200) { // Assuming 200 is the success code
                throw new Error(response.data.error || 'Unexpected error occurred.');
            }

            return response.data;

        } catch (error) {
            if (error.response && error.response.data) {
                // Use thunkAPI.rejectWithValue to dispatch a rejected action
                return thunkAPI.rejectWithValue(error.response.data);
            }
            // If there's no detailed error, throw a more generic one
            return thunkAPI.rejectWithValue('An error occurred while editing student data.');
        }
    }
);




export const AuthSlice = createSlice({
    name: "studentData",
    initialState,
    reducers: {

        StudentAuthReset: (state) => {
            // eslint-disable-next-line no-unused-vars
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(StudentAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(StudentAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.studentData = action.payload;
            })
            .addCase(StudentAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })

            .addCase(StudentLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(StudentLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload && action.payload.success) {
                    state.isSuccess = true;
                    state.studentData = action.payload.student;
                } else {
                    state.isError = true;
                    state.message = action.payload.error;
                }
            })
            .addCase(StudentLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'An error occurred while logging in.';
            })

            .addCase(getStudentById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudentById.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.isSuccess = true;
                    state.studentData = action.payload;
                } else {
                    state.isError = true;
                    state.message = action.payload.error;
                }
            })
            .addCase(getStudentById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'An error occurred while fetching student details.';
            })
            .addCase(editStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                if (action.payload && action.payload.success) {
                    state.isSuccess = true;
                    state.studentData = action.payload.student
                } else {
                    state.isError = true;
                    state.message = action.payload.error;
                }
            })
            .addCase(editStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'An error occurred while editing student data.';
            })
    }
})

export const { StudentAuthReset } = AuthSlice.actions
export default AuthSlice.reducer