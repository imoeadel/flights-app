import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

export const API = axios.create({
  baseURL: 'http://localhost:3000',
})

//! handle error
export const handleError = (error) => {
  if (error.response?.data) {
    console.log(error)
    let errorMessage;
    const errorData = error.response.data;
    switch (errorData.statusCode) {
      case 400: {
        errorMessage = errorData.message[0] || errorData.message;
        break;
      }
      case 401: {
        break;
      }
      case 404: {
        errorMessage = JSON.stringify(errorData.error);
        break;
      }
      case 406: {
        errorMessage = JSON.stringify(errorData.message);
        break;
      }
      case 409: {
        errorMessage = errorData.message.split('.')[0];
        break;
      }
      default:
        errorMessage = `${errorData.statusCode}: HANDLE_ME`;
    }
    toast.error(errorMessage, { position: "bottom-right", autoClose: 3000, theme: "colored" })
  }
}

const refreshToken = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('flightsUserInfo'));
    const response = await API.post('/auth/refresh-token', { refreshToken: userInfo?.refreshToken });
    const newTokenData = response.data;

    localStorage.setItem('flightsUserInfo', JSON.stringify({
      ...userInfo,
      token: newTokenData.accessToken,
      refreshToken: newTokenData.refreshToken,
    }));

    return newTokenData.accessToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    throw error;
  }
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const navigate = useNavigate();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        API.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('flightsUserInfo');
        navigate('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);