import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGet from '../../hooks/useGet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, Heart, Plus, Minus } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Cards from '../../components/cards/Cards';

const SinglePage = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { id } = useParams();
    const { data } = useGet({ url: `products/${id}` });
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="bg-[#F5F5F6] min-h-screen">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Side - Images */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl p-6">
                            {/* Main Swiper */}
                            <Swiper
                                loop
                                spaceBetween={10}
                                navigation
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="rounded-xl mb-4"
                            >
                                {data?.images?.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="bg-gray-50 rounded-xl overflow-hidden">
                                            <img
                                                src={img}
                                                className="w-full h-[400px] object-contain"
                                                alt={data?.title}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnails Swiper */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={12}
                                slidesPerView={4}
                                freeMode
                                watchSlidesProgress
                                modules={[FreeMode, Navigation, Thumbs]}
                            >
                                {data?.images?.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="border-2 border-gray-200 rounded-lg p-2 cursor-pointer hover:border-purple-500 transition">
                                            <img
                                                src={img}
                                                className="w-full h-[70px] object-contain"
                                                alt=""
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Right Side - Product Info */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl p-6">
                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(data?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{data?.rating} Star Rating</span>
                                <span className="text-sm text-gray-500">({data?.reviews?.length || 0} User feedback)</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                {data?.title}
                            </h1>

                            {/* SKU & Availability */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <span className="text-sm text-gray-500">Sku: </span>
                                    <span className="text-sm font-semibold text-gray-900">{data?.sku || 'A264671'}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Availability: </span>
                                    <span className="text-sm font-semibold text-green-600">{data?.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Brand: </span>
                                    <span className="text-sm font-semibold text-gray-900">{data?.brand}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Category: </span>
                                    <span className="text-sm font-semibold text-gray-900">{data?.category}</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-3xl font-bold text-[#2DA5F3]">${data?.price}</div>
                                {data?.discountPercentage && (
                                    <>
                                        <div className="text-xl text-gray-400 line-through">
                                            ${(data?.price / (1 - data?.discountPercentage / 100)).toFixed(2)}
                                        </div>
                                        <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-md text-sm font-semibold">
                                            {data?.discountPercentage}% OFF
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Color Selection */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-gray-900 mb-3 block">Color</label>
                                <div className="flex gap-3">
                                    <button
                                        className={`w-12 h-12 rounded-full bg-gray-500 border-2 transition`}
                                    ></button>
                                    <button
                                        className={`w-12 h-12 rounded-full bg-gray-200 border-2 transition`}
                                    ></button>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-gray-900 mb-3 block">Size</label>
                                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 bg-white">
                                    <option>14-inch Liquid Retina XDR display</option>
                                    <option>16-inch Liquid Retina XDR display</option>
                                </select>
                            </div>

                            {/* Memory Selection */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-gray-900 mb-3 block">Memory</label>
                                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 bg-white">
                                    <option>16GB unified memory</option>
                                    <option>32GB unified memory</option>
                                </select>
                            </div>

                            {/* Storage Selection */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-gray-900 mb-3 block">Storage</label>
                                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 bg-white">
                                    <option>1TV SSD Storage</option>
                                    <option>512GB SSD Storage</option>
                                </select>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-full sm:w-auto">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 hover:bg-gray-50 transition"
                                    >
                                        <Minus className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="w-16 text-center py-3 font-semibold focus:outline-none"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 hover:bg-gray-50 transition"
                                    >
                                        <Plus className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>

                                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
                                    <span>ADD TO CART</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>

                                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all">
                                    BUY NOW
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
                                    <Heart className="w-5 h-5" />
                                    <span className="text-sm font-semibold">Add to Wishlist</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <span className="text-sm font-semibold">Add to Compare</span>
                                </button>
                                <div className="ml-auto flex items-center gap-3">
                                    <span className="text-sm font-semibold text-gray-600">Share product:</span>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition text-sm font-bold">
                                            f
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition text-sm font-bold">
                                            t
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition text-sm font-bold">
                                            p
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Guarantee */}
                            <div className="mt-6 flex items-center gap-4 bg-purple-50 p-4 rounded-xl">
                                <svg className="w-12 h-12 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <div>
                                    <div className="font-semibold text-gray-900 mb-2">100% Guarantee Safe Checkout</div>
                                    <div className="flex gap-2">
                                        <div className="h-6 px-2 bg-blue-600 text-white text-xs font-bold rounded flex items-center">VISA</div>
                                        <div className="h-6 px-2 bg-red-600 text-white text-xs font-bold rounded flex items-center">MC</div>
                                        <div className="h-6 px-2 bg-blue-500 text-white text-xs font-bold rounded flex items-center">PayPal</div>
                                        <div className="h-6 px-2 bg-blue-700 text-white text-xs font-bold rounded flex items-center">AMEX</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Cards/>
            </div>
        </div>
    );
};

export default SinglePage;