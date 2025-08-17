import { insertType, selectAllTypes, deleteType as delete_type, updateType as update_type } from "../db/equipment-types.db"
import { EquipmentType } from "../types/equipmentType"

export const getTypes =async (): Promise<EquipmentType[]> => {
    const types = await selectAllTypes()
    if (!types){
        return []
    } else {
        return types.map((t) => {
            return {
                id: t.id,
                name: t.name,
                hasHourmeter: !!t.has_hourmeter
            }
        })
    }
}

export const addType = async(type: EquipmentType, changedBy:number) =>{
    const {name, hasHourmeter} = type;
    return insertType(name, changedBy, hasHourmeter)
}

export const deleteType = async (id: string)=>{
    return delete_type(id)
}

export const updateType = async (type: EquipmentType, changedBy: number)=>{
    return update_type(type, changedBy)
}