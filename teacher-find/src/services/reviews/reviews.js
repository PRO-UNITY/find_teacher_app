import api from '../../utils/fetchApi';

// post review with api function
export const postReview = (data) => {
    return api.post('/review/', data);
};
