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
    if (!isAuthorized(request)) {
        return new Response("Unauthorized", { status: 401 })
    }

    if (!supabaseAdmin) {
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

    const { subject, text, html } = buildRsvpSummaryEmail(rows)

    await sendRsvpSummaryEmail({ subject, text, html })

    return Response.json({
        sent: true,
        total: rows.length,
        message: "Correo enviado.",
    })
}
