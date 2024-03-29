import { BASE_URL } from '../../utils';
import api from '../../utils/fetchApi';

// get doctors
// export const getDoctors = async () => {
//   const response = await api.get(`${BASE_URL}/doctors`);
//   return response.data;
// };

export const getTeachers = async (page) => {
    const response = await api.get(`${BASE_URL}/teachers/?page=${page}`);
    console.log(response);
    return response.data;
};

// get top teachers
export const getTopTeachers = async () => {
    const response = await api.get(`/top-teacher/`);
    return response.data;
};

// get doctor by id
export const getDoctorById = async (id) => {
    const response = await api.get(`/profile/${id}`);
    return response.data;
};

//make appointment with doctor
export const makeAppointment = async (data) => {
    const response = await api.post(`/appointment/make_appointments/`, data);
    return response.data;
};

// get appointment doctors
export const getAppointmentDoctors = async () => {
    const response = await api.get(`/appointment/make_appointments/`);
    return response.data;
};

//get doctors by category
export const getDoctorsByCategory = async (id) => {
    const response = await api.get(`/category/${id}`);
    return response.data;
};

//cancel appointment function
export const cancelAppointment = async (id) => {
    api.delete(`/appointment/get_appointments/${id}/`);
};

// reschedule appointment function with api
export const rescheduleAppointment = async (id, data) => {
    const response = await api.put(`/appointment/get_appointments/${id}`, data);
    return response.data;
};

// // get filtered doctors by query
export const getFilteredDoctors = async (query) => {
    const queryParts = query.split(' ');
    const queryParams = {};
    if (queryParts.length > 0) {
        queryParams.category = queryParts.join(' ');
    }
    const response = await api.get('/doctors', { params: queryParams });
    return response.data;
};

// get doctor by category filter and query
export const getDoctorByCategoryFilter = async (category) => {
    const response = await api.get('/teachers/?category=' + category);
    return response.data;
};


// add doctor to saved doctors
export const addDoctorToSaved = async (data) => {
    const response = await api.post(`/saved`, data);
    return response.data;
};

// get saved doctors
export const getSavedDoctors = async () => {
    const response = await api.get(`/saved`);
    return response.data;
};

// delete saved doctor
export const deleteSavedDoctor = async (id) => {
    const response = await api.delete(`/saved/${id}`);
    return response.data;
};

// accept appointment function
export const statusAppointment = async (
    id,
    statusId
) => {
    const response = await api.patch(
        `/appointment/get_appointments/${id}/?status_id=${statusId}`
    );
    return response.data;
};
