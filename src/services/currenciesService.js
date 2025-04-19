import axios from "axios";
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const fetchCurrencies = async (dataPerPage = 20, page = 1) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/currencies`, {
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