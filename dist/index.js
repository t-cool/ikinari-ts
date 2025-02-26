"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// 擬似的なデータベース
const usersDatabase = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];
const getUserFromDatabase = (id) => {
    return usersDatabase.find(user => user.id === id);
};
const handleGetUser = (req, res, next) => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
        next(new Error('Invalid user ID'));
    }
    else {
        const user = getUserFromDatabase(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: `User with ID ${userId} not found` });
        }
    }
};
// ログ出力ミドルウェア
const logRequest = (req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
};
// エラー作成ヘルパー関数
const createError = (message, statusCode) => ({
    message,
    statusCode
});
// エラーハンドリングミドルウェア
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({ error: err.message });
};
// ミドルウェアの適用
app.use(logRequest);
// ルートの定義
app.get('/user/:id', handleGetUser);
// エラーハンドリングミドルウェアは最後に配置
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
