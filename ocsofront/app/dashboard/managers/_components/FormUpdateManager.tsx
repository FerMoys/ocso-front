import updateManager from "@/actions/managers/update"
import { Manager } from "@/entities"
import { Button, Input } from "@nextui-org/react"
import SelectStore from "./SelectStore"
import { API_URL } from "@/app/constants"
import { authHeaders } from "@/helpers/authHeaders"
export default async function FormUpdateManager({manager}: {manager: Manager}){
    const updateManagerWithId = updateManager.bind(null, manager.managerId)
    const responseStores = await fetch(`${API_URL}/locations`, {
        headers: {
            ...(await authHeaders())
        }
    })
    const stores = await responseStores.json()
    return(
        <form action={updateManagerWithId}>
            <h1> Actualizar manager</h1>
            <Input
                isRequired
                label="Nombre completo"
                defaultValue={manager.managerFullName}
                placeholder="Marco Aurelio"
                name="managerFullName"
            />
            <Input
                isRequired
                label="Correo electrónico"
                defaultValue={manager.managerEmail}
                placeholder="manager@ocso.com"
                name="managerEmail"
            />
            <Input
                required={true}
                label="Salario"
                defaultValue={String(manager.managerSalary)}
                placeholder="123000"
                name="managerSalary"
            />
            <Input
                isRequired
                label="Número de teléfono"
                defaultValue={manager.managerPhoneNumber}
                placeholder="4421435679"
                name="managerPhoneNumber"
            />
            <SelectStore stores={stores} defaultStore={manager?.location?.locationId} />
            <Button color="primary" type="submit">
                Actualizar
            </Button>
        </form>
    )
}