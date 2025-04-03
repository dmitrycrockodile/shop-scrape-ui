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
};

export const fetchWeeklyRatings = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/retailers/weekly-ratings`);
    return handleResponse(res);
  } catch (err) {
    return handleError(err);
  }
};

export const fetchWeeklyPricings = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/retailers/weekly-pricing`);
    return handleResponse(res);
  } catch (err) {
    return handleError(err);
  }
};

export const downloadMetricsCSV = async (startDate, endDate) => {
    try {
      const res = await axios.get(`${BASE_API_URL}/scraped-data/export`, {
        params: {
          startDate,
          endDate,
        },
        responseType: 'blob',
      });

      const contentDisposition = res.headers['content-disposition'];
      let fileName = 'scraped_data.csv';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1];
        }
      }
    
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = fileName;    
      link.click();
  
      window.URL.revokeObjectURL(link.href);

      return res;
    } catch (err) {
      console.error('CSV Download Error:', err);
    }
  };
  
