import axios from '../../axios'

export const teacherLoginApi = (formData) => {
    return axios.post('/teacher/login', formData)
}