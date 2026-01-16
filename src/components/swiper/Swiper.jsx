import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import useGet from "../../hooks/useGet";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const ShopCategorySwiper = () => {
    const { data } = useGet({ url: "products?limit=194" });
    const products = data?.products;
    const slicedProducts = products?.slice(120, 130);

    return (
        <div className="container mx-auto px-2 sm:px-0 2xl:px-32 mt-5 sm:mt-10 relative">
            <h1 className="text-[26px] sm:text-[32px] font-medium text-center mb-6">
                Shop with Categories
            </h1>

            {/* Navigation Buttons */}
            <div className="category-prev absolute -left-2 top-[55%] z-10 sm:-left-5 cursor-pointer">
                <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <FaArrowLeftLong className="text-[12px] sm:text-[16px]" />
                </button>
            </div>
            <div className="category-next absolute -right-2 top-[55%] z-10 sm:-right-5 cursor-pointer">
                <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <FaArrowRightLong className="text-[12px] sm:text-[16px]" />
                </button>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: '.category-prev',
                    nextEl: '.category-next',
                }}
                loop={true}
                spaceBetween={20}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 24,
                    },
                    1536: {
                        slidesPerView: 6,
                        spaceBetween: 28,
                    },
                }}
            >
                {slicedProducts?.map((el) => (
                    <SwiperSlide key={el.id}>
                        <Link to={`/products/${el.id}`}>
                            <div className="w-full max-w-[220px] lg:max-w-[240px] xl:max-w-[260px] h-auto rounded border border-[#E4E7E9] flex flex-col items-center pt-4 pb-6">
                                <img
                                    className="w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px] h-auto object-contain"
                                    src={el.thumbnail}
                                    alt={el.title}
                                />
                                <p className="text-center text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#191C1F] pt-3 line-clamp-1">
                                    {el.title}
                                </p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ShopCategorySwiper;