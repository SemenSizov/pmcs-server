import { Request, Response, NextFunction } from 'express';
import { Location, LocationDTO } from '../models/location';
import { selectAllLocations, insertLocation, deleteLocation as deleteLoc } from '../db/locationDb';

// Create an item
export const createLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const result = await insertLocation(name)
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Read all items
export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await selectAllLocations()
    res.json(locations);
  } catch (error) {
    next(error);
  }
};

// // Read single item
// export const getItemById = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     const item = items.find((i) => i.id === id);
//     if (!item) {
//       res.status(404).json({ message: 'Item not found' });
//       return;
//     }
//     res.json(item);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update an item
// export const updateItem = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     const { name } = req.body;
//     const itemIndex = items.findIndex((i) => i.id === id);
//     if (itemIndex === -1) {
//       res.status(404).json({ message: 'Item not found' });
//       return;
//     }
//     items[itemIndex].name = name;
//     res.json(items[itemIndex]);
//   } catch (error) {
//     next(error);
//   }
// };

// Delete an item
export const deleteLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteLoc(id)
    res.status(204).send()
  } catch (error) {
    next(error);
  }
};