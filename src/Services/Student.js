import axios from '../../axios'


//courses
export const getCoursesApi = (studentId, headers) => {
    return axios.get(`/student/get-courses/${studentId}`, { headers })
}

export const getPurchasedCoursesApi = (studentId, headers) => {
    return axios.get(`/student/get-purchased-courses/${studentId}`, { headers })
}

export const getCourseByIdApi = (id, headers) => {
    return axios.get(`/student/get-course/${id}`, { headers })
}

//classes
export const getClassesApi = (headers) => {
    return axios.get('/student/get-classes', { headers })
}

export const getClassByIdApi = (id, headers) => {
    return axios.get(`/student/get-class/${id}`, { headers })
}

//payment
export const createOrderApi = (amount, headers) => {
    return axios.post('/student/create-order', { amount }, { headers });
}

export const verifyPaymentApi = (paymentData, headers) => {
    return axios.post('/student/verify-payment', { ...paymentData }, { headers });
}

//student
export const checkIfStudentHasEnrolledApi = (id, headers) => {
    return axios.get(`/student/student-enrolled/${id}`, { headers })
}

export const getStudentByIdApi = (id, headers) => {
    return axios.get(`/student/get-student/${id}`, { headers })
}

export const editStudentApi = (studentId, studentData, headers) => {
    return axios.put(`/student/edit-student/${studentId}`, studentData, { headers });
};

export const changePasswordApi = (studentId, credentials, headers) => {
    return axios.put(`/student/change-password/${studentId}`, credentials, { headers })
}

export const forgotPasswordApi = (email) => {
    return axios.get(`/student/forgot-password/${email}`)
}

export const forgotPasswordOtpApi = (credentials) => {
    return axios.post(`/student/forgot-password-otp`, credentials)
}

export const forgotChangePasswordApi = (email, credentials, headers) => {
    return axios.put(`/student/forgot-change-password/${email}`, credentials, { headers })
}

//exams

export const getExamsByIdsApi = (examIds, headers) => {
    const idsString = examIds.join(',');
    return axios.get(`/student/get-exams?ids=${idsString}`, { headers });
}

export const validateExamApi = (examId, validationData, headers) => {
    return axios.post(`/student/validate-exam/${examId}`, validationData, { headers });
}


// Chat related API calls

export const getTeachersApi = (headers) => {
    return axios.get('/student/get-teachers', { headers })
}

export const fetchChatListApi = (studentId, headers) => {
    return axios.get(`/student/chat/${studentId}`, { headers });
}

export const fetchChatMessagesApi = (teacherId, headers) => {
    return axios.get(`/student/chat/messages?teacherId=${teacherId}`, { headers });
}

//schedules

export const getSchedulesApi = (classId, headers) => {
    return axios.get(`/student/get-schedules?id=${classId}`, { headers })
}

export const getTodaySchedulesApi = (classId, headers) => {
    return axios.get(`/student/get-today-schedules/${classId}`, { headers })
}