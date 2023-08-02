import axios from "../../axios";

export const StudentSignupApi = (values) =>{
    return axios.post('/signup',values)
}

export const StudentOtpApi = (StudentAuth) =>{
    return axios.post('/otp',StudentAuth)
}

export const studentLoginApi = (values) =>{
    return axios.post('/login',values)
}