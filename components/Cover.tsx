import Image from "next/image"

export default function Cover() {
    return (
        <section className="relative flex w-full flex-col items-center">
            <div className="relative aspect-[3/4] w-full">
                <Image src="/img/cover-v2.jpeg" alt="Oswaldo y Helen" fill className="object-cover" />

                <div className="absolute left-0 top-0 z-10 w-full">
                    <Image src="/img/divisor-line-inverse.png" alt="divisor" width={430} height={40} className="w-full object-cover" />
                </div>

                <div className="absolute bottom-0 left-0 z-10 w-full scale-y-[-1]">
                    <Image src="/img/divisor-line-inverse.png" alt="divisor" width={430} height={40} className="w-full object-cover" />
                </div>
            </div>
        </section>
    )
}
