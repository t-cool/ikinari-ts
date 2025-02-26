import express, { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

const app = express();
const port: number = 3000;

interface User {
  id: number;
  name: string;
  email?: string; // "?" は省略可能なプロパティを表す
}

// 擬似的なデータベース
const usersDatabase: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

const getUserFromDatabase = (id: number): User | undefined => {
  return usersDatabase.find(user => user.id === id);
};

const handleGetUser = (
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
): void => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    next(new Error('Invalid user ID'));
  } else {
    const user = getUserFromDatabase(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: `User with ID ${userId} not found` });
    }
  }
};

// ログ出力ミドルウェア
const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
};

// エラー作成ヘルパー関数
const createError = (message: string, statusCode: number) => ({
  message,
  statusCode
});

// エラーハンドリングミドルウェア
const errorHandler = (
  err: { message: string; statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.statusCode || 500).json({ error: err.message });
};

// ミドルウェアの適用
app.use(logRequest);

// ルートの定義
app.get('/user/:id', handleGetUser);

// エラーハンドリングミドルウェアは最後に配置
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
