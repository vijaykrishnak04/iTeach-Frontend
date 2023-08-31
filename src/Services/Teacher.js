import axios from '../../axios'

export const teacherLoginApi = (formData) => {
    return axios.post('/teacher/login', formData)
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