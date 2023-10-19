import { studentInstance } from "../../axios"

export const getCoursesApi = (studentId) => {
    return studentInstance.get(`/get-courses/${studentId}`)
}

export const getPurchasedCoursesApi = (studentId) => {
    return studentInstance.get(`/get-purchased-courses/${studentId}`)
}

export const getCourseByIdApi = (id) => {
    return studentInstance.get(`/get-course/${id}`)
}

//classes
export const getClassesApi = () => {
    return studentInstance.get('/get-classes')
}

export const getClassByIdApi = (id) => {
    return studentInstance.get(`/get-class/${id}`)
}

//payment
export const createOrderApi = (amount) => {
    return studentInstance.post('/create-order', { amount });
}

export const verifyPaymentApi = (paymentData) => {
    return studentInstance.post('/verify-payment', { ...paymentData });
}

//student
export const checkIfStudentHasEnrolledApi = (id) => {
    return studentInstance.get(`/student-enrolled/${id}`)
}

export const getStudentByIdApi = (id) => {
    return studentInstance.get(`/get-student/${id}`)
}

export const editStudentApi = (studentId, studentData) => {
    return studentInstance.put(`/edit-student/${studentId}`, studentData);
};

export const changePasswordApi = (studentId, credentials) => {
    return studentInstance.put(`/change-password/${studentId}`, credentials)
}

export const forgotPasswordApi = (email) => {
    return studentInstance.get(`/forgot-password/${email}`)
}

export const forgotPasswordOtpApi = (credentials) => {
    return studentInstance.post(`/forgot-password-otp`, credentials)
}

export const forgotChangePasswordApi = (email, credentials) => {
    return studentInstance.put(`/forgot-change-password/${email}`, credentials)
}

//exams

export const getExamsByIdsApi = (examIds) => {
    const idsString = examIds.join(',');
    return studentInstance.get(`/get-exams?ids=${idsString}`);
}

export const validateExamApi = (examId, validationData) => {
    return studentInstance.post(`/validate-exam/${examId}`, validationData);
}


// Chat related API calls

export const getTeachersApi = () => {
    return studentInstance.get('/get-teachers')
}

export const fetchChatListApi = (studentId) => {
    return studentInstance.get(`/chat/${studentId}`);
}

export const fetchChatMessagesApi = (teacherId) => {
    return studentInstance.get(`/chat/messages?teacherId=${teacherId}`);
}

//schedules

export const getSchedulesApi = (classId) => {
    return studentInstance.get(`/get-schedules?id=${classId}`)
}

export const getTodaySchedulesApi = (classId) => {
    return studentInstance.get(`/get-today-schedules/${classId}`)
}