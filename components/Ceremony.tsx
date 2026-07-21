"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import { MapPin, Navigation, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "swiper/css"
import "swiper/css/effect-fade"
import Image from "next/image"

const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=14.686124%2C-90.641692"
const WAZE_URL = "https://waze.com/ul/h9fxe93s8z"

export default function Ceremony() {
    const [showModal, setShowModal] = useState(false)
    const images = ["/img/ceremony.jpeg", "/img/ceremony2.jpeg"]

    return (
        <section className="relative mx-auto max-w-xl bg-white text-center">
            <Image
                src="/img/divisor.png"
                alt="divisor"
                width={430}
                height={60}
                className="block w-full -scale-y-100"
                style={{ marginBottom: "-1px" }}
            />

            <motion.div
                className="absolute bottom-20 left-5 z-10 w-40"
                style={{ transformOrigin: "top left" }}
                animate={{ rotate: [40, 34, 40] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image
                    src="/img/flower3.png"
                    alt="flower"
                    width={120}
                    height={120}
                    className="object-contain scale-x-[-1]"
                    style={{ transform: "translateX(10%) rotate(220deg) scaleX(-1)" }}
                />
            </motion.div>

            <h2 className="mb-2 pt-10 text-6xl font-light text-[#879696] md:text-7xl">Santa Misa</h2>

            <p className="mb-6 mt-2 text-sm font-bold uppercase tracking-widest text-[#212121]" style={{ fontFamily: "var(--font-raleway)" }}>
                3a Calle, San Pedro Sacatepequez, Guatemala
            </p>

            <div className="mb-6 px-4">
                <div className="w-full overflow-hidden rounded-3xl shadow-md">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        speed={2000}
                        loop
                        className="h-[200px] w-full md:h-[300px]"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <p className="mb-6 text-3xl font-light tracking-widest text-[#9aa5a5]" style={{ fontFamily: "var(--font-raleway)" }}>
                16:30 h
            </p>

            <button className="mx-auto mb-8 flex flex-col items-center gap-1" onClick={() => setShowModal(true)}>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                    <MapPin className="text-[#9aa5a5]" size={40} strokeWidth={1.5} />
                </motion.div>
                <p className="text-xs tracking-wide text-[#444]" style={{ fontFamily: "var(--font-raleway)" }}>
                    Ver ubicacion
                </p>
            </button>

            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                        />

                        <motion.div
                            className="fixed z-50 w-[80vw] max-w-sm rounded-3xl bg-white px-8 py-8 shadow-xl"
                            style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <button className="absolute right-4 top-4 text-[#aaa]" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>

                            <p className="mb-1 text-2xl font-light text-[#879696]">3a Calle, San Pedro Sacatepequez, Guatemala</p>
                            <p className="mb-6 text-xs uppercase tracking-widest text-[#aaa]" style={{ fontFamily: "var(--font-raleway)" }}>
                                Como quieres llegar?
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        window.open(GOOGLE_MAPS_URL, "_blank")
                                        setShowModal(false)
                                    }}
                                    className="flex w-full items-center gap-3 rounded-2xl border border-[#e0e0e0] px-5 py-3 transition-transform active:scale-95"
                                    style={{ fontFamily: "var(--font-raleway)" }}
                                >
                                    <MapPin className="text-[#9aa5a5]" size={20} strokeWidth={1.5} />
                                    <span className="text-sm tracking-wide text-[#444]">Google Maps</span>
                                </button>

                                <button
                                    onClick={() => {
                                        window.open(WAZE_URL, "_blank")
                                        setShowModal(false)
                                    }}
                                    className="flex w-full items-center gap-3 rounded-2xl border border-[#e0e0e0] px-5 py-3 transition-transform active:scale-95"
                                    style={{ fontFamily: "var(--font-raleway)" }}
                                >
                                    <Navigation className="text-[#9aa5a5]" size={20} strokeWidth={1.5} />
                                    <span className="text-sm tracking-wide text-[#444]">Waze</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Image src="/img/divisor.png" alt="divisor" width={430} height={60} className="block w-full" />
        </section>
    )
}
