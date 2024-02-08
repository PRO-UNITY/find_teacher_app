import api from "../../utils/fetchApi";

// get user function
export const getUserProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
};