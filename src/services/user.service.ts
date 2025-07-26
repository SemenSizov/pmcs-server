import { insertUser, selectAllUsers, deleteUser as delete_user, updateUser as update_user } from "../db/users.db"
import type { User } from "../models/user"

export const getUsers =async (): Promise<User[]> => {
    const users = await selectAllUsers()
    if (!users){
        return []
    } else {
        return users
    }
}

export const addUser = async(user: User) =>{
    const {name, email, role} = user;
    return insertUser(name, email, role)
}

export const deleteUser = async (id: string)=>{
    return delete_user(id)
}

export const updateUser = async (user: User)=>{
    return update_user(user)
}