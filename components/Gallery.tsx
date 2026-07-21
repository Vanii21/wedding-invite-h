"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCoverflow } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"

const images = ["/img/IMG_0004.jpeg", "/img/IMG_0002.jpeg", "/img/IMG_0003.jpeg", "/img/IMG_0001.jpeg"]

export default function Gallery() {
    return (
        <section
            className="relative mx-auto w-full max-w-xl py-10"
            style={{ backgroundColor: "#9aa5a5" }}
        >
            <h2 className="mt-8 text-center text-6xl text-white md:text-7xl" style={{ fontFamily: "var(--font-mea-culpa)" }}>
                Nosotros
            </h2>

            <div className="my-8 flex items-center justify-center gap-3 px-10">
                <div className="h-px flex-1 bg-white/85" />
                <div className="h-2 w-2 rounded-full bg-white" />
                <div className="h-px flex-1 bg-white/85" />
            </div>

            <Swiper
                modules={[Autoplay, EffectCoverflow]}
                effect="coverflow"
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 120,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                speed={1200}
                loop
                centeredSlides
                slidesPerView={1.4}
                spaceBetween={16}
                className="w-full"
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <div
                                className="overflow-hidden rounded-3xl"
                                style={{
                                    aspectRatio: "3/4",
                                    opacity: isActive ? 1 : 0.5,
                                    transform: isActive ? "scale(1)" : "scale(0.92)",
                                    transition: "opacity 0.6s ease, transform 0.6s ease",
                                }}
                            >
                                <div className="relative h-full w-full">
                                    <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover" />
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
