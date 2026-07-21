"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-16">
            <div className="relative flex h-[280px] w-[320px] items-center justify-center">
                <motion.div
                    className="absolute left-7 top-2 z-30"
                    style={{ transformOrigin: "bottom center" }}
                    animate={{ rotate: [-6, 6, -6] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image src="/img/flower1.png" alt="flores" width={90} height={90} className="object-contain" />
                </motion.div>

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <Image src="/img/gold-ring.png" alt="aro dorado" width={260} height={260} className="object-contain" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1" style={{ color: "#879696" }}>
                        <h2 className="text-4xl leading-none">Oswaldo</h2>
                        <p className="text-3xl leading-none">&</p>
                        <h2 className="text-4xl leading-none">Helen</h2>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-4 right-8 z-30"
                    style={{ transformOrigin: "top center" }}
                    animate={{ rotate: [6, -6, 6] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image src="/img/flower2.png" alt="flores" width={130} height={130} className="object-contain" />
                </motion.div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 text-center" style={{ color: "#879696", fontFamily: "var(--font-raleway)" }}>
                <p className="text-xl font-light uppercase tracking-[0.3em]">!Nos casamos!</p>
                <p className="mt-1 text-sm font-light uppercase tracking-[0.2em]">08/08/2026</p>
            </div>
        </section>
    )
}
