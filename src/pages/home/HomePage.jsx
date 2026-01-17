import React from 'react'
import useGet from '../../hooks/useGet'
import { FaArrowRight, FaHeart, FaRegHeart } from 'react-icons/fa'
import { FiEye, FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToHeart, removeToCart, removeToHeart } from '../../features/cartSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { FaArrowRightLong } from 'react-icons/fa6'
import { CiCreditCard1, CiTrophy } from 'react-icons/ci'
import { IoHeadsetOutline } from 'react-icons/io5'
import ShopCategorySwiper from '../../components/swiper/Swiper'


const HomePage = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const heart = useSelector((state) => state.cart.heart)
    const { data } = useGet({ url: "products?limit=194" })
    const products = data?.products;
    const slicedProducts = products?.slice(105, 113)
    const product = products ? products[0] : ""

    return (
        <>
            <section className='pb-[25px]'>
                <div className='container mx-auto px-2 md:px-0 2xl:px-33 w-full transition-all duration-500 ease-in-out'>
                    {/* Hero Section */}
                    <div className='flex flex-col xl:flex-row gap-5 mb-8'>
                        <div className=''>
                            <Swiper
                                effect="fade"
                                loop
                                autoplay={{ delay: 4000 }}
                                pagination={{ clickable: true }}
                                modules={[EffectFade, Autoplay, Pagination]}
                                className="w-full lg:w-[820px] h-[300px] sm:h-[400px] lg:h-[520px] rounded-md overflow-hidden mb-[30px]"
                            >
                                <SwiperSlide>
                                    <div className="flex flex-col sm:flex-row items-center justify-between h-full bg-[#F2F4F5] px-6 md:px-12 lg:px-16 py-8 md:py-0">
                                        <div className='max-w-full md:max-w-[400px]'>
                                            <p className="text-xs sm:text-sm text-[#2DA5F3] font-medium">
                                                THE BEST PLACE TO PLAY
                                            </p>
                                            <h1 className="text-2xl sm:text-3xl lg:text-[39px] font-bold mt-2">
                                                Xbox Consoles
                                            </h1>
                                            <p className="text-[#5F6C72] mt-3 text-sm sm:text-base">
                                                Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
                                            </p>
                                            <button className="flex items-center gap-3 mt-6 bg-[#FA8232] text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-sm">
                                                SHOP NOW
                                                <FaArrowRightLong />
                                            </button>
                                        </div>

                                        <img
                                            src="/station.png"
                                            className="h-[200px] hidden sm:block sm:h-[300px] lg:h-[420px] object-contain mt-6 md:mt-0"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex flex-col sm:flex-row items-center justify-between h-full bg-[#F2F4F5] px-6 md:px-12 lg:px-16 py-8 md:py-0">
                                        <div className='max-w-full md:max-w-[400px]'>
                                            <p className="text-xs sm:text-sm text-[#2DA5F3] font-medium">
                                                THE BEST PLACE TO PLAY
                                            </p>
                                            <h1 className="text-2xl sm:text-3xl lg:text-[39px] font-bold mt-2">
                                                PlayStation
                                            </h1>
                                            <p className="text-[#5F6C72] mt-3 text-sm sm:text-base">
                                                Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
                                            </p>
                                            <button className="flex items-center gap-3 mt-6 bg-[#FA8232] text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-sm">
                                                SHOP NOW
                                                <FaArrowRightLong />
                                            </button>
                                        </div>

                                        <img
                                            src="/pls.png"
                                            className="h-[200px] hidden sm:block sm:h-[300px] lg:h-[420px] object-contain mt-6 md:mt-0"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        {/* Side Cards */}
                        <div className='flex flex-col gap-5 w-full sm:flex-row w-auto xl:flex-col'>
                            <div className="relative overflow-hidden w-full lg:w-[430px] h-[250px] bg-black rounded-[6px] px-6 sm:px-[40px] py-[40px] sm:py-[60px]">
                                <p className="font-[Public_Sans] text-[#EBC80C] text-[12px] sm:text-[14px] font-[500] leading-[20px] tracking-[0px] uppercase">Summer Sales</p>
                                <h3 className="font-[Public_Sans] w-[120px] sm:w-[150px] pb-[15px] sm:pb-[20px] pt-[5px] font-[600] text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] tracking-[0px] text-[white]">New Google Pixel 6 Pro</h3>
                                <a className="bg-[#FA8232] hover:bg-[black] border-2 border-black hover:border-[#FA8232] inline-flex rounded-[3px] text-[white] uppercase items-center gap-[10px] px-[16px] sm:px-[20px] py-[6px] sm:py-[8px]" href="/shop" data-discover="true">
                                    <span className="font-[Public_Sans] text-[12px] sm:text-[14px] font-[700] leading-[32px] tarcking-[1.2%] flex items-center gap-2">
                                        Shop Now
                                        <FaArrowRightLong />
                                    </span>
                                </a>
                                <div className="bg-[#EFD33D] px-[8px] sm:px-[10px] py-[5px] rounded-[3px] absolute z-10 top-4 sm:top-6 right-4 sm:right-6">
                                    <p className="font-[Public_Sans] font-[600] text-[14px] sm:text-[16px] leading-[24px] tracking-[0px]">29% OFF</p>
                                </div>
                                <div className="absolute top-[40px] z-0 w-[250px] sm:w-[300px] h-[300px] sm:h-[350px] right-[-50px] sm:right-[-60px]">
                                    <img className="w-full h-full object-cover" src="/tel.png" alt="Images tel" />
                                </div>
                            </div>

                            <div className="flex flex-row-reverse justify-between overflow-hidden w-full lg:w-[430px] h-[250px] bg-[#F2F4F5] rounded-[6px] px-6 sm:px-[40px] py-[30px] sm:py-[40px]">
                                <div className="w-[120px] sm:w-[150px]">
                                    <h3 className="font-[Public_Sans] pb-[10px] pt-[5px] font-[600] text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] tracking-[0px] text-[black]">Xiaomi FlipBuds Pro</h3>
                                    <p className="font-[Public_Sans] pb-[10px] text-[#2DA5F3] font-[600] text-[16px] sm:text-[18px] leading-[24px] tracking-[0px]">$299 USD</p>
                                    <a className="bg-[#FA8232] hover:bg-[#F2F4F5] border-2 border-[#F2F4F5] hover:border-[#FA8232] group inline-flex rounded-[3px] text-[white] uppercase items-center gap-[10px] px-[16px] sm:px-[20px] py-[6px] sm:py-[8px]" href="" data-discover="true">
                                        <span className="font-[Public_Sans] group-hover:text-[black] text-[12px] sm:text-[14px] font-[700] leading-[32px] tarcking-[1.2%]">Shop Now</span>
                                    </a>
                                </div>
                                <div className="w-[140px] sm:w-[170px] h-[140px] sm:h-[170px]">
                                    <img className="w-full h-full object-cover" src="/airpods.png" alt="Airpods" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className='grid grid-cols-2 sm:flex flex-row flex-wrap items-center justify-center mb-[50px] gap-4 sm:gap-6 lg:gap-15 border-[1px] border-[#E4E7E9] py-[25px] px-4'>
                        <div className='w-full sm:w-[250px] h-[50px] flex items-center gap-3 sm:gap-5 sm:border-r-[1px] border-[#E4E7E9]'>
                            <img src="/Package.png" alt="" className='w-[30px] sm:w-auto' />
                            <div>
                                <p className='text-[14px] sm:text-[16px] text-[#000000]'>Fasted Delivery</p>
                                <p className='text-[12px] sm:text-[14px] text-[#5F6C72]'>Delivery in 24/H</p>
                            </div>
                        </div>
                        <div className='w-full sm:w-[270px] h-[50px] flex items-center gap-3 sm:gap-5 sm:border-r-[1px] border-[#E4E7E9]'>
                            <CiTrophy className='text-[30px] sm:text-[35px]' />
                            <div>
                                <p className='text-[14px] sm:text-[16px] text-[#000000]'>24 Hours Return</p>
                                <p className='text-[12px] sm:text-[14px] text-[#5F6C72]'>100% money-back guarantee</p>
                            </div>
                        </div>
                        <div className='w-full sm:w-[250px] h-[50px] flex items-center gap-3 sm:gap-5 sm:border-r-[1px] border-[#E4E7E9]'>
                            <CiCreditCard1 className='text-[30px] sm:text-[35px]' />
                            <div>
                                <p className='text-[14px] sm:text-[16px] text-[#000000]'>Secure Payment</p>
                                <p className='text-[12px] sm:text-[14px] text-[#5F6C72]'>Your money is safe</p>
                            </div>
                        </div>
                        <div className='w-full sm:w-[250px] h-[50px] flex items-center gap-3 sm:gap-5'>
                            <IoHeadsetOutline className='text-[30px] sm:text-[35px]' />
                            <div>
                                <p className='text-[14px] sm:text-[16px] text-[#000000]'>Support 24/7</p>
                                <p className='text-[12px] sm:text-[14px] text-[#5F6C72]'>Live contact/message</p>
                            </div>
                        </div>
                    </div>

                    {/* Best Deals Header */}
                    <div className='flex items-start sm:items-center justify-between pb-[25px] gap-4'>
                        <div className='flex items-start sm:items-center gap-4 sm:gap-6'>
                            <h1 className='text-[20px] sm:text-[24px] font-medium'>Best Deals</h1>
                            <p className='hidden sm:text-[14px] sm:text-[16px] text-[#000000]'>Deals ends in</p>
                            <button className='hidden sm:w-[150px] sm:w-[175px] h-[35px] bg-[#F3DE6D] rounded-[3px] flex items-center gap-[4px] sm:gap-[6px] justify-center'>
                                <p className='text-[14px] sm:text-[16px] text-[#191C1F]'>16d</p>
                                <p className='text-[14px] sm:text-[16px] text-[#191C1F]'>:</p>
                                <p className='text-[14px] sm:text-[16px] text-[#191C1F]'>21h</p>
                                <p className='text-[14px] sm:text-[16px] text-[#191C1F]'>:</p>
                                <p className='text-[14px] sm:text-[16px] text-[#191C1F]'>57m</p>
                                <p className='text-[14px] sm:text-[16px] text-[#191C1F]'>:</p>
                                <p className='text-[14px] sm:text-[16px] text-[#191C1F]'>23s</p>
                            </button>
                        </div>
                        <Link to={"/products"} className='flex items-center gap-2'>
                            <p className='text-[14px] sm:text-[16px] font-semibold text-[#2DA5F3]'>Browse All Product</p>
                            <FaArrowRight className='text-[14px] sm:text-[16px] text-[#2DA5F3]' />
                        </Link>
                    </div>

                    {/* Products Section */}
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <div className='w-full lg:max-w-[310px] border-[1px] border-[#E4E7E9] p-2'>
                            <div>
                                <img className='w-full h-[250px] sm:h-[300px] object-contain' src="/playstation.png" alt="" />
                            </div>
                            <div>
                                <img className='pt-5' src="/rating.png" alt="" />
                                <p className='line-clamp-2 text-[14px] sm:text-[16px] text-[#191C1F] pt-2'>{product?.description}</p>
                                <p className='text-[14px] sm:text-[16px] text-[#2DA5F3] font-medium pt-3'>$442.12</p>
                                <p className='text-[12px] sm:text-[14px] text-[#5F6C72] pt-3'>Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.</p>
                                <div className='flex items-center gap-[8px] pt-6'>
                                    <button className='bg-[#FFE7D6] w-[48px] h-[48px] rounded-[3px] flex items-center justify-center cursor-pointer'>
                                        <FaRegHeart className='text-[20px] sm:text-[24px]' />
                                    </button>
                                    <button className='flex-1 sm:w-[160px] h-[48px] bg-[#FA8232] rounded-[3px] flex items-center justify-center gap-2 cursor-pointer'>
                                        <FiShoppingCart className='text-[18px] sm:text-[20px] text-[white]' />
                                        <p className='text-[12px] sm:text-[14px] text-[white] font-bold'>ADD TO CARD</p>
                                    </button>
                                    <button className='bg-[#FFE7D6] w-[48px] h-[48px] rounded-[3px] flex items-center justify-center cursor-pointer'>
                                        <FiEye className='text-[20px] sm:text-[24px]' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
                            {slicedProducts?.map((el) => (
                                <div key={el.id} className="group relative w-full max-w-[250px] border border-[#E4E7E9] p-2 overflow-hidden">
                                    <img
                                        className="w-full h-[150px] sm:h-[210px] mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                        src={el.thumbnail}
                                        alt=""
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <div className="absolute inset-0 bg-gray-500/40 backdrop-blur-sm rounded-md transition-all duration-300 -z-10" />

                                        <div className="flex gap-2 sm:gap-4 z-20">
                                            {heart?.find((item) => item.id === el.id) ? (
                                                <button
                                                onClick={() => dispatch(removeToHeart(el))}
                                                className="bg-white p-2 sm:p-3 rounded-full shadow -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FA8232] hover:text-white">
                                                    <FaHeart className='text-sm text-[red] sm:text-base' />
                                                </button>
                                            ) : (
                                                    <button
                                                    onClick={() => dispatch(addToHeart(el))}
                                                     className="bg-white p-2 sm:p-3 rounded-full shadow -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FA8232] hover:text-white">
                                                        <FaRegHeart className='text-sm sm:text-base' />
                                                    </button>
                                            )}

                                            {cart?.find((item) => item.id === el.id) ? (
                                                <button
                                                    onClick={() => dispatch(removeToCart(el))}
                                                    className="bg-white p-2 sm:p-3 rounded-full shadow scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-[#FA8232] hover:text-white"
                                                >
                                                    <BsFillCartDashFill className='text-sm sm:text-base' />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => dispatch(addToCart(el))}
                                                    className="bg-white p-2 sm:p-3 rounded-full shadow scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-[#FA8232] hover:text-white"
                                                >
                                                    <BsFillCartPlusFill className='text-sm sm:text-base' />
                                                </button>
                                            )}

                                            <Link
                                                to={`/products/${el.id}`}
                                                className="bg-white p-2 sm:p-3 rounded-full shadow translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FA8232] hover:text-white"
                                            >
                                                <FiEye className='text-sm sm:text-base' />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="pt-2 relative z-10">
                                        <p className="line-clamp-2 text-[14px] sm:text-[16px] text-[#191C1F]">
                                            {el.description}
                                        </p>
                                        <p className="text-[14px] sm:text-[16px] text-[#2DA5F3] font-medium pt-2">
                                            ${el.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ShopCategorySwiper />

                    {/* Bottom Banners */}
                    <div className='flex flex-col lg:flex-row items-center gap-5 pt-[70px]'>
                        <div className="flex flex-col sm:flex-row justify-between w-full lg:w-[50%] bg-[#F2F4F5] p-[20px] sm:p-[30px] rounded-[4px]">
                            <div className="max-w-[280px] w-full">
                                <span className="bg-[#2DA5F3] text-white px-[10px] py-[5px] rounded-[3px] font-[Public_Sans] font-[600] text-[12px] sm:text-[14px] leading-[20px] tracking-[0px]">INTRODUCING</span>
                                <h3 className="font-[Public_Sans] py-[15px] font-[600] text-[24px] sm:text-[32px] leading-[32px] sm:leading-[40px] tracking-[0px]">New Apple Homepod Mini</h3>
                                <p className="font-[Public_Sans] pb-[20px] font-[400] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#475156] tracking-[0px]">Jam-packed with innovation, HomePod mini delivers unexpectedly.</p>
                                <button className='flex items-center gap-2 w-[130px] sm:w-[150px] h-[40px] sm:h-[43px] bg-[#FA8232] rounded-[4px] justify-center cursor-pointer'>
                                    <p className='text-[13px] sm:text-[15px] text-[#FFFFFF] font-semibold'>Shop now</p>
                                    <FaArrowRightLong className='text-[#FFFFFF] text-[12px] sm:text-[14px]' />
                                </button>
                            </div>
                            <div className='mt-4 sm:mt-0'>
                                <img src="/alisa.png" alt="" className='w-full max-w-[200px] mx-auto' />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row relative overflow-hidden justify-between w-full lg:w-[50%] bg-[#191C1F] p-[20px] sm:p-[30px] rounded-[4px]">
                            <div className="max-w-[280px] w-full z-10">
                                <span className="bg-[#2DA5F3] text-white px-[10px] py-[5px] rounded-[3px] font-[Public_Sans] font-[600] text-[12px] sm:text-[14px] leading-[20px] tracking-[0px]">INTRODUCING NEW</span>
                                <h3 className="font-[Public_Sans] py-[15px] text-white font-[600] text-[24px] sm:text-[32px] leading-[32px] sm:leading-[40px] tracking-[0px]">Xiaomi Mi 11 Ultra 12GB+256GB</h3>
                                <p className="font-[Public_Sans] pb-[20px] font-[400] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#ADB7BC] tracking-[0px]">*Data provided by internal laboratories. Industry measurment.</p>
                                <button className='flex items-center gap-2 w-[130px] sm:w-[150px] h-[40px] sm:h-[43px] bg-[#FA8232] rounded-[4px] justify-center cursor-pointer'>
                                    <p className='text-[13px] sm:text-[15px] text-[#FFFFFF] font-semibold'>Shop now</p>
                                    <FaArrowRightLong className='text-[#FFFFFF] text-[12px] sm:text-[14px]' />
                                </button>
                            </div>
                            <div className="absolute w-[180px] sm:w-[240px] right-4 sm:right-8 top-1/2 -translate-y-1/2">
                                <img className="w-full h-full object-cover" src="/telefon.png" alt="Shar" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage