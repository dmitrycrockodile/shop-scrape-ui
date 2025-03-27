import axios from "axios";
import router from '../router/index';
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const fetchProducts = async () => {
    try {
        const res = await axios.post(`${BASE_API_URL}/products`, {
            dataPerPage: 10,
            page: 1
        });
        return handleResponse(res);
    } catch (err) {
        return handleError(err);
    }
}

export const updateProduct = async (data, images, id) => {
    try {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("manufacturer_part_number", data.manufacturer_part_number);
        formData.append("pack_size_id", data.pack_size_id);
        formData.append('_method', 'put');

        if (images[0].files[0]) {
            images.forEach(image => {
                formData.append("images[]", image.files[0]);
            });
        }

        const res = await axios.post(`${BASE_API_URL}/products/${id}`, formData);
        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const createProduct = async (data, logo) => {
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

export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${BASE_API_URL}/products/${id}`)

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}