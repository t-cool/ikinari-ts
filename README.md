# いきなり TypeScript

このプロジェクトは、TypeScriptを使用したExpressアプリケーションの基本的な実装例です。

## 機能

- ユーザー情報を取得するRESTful API
- リクエストログを出力するミドルウェア
- エラーハンドリングミドルウェア
- TypeScriptによる型安全性の確保

## 前提条件

- Node.js (v14以上推奨)
- npm (v6以上推奨)

## インストール

以下のコマンドでプロジェクトをセットアップします：

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/express-typescript-app.git
cd express-typescript-app

# 依存パッケージをインストール
npm install
```

## 使用方法

### 開発モード

```bash
npm run dev
```

このコマンドはTypeScriptコードをコンパイルし、アプリケーションを起動します。

### ビルドと実行

```bash
# ビルドのみ
npm run build

# ビルド済みアプリケーションの実行
npm start
```

### APIエンドポイント

アプリケーションが起動したら、以下のエンドポイントにアクセスできます：

- `GET /user/:id` - 指定されたIDのユーザー情報を取得

例：
```
http://localhost:3000/user/1
```

レスポンス例：
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

## プロジェクト構造

```
.
├── index.ts          # アプリケーションのメインファイル
├── package.json      # プロジェクト設定とスクリプト
├── tsconfig.json     # TypeScript設定
└── dist/             # コンパイル後のJavaScriptファイル
```

## 技術スタック

- [Express](https://expressjs.com/) - Webアプリケーションフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型付きJavaScript
- [Node.js](https://nodejs.org/) - JavaScriptランタイム

## TypeScriptの利点

このプロジェクトでは、以下のようなTypeScriptの利点を活用しています：

1. **型安全性** - コンパイル時に型エラーを検出
2. **IDE補完** - コード入力時の補完機能が強化される
3. **保守性** - コードの意図が明確になり、リファクタリングが容易になる
4. **バグの早期発見** - 実行前に多くの潜在的なバグを発見できる

## ライセンス

MIT
