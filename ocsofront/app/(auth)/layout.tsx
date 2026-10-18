import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return ( 
        <div className="bg-red-700 w-screen h-screen overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                <Image src="/ocso-logo.png" alt="Logo de Ocso" width={200} height={80} />
                {children}
            </div>
        </div>
    );
}