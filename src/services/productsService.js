import axios from "axios";
import router from '../router/index';
import { handleResponse, handleError } from "../utils/helpers";
import { BASE_API_URL } from "../utils/constants";

export const fetchProducts = async (dataPerPage, page) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/products`, {
            dataPerPage,
            page
        });
        
        return handleResponse(res);
    } catch (err) {
        console.log(err)
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

        const imageUrls = [];
        if (data.images.length) {
            data.images.forEach(image => imageUrls.push(image.file_url))
            formData.append("image_urls", JSON.stringify(imageUrls));
        }

        if (images[0]) {
            images.forEach(image => {
                formData.append("images[]", image);
            });
        }

        const res = await axios.post(`${BASE_API_URL}/products/${id}`, formData);
        return handleResponse(res);
    } catch (err) {
        console.error(err);
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}

export const createProduct = async (data, images) => {
    try {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("manufacturer_part_number", data.manufacturer_part_number);
        formData.append("pack_size_id", data.pack_size_id);
        if (images[0]) {
            images.forEach(image => {
                formData.append("images[]", image);
            });
        }

        const res = await axios.post(`${BASE_API_URL}/products/store`, formData);

        return handleResponse(res);
    } catch (err) {
        console.error(err);
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

export const getRetailers = async (id) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/products/${id}/retailers`)

        return handleResponse(res);
    } catch (err) {
        if (err.response.status === 404) {
            router.push({ name: 'notFound', params: { catchAll: 'not-found' } })
        }
        return handleError(err);
    }
}