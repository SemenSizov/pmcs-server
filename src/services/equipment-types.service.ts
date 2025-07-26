import { insertType, selectAllTypes, deleteType as delete_type, updateType as update_type } from "../db/equipment-types.db"
import { EquipmentType } from "../models/equipmentType"

export const getTypes =async (): Promise<EquipmentType[]> => {
    const types = await selectAllTypes()
    if (!types){
        return []
    } else {
        return types
    }
}

export const addType = async(type: EquipmentType) =>{
    const {name} = type;
    return insertType(name)
}

export const deleteType = async (id: string)=>{
    return delete_type(id)
}

export const updateType = async (type: EquipmentType)=>{
    return update_type(type)
}