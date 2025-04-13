import axios from "axios";
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const handleLogin = async (data) => {
    try {
        await axios.get(`${BASE_API_URL}/sanctum/csrf-cookie`);
        const res = await axios.post(`${BASE_API_URL}/login`, data);

        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}

export const handleLogout = async () => {
    try {
        const res = await axios.delete(`${BASE_API_URL}/logout`);

        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}