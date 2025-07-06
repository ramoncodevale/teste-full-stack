import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database/mysql';

const JWT_SECRET = process.env.JWT_SECRET || 'secretoforte';

export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body;

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso'});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error});
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = (users as any[])[0];

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Usuário logado com sucesso',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao logar usuário', error });
  }
};

export const logout = async (_req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie('token'); 

    res.status(200).json({ message: 'Usuário deslogado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer logout', error });
  }
};
