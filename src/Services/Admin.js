
import { adminInstance } from "../../axios"

export const adminLoginApi = (formData) => {
    return adminInstance.post('/login', formData)
}


//teacher

export const addTeacherApi = (formData, headers) => {
    return adminInstance.post('/add-teacher', formData, { headers })
}

export const getTeachersApi = (headers) => {
    return adminInstance.get('/get-teachers', { headers })
}

export const deleteTeacherApi = (id, headers) => {
    return adminInstance.delete(`/delete-teacher/${id}`, { headers })
}

export const blockTeacherApi = (id, headers) => {
    return adminInstance.patch(`/block-teacher/${id}`, null, { headers })
}

export const unblockTeacherApi = (id, headers) => {
    return adminInstance.patch(`/unblock-teacher/${id}`, null, { headers });
}


//course 

export const addCourseApi = (formData, headers) => {
    return adminInstance.post('/add-course', formData, { headers })
}

export const getCoursesApi = (headers) => {
    return adminInstance.get('/get-courses', { headers })
}

export const deleteCourseApi = (id, headers) => {
    return adminInstance.delete(`/delete-course/${id}`, { headers })
}

export const hideCourseApi = (id, headers) => {
    return adminInstance.patch(`/hide-course/${id}`, null, { headers })
}

export const unHideCourseApi = (id, headers) => {
    return adminInstance.patch(`/unhide-course/${id}`, null, { headers })
}

export const editCourseApi = (id, formData, headers) => {
    return adminInstance.put(`/edit-course/${id}`, formData, { headers })
}

//syllabus

export const getSyllabusApi = (headers) => {
    return adminInstance.get('/get-syllabus', { headers });
}

export const addSyllabusApi = (syllabusData, headers) => {
    return adminInstance.post('/add-syllabus', syllabusData, { headers });
}

export const deleteSyllabusApi = (id, headers) => {
    return adminInstance.delete(`/delete-syllabus/${id}`, { headers });
}

export const editSyllabusApi = (id, formData, headers) => {
    return adminInstance.put(`/edit-syllabus/${id}`, formData, { headers });
}

export const hideSyllabusApi = (id, headers) => {
    return adminInstance.patch(`/hide-syllabus/${id}`, null, { headers });
}

export const unHideSyllabusApi = (id, headers) => {
    return adminInstance.patch(`/unhide-syllabus/${id}`, null, { headers });
}

//dashboard

export const getDashboardDataApi = (headers) => {
    return adminInstance.get('/get-dashboard-data', { headers })
}

//banner

export const getBannersApi = (headers) => {
    return adminInstance.get('/get-banners', { headers })
}

export const addBannerApi = (headers, banner) => {
    return adminInstance.post('/add-banner', banner, { headers })
}

export const deleteBannerApi = (id, headers) => {
    return adminInstance.delete(`/delete-banner/${id}`, { headers })
}

