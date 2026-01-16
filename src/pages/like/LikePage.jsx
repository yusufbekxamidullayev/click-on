import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { removeToHeart } from '../../features/cartSlice';
import { FaHeart } from 'react-icons/fa';

const LikePage = () => {
    const cart = useSelector((state) => state.cart.heart);
    const dispatch = useDispatch();

    const removeItem = (item) => {
        dispatch(removeToHeart(item));
    };

    return (
        <div className="">
            {/* Header */}
            <div className='pb-4'>
                <div className="container mx-auto px-2 md:px-0 2xl:px-33 w-full transition-all duration-500 ease-in-out">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-[#1B6392]">Bosh sahifa</Link>
                        <span>/</span>
                        <span className="text-gray-900">Sevimlilar</span>
                    </div>
                </div>
            </div>

            <div className="container pb-5 mx-auto px-2 md:px-0 2xl:px-33 w-full transition-all duration-500 ease-in-out">
                {/* Title */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Heart className="w-7 h-7 text-[#1B6392] fill-[#1B6392]" />
                        Sevimlilar
                    </h1>
                    <p className="text-gray-600 mt-1">{cart?.length || 0} ta mahsulot</p>
                </div>

                {cart?.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center">
                                <Heart className="w-16 h-16 text-purple-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Sevimlilar bo'sh</h2>
                            <p className="text-gray-600 mb-8">Mahsulotlar sahifasida ❤️ belgisini bosing va sevimli mahsulotlaringiz shu yerda saqlansin</p>
                            <Link
                                to="/"
                                className="inline-block bg-[#1B6392] text-white font-semibold px-8 py-3 rounded-xl transition-all"
                            >
                                Bosh sahifaga o'tish
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                {cart?.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => dispatch(removeItem(item))}
                                            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <FaHeart className='text-sm text-[red] sm:text-base' />
                                        </button>

                                        {/* Image */}
                                        <div className="relative bg-gray-50 aspect-square p-4">
                                            <img
                                                src={item.thumbnail || item.image}
                                                alt={item.title || item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 md:p-4">
                                            {/* Title */}
                                            <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2 line-clamp-1">
                                                {item.title}
                                            </h3>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mb-3">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                                            </div>

                                            {/* Price */}
                                            <div className="mb-4">
                                                <div className="text-lg md:text-xl font-bold text-gray-900">
                                                    {item.price} so'm
                                                </div>
                                                <div className="text-xs text-gray-400 line-through">
                                                    {(item.price * 1.2).toFixed(0)} so'm
                                                </div>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button className="w-full bg-[#1B6392] text-white font-semibold py-2.5 md:py-3 rounded-xl transition-all text-sm md:text-base">
                                                Savatga qo'shish
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 sticky top-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Buyurtma
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Mahsulotlar ({cart?.length || 0}):</span>
                                        <span className="font-semibold text-gray-900">0 so'm</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Yetkazib berish:</span>
                                        <span className="font-semibold text-green-600">Bepul</span>
                                    </div>
                                    <div className="border-t border-gray-200">
                                    </div>
                                </div>

                                <Link
                                    to="/"
                                    className="block w-full bg-[#1B6392] text-white text-center font-semibold py-4 rounded-xl transition-all mb-4"
                                >
                                    Bosh Sahifa
                                </Link>

                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                                        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                                            <ShoppingCart className="w-5 h-5 text-[#1B6392]" />
                                        </div>
                                        <p>Buyurtmani ertaga yetkazib beramiz</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p>Mahsulotlar kafolati mavjud</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LikePage;