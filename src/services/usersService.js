import axios from "axios";
import router from '../router/index';
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const fetchUsers = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/users`);
        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}

export const updateUser = async (data, id) => {
    try {
        const res = await axios.put(`${BASE_API_URL}/users/${id}`, data);

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const createUser = async (data) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/users`, data);

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await axios.delete(`${BASE_API_URL}/users/${id}`)

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const revokeRetailers = async (id, retailerId) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/users/${id}/revoke-retailers`, {
            retailers: [{ id: retailerId }]
        });

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const assignRetailers = async (id, data) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/users/${id}/assign-retailers`, {
            retailers: data
        });

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}