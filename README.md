## Todo アプリ

## 使用技術　

フロントエンド:　 Nextjs, TailWind.css
バックエンド:　 MySQL
データベースの構造は以下の通りです
![alt text](image.png)

## プロジェクトの概要

タスク管理アプリであり、タスクを３つのステータスに分けて整理できる。
タスクの新規作成、更新、消去ができる。

## ローカル開発サーバーの起動

上記で説明済みの docker-compose.yml に定義されているコンテナを docker compose up を実行し、イメージを取得します。
次に docker start node mysql を実行し、コンテナを立てます。
次に docker exec -it node /bin/bash を実行し、node コンテナの中に入る。
node コンテナの中に入ったら app-next ディレクトリまでいって npm run dev でローカルでサーバーを立てることができます。

参考にさせてもらった記事はhttps://note.com/rect_angle/n/ne59025be8208です。
