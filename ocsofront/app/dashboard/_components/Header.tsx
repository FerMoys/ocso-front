
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-16 shrink-0 bg-red-700 flex items-center px-10 shadow-md">
      <Image
        src="/ocso-logo.png"
        width={100}
        height={30}
        alt="Ocso logo"
        style={{ width: "auto", height: "30px" }}
        priority
        draggable={false}
      />
    </header>
  );
}
