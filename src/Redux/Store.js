import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import studentAuthReducer from './Features/Student/AuthSlice';
import getTeachers from './Features/Admin/getTeachersSlice';
import getCoursesSlice from './Features/Admin/ManageCoursesSlice';
import CoursesSlice from './Features/Student/CoursesSlice';
import syllabusSlice from './Features/Admin/syllabusSlice'; 
import classSlice from './Features/Teacher/classSlice';
import studentClassSlice from './Features/Student/ClassSlice';
import enrollmentSlice from './Features/Student/EnrolledClassSlice'; // Replace the path if it's different




const StudentPersistConfig = {
    key:"AuthData",
    storage
};

const TeacherPersistConfig = {
    key:"TeacherData",
    storage
}

const adminCoursePersistConfig = {
    key: "adminCourseData",
    storage
};

const SyllabusPersistConfig = {
    key: "SyllabusData",
    storage
};

const CoursePersistConfig = {
    key: "CourseData",
    storage
};

const ClassPersistConfig = {
    key: "teacherClassData",
    storage
};

const StudentClassPersistConfig = {
    key: "studentClassData",
    storage
};

const EnrollmentPersistConfig = {
    key: "enrollmentData",
    storage
};

const persistedEnrollmentReducer = persistReducer(EnrollmentPersistConfig, enrollmentSlice);
const persistedStudentClassReducer = persistReducer(StudentClassPersistConfig, studentClassSlice);
const persistedStudentReducer = persistReducer(StudentPersistConfig,studentAuthReducer)
const persistedTeacherReducer = persistReducer(TeacherPersistConfig, getTeachers);
const persistedAdminCourseReducer = persistReducer(adminCoursePersistConfig, getCoursesSlice);
const persistedSyllabusReducer = persistReducer(SyllabusPersistConfig, syllabusSlice); 
const persistedCourseReducer = persistReducer(CoursePersistConfig, CoursesSlice);
const persistedClassReducer = persistReducer(ClassPersistConfig,classSlice)


const rootReducer = {
  studentData: persistedStudentReducer,
  teacherData: persistedTeacherReducer,
  adminCourseData: persistedAdminCourseReducer,
  courseData: persistedCourseReducer,
  syllabusData: persistedSyllabusReducer,
  classData: persistedClassReducer,
  studentClassData: persistedStudentClassReducer,
  enrollmentData: persistedEnrollmentReducer 
};

 

export const store = configureStore({
    reducer:rootReducer
    
})

export  const persistor = persistStore(store)