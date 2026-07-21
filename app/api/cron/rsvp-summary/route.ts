import { NextRequest } from "next/server"

import { buildRsvpSummaryEmail, sendRsvpSummaryEmail } from "@/lib/rsvp-email"
import { supabaseAdmin } from "@/lib/supabase-server"

export const runtime = "nodejs"

const isAuthorized = (request: NextRequest) => {
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
        return true
    }

    return request.headers.get("authorization") === `Bearer ${cronSecret}`
}

export async function GET(request: NextRequest) {
    const startedAt = new Date().toISOString()
    console.info("[rsvp-summary] cron triggered", {
        startedAt,
        url: request.url,
        userAgent: request.headers.get("user-agent"),
    })

    if (!isAuthorized(request)) {
        console.warn("[rsvp-summary] unauthorized request")
        return new Response("Unauthorized", { status: 401 })
    }

    if (!supabaseAdmin) {
        console.error("[rsvp-summary] missing supabase admin configuration")
        return Response.json(
            {
                error: "Falta configurar Supabase en el servidor.",
            },
            { status: 500 },
        )
    }

    const { data, error } = await supabaseAdmin
        .from("confirmaciones_h")
        .select("nombre, asiste, comentario, created_at")
        .order("created_at", { ascending: true })

    if (error) {
        console.error("[rsvp-summary] database read failed", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
        })
        return Response.json(
            {
                error: "No se pudo leer la base de datos.",
                details: error.message,
            },
            { status: 500 },
        )
    }

    const rows = (data ?? []).map((row) => ({
        nombre: String(row.nombre ?? ""),
        asiste: Boolean(row.asiste),
        comentario: row.comentario ? String(row.comentario) : null,
        created_at: row.created_at ? String(row.created_at) : null,
    }))

    console.info("[rsvp-summary] records loaded", {
        total: rows.length,
        totalAsisten: rows.filter((row) => row.asiste).length,
        totalNoAsisten: rows.filter((row) => !row.asiste).length,
    })

    const { subject, text, html } = buildRsvpSummaryEmail(rows)

    try {
        await sendRsvpSummaryEmail({ subject, text, html })
        console.info("[rsvp-summary] email sent successfully", {
            recipient: process.env.RSVP_REPORT_TO ?? "helenmaritza216@gmail.com",
            total: rows.length,
            finishedAt: new Date().toISOString(),
        })
    } catch (error) {
        console.error("[rsvp-summary] email send failed", error)
        throw error
    }

    return Response.json({
        sent: true,
        total: rows.length,
        message: "Correo enviado.",
    })
}
