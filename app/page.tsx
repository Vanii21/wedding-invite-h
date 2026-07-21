"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import Envelope from "@/components/Envelope"
import Hero from "@/components/Hero"
import Cover from "@/components/Cover"
import Quote from "@/components/Quote"
import Ceremony from "@/components/Ceremony"
import SaveTheDateCountdown from "@/components/SaveTheDateCountdown"
import DressCode from "@/components/DressCode"
import Itinerary from "@/components/Itinerary"
import Confirmation from "@/components/Confirmation"
import Gallery from "@/components/Gallery"
import MusicPlayer, { MusicPlayerRef } from "@/components/MusicPlayer"

export default function Home() {
    const [open, setOpen] = useState(false)
    const musicRef = useRef<MusicPlayerRef>(null)

    const handleOpen = () => {
        musicRef.current?.play()
        setOpen(true)
    }

    return (
        <main>
            <MusicPlayer ref={musicRef} />
            <Hero />
            <Cover />
            <Quote />
            <Ceremony />
            <DressCode />
            <Itinerary />
            <Gallery />
            <Confirmation />
            <SaveTheDateCountdown />

            <AnimatePresence>
                {!open && (
                    <motion.div
                        className="fixed inset-0 z-50 flex justify-center overflow-hidden"
                        style={{ pointerEvents: "auto" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 2 }}
                    >
                        <div className="relative h-full w-full overflow-hidden sm:max-w-[430px]">
                            <Envelope onOpen={handleOpen} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
