import axios from '../../axios'

export const adminLoginApi = (formData) => {
    return axios.post('/admin/login', formData)
}

export const addTeacherApi = (formData) => {
    return axios.post('/admin/add-teacher', formData)
}