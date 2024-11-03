// src/useFlights.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API, handleError } from './api';



/*******************************  //! register *****************************/

const signUpUser = async (formData) => {
  try {
    const { data } = await API.post('/auth/register', formData)
    return data
  } catch (error) {
    toast.error("Invalid!", { position: "bottom-right", autoClose: 1500, theme: "colored" })
  }
}

export const useRegisterUser = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: async () => {
      navigate('/login')
    },
    onError: error => handleError(error)
  })
}

/*******************************  //! login *****************************/

const loginUser = async (formData) => {
  try {
    const { data } = await API.post('/auth/login', formData)
    localStorage.setItem("flightsUserInfo", JSON.stringify(data))
    return data
  } catch (error) {
    toast.error("Invalid Credentials!", { position: "bottom-right", autoClose: 1500, theme: "colored" })
  }
}

export const useLoginUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      queryClient.setQueryData(['strategy'], 'local')
    },
    onError: error => handleError(error)
  })
}


/*******************************  //! user logout *********************/

const logoutUser = async () => {
  localStorage.clear()
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      queryClient.setQueryData(['strategy'], null)
      localStorage.clear()
      navigate('/login');
    },
    onError: error => handleError(error)
  })
}