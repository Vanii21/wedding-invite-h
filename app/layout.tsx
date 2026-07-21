import "./globals.css"
import { Mea_Culpa, Raleway } from "next/font/google"
import { Toaster } from "react-hot-toast"

const meaCulpa = Mea_Culpa({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-mea-culpa",
})

const raleway = Raleway({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-raleway",
})

export const metadata = {
    title: "Oswaldo & Helen",
    description: "Invitacion de nuestra boda",
    alternates: {
        canonical: "https://boda-vanii-marielos.online",
    },
    openGraph: {
        title: "Oswaldo & Helen",
        description: "Invitacion de nuestra boda",
        url: "https://boda-vanii-marielos.online",
        images: [
            {
                url: "https://boda-vanii-marielos.online/img/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Oswaldo & Helen",
            },
        ],
    },
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={`${raleway.variable} ${meaCulpa.variable} flex justify-center`}>
                <div className="relative w-full min-h-screen overflow-x-hidden bg-[#9aa5a5] sm:max-w-[430px] sm:mx-auto sm:shadow-xl">
                    {children}
                    <Toaster position="top-center" />
                </div>
            </body>
        </html>
    )
}
