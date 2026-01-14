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
    const slicedProducts = products?.slice(120, 130)

    return (
        <div className="container mx-auto px-2 sm:px-0 2xl:px-32 mt-5 sm:mt-10 relative">
            <h1 className="text-[26px] sm:text-[32px] font-medium text-center mb-6">
                Shop with Categories
            </h1>

            {/* Navigation Buttons */}
            <div className="hidden sm:flex category-prev absolute -left-5 top-[55%] z-10">
                <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <FaArrowLeftLong />
                </button>
            </div>
            <div className="hidden sm:flex category-next absolute -right-5 top-[55%] z-10">
                <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <FaArrowRightLong />
                </button>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: ".category-prev",
                    nextEl: ".category-next",
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                spaceBetween={15}
                slidesPerView={6}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView:6 },
                }}
            >
                {slicedProducts?.map((el) => (
                    <SwiperSlide key={el.id}>
                        <Link to={`/products/${el.id}`}>
                            <div className="w-[200px] h-[230px] rounded-[4px] border-[1px] border-[#E4E7E9] pt-[20px] flex items-center flex-col">
                                <img
                                    className="w-[148px] h-[148px] object-contain"
                                    src={el.thumbnail}
                                    alt={el.title}
                                />
                                <p className="text-[16px] line-clamp-1 text-[#191C1F] font-semibold pt-[16px] text-center">
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
