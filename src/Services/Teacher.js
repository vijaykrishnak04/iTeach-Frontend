import axios from '../../axios'

export const teacherLoginApi = (formData) => {
    return axios.post('/teacher/login', formData)
}

//profile
export const teacherEditProfileApi = (headers, formData) => {
    return axios.post('/teacher/edit-profile', formData, { headers })
}

export const getClassesApi = (headers) => {
    return axios.get('/teacher/get-classes', { headers });
}

export const getClassByIdApi = (headers, id) => {
    return axios.get(`/teacher/get-class/${id}`, { headers });
}

export const addChapterApi = (formData, headers) => {
    return axios.post('/teacher/add-chapter', formData, { headers });
}

export const editChapterApi = (formData, headers) => {
    return axios.patch('/teacher/edit-chapter', formData, { headers })
}

// Exam related API calls
export const createExamApi = (formData, headers) => {
    return axios.post('/teacher/create-exam', formData, { headers });
}

export const getExamsApi = (headers) => {
    return axios.get('/teacher/get-exams', { headers });
}

export const editExamApi = (formData, headers) => {
    return axios.patch('/teacher/edit-exam', formData, { headers });
}

export const cancelExamApi = (id, headers) => {
    return axios.delete(`/teacher/cancel-exam/${id}`, { headers });
}

//student related API calls
export const getStudentsApi = (headers) => {
    return axios.get('/teacher/get-all-students', { headers });
}

export const getStudentByIdsApi = (studentIds, headers) => {
    const idsString = studentIds.join(',');
    return axios.get(`/teacher/get-students?ids=${idsString}`, { headers });
}

export const blockStudent = (id, headers) => {
    return axios.get(`/teacher/block-student/`, { headers });
}

// Chat related API calls

export const fetchChatListApi = (teacherId, headers) => {
    return axios.get(`/teacher/chat/${teacherId}`, { headers });
}

export const fetchChatMessagesApi = (studentId, headers) => {
    return axios.get(`/teacher/chat/messages?studentId=${studentId}`, { headers });
}

//schedules

export const addScheduleApi = (formData, headers) => {
    return axios.post('/teacher/add-schedule', formData, { headers })
}

export const getSchedulesApi = (headers) => {
    return axios.get('/teacher/get-schedules', { headers })
}

export const deleteScheduleApi = (id, headers) => {
    return axios.delete(`/teacher/delete-schedule/${id}`, { headers })
}
