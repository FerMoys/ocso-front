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
                defaultValue={manager.managerFullName}
                placeholder="Marco Aurelio"
                name="managerFullName"
            />
            <Input
                defaultValue={manager.managerEmail}
                placeholder="manager@ocso.com"
                name="managerEmail"
            />
            <Input
                defaultValue={String(manager.managerSalary)}
                placeholder="123000"
                name="managerSalary"
            />
            <Input
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