
import { LuFrame, LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <nav className="w-20 shrink-0 bg-[#FFB336] flex flex-col items-center py-4 text-white text-2xl">
      
      <NavItem icon={ <LuStore className="text-4xl" />}  path="/dashboard"/>
    
      <NavItem icon={<LuTruck className="text-4xl" />}  path="/dashboard/providers"/>
    
      <NavItem icon={<LuUser className="text-4xl" />}  path="/dashboard/managers"/>
    
      <NavItem icon={<LuWheat className="text-4xl" />}  path="/dashboard/products"/>
    
      <NavItem icon={<LuUsers className="text-4xl" />}  path="/dashboard/employees"/>
    
    </nav>
  );
}
