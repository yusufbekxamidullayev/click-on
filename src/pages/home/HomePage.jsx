import React from 'react'
import useGet from '../../hooks/useGet'
import { FaArrowRight, FaRegHeart } from 'react-icons/fa'
import { FiEye, FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeToCart } from '../../features/cartSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { FaArrowRightLong } from 'react-icons/fa6'
import { CiCreditCard1, CiTrophy } from 'react-icons/ci'
import { IoHeadsetOutline } from 'react-icons/io5'


const HomePage = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { data } = useGet({ url: "products?limit=194" })
    const { data: categories } = useGet({ url: "categories" });
    const products = data?.products;
    const slicedProducts = products?.slice(105, 113)
    const product = products ? products[0] : ""

    return (
        <>
            <section className='pb-[25px]'>
                <div className='container mx-auto'>
                    <div className='flex gap-5'>
                        <div>
                            <Swiper
                                effect="fade"
                                loop
                                autoplay={{ delay: 4000 }}
                                pagination={{ clickable: true }}
                                modules={[EffectFade, Autoplay, Pagination]}
                                className="w-[820px] h-[520px] rounded-md overflow-hidden mb-[30px]"
                            >
                                <SwiperSlide>
                                    <div className="flex items-center justify-between h-full bg-[#F2F4F5] px-16">
                                        <div>
                                            <p className="text-sm text-[#2DA5F3] font-medium">
                                                THE BEST PLACE TO PLAY
                                            </p>
                                            <h1 className="text-[39px] font-bold mt-2">
                                                Xbox Consoles
                                            </h1>
                                            <p className="text-[#5F6C72] mt-3 max-w-[400px]">
                                                Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.                                    </p>
                                            <button className="flex items-center gap-3 mt-6 bg-[#FA8232] text-white px-6 py-3 rounded">
                                                SHOP NOW
                                                <FaArrowRightLong />
                                            </button>
                                        </div>

                                        <img
                                            src="/station.png"
                                            className="h-[420px] object-contain"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex items-center justify-between h-full bg-[#F2F4F5] px-16">
                                        <div>
                                            <p className="text-sm text-[#2DA5F3] font-medium">
                                                THE BEST PLACE TO PLAY
                                            </p>
                                            <h1 className="text-[39px] font-bold mt-2">
                                                PlayStation
                                            </h1>
                                            <p className="text-[#5F6C72] mt-3 max-w-[400px]">
                                                Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.                                    </p>
                                            <button className="flex items-center gap-3 mt-6 bg-[#FA8232] text-white px-6 py-3 rounded">
                                                SHOP NOW
                                                <FaArrowRightLong />
                                            </button>
                                        </div>

                                        <img
                                            src="/pls.png"
                                            className="h-[420px] object-contain"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div>
                            <div className="relative overflow-hidden w-[450px] h-[250px] bg-black rounded-[6px] px-[40px] py-[60px] ">
                                <p className="font-[Public_Sans] text-[#EBC80C] text-[14px] font-[500] leading-[20px] tracking-[0px] uppercase ">Summer Sales</p>
                                <h3 className="font-[Public_Sans] w-[150px] pb-[20px] pt-[5px] font-[600] text-[24px] leading-[32px] tracking-[0px] text-[white] ">New Google Pixel 6 Pro</h3>
                                <a className="bg-[#FA8232] hover:bg-[black] border-2 border-black hover:border-[#FA8232] inline-flex rounded-[3px] text-[white] uppercase items-center gap-[10px]  px-[20px] py-[8px]  " href="/shop" data-discover="true">
                                    <span className="font-[Public_Sans] text-[14px] font-[700] leading-[32px] tarcking-[1.2%] flex items-center gap-2">
                                        Shop Now
                                        <FaArrowRightLong />
                                    </span>
                                </a>
                                <div className="bg-[#EFD33D] px-[10px] py-[5px] rounded-[3px] absolute z-10 top-6 right-6 ">
                                    <p className="font-[Public_Sans] font-[600] text-[16px] leading-[24px] tracking-[0px]  ">29% OFF</p>
                                </div>
                                <div className="absolute top-[40px] z-0 w-[300px] h-[350px] right-[-60px]  ">
                                    <img className="w-full h-full object-cover " src="/tel.png" alt="Images tel"></img   >
                                </div>
                            </div>
                            <div className="flex flex-row-reverse justify-between  overflow-hidden w-[450px] h-[250px] bg-[#F2F4F5] rounded-[6px] px-[40px] py-[40px]">
                                <div className="w-[150px]">
                                    <h3 className="font-[Public_Sans]  pb-[10px] pt-[5px] font-[600] text-[24px] leading-[32px] tracking-[0px] text-[black]">Xiaomi FlipBuds Pro</h3>
                                    <p className="font-[Public_Sans] pb-[10px] text-[#2DA5F3] font-[600] text-[18px] leading-[24px] tracking-[0px]  ">$299 USD</p>
                                    <a className="bg-[#FA8232] hover:bg-[#F2F4F5] border-2 border-[#F2F4F5] hover:border-[#FA8232] group inline-flex rounded-[3px] text-[white] uppercase items-center gap-[10px]  px-[20px] py-[8px]  " href="" data-discover="true">
                                        <span className="font-[Public_Sans] group-hover:text-[black] text-[14px] font-[700] leading-[32px] tarcking-[1.2%]  ">Shop Now</span>
                                    </a>
                                </div>
                                <div className="w-[170px] h-[170px] ">
                                    <img className="w-full h-full object-cover" src="/airpods.png" alt="Airpods"></img>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='flex items-center justify-center mb-[50px] gap-15 border-[1px] border-[#E4E7E9] py-[25px]'>
                        <div className='w-[250px] h-[50px] flex items-center gap-5 border-r-[1px] border-[#E4E7E9]'>
                            <img src="/Package.png" alt="" />
                            <div>
                                <p className='text-[16px] text-[#000000]'>Fasted Delivery</p>
                                <p className='text-[14px] text-[#5F6C72]'>Delivery in 24/H</p>
                            </div>
                        </div>
                        <div className='w-[270px] h-[50px] flex items-center gap-5 border-r-[1px] border-[#E4E7E9]'>
                            <CiTrophy className='text-[35px]' />
                            <div>
                                <p className='text-[16px] text-[#000000]'>24 Hours Return</p>
                                <p className='text-[14px] text-[#5F6C72]'>100% money-back guarantee</p>
                            </div>
                        </div>
                        <div className='w-[250px] h-[50px] flex items-center gap-5 border-r-[1px] border-[#E4E7E9]'>
                            <CiCreditCard1 className='text-[35px]' />
                            <div>
                                <p className='text-[16px] text-[#000000]'>Secure Payment</p>
                                <p className='text-[14px] text-[#5F6C72]'>Your money is safe</p>
                            </div>
                        </div>
                        <div className='w-[250px] h-[50px] flex items-center gap-5 '>
                            <IoHeadsetOutline className='text-[35px]' />
                            <div>
                                <p className='text-[16px] text-[#000000]'>Support 24/7</p>
                                <p className='text-[14px] text-[#5F6C72]'>Live contact/message</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between pb-[25px]'>
                        <div className='flex items-center gap-6'>
                            <h1 className='text-[24px] font-medium'>Best Deals</h1>
                            <p className='text-[16px] text-[#000000]'>Deals ends in</p>
                            <button className='w-[175px] h-[35px] bg-[#F3DE6D] rounded-[3px] flex items-center gap-[6px] justify-center'>
                                <p className='text-[16px] text-[#191C1F]'>16d</p>
                                <p className='text-[16px] text-[#191C1F]'>:</p>
                                <p className='text-[16px] text-[#191C1F]'>21h</p>
                                <p className='text-[16px] text-[#191C1F]'>:</p>
                                <p className='text-[16px] text-[#191C1F]'>57m</p>
                                <p className='text-[16px] text-[#191C1F]'>:</p>
                                <p className='text-[16px] text-[#191C1F]'>23s</p>
                            </button>
                        </div>
                        <Link to={"/products"} className='flex items-center gap-2'>
                            <p className='text-[16px] font-semibold text-[#2DA5F3]'>Browse All Product</p>
                            <FaArrowRight className='text-[16px] text-[#2DA5F3]' />
                        </Link>
                    </div>
                    <div className='flex'>
                        <div className='max-w-[310px] border-[1px] border-[#E4E7E9] p-2'>
                            <div>
                                <img className='w-[280px] h-[300px]' src="/playstation.png" alt="" />
                            </div>
                            <div>
                                <img className='pt-5' src="/rating.png" alt="" />
                                <p className='line-clamp-2 text-[16px] text-[#191C1F] pt-2'>{product?.description}</p>
                                <p className='text-[16px] text-[#2DA5F3] font-medium pt-3'>$442.12</p>
                                <p className='text-[14px] text-[#5F6C72] pt-3'>Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.</p>
                                <div className='flex items-center gap-[8px] pt-6'>
                                    <button className='bg-[#FFE7D6] w-[48px] h-[48px] rounded-[3px] flex items-center justify-center cursor-pointer'>
                                        <FaRegHeart className='text-[24px]' />
                                    </button>
                                    <button className='w-[160px] h-[48px] bg-[#FA8232] rounded-[3px] flex items-center justify-center gap-2 cursor-pointer'>
                                        <FiShoppingCart className='text-[20px] text-[white]' />
                                        <p className='text-[14px] text-[white] font-bold'>ADD TO CARD</p>
                                    </button>
                                    <button className='bg-[#FFE7D6] w-[48px] h-[48px] rounded-[3px] flex items-center justify-center cursor-pointer'>
                                        <FiEye className='text-[24px]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4'>

                            {slicedProducts?.map((el) => (
                                <div className="group relative max-w-[250px] border border-[#E4E7E9] p-2 overflow-hidden">

                                    {/* IMAGE */}
                                    <img
                                        className="w-[210px] mx-auto transition-transform duration-300 group-hover:scale-105"
                                        src={el.thumbnail}
                                        alt=""
                                    />

                                    {/* BLUR OVERLAY (faqat rasm ustida) */}
                                    {/* ICONS */}
                                    {/* ICONS */}
                                    {/* ICONS + FULL IMAGE BLUR */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">

                                        {/* FULL IMAGE BLUR */}
                                        <div
                                            className="
            absolute inset-0
            bg-gray-500/40
            backdrop-blur-sm
            rounded-md
            transition-all duration-300
            -z-10
        "
                                        />

                                        {/* ICONS */}
                                        <div className="flex gap-4 z-20">
                                            {/* LEFT */}
                                            <button className="bg-white p-3 rounded-full shadow
            -translate-x-6 opacity-0
            group-hover:translate-x-0 group-hover:opacity-100
            transition-all duration-300
            hover:bg-[#FA8232] hover:text-white">
                                                <FaRegHeart />
                                            </button>

                                            {/* CENTER */}
                                            {cart.find((item) => item.id === el.id) ? (
                                                <button
                                                    onClick={() => dispatch(removeToCart(el))}
                                                    className="bg-white p-3 rounded-full shadow
                scale-0 group-hover:scale-100
                transition-transform duration-300
                hover:bg-[#FA8232] hover:text-white"
                                                >
                                                    <BsFillCartDashFill />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => dispatch(addToCart(el))}
                                                    className="bg-white p-3 rounded-full shadow
                scale-0 group-hover:scale-100
                transition-transform duration-300
                hover:bg-[#FA8232] hover:text-white"
                                                >
                                                    <BsFillCartPlusFill />
                                                </button>
                                            )}

                                            {/* RIGHT */}
                                            <Link
                                                to={`/products/${el.id}`}
                                                className="bg-white p-3 rounded-full shadow
            translate-x-6 opacity-0
            group-hover:translate-x-0 group-hover:opacity-100
            transition-all duration-300
            hover:bg-[#FA8232] hover:text-white"
                                            >
                                                <FiEye />
                                            </Link>
                                        </div>
                                    </div>




                                    {/* TEXT */}
                                    <div className="pt-2 relative z-10">
                                        <p className="line-clamp-2 text-[16px] text-[#191C1F]">
                                            {el.description}
                                        </p>
                                        <p className="text-[16px] text-[#2DA5F3] font-medium pt-2">
                                            ${el.price}
                                        </p>
                                    </div>
                                </div>


                            ))}
                        </div>
                    </div>
                    <h1 className='text-[32px] text-[#191C1F] font-semibold text-center pt-[70px]'>Shop with Categorys</h1>

                    
                </div>
            </section>
        </>
    )
}

export default HomePage