import {NextUIProvider} from "@nextui-org/react"

export default function Provicers({children}: Readonly<{
    children:React.ReactNode;
}>){
    return(
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}