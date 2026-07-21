import nodemailer from "nodemailer"

export interface ConfirmacionRsvp {
    nombre: string
    asiste: boolean
    comentario: string | null
    created_at: string | null
}

const timezone = "America/Guatemala"

const attendanceLabel = (asiste: boolean) => (asiste ? "Si asiste" : "No asiste")
const escapeHtml = (value: string) =>
    value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;")

export const formatConfirmationDate = (value: string | null) => {
    if (!value) return "Sin fecha"

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return "Sin fecha"

    return new Intl.DateTimeFormat("es-GT", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: timezone,
    }).format(date)
}

export const buildRsvpSummaryEmail = (rows: ConfirmacionRsvp[]) => {
    const totalAsisten = rows.filter((row) => row.asiste).length
    const totalNoAsisten = rows.length - totalAsisten
    const generatedAt = new Intl.DateTimeFormat("es-GT", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: timezone,
    }).format(new Date())

    const subject = `RSVP boda - ${rows.length} confirmaciones`

    const lines = [
        "Resumen de confirmaciones",
        `Generado: ${generatedAt}`,
        `Total: ${rows.length}`,
        `Asisten: ${totalAsisten}`,
        `No asisten: ${totalNoAsisten}`,
        "",
        ...rows.flatMap((row, index) => {
            const item = [
                `${index + 1}. ${row.nombre}`,
                `   Asistencia: ${attendanceLabel(row.asiste)}`,
                `   Confirmado: ${formatConfirmationDate(row.created_at)}`,
            ]

            if (row.comentario?.trim()) {
                item.push(`   Comentario: ${row.comentario.trim()}`)
            }

            return item
        }),
    ]

    const text = lines.join("\n")

    const htmlRows =
        rows.length > 0
            ? rows
                  .map(
                      (row, index) => `
                <tr>
                    <td style="padding:12px;border-bottom:1px solid #e7e7e7;">${index + 1}</td>
                    <td style="padding:12px;border-bottom:1px solid #e7e7e7;">${escapeHtml(row.nombre)}</td>
                    <td style="padding:12px;border-bottom:1px solid #e7e7e7;">${attendanceLabel(row.asiste)}</td>
                    <td style="padding:12px;border-bottom:1px solid #e7e7e7;">${formatConfirmationDate(row.created_at)}</td>
                    <td style="padding:12px;border-bottom:1px solid #e7e7e7;">${escapeHtml(row.comentario?.trim() || "-")}</td>
                </tr>`,
                  )
                  .join("")
            : `<tr><td colspan="5" style="padding:16px;border-bottom:1px solid #e7e7e7;text-align:center;">No hay confirmaciones registradas.</td></tr>`

    const html = `
        <div style="font-family:Arial,sans-serif;color:#2b2b2b;line-height:1.5;">
            <h2 style="margin:0 0 12px;">Resumen de confirmaciones</h2>
            <p style="margin:0 0 6px;"><strong>Generado:</strong> ${generatedAt}</p>
            <p style="margin:0 0 6px;"><strong>Total:</strong> ${rows.length}</p>
            <p style="margin:0 0 6px;"><strong>Asisten:</strong> ${totalAsisten}</p>
            <p style="margin:0 0 18px;"><strong>No asisten:</strong> ${totalNoAsisten}</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e7e7e7;">
                <thead>
                    <tr style="background:#f6f6f6;text-align:left;">
                        <th style="padding:12px;border-bottom:1px solid #e7e7e7;">#</th>
                        <th style="padding:12px;border-bottom:1px solid #e7e7e7;">Nombre</th>
                        <th style="padding:12px;border-bottom:1px solid #e7e7e7;">Asistencia</th>
                        <th style="padding:12px;border-bottom:1px solid #e7e7e7;">Confirmado</th>
                        <th style="padding:12px;border-bottom:1px solid #e7e7e7;">Comentario</th>
                    </tr>
                </thead>
                <tbody>${htmlRows}</tbody>
            </table>
        </div>
    `

    return { subject, text, html }
}

export const sendRsvpSummaryEmail = async (params: {
    subject: string
    text: string
    html: string
}) => {
    const user = process.env.GMAIL_USER
    const appPassword = process.env.GMAIL_APP_PASSWORD
    const recipient = process.env.RSVP_REPORT_TO ?? "helenmaritza216@gmail.com"

    if (!user || !appPassword) {
        throw new Error("Faltan credenciales de Gmail.")
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user,
            pass: appPassword,
        },
    })

    await transporter.sendMail({
        from: user,
        to: recipient,
        subject: params.subject,
        text: params.text,
        html: params.html,
    })
}
