import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import studentAuthReducer from './Features/Student/AuthSlice';


const StudentPersistConfig = {
    key:"AuthData",
    storage
};



const persistedStudentReducer = persistReducer(StudentPersistConfig,studentAuthReducer)




const rootReducer = {
    studentData:persistedStudentReducer
  };

 // rootReducer.roomBookingData.reset = bookingDataReset;

export const store = configureStore({
    reducer:rootReducer
})

export  const persistor = persistStore(store)