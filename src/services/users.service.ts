import { User } from '../interfaces/user.interface';
import { db } from '../database';
import bcrypt from 'bcryptjs';

export const getUsers = async (): Promise<User[]> => {
    const users = await db.query('SELECT * FROM users');
    return users as User[];
};

export const addUser = async (userData: User): Promise<User[]> => {
    const { name, lastName, identification, email, password, idRol } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query('INSERT INTO users (name, lastName, identification, email, password, idRol) VALUES (?, ?, ?, ?, ?, ?)', [name, lastName, identification, email, hashedPassword, idRol]);
    return [{ id: (result as any).insertId, name, lastName, identification, email, password: hashedPassword, idRol }];
};

export const updateUser = async (userData: User): Promise<User[]> => {
    const { id, name, lastName, identification, email, password, idRol } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('UPDATE users SET name = ?, lastName = ?, identification = ?, email = ?, password = ?, idRol = ? WHERE id = ?', [name, lastName, identification, email, hashedPassword, idRol, id]);
    return [{ id, name, lastName, identification, email, password: hashedPassword, idRol }];
};
