import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import studentAuthReducer from './Features/Student/AuthSlice';
import getTeachers from './Features/Admin/getTeachersSlice';
import getCoursesSlice from './Features/Admin/getCoursesSlice';
import syllabusSlice from './Features/Admin/syllabusSlice'; // Import the syllabus slice


const StudentPersistConfig = {
    key:"AuthData",
    storage
};

const TeacherPersistConfig = {
    key:"TeacherData",
    storage
}

const CoursePersistConfig = {
    key: "CourseData",
    storage
};

const SyllabusPersistConfig = {
    key: "SyllabusData",
    storage
};


const persistedStudentReducer = persistReducer(StudentPersistConfig,studentAuthReducer)
const persistedTeacherReducer = persistReducer(TeacherPersistConfig, getTeachers);
const persistedCourseReducer = persistReducer(CoursePersistConfig, getCoursesSlice);
const persistedSyllabusReducer = persistReducer(SyllabusPersistConfig, syllabusSlice); // Persist the syllabus reducer


const rootReducer = {
  studentData: persistedStudentReducer,
  teacherData: persistedTeacherReducer,
  courseData: persistedCourseReducer,
  syllabusData: persistedSyllabusReducer
};

 

export const store = configureStore({
    reducer:rootReducer
})

export  const persistor = persistStore(store)