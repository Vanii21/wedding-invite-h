"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"

export interface MusicPlayerRef {
    play: () => void
}

const MusicPlayer = forwardRef<MusicPlayerRef>((_, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null)

    useImperativeHandle(ref, () => ({
        play: () => {
            const audio = audioRef.current
            if (!audio) return
            audio.volume = 0.3
            audio.play().catch(() => {})
        },
    }))

    return (
        <audio ref={audioRef} loop>
            <source src="/audio/cancion.mp3" type="audio/mpeg" />
        </audio>
    )
})

MusicPlayer.displayName = "MusicPlayer"
export default MusicPlayer
