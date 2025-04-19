import axios from "axios";
import router from '../router/index';
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const fetchPackSizes = async (dataPerPage = 20, page = 1) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/pack-sizes`, {
            params: { 
                dataPerPage, 
                page 
            }
        });
        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}

export const updatePackSize = async (data, id) => {
    try {
        const res = await axios.put(`${BASE_API_URL}/pack-sizes/${id}`, data);

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const createPackSize = async (data) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/pack-sizes`, data);

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const deletePackSize = async (id) => {
    try {
        const res = await axios.delete(`${BASE_API_URL}/pack-sizes/${id}`)

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}