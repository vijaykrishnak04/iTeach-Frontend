import { teacherInstance } from "../../axios"


//profile
export const teacherEditProfileApi = (formData) => {
    return teacherInstance.post('/edit-profile', formData)
}

export const changePasswordApi = (teacherId, credentials) => {
    return teacherInstance.put(`/change-password/${teacherId}`, credentials)
}

//classes
export const getClassesApi = () => {
    return teacherInstance.get('/get-classes');
}

export const getClassByIdApi = (id) => {
    return teacherInstance.get(`/get-class/${id}`);
}

export const addChapterApi = (formData) => {
    return teacherInstance.post('/add-chapter', formData);
}

export const editChapterApi = (formData) => {
    return teacherInstance.patch('/edit-chapter', formData)
}

// Exam related API calls
export const createExamApi = (formData) => {
    return teacherInstance.post('/create-exam', formData);
}

export const getExamsApi = () => {
    return teacherInstance.get('/get-exams');
}

export const editExamApi = (formData) => {
    return teacherInstance.patch('/edit-exam', formData);
}

export const cancelExamApi = (id) => {
    return teacherInstance.delete(`/cancel-exam/${id}`);
}

//student related API calls
export const getStudentsApi = () => {
    return teacherInstance.get('/get-all-students');
}

export const getStudentByIdsApi = (studentIds) => {
    const idsString = studentIds.join(',');
    return teacherInstance.get(`/get-students?ids=${idsString}`);
}

export const blockStudent = (id) => {
    return teacherInstance.patch('/block-student', { id });
}

export const unblockStudent = (id) => {
    return teacherInstance.patch('/unblock-student', { id });
}

// Chat related API calls

export const fetchChatListApi = (teacherId) => {
    return teacherInstance.get(`/chat/${teacherId}`);
}

export const fetchChatMessagesApi = (studentId) => {
    return teacherInstance.get(`/chat/messages?studentId=${studentId}`);
}

//schedules

export const addScheduleApi = (formData) => {
    return teacherInstance.post('/add-schedule', formData)
}

export const getSchedulesApi = () => {
    return teacherInstance.get('/get-schedules')
}

export const getTodaySchedulesApi = () => {
    return teacherInstance.get('/get-today-schedules')
}

export const deleteScheduleApi = (id) => {
    return teacherInstance.delete(`/delete-schedule/${id}`)
}
