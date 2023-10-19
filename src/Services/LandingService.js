import { axiosInstance } from "../../axios"

export const StudentSignupApi = (values) => {
    return axiosInstance.post('/signup', values)
}

export const StudentOtpApi = (StudentAuth) => {
    return axiosInstance.post('/otp', StudentAuth)
}

export const studentLoginApi = (values) => {
    return axiosInstance.post('/login', values)
}

export const teacherLoginApi = (formData) => {
    return axiosInstance.post('/teacher/login', formData)
}

export const getBannersApi = () => {
    return axiosInstance.get('/get-banners')
}

export const getCoursesApi = () => {
    return axiosInstance.get('/get-courses')
}

export const getTutorsApi = () => {
    return axiosInstance.get('/get-tutors')
}

export const getPricingApi = () => {
    return axiosInstance.get('/get-pricing')
}