import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGet = ({url}) => {
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(true)
    const baseUrl = import.meta.env.VITE_BASE_URL

    async function getData(){
        try{
            let res = await axios.get(`${baseUrl}${url}`)
            setData(res.data)
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    } , [])

  return {data , loading}
}

export default useGet