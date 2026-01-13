import { useParams } from 'react-router-dom'
import useGet from '../../hooks/useGet';
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
const SinglePage = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const { id } = useParams()
    const { data } = useGet({ url: `products/${id}` })

    return (
        <section>
            <div className='container mx-auto'>
                <div className="max-w-[520px]">

                    {/* MAIN IMAGE */}
                    <Swiper
                        loop
                        spaceBetween={10}
                        navigation
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="rounded-xl border border-[#E4E7E9]"
                    >
                        {data?.images?.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="overflow-hidden rounded-xl">
                                    <img
                                        src={img}
                                        className="w-full h-[420px] object-contain transition-transform duration-300 hover:scale-105"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* THUMBNAILS */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={12}
                        slidesPerView={4}
                        freeMode
                        watchSlidesProgress
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mt-4"
                    >
                        {data?.images?.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="border border-[#E4E7E9] rounded-lg p-1 cursor-pointer hover:border-[#FA8232] transition">
                                    <img
                                        src={img}
                                        className="w-full h-[80px] object-contain"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </section>
    )
}


export default SinglePage