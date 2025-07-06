import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretoforte';

interface AuthPayload {
  id: number;
}

declare module 'express' {
  export interface Request {
    user?: AuthPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    req.user = { id: decoded.id };
    next(); 
  } catch (error) {
    res.status(403).json({ message: 'Token inválido ou expirado' });
    return;
  }
};

