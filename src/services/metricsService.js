import axios from "axios";
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const fetchMetrics = async (data) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/retailers/metrics`, data);
        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}

export const fetchWeeklyRatings = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/retailers/weekly-ratings`);
        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}

export const fetchWeeklyPricings = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/retailers/weekly-pricing`);
        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}