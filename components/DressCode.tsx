"use client"

import { motion } from "framer-motion"
import { Shirt } from "lucide-react"

const palette = [
    { color: "#1B3A6B", label: "Azul Marino" },
    { color: "#C4A882", label: "Champagne" },
    { color: "#B08B8B", label: "Mauve" },
    { color: "#8B9DAF", label: "Acero" },
    { color: "#000000", label: "Negro" },
]

export default function DressCode() {
    return (
        <section
            className="relative mx-auto max-w-xl py-10 text-center"
            style={{ backgroundColor: "#9aa5a5" }}
        >
            <h2 className="mb-4 text-6xl font-light text-white md:text-7xl">DressCode</h2>

            <p className="mb-8 mt-2 text-sm font-bold uppercase tracking-widest text-[#212121]" style={{ fontFamily: "var(--font-raleway)" }}>
                Formal
            </p>

            <div className="mb-8 flex items-center justify-center gap-3">
                <div className="h-px w-24 bg-white/40" />
                <Shirt className="text-white/60" size={18} strokeWidth={1.5} />
                <div className="h-px w-24 bg-white/40" />
            </div>

            <p className="mb-8 px-8 text-sm leading-relaxed tracking-wide text-white" style={{ fontFamily: "var(--font-raleway)" }}>
                El blanco está reservado para la novia, nos encantará verte en otros colores.
            </p>

            <p className="mb-6 text-xs uppercase tracking-widest text-white/70" style={{ fontFamily: "var(--font-raleway)" }}>
                Paleta sugerida
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 px-6 pb-10">
                {palette.map((item, i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="h-12 w-12 rounded-full border-2 border-white/30 shadow-md" style={{ backgroundColor: item.color }} />
                        <p className="text-[10px] tracking-wide text-white/80" style={{ fontFamily: "var(--font-raleway)" }}>
                            {item.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
