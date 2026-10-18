import Link from "next/link";
import path from "path";
import { ReactNode } from "react";

interface NavItemProps{
    icon: ReactNode
    path: string
}

const NavItem = ({icon, path}: NavItemProps) => {
    return (
      <Link 
            href={path} 
            className="p-3 my-8 rounded-lg hover:bg-[#F74C39] transition-colors duration-200 flex items-center justify-center text-white"
        >
            <span>
                {icon}
            </span>
        </Link>
    )
}
export default NavItem;