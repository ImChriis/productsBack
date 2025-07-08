import { User } from '../interfaces/user.interface';
import { db } from '../database';

export const getUsers = async (): Promise<User[]> => {
    const users = await db.query('SELECT * FROM users');
    return users as User[];
};

export const addUser = async (userData: User): Promise<User[]> => {
    const { name, lastName, identification, email, password, idRol } = userData;
    const result = await db.query('INSERT INTO users (name, lastName, identification, email, password, idRol) VALUES (?, ?, ?, ?, ?, ?)', [name, lastName, identification, email, password, idRol]);
    return [{ id: (result as any).insertId, name, lastName, identification, email, password, idRol }];
};
