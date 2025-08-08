## 開発環境

- HTML, CSS, JavaScript（Vanilla）
- Vitest, JSDOM (テスト)
- GitHub Actions (CI)


## 特に見てほしいところ・評価してほしい部分

このプロジェクトでは、特に以下の点に注力して開発しました。

### 1. テスト駆動の開発とCIの導入

- **単体テスト**: `main.js` の各機能（単発ガチャ、10連ガチャ、APIエラーハンドリング）に対して、[Vitest](https://vitest.dev/) を用いた単体テストを `main.test.js` に実装しました。
- **CI (継続的インテグレーション)**: pushやpull requestをトリガーに、GitHub Actions (`.github/workflows/ci.yml`) が自動でテスト (`npm test`) を実行する環境を構築しました。これにより、コードの品質を常に担保できるようにしています。

### 2. 保守性を意識したJavaScript実装

- 当初、各ボタンのクリックイベントに個別で処理を実装していましたが、重複するロジックが多かったため、パラメータを受け取って処理を振り分ける共通関数 (`fetchGacha`) にリファクタリングしました。
- `main.js` はESM (`export`) に対応しており、テストしやすいモジュール設計を意識しています。

### 3. Vanilla JSでの実践的なWebフロントエンド開発

- フレームワークに頼らず、素のJavaScript (Vanilla JS) だけで、非同期処理（`fetch`）、DOM操作、イベントハンドリング、画像表示といった、現代的なWebフロントエンドに求められる機能を一通り実装しました。