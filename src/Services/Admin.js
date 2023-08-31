import axios from '../../axios'

export const adminLoginApi = (formData) => {
    return axios.post('/admin/login', formData)
}


//teacher

export const addTeacherApi = (formData, headers) => {
    return axios.post('/admin/add-teacher', formData, { headers })
}

export const getTeachersApi = (headers) => {
    return axios.get('/admin/get-teachers', { headers })
}

export const deleteTeacherApi = (id, headers) => {
    return axios.delete(`/admin/delete-teacher/${id}`, { headers })
}

export const blockTeacherApi = (id, headers) => {
    return axios.patch(`/admin/block-teacher/${id}`, null, { headers })
}

export const unblockTeacherApi = (id, headers) => {
    return axios.patch(`/admin/unblock-teacher/${id}`, null, { headers });
}


//course 

export const addCourseApi = (formData, headers) => {
    console.log(formData);
    return axios.post('/admin/add-course', formData, { headers })
}

export const getCoursesApi = (headers) => {
    return axios.get('/admin/get-courses', { headers })
}

export const deleteCourseApi = (id, headers) => {
    return axios.delete(`/admin/delete-course/${id}`, { headers })
}

export const hideCourseApi = (id, headers) => {
    return axios.patch(`/admin/hide-course/${id}`, null, { headers })
}

export const unHideCourseApi = (id, headers) => {
    return axios.patch(`/admin/unhide-course/${id}`, null, { headers })
}

export const editCourseApi = (id, formData, headers) => {
    return axios.put(`/admin/edit-course/${id}`,formData , { headers })
}

//syllabus

export const getSyllabusApi = (headers) => {
    return axios.get('/admin/get-syllabus', { headers });
}

export const addSyllabusApi = (syllabusData, headers) => {
    return axios.post('/admin/add-syllabus', syllabusData, { headers });
}

export const deleteSyllabusApi = (id, headers) => {
    return axios.delete(`/admin/delete-syllabus/${id}`, { headers });
}

export const editSyllabusApi = (id, formData, headers) => {
    return axios.put(`/admin/edit-syllabus/${id}`, formData, { headers });
}

export const hideSyllabusApi = (id, headers) => {
    return axios.patch(`/admin/hide-syllabus/${id}`, null, { headers });
}

export const unHideSyllabusApi = (id, headers) => {
    return axios.patch(`/admin/unhide-syllabus/${id}`, null, { headers });
}


