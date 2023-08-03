import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import studentAuthReducer from './Features/Student/AuthSlice';
import getTeachers from './Features/Admin/getTeachers';


const StudentPersistConfig = {
    key:"AuthData",
    storage
};

const TeacherPersistConfig = {
    key:"TeacherData",
    storage
}



const persistedStudentReducer = persistReducer(StudentPersistConfig,studentAuthReducer)
const persistedTeacherReducer = persistReducer(TeacherPersistConfig, getTeachers);

const rootReducer = {
  studentData: persistedStudentReducer,
  teacherData: persistedTeacherReducer // Include teacher persistence in rootReducer
};

 

export const store = configureStore({
    reducer:rootReducer
})

export  const persistor = persistStore(store)