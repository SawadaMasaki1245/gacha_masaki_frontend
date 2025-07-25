# 開発ノート

## 2025.07.16
フロントエンドの作業開始
### 必要なファイル準備
 - index.html
 - main.js
 - style.css

### Git管理
github(gacha_masaki_frontend)に接続

### 今後の課題
 - バックエンド側とのAPI接続

## 2025.07.17
フロントエンドの基本機能の実装
### UIやjsの実装
 - index.html
 - main.js
 - style.css

### API接続の修正(確認)
フロントエンドのAPI URLが正しいか？
 例:
 fetch('http://localhost:8000/gacha/single')
 fetch('http://localhost:8000/gacha/ten')

gacha_logic.pyの関数定義は問題ないか？

### 今後の課題
 - ガチャの排出結果に表示させる画像を追加

## 2025.07.23
排出結果とに紐づく画像の表示を実装

### main.jsに処理を実装 & コードの修正
- 画像を表示させる処理を実装
- 各ボタンのクリックイベントに、パラメータを変えて"共通"の関数を割り当てるように修正

### 画像の追加
- imagesフォルダを作成
- imagesフォルダ内に各画像を格納

### 今後の課題
- テストコードを追加する

## 2025.07.24
テスト環境の構築とCIの導入

### テスト環境のセットアップ
- npmプロジェクトを初期化 (`package.json`)
- VitestとJSDOMを導入
- Vitestの設定ファイルを作成 (`vitest.config.js`)

### 単体テストの実装 (`main.test.js`)
- `main.js`をESMに対応させ、関数をexportするように修正
- ガチャ成功時のテスト（単発・10連）を実装
- APIエラー時のテストを実装

### CIの導入
- GitHub Actionsのワークフロー (`.github/workflows/ci.yml`) を作成
- push/pull_request時に`npm test`を自動実行するように設定

### 今後の課題
- UI/UXの改善
