import "@/app/globals.css";
import Image from "next/image"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return ( 
        <div className="bg-red-700 w-screen h-screen overflow-hidden grid gap-2">
            <div className="place-content-center place-self-center">
                <Image src="/ocso-logo.png" alt="Logo de Ocso" className="place-self-center my-10" width={300} height={80}/>
                {children}</div>
        </div>
    );
}