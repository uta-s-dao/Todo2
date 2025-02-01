//個々のファイルのパスは/api/todos/1, /api/todos/2, /api/todos/999などURLの一部が可変（動的）である。
import { NextResponse } from "next/server";
import * as mysql from "promise-mysql";

//更新
export async function PUT(request: Request) {
  // URLからidを取得する必要がある
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // URLの最後の部分からidを取得。フロントエンドからのIDの情報を読み取る。
  const { todo_status } = await request.json();
  console.log("Received parameters:", { id, todo_status });
  const connection = await mysql.createConnection({
    host: "db",
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  await connection.query("UPDATE todos SET todo_status = ? WHERE id = ?", [
    todo_status,
    id,
  ]);
  connection.end();
  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
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
