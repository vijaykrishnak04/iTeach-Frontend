import axios from "../../axios";

export const StudentSignupApi = (values) => {
    return axios.post('/signup', values)
}

export const StudentOtpApi = (StudentAuth) => {
    return axios.post('/otp', StudentAuth)
}

export const studentLoginApi = (values) => {
    return axios.post('/login', values)
}

export const getBannersApi = () => {
    return axios.get('/get-banners')
}

export const getCoursesApi = () => {
    return axios.get('/get-courses')
}

export const getTutorsApi = () => {
    return axios.get('/get-tutors')
}