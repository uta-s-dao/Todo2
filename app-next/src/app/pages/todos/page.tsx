// 型宣言
type Todos = {
  id: number;
  title: string;
  todo_status: string;
};

// コンポーネント
export default async function Data() {
  // データ取得
  const response = await fetch("http://localhost:3000/api/todos");
  const todos: Todos[] = await response.json();
  // 描画
  return (
    <>
      <link
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
        rel='stylesheet'
        integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
        crossOrigin='anonymous'
      ></link>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>項目</th>
            <th>ステータス</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <th>{todo.id}</th>
              <td>{todo.title}</td>
              <td>{todo.todo_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
