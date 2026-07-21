"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Quote() {
    return (
        <section className="relative flex w-full flex-col z-10" style={{ color: "#9aa5a5" }}>
            <div className="relative w-full bg-white pt-0">
                <motion.div
                    className="absolute bottom-70 right-4 w-40"
                    style={{ transformOrigin: "top right" }}
                    animate={{ rotate: [-40, -34, -40] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src="/img/flower3.png"
                        alt="flower"
                        width={120}
                        height={120}
                        className="object-contain"
                        style={{ transform: "translateX(15%) rotate(-10deg)" }}
                    />
                </motion.div>

                <p className="px-5 pb-10 pt-16 text-right text-3xl" style={{ color: "#3A3A3A" }}>
                    Sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.
                </p>
                <Image
                    src="/img/divisor.png"
                    alt="divisor"
                    width={430}
                    height={60}
                    className="block w-full"
                />
            </div>

            <div className="w-full flex flex-col items-center" style={{ backgroundColor: "#9aa5a5" }}>

                <div className="w-full px-8 py-12 flex flex-col items-center">
                    <p className="text-center text-4xl leading-relaxed text-white">
                        Queremos que sean testigos de nuestro amor acompañándonos en este día tan especial
                    </p>
                </div>
            </div>
        </section>
    )
}