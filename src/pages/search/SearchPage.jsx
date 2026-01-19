import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const SearchPage = () => {
    const [search, setSearch] = useState("");

    const getSearch = async () => await axios.get(`https://dummyjson.com/products/search?q=${search}`)

    const { data, isLoading } = useQuery({
        queryKey: ["products", search],
        queryFn: getSearch,
        staleTime: 60 * 1000
    })

    const searchProducts = data?.data?.products

    return (
        <section>
            <div className="container px-1">
                <div className="relative border-[1px] border-[#1B6392] max-w-[400px] w-full rounded-[5px] mb-5">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        placeholder="Search for anything..."
                        className="w-full max-w-[550px] h-[38px] bg-white rounded pl-10 pr-3 outline-none"
                    />

                    {/* Dropdown */}
                    {search === "" ? ("") :
                        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                            {searchProducts && searchProducts.length > 0 ? (
                                searchProducts.map((el) => (
                                    <Link to={`/products/${el.id}`} key={el.id} className="hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 last:border-b-0">
                                        <div className="p-3 flex items-center gap-3">
                                            <img
                                                src={el.thumbnail || el.image}
                                                alt={el.title}
                                                className="w-14 h-14 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                                                    {el.title || el.name}
                                                </h4>
                                                <p className="text-xs text-gray-500 line-clamp-1">
                                                    {el.description || el.category}
                                                </p>
                                            </div>
                                            <div className="text-blue-600 font-bold text-sm">
                                                ${el.price}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                // Mahsulot topilmaganda
                                <div className="p-8 text-center">
                                    <div className="text-gray-400 text-5xl mb-3">🔍</div>
                                    <h3 className="text-gray-700 font-semibold mb-1">
                                        Mahsulot topilmadi
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        "{search}" bo'yicha natija yo'q
                                    </p>
                                </div>
                            )}
                        </div>}
                </div>
            </div>
        </section>
    )
}

export default SearchPage