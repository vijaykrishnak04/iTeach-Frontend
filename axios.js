import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

const teacherInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/teacher`,
});

const adminInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/admin`,
});

const studentInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/student`,
});

const setAuthHeaders = (instance, tokenKey) => {
  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem(tokenKey);
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

const setupResponseInterceptors = (instance, tokenKey) => {
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem(tokenKey)
        console.error('Unauthorized!');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
}

setAuthHeaders(teacherInstance, 'teacherToken');
setAuthHeaders(adminInstance, 'adminToken');
setAuthHeaders(studentInstance, 'studentToken');

setupResponseInterceptors(teacherInstance, 'teacherToken');
setupResponseInterceptors(adminInstance, 'adminToken');
setupResponseInterceptors(studentInstance, 'studentToken');

export { axiosInstance, teacherInstance, adminInstance, studentInstance };
