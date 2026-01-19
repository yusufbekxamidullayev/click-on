import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const useTanstackGet = ({url , key}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getData = async () => await axios.get(`${baseUrl}${url}`)
 
    const {data , isLoading , error} = useQuery({
        queryKey:[key],
        queryFn:getData,
        staleTime:60*1000*5
    })
  return {data , isLoading , error}
}

export default useTanstackGet