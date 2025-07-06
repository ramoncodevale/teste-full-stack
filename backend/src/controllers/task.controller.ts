import { Request, Response } from 'express';
import { pool } from '../database/mysql';


export const getAllTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error });
  }
};

export const createTask = async (req: Request, res: Response): Promise<any> => {
  const { title, description } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  if (!title) {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }

  try {
    await pool.query(
      'INSERT INTO tasks (title, description, completed, user_id) VALUES (?, ?, ?, ?)',
      [title, description || null, false, userId]
    );
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, description, completed } = req.body || {};
    console.log('req.body:', req.body);

  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  try {
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    const task = (tasks as any[])[0];

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada ou não pertence ao usuário' });
    }

    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?',
      [
        title,
        description,
        completed,
        id,
        userId
      ]
    );

    return res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
  }
};


export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  try {
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    const task = (tasks as any[])[0];

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada ou não pertence ao usuário' });
    }

    await pool.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error });
  }
};
