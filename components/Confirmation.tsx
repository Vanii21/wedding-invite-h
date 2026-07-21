"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Check, MessageSquare, User, UserPlus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"

const normalizarNombre = (nombre: string) =>
    nombre
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")

const validarNombre = (nombre: string) => {
    const partes = nombre.trim().split(/\s+/)
    return partes.length >= 2 && partes.every((p) => p.length >= 2)
}

interface Invitado {
    id: number
    nombre: string
    asiste: boolean | null
    comentario: string
}

type InvitadoField = keyof Pick<Invitado, "nombre" | "asiste" | "comentario">

let idCounter = 0

const invitadoVacio = (): Invitado => ({
    id: ++idCounter,
    nombre: "",
    asiste: null,
    comentario: "",
})

const toastStyle = {
    fontFamily: "var(--font-raleway)",
    fontSize: "13px",
    borderRadius: "16px",
    color: "#444",
}

export default function Confirmation() {
    const [invitados, setInvitados] = useState<Invitado[]>([invitadoVacio()])
    const [loading, setLoading] = useState(false)
    const [enviado, setEnviado] = useState(false)

    const actualizar = (index: number, campo: InvitadoField, valor: Invitado[InvitadoField]) => {
        const nuevos = [...invitados]
        nuevos[index] = { ...nuevos[index], [campo]: valor }
        setInvitados(nuevos)
    }

    const agregar = () => {
        if (invitados.length < 5) setInvitados([...invitados, invitadoVacio()])
    }

    const eliminar = (index: number) => {
        if (invitados.length === 1) return
        setInvitados(invitados.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        if (!supabase) {
            toast.error("Falta configurar Supabase para enviar la confirmacion.", { style: toastStyle })
            return
        }

        for (let i = 0; i < invitados.length; i++) {
            if (!validarNombre(invitados[i].nombre)) {
                toast.error(`Ingresa nombre y apellido completo del invitado ${i + 1}.`, { style: toastStyle })
                return
            }
            if (invitados[i].asiste === null) {
                toast.error(`Indica si el invitado ${i + 1} asistira o no.`, { style: toastStyle })
                return
            }
        }

        setLoading(true)

        const { data: registrosExistentes } = await supabase.from("confirmaciones_h").select("nombre_normalizado")
        const nombresEnForm: string[] = []

        for (const inv of invitados) {
            const normalizado = normalizarNombre(inv.nombre)

            const duplicadoBD = registrosExistentes?.some((r) => r.nombre_normalizado === normalizado)
            if (duplicadoBD) {
                setLoading(false)
                toast.error(`"${inv.nombre.trim()}" ya tiene una confirmacion registrada.`, {
                    duration: 4000,
                    style: toastStyle,
                })
                return
            }

            if (nombresEnForm.includes(normalizado)) {
                setLoading(false)
                toast.error(`"${inv.nombre.trim()}" esta repetido en el formulario.`, {
                    duration: 4000,
                    style: toastStyle,
                })
                return
            }

            nombresEnForm.push(normalizado)
        }

        const registros = invitados.map((inv) => ({
            nombre: inv.nombre.trim(),
            nombre_normalizado: normalizarNombre(inv.nombre),
            asiste: inv.asiste,
            comentario: inv.comentario.trim() || null,
        }))

        const { error } = await supabase.from("confirmaciones_h").insert(registros)

        setLoading(false)

        if (error) {
            toast.error("Hubo un error, intenta de nuevo.", { style: toastStyle })
        } else {
            setEnviado(true)
        }
    }

    return (
        <section className="relative mx-auto max-w-xl bg-white text-center">
            <Image src="/img/divisor.png" alt="divisor" width={430} height={60} className="block w-full -scale-y-100" />

            <h2 className="mb-2 text-6xl font-light text-[#879696] md:text-7xl">Asistencia</h2>

            <p className="mb-8 mt-2 text-sm font-bold uppercase tracking-widest text-[#212121]" style={{ fontFamily: "var(--font-raleway)" }}>
                Nos acompañas?
            </p>

            <AnimatePresence mode="wait">
                {enviado ? (
                    <motion.div
                        key="enviado"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 flex flex-col items-center gap-4 px-8 py-10"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "#9aa5a5" }}>
                            <Check className="text-white" size={32} strokeWidth={2} />
                        </div>
                        <p className="text-lg tracking-wide text-[#879696]" style={{ fontFamily: "var(--font-raleway)" }}>
                            Gracias por confirmar. Los esperamos con mucho cariño.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 flex flex-col gap-4 px-6">
                        <AnimatePresence>
                            {invitados.map((inv, i) => (
                                <motion.div
                                    key={inv.id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-3 rounded-3xl border border-[#e0e0e0] p-4 text-left"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs uppercase tracking-widest text-[#9aa5a5]" style={{ fontFamily: "var(--font-raleway)" }}>
                                            Invitado {i + 1}
                                        </p>
                                        {invitados.length > 1 && (
                                            <button onClick={() => eliminar(i)} className="text-[#ccc] transition-colors hover:text-red-400">
                                                <Trash2 size={15} strokeWidth={1.5} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa5a5]" size={16} strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            placeholder="Nombre completo"
                                            value={inv.nombre}
                                            onChange={(e) => actualizar(i, "nombre", e.target.value)}
                                            className="w-full rounded-2xl border border-[#e0e0e0] py-3 pl-10 pr-4 text-sm text-[#444] outline-none transition-colors focus:border-[#9aa5a5]"
                                            style={{ fontFamily: "var(--font-raleway)" }}
                                            suppressHydrationWarning
                                        />
                                    </div>

                                    <div className="flex overflow-hidden rounded-2xl border border-[#e0e0e0]">
                                        <button
                                            className="flex-1 py-2 text-xs uppercase tracking-widest transition-all"
                                            style={{
                                                backgroundColor: inv.asiste === true ? "#9aa5a5" : "white",
                                                color: inv.asiste === true ? "white" : "#444",
                                                fontFamily: "var(--font-raleway)",
                                            }}
                                            onClick={() => actualizar(i, "asiste", true)}
                                        >
                                            Asistiré
                                        </button>
                                        <button
                                            className="flex-1 border-l border-[#e0e0e0] py-2 text-xs uppercase tracking-widest transition-all"
                                            style={{
                                                backgroundColor: inv.asiste === false ? "#9aa5a5" : "white",
                                                color: inv.asiste === false ? "white" : "#444",
                                                fontFamily: "var(--font-raleway)",
                                            }}
                                            onClick={() => actualizar(i, "asiste", false)}
                                        >
                                            No podré
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {inv.asiste === false && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="relative overflow-hidden"
                                            >
                                                <MessageSquare className="absolute left-4 top-4 text-[#9aa5a5]" size={16} strokeWidth={1.5} />
                                                <textarea
                                                    placeholder="Déjanos un mensaje (opcional)"
                                                    value={inv.comentario}
                                                    onChange={(e) => actualizar(i, "comentario", e.target.value)}
                                                    rows={2}
                                                    className="w-full resize-none rounded-2xl border border-[#e0e0e0] py-3 pl-10 pr-4 text-sm text-[#444] outline-none transition-colors focus:border-[#9aa5a5]"
                                                    style={{ fontFamily: "var(--font-raleway)" }}
                                                    suppressHydrationWarning
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {invitados.length < 5 && (
                            <button
                                onClick={agregar}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#9aa5a5] py-3 text-xs uppercase tracking-widest text-[#9aa5a5] transition-all active:scale-95"
                                style={{ fontFamily: "var(--font-raleway)" }}
                            >
                                <UserPlus size={16} strokeWidth={1.5} />
                                Agregar invitado
                            </button>
                        )}

                        <motion.button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full rounded-2xl py-4 text-sm uppercase tracking-widest text-white"
                            style={{
                                backgroundColor: "#9aa5a5",
                                fontFamily: "var(--font-raleway)",
                                opacity: loading ? 0.7 : 1,
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {loading ? "Enviando..." : "Confirmar todo"}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <Image src="/img/divisor.png" alt="divisor" width={430} height={60} className="block w-full" />
        </section>
    )
}
