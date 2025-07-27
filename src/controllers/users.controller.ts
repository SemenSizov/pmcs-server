import { Request, Response, NextFunction } from 'express';
import {
  getUsers as get_users,
  addUser as add_user,
  deleteUser as delete_user,
  updateUser as update_user,
  activateUser as activate_user,
  deactivateUser as deactivate_user,
} from '../services/users.service';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await get_users();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await add_user(req.body);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await update_user(req.body);
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Valid ID is required' });

    await delete_user(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Valid ID is required' });

    await activate_user(id);
    res.status(200).json({ message: 'User activated' });
  } catch (error) {
    next(error);
  }
};

export const deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Valid ID is required' });

    await deactivate_user(id);
    res.status(200).json({ message: 'User deactivated' });
  } catch (error) {
    next(error);
  }
};
