import axios from "axios";
import router from '../router/index';
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const updateRetailer = async (data, logo, id) => {
    try {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('url', data.url);
        formData.append('currency_id', data.currency_id);
        formData.append('_method', 'put');

        if (logo) {
            formData.append('logo', logo);
        }

        const res = await axios.post(`${BASE_API_URL}/retailers/${id}`, formData);

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const createRetailer = async (data, logo) => {
    try {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('url', data.url);
        formData.append('currency_id', data.currency_id);
        if (logo) {
            formData.append('logo', logo);
        }

        const res = await axios.post(`${BASE_API_URL}/retailers`, formData);

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const deleteRetailer = async (id) => {
    try {
        const res = await axios.delete(`${BASE_API_URL}/retailers/${id}`)

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const getProducts = async (id, dataPerPage, page) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/retailers/${id}/products`, {
            params: { 
                dataPerPage, 
                page 
            }
        })

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const addProducts = async (id, products) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/retailers/${id}/products`, {
            products
        });

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}