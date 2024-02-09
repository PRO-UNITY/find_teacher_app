import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/fetchApi';

// get patients function
export const getPatients = async (data) => {
    const response = await api.get(`/appointment/make_appointments/`);
    return response.data;
};

// get patient by id function
export const getPatientById = async (id) => {
    const response = await api.get(`/appointment/get_appointments/${id}/`);
    return response.data;
};

// get patients by date function
export const getPatientsByDate = async (date) => {
    const response = await api.get(
        `/appointment/make_appointments/?date=${date}`
    );
    return response.data;
};

// delete appointment by id function
export const deleteAppointmentById = async (id) => {
    const response = await api.delete(`/appointment/get_appointments/${id}/`);
    return response.data;
};