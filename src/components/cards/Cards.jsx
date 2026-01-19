import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Cards = () => {
    const getProducts = async () => await axios.get(`https://dummyjson.com/products?limit=12`)
    
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1 * 1
    })
    const products = data?.data?.products
    console.log(data?.data?.products);
    
    
  return (
    <section>
        <div className="container mx-auto"> 
              <div className='flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-[90px]'>
                  {
                      products?.map((el) => (
                          <Link to={`/products/${el.id}`} className='max-w-[400px] w-full h-[100px] rounded-[3px] flex items-center gap-3 border-[1px] border-[#E4E7E9] px-2'>
                              <div className='max-w-[90px] min-w-[90px] h-[90px]'>
                                  <img src={el.thumbnail} alt="" />
                              </div>
                              <div>
                                  <p className='text-[14px] text-[#191C1F] line-clamp-2'>{el.description}</p>
                                  <p className='text-[14px] text-[#2DA5F3] font-semibold pt-2'>$ {el.price}</p>
                              </div>
                          </Link>
                      ))
                  }
              </div>
        </div>
    </section>
  )
}

export default Cards