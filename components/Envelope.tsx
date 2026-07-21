"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface EnvelopeProps {
    onOpen: () => void
}

export default function Envelope({ onOpen }: EnvelopeProps) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        if (open) return
        setOpen(true)
        onOpen()
    }

    const BG = "#FAFAF8"
    const BORDER = "#d8d8d6"

    return (
        <section
            className="absolute inset-0"
            style={{
                background: "linear-gradient(135deg, rgb(83 88 83 / 50%), rgb(83 88 83 / 80%))",
                cursor: open ? "default" : "pointer",
            }}
            onClick={handleOpen}
        >
            <div className="absolute inset-0 flex flex-col justify-center">
                <div className="relative flex h-full w-full flex-col justify-center">
                    <div className="absolute w-full" style={{ height: "75vh", bottom: 0, left: 0 }}>
                        <motion.div
                            initial={false}
                            className="absolute border"
                            style={{
                                height: "70vh",
                                width: "70vh",
                                top: "10%",
                                left: "50%",
                                backgroundColor: BG,
                                borderColor: BORDER,
                                zIndex: 10,
                            }}
                            animate={open ? { x: "-100%", y: "180%", rotate: 45 } : { x: "-100%", y: "5%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 2.5, ease: [0.55, 0, 0.9, 0.3], delay: open ? 0.2 : 0 }}
                        />
                        <motion.div
                            initial={false}
                            className="absolute border"
                            style={{
                                height: "70vh",
                                width: "70vh",
                                top: "10%",
                                left: "50%",
                                backgroundColor: BG,
                                borderColor: BORDER,
                                zIndex: 10,
                            }}
                            animate={open ? { x: "0", y: "180%", rotate: 45 } : { x: "0", y: "5%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 2.5, ease: [0.55, 0, 0.9, 0.3], delay: open ? 0.2 : 0 }}
                        />
                        <motion.div
                            initial={false}
                            className="absolute rounded-3xl border-2"
                            style={{
                                height: "70vh",
                                width: "70vh",
                                bottom: "10%",
                                left: "50%",
                                backgroundColor: BG,
                                borderColor: BORDER,
                                zIndex: 12,
                            }}
                            animate={open ? { x: "-50%", y: "220%", rotate: 45 } : { x: "-50%", y: "55%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 2.5, ease: [0.55, 0, 0.9, 0.3], delay: open ? 0.2 : 0 }}
                        />
                    </div>

                    <motion.div
                        initial={false}
                        className="absolute rounded-3xl border-2"
                        style={{
                            height: "70vh",
                            width: "70vh",
                            top: "10%",
                            left: "50%",
                            backgroundColor: BG,
                            borderColor: BORDER,
                            zIndex: 13,
                            boxShadow: "10px 6px 20px rgba(0,0,0,0.18), 0 4px 6px rgba(0,0,0,0.12)",
                        }}
                        animate={open ? { x: "-50%", y: "-150%", rotate: 45 } : { x: "-50%", y: "-50%", rotate: 45, opacity: 1 }}
                        transition={{ duration: 2, ease: [0.55, 0, 0.9, 0.3] }}
                    >
                        <div
                            className="absolute inset-0 flex h-full w-full flex-col items-center justify-start gap-4 pt-20"
                            style={{
                                transform: "translateX(25%) translateY(25%) rotate(-45deg)",
                                color: "#879696",
                            }}
                        >
                            <p className="text-5xl sm:text-6xl">Oswaldo</p>
                            <p className="text-4xl sm:text-5xl">&</p>
                            <p className="text-5xl sm:text-6xl">Helen</p>
                        </div>

                        <div
                            className="absolute bottom-0 right-0"
                            style={{ transform: "translateX(25%) translateY(25%) rotate(-45deg)" }}
                        >
                            <Image src="/img/stamp.png" alt="sello" width={110} height={110} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {!open && (
                <div
                    className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none"
                    style={{ zIndex: 999 }}
                >
                    <motion.p
                        className="text-xs tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-raleway)", letterSpacing: "0.2em", color: "#6b7a7a" }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Toca para abrir
                    </motion.p>
                    <motion.p
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ fontFamily: "var(--font-mea-culpa)", fontSize: "1.8rem", color: "#6b7a7a" }}
                    >
                        tu invitación
                    </motion.p>
                </div>
            )}
        </section>
    )
}
