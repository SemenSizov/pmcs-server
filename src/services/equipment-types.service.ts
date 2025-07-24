import { insertType, selectAllTypes, deleteType as delete_type, updateType as update_type } from "../db/equipmentTypeDb"
import { UnitType } from "../models/unitType"

export const getTypes =async (): Promise<UnitType[]> => {
    const types = await selectAllTypes()
    if (!types){
        return []
    } else {
        return types
    }
}

export const addType = async(type: UnitType) =>{
    const {name} = type;
    return insertType(name)
}

export const deleteType = async (id: string)=>{
    return delete_type(id)
}

export const updateType = async (type: UnitType)=>{
    return update_type(type)
}