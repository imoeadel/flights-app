// src/useFlights.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { API, handleError } from './api';



/*******************************  //! get all Flights *****************************/


export const useGetFlights = ({ page, size, code }) => {
  return useQuery({
    queryKey: ['getFlights', page, size, code],
    queryFn: async () => {
      const params = { page, size };
      if (code) {
        params.code = code;
        params.page = 1;
        params.size = 10;
      }
      const { data } = await API.get(`/flights`, { params });
      return data;
    },
    select: (data) => data,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => handleError(error),
  });
};

/*******************************  //! add flight **************************************/

const createFlight = async (flightData) => {
  let url = '/flights';
  let payload;
  let headers;

  if (flightData.has('photo')) {
    url = '/flights/withPhoto';
    payload = flightData;
    headers = { 'Content-Type': 'multipart/form-data' };
  } else {
    payload = {};
    for (let [key, value] of flightData.entries()) {
      payload[key] = isNaN(value) ? value : Number(value);
    }
    headers = { 'Content-Type': 'application/json' };
  }

  const { data } = await API.post(url, payload, { headers });
  return data;
};

export const useCreateFlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFlight,
    onSuccess: (newFlight) => {
      const flightQueries = queryClient.getQueriesData(['getFlights']);
      flightQueries.forEach(([queryKey, oldData]) => {
        if (!oldData || !oldData.resources) return;
        
        queryClient.setQueryData(queryKey, {
          ...oldData,
          resources: [newFlight, ...oldData.resources],
          total: oldData.total + 1,
        });
      });

      toast.success('Flight created successfully', {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored",
      });
    },
    onError: (error) => {
      toast.error('Failed to create flight', {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored",
      })

      console.error(error);
    },
  });
};

/*******************************  //! Edit flight *************************************************/

const editFlight = async (flightData) => {
  let url = `/flights/${flightData?.id}`;
  let payload;
  let headers;

  if (flightData?.formData?.has('photo')) {
    url = `/flights/${flightData?.id}/withPhoto`;
    payload = flightData?.formData;
    headers = { 'Content-Type': 'multipart/form-data' };
  } else {
    payload = {};
    for (let [key, value] of flightData?.formData.entries()) {
      payload[key] = isNaN(value) ? value : Number(value);
    }
    headers = { 'Content-Type': 'application/json' };
  }

  const { data } = await API.put(url, payload, { headers });
  return data;
};
export const useEditFlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editFlight,
    onSuccess: () => {
      queryClient.invalidateQueries('getFlights');
      toast.success('Flight updated successfully', {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored",
      });
    },
    onError: (error) => {
      toast.error('Failed to update flight', {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored",
      });
      console.error(error);
    },
  });
};

/*******************************  //! Delete flight ***********************************************/

const deleteFlight = async (id) => {
  await API.delete(`/flights/${id}`);
};

export const useDeleteFlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFlight,
    onSuccess: () => {
      queryClient.invalidateQueries('getFlights');
      toast.success('Flight deleted successfully', {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored",
      });
    },
    onError: () => {
      toast.error('Failed to delete flight', {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored",
      });
    },
  });
};

/*******************************  //! get flight photo ***********************************************/

export const useGetFlightPhoto = (id) => {
  return useQuery({
    queryKey: ['getFlightPhoto', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await API.get(`/flights/${id}/photo`, { responseType: 'blob' });
      return response.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => handleError(error),
  });
};

/*******************************  //! check availability ***********************************************/

export const useCheckAvailability = (code) => {
  return useQuery({
    queryKey: 'checkAvailability',
    queryFn: async () => {
      const params = { code };
      const { data } = await API.get('/flights/available', { params });
      return data;
    },
    enabled: !!code,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => handleError(error),
  });
}
