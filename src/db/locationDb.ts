import {pool} from './pool'
import { Location, LocationDTO } from '../models/location'
import { Logging } from '../utils/logger'

const logger = Logging.getInstance()

export async function storeLocation(name: string){
    try {
        return pool.execute('INSERT INTO location (name) VALUES (?)', [name]) 
    } catch (e) {
        logger.logError(`Failed to store location ${e}`)
        throw e
    }
}

export async function eraseLocation(locationId: number) {
    try {
        return pool.execute('DELETE FROM location where id = ?', [locationId])
    } catch (e){
        logger.logError(`Failed to delete location, id=${locationId}. ${e}`)
    }
}

export async function selectAllLocations() {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM location')
        return rows as Location[]
    } catch (e) {
        logger.logError(`Failed to get all locations ${e}`)
        throw e
    }
}

export async function name(location: LocationDTO) {
 try {

 }  catch (e){
        console.log('Failed to get locations', e)
        throw e
 } 
}