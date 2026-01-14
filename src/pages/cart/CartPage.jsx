import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { removeToCart, updateQty } from '../../features/cartSlice';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CartPage = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleUpdateQty = (item, newQty) => {
        if (newQty < 1) return;
        dispatch(updateQty({ id: item.id, qty: newQty }));
    };

    const removeItem = (item) => {
        dispatch(removeToCart(item));
    };

    const calculateSubtotal = () => {
        return cart?.reduce((sum, item) => sum + (item.price * item.qty), 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = subtotal > 0 ? 'Bepul' : 0;
    const discount = 64;
    const tax = 61.99;
    const total = subtotal - discount + tax;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-2 md:px-0 2xl:px-33">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
                        Shopping Card
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6">
                                <div className="grid grid-cols-12 gap-4 pb-4 border-b border-[#E4E7E9] text-sm font-semibold text-gray-600 uppercase">
                                    <div className="col-span-5">Mahsulot</div>
                                    <div className="col-span-2 text-center">Narx</div>
                                    <div className="col-span-3 text-center">Miqdor</div>
                                    <div className="col-span-2 text-center">Jami</div>
                                </div>

                                {cart?.length === 0 ? (
                                    <div className="py-16 text-center text-gray-500">
                                        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                        <p className="text-lg">Savatingiz bo'sh</p>
                                        <div className='flex items-center justify-center pt-5'>
                                            <Link to={"/"} className='w-[170px] h-[35px] border-[1px] border-orange-600 rounded-[3px] flex items-center gap-2 justify-center'>
                                                <p className='text-[15px] text-orange-600'><FaArrowLeftLong /></p>
                                                <p className='text-[15px] text-orange-600 font-semibold'> Return to Shop</p>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {cart?.map((item) => (
                                            <div key={item.id} className="grid grid-cols-12 gap-4 py-6 items-center border-[#E4E7E9]">
                                                <div className="col-span-5 flex items-center gap-4">
                                                    <button
                                                        onClick={() => removeItem(item)}
                                                        className="text-red-500 hover:text-red-700 transition"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={item.thumbnail || item.image}
                                                                alt={item.title || item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-2 text-center">
                                                    <span className="text-gray-900 font-semibold">
                                                        ${item.price}
                                                    </span>
                                                </div>

                                                <div className="col-span-3 flex justify-center">
                                                    <div className="flex items-center border-[1px] border-[#E4E7E9] rounded-[3px]">
                                                        <button
                                                            onClick={() => handleUpdateQty(item, item.qty - 1)}
                                                            className="px-3 py-2 "
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <input
                                                            value={item.qty}
                                                            onChange={(e) => handleUpdateQty(item, parseInt(e.target.value) || 1)}
                                                            className="w-16 text-center py-2 "
                                                        />
                                                        <button
                                                            onClick={() => handleUpdateQty(item, item.qty + 1)}
                                                            className="px-3 py-2 "
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-span-2 text-center">
                                                    <span className="text-gray-900 font-bold">
                                                        ${(item.price * item.qty).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {cart?.length > 0 && (
                                <div className="flex items-center justify-between mx-[25px] pb-5 gap-2 sm:gap-0">
                                    <Link to={"/"} className='w-[170px] h-[35px] border-[1px] border-[#2DA5F3] rounded-[3px] flex items-center gap-2 justify-center'>
                                        <p className='text-[15px] text-[#2DA5F3]'><FaArrowLeftLong /></p>
                                        <p className='text-[15px] text-[#2DA5F3] font-semibold'> Return to Shop</p>
                                    </Link>
                                    <button className='w-[140px] h-[35px] border-[1px] border-[#2DA5F3] rounded-[3px] flex items-center gap-2 justify-center'>
                                        <p className='text-[15px] text-[#2DA5F3] font-semibold'> Update cart</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Card Totals Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Savat Jami</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Oraliq jami</span>
                                    <span className="font-semibold text-gray-900">${subtotal?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Yetkazib berish</span>
                                    <span className="font-semibold text-gray-900">
                                        {typeof shipping === 'string' ? shipping : `$${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Chegirma</span>
                                    <span className="font-semibold text-gray-900">${discount}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 pb-4 border-b border-[#E4E7E9]">
                                    <span>Soliq</span>
                                    <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg pt-2">
                                    <span className="font-bold text-gray-900">Jami</span>
                                    <span className="font-bold text-orange-500">${total.toFixed(2)} USD</span>
                                </div>
                            </div>

                            <Link to={"/order"} className=" flex items-center gap-2 justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
                                <p>Rasmiylashtirish</p>    
                                <p><FaArrowRight /></p>
                            </Link>

                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Promokod</h3>
                                <input
                                    type="text"
                                    placeholder="Promokod"
                                    className="w-full px-4 py-3 border border-[#E4E7E9] rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="w-full border-[1px] border-blue-500 duration-300 hover:bg-blue-500 text-blue-500 hover:text-[white] font-semibold py-2 rounded-lg transition">
                                    Kiritish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;