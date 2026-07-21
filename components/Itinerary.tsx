"use client"

import { motion } from "framer-motion"
import { Church, Camera, Wine, UtensilsCrossed, Music2, CalendarDays } from "lucide-react"
import Image from "next/image"

const items = [
    { icon: Church, label: "Santa Misa", desc: "Iniciamos con la celebracion de la Eucaristia" },
    { icon: Camera, label: "Sesion de fotos", desc: "Sesion de fotos de los novios" },
    { icon: Wine, label: "Recepcion", desc: "Recepcion y brindis" },
    { icon: UtensilsCrossed, label: "Banquete", desc: "Cena" },
    { icon: Music2, label: "Vals", desc: "Bailes" },
]

export default function Itinerary() {
    return (
        <section className="relative mx-auto max-w-xl bg-white text-center">
            <Image src="/img/divisor.png" alt="divisor" width={430} height={60} className="block w-full -scale-y-100" />

            <motion.div
                className="absolute right-0 top-[30px] z-10 w-40"
                style={{ transformOrigin: "top right" }}
                animate={{ rotate: [-10, -16, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image
                    src="/img/flower3.png"
                    alt="flower"
                    width={120}
                    height={120}
                    className="object-contain"
                    style={{ transform: "translateX(35%) rotate(150deg) scaleY(-1) scaleX(-1)" }}
                />
            </motion.div>

            <h2 className="mb-4 text-6xl font-light text-[#879696] md:text-7xl">Itinerario</h2>

            <div className="mb-10 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-[#d8d8d6]" />
                <CalendarDays className="text-[#9aa5a5]" size={18} strokeWidth={1.5} />
                <div className="h-px w-16 bg-[#d8d8d6]" />
            </div>

            <div className="relative px-8">
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#d8d8d6]" />

                {items.map((item, i) => {
                    const Icon = item.icon
                    const isLeft = i % 2 === 0

                    return (
                        <motion.div
                            key={i}
                            className="mb-10 grid grid-cols-[1fr_48px_1fr] items-center"
                            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            {isLeft ? (
                                <div className="flex min-h-[48px] flex-col items-end justify-center pr-6 text-right">
                                    <p className="text-sm font-bold uppercase tracking-widest text-[#212121]" style={{ fontFamily: "var(--font-raleway)" }}>
                                        {item.label}
                                    </p>
                                    <p className="text-xs tracking-widest text-[#879696]" style={{ fontFamily: "var(--font-raleway)" }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ) : (
                                <div />
                            )}

                            <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#9aa5a5] shadow-md">
                                <Icon size={20} strokeWidth={1.5} className="text-white" />
                            </div>

                            {!isLeft ? (
                                <div className="flex min-h-[48px] flex-col items-start justify-center pl-6 text-left">
                                    <p className="text-sm font-bold uppercase tracking-widest text-[#212121]" style={{ fontFamily: "var(--font-raleway)" }}>
                                        {item.label}
                                    </p>
                                    <p className="text-xs tracking-widest text-[#879696]" style={{ fontFamily: "var(--font-raleway)" }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ) : (
                                <div />
                            )}
                        </motion.div>
                    )
                })}
            </div>

            <motion.div
                className="absolute left-8 z-0"
                style={{ transformOrigin: "left center", bottom: "55px" }}
                animate={{ rotate: [-10, -16, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image
                    src="/img/flower3.png"
                    alt="flower"
                    width={120}
                    height={120}
                    className="object-contain"
                    style={{ transform: "translateX(-35%) rotate(220deg) scaleY(-1)" }}
                />
            </motion.div>

            <Image src="/img/divisor.png" alt="divisor" width={430} height={60} className="block w-full" />
        </section>
    )
}
