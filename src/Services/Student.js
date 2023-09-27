import axios from '../../axios'

export const getCoursesApi = (headers) => {
    return axios.get('/student/get-courses', { headers })
}

export const getCourseByIdApi = (id, headers) => {
    return axios.get(`/student/get-course/${id}`, { headers })
}

export const getClassesApi = (headers) => {
    return axios.get('/student/get-classes', { headers })
}

export const getClassByIdApi = (id, headers) => {
    return axios.get(`/student/get-class/${id}`, { headers })
}


export const createOrderApi = (amount, headers) => {
    return axios.post('/student/create-order', { amount }, { headers });
}

export const verifyPaymentApi = (paymentData, headers) => {
    const { paymentId, orderId, signature, classId, studentId } = paymentData;
    return axios.post('/student/verify-payment', { paymentId, orderId, signature, classId, studentId }, { headers });
}

export const checkIfStudentHasEnrolledApi = (id, headers) => {
    return axios.get(`/student/student-enrolled/${id}`, { headers })
}

export const getStudentByIdApi = (id, headers) => {
    return axios.get(`/student/get-student/${id}`, { headers })
}

export const editStudentApi = (studentId, studentData, headers) => {
    return axios.put(`/student/edit-student/${studentId}`, studentData, { headers });
};

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

export const getSchedulesApi = (scheduleIds, headers) => {
    const idsString = scheduleIds.join(',');
    return axios.get(`/student/get-schedules?ids=${idsString}`, { headers })
}