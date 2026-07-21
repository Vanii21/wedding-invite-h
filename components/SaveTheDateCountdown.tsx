"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const WEDDING_DATE = new Date("2026-08-08T16:30:00")

interface TimeLeft {
    dias: number
    horas: number
    minutos: number
    segundos: number
}

function calcularTiempo(): TimeLeft {
    const ahora = new Date()
    const diff = WEDDING_DATE.getTime() - ahora.getTime()

    if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 }

    return {
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diff / (1000 * 60)) % 60),
        segundos: Math.floor((diff / 1000) % 60),
    }
}

export default function SaveTheDateCountdown() {
    const [tiempo, setTiempo] = useState<TimeLeft>({
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
    })
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const update = () => {
            setTiempo(calcularTiempo())
        }

        const initialFrame = window.requestAnimationFrame(() => {
            update()
            setReady(true)
        })

        const interval = window.setInterval(update, 1000)

        return () => {
            window.cancelAnimationFrame(initialFrame)
            window.clearInterval(interval)
        }
    }, [])

    const unidades = [
        { valor: tiempo.dias, label: "Dias" },
        { valor: tiempo.horas, label: "Horas" },
        { valor: tiempo.minutos, label: "Minutos" },
        { valor: tiempo.segundos, label: "Segundos" },
    ]

    return (
        <section
            className="relative mx-auto w-full max-w-xl overflow-hidden"
            style={{ backgroundColor: "#9aa5a5" }}
        >

            <div className="px-6 pb-10 pt-10 text-center">
                <h2 className="mb-2 text-5xl font-light text-white md:text-6xl">Nos vemos en</h2>

                <div className="my-5 flex items-center justify-center gap-3 px-10">
                    <div className="h-px flex-1 bg-white/35" />
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    <div className="h-px flex-1 bg-white/35" />
                </div>

                <div className="flex items-center justify-center gap-3">
                    {unidades.map((u, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-1 flex-col items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div
                                className="flex w-full items-center justify-center rounded-2xl py-4"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.16)",
                                    border: "1px solid rgba(255,255,255,0.32)",
                                    boxShadow: "0 10px 24px rgba(58, 58, 58, 0.08)",
                                }}
                            >
                                <span
                                    className="inline-block min-w-[2ch] text-3xl font-bold md:text-4xl"
                                    style={{
                                        fontFamily: "var(--font-raleway)",
                                        color: "white",
                                    }}
                                    suppressHydrationWarning
                                >
                                    {ready ? String(u.valor).padStart(2, "0") : "00"}
                                </span>
                            </div>
                            <p className="mt-2 text-[10px] uppercase tracking-widest text-white/75" style={{ fontFamily: "var(--font-raleway)" }}>
                                {u.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <p className="mt-8 text-sm uppercase tracking-[0.3em] text-white/85" style={{ fontFamily: "var(--font-raleway)" }}>
                    08/08/2026
                </p>
            </div>

            <motion.div
                className="absolute left-5 z-0 w-40"
                style={{ transformOrigin: "left center", bottom: "10px" }}
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
        </section>
    )
}
