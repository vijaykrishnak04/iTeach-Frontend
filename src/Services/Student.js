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