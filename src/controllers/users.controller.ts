import { Request, Response } from 'express';
import * as userService from '../services/users.service';
import { User } from '../interfaces/user.interface';

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
    const newUser = req.body as User;

   if (
        !newUser.name ||
        !newUser.lastName ||
        !newUser.identification ||
        !newUser.email ||
        !newUser.password ||
        !newUser.idRol
    ) {
         res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const createdUser = await userService.addUser(newUser);
        res.status(201).json(createdUser);
        return
    } catch (error) {
         res.status(400).json({ error: 'Bad Request' });
        return;
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const idUser = Number(req.params.id);
    const userData = req.body as User;

    if (
        !userData.name ||
        !userData.lastName ||
        !userData.identification ||
        !userData.email ||
        !userData.password ||
        !userData.idRol
    ) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const updatedUser = await userService.updateUser({ ...userData, id: idUser });
        res.json(updatedUser);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
}

