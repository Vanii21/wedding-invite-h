This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at these resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## RSVP por correo diario

Para que el resumen salga a las 6:00 pm hora de Guatemala por Gmail, configura estas variables de entorno:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `CRON_SECRET`
- `RSVP_REPORT_TO` opcional, por defecto usa `helenmaritza216@gmail.com`

La tabla `confirmaciones_h` necesita una columna `created_at` para que el correo incluya la fecha y hora real de cada confirmación.

Si despliegas en Vercel, el cron de [`vercel.json`](./vercel.json) ejecuta `/api/cron/rsvp-summary` todos los días a las `00:00 UTC`, que equivale a las `18:00` en Guatemala.
