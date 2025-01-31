//route.tsはDB接続・操作を可能にする
import { NextResponse } from "next/server";
import * as mysql from "promise-mysql";
import * as dotenv from "dotenv";

// 環境変数
dotenv.config({ path: "../.env" });

// 書籍一覧取得API
export async function GET() {
  const connection = await mysql.createConnection({
    host: "db",
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  const sql = "SELECT * FROM todos";
  const result = await connection.query(sql);
  connection.end();

  return NextResponse.json(result);
}

// 新しいTodoの作成
//requestにはリクエストボディ（タイトルを含むjson）、HTTPヘッダー、
// メソッドタブ、URLパラメーターなどが含まれます
export async function POST(request: Request) {
  //request.json()はリクエストボディ中のjsonデータだけを取り出す
  const { title } = await request.json();
  const connection = await mysql.createConnection({
    host: "db",
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  //?は値が入る場所を示すマーカ
  //例えば２つの値を扱う場合は
  // INSERT INTO todos (title, due_date) VALUES (?, ?)", ["買い物", "2024-02-01"]
  await connection.query("INSERT INTO todos (title) VALUES (?)", [title]);
  connection.end();
  return NextResponse.json({ message: "Created" }, { status: 201 });
}

// Todoの更新（完了状態の切り替えなど）
export async function PUT(request: Request) {
  const { id, completed } = await request.json();
  const connection = await mysql.createConnection({
    host: "db",
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  await connection.query("UPDATE todos SET completed = ? WHERE id = ?", [
    completed,
    id,
  ]);
  connection.end();
  return NextResponse.json({ message: "Updated" });
}

// Todoの削除
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const connection = await mysql.createConnection({
    host: "db",
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  await connection.query("DELETE FROM todos WHERE id = ?", [id]);
  connection.end();
  return NextResponse.json({ message: "Deleted" });
}
