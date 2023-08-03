import axios from '../../axios'

export const adminLoginApi = (formData) => {
    return axios.post('/admin/login', formData)
}

export const addTeacherApi = (formData,headers) => {
    return axios.post('/admin/add-teacher', formData, {headers})
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
  