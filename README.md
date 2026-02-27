# art-gallery-frontend

![Vue](https://img.shields.io/badge/Framework-Vue.js_3-4FC08D) ![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF) ![Build](https://img.shields.io/badge/Build-Vite-646CFF)

アートギャラリー Web アプリケーションのフロントエンドです。

## 概要

Vue.js 3 で構築された SPA（シングルページアプリケーション）です。マルチレポ構成における Frontend コンポーネントとして独立管理されます。

`main` ブランチへの push をトリガーに CI が自動実行され、ビルド済み成果物（`dist/`）を GitHub Artifact としてアップロードした後、`art-gallery-release-tools` の `deploy_frontend.yml` を自動トリガーしてサーバーへデプロイします。

## ディレクトリ構成

```
art-gallery-frontend/
├── src/
│   ├── views/          # ページコンポーネント (Home, Gallery, ArtworkDetail, About, Contact)
│   ├── components/     # 共通コンポーネント (Header, Footer)
│   ├── styles/         # グローバル CSS
│   └── main.js         # エントリーポイント
├── tests/              # Vitest によるユニットテスト
├── public/             # 静的アセット
├── index.html
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── ci_build.yml  # CI Build ワークフロー
```

## 技術スタック

- **Framework**: Vue.js 3
- **Build Tool**: Vite
- **HTTP Client**: axios（API は `/api` 相対パスで呼び出し）
- **Testing**: Vitest + @vue/test-utils + happy-dom
- **Linting**: ESLint + Prettier

## ローカル開発

### 依存関係のインストール

```bash
npm install
```

### 開発サーバー起動（Vite dev server + API プロキシ）

```bash
npm run dev
```

`/api` へのリクエストは `vite.config.js` の proxy 設定により `http://art-gallery-dev-api:8080` へ転送されます。  
Docker Compose でバックエンドを起動した状態でご利用ください。

### テスト

```bash
# 対話モード
npm run test

# 一度だけ実行
npm run test:run

# カバレッジ計測
npm run test:coverage
```

### Lint / Format

```bash
# チェックのみ
npm run lint:check

# 自動修正
npm run lint

# Prettier フォーマット
npm run format
```

### プロダクションビルド

```bash
npm run build
# → dist/ に出力
```

## CI / デプロイフロー

```
git push → main
    ↓
ci_build.yml
  1. npm ci
  2. npm run lint:check
  3. npm run test:run
  4. npm run build
  5. actions/upload-artifact (dist/ → Artifact)
  6. gh api → deploy_frontend.yml をトリガー
              (frontend_artifact_id を渡す)
```

デプロイ先での処理（`art-gallery-release-tools` 側）:
- Artifact ZIP をサーバーへダウンロード・展開（`/opt/art-gallery/dist/frontend/`）
- Nginx をホットリロード（`nginx -s reload`）

## GitHub Settings

本リポジトリに以下の Secret の登録が必要です。

| 種別 | 変数名 | 内容 |
|:---|:---|:---|
| Secret | `GH_TOKEN_FOR_ART_GALLERY_RELEASE_TOOLS` | `art-gallery-release-tools` の `workflow_dispatch` を呼び出せる PAT |
