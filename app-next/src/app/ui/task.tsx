"use client";
import React, { useState } from "react";

import { Todos } from "../page";

type TaskProps = {
  todostatus: "Todo" | "Progress" | "Done";
  todos: Todos[];
  setStatusInput: (status: string) => void;
  onUpdateStatus: (id: number, newStatus: string) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
};
export default function Task({
  todostatus,
  todos,
  setStatusInput,
  onUpdateStatus,
  onDeleteTask,
}: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  // 型をTodosに合わせた空オブジェクトを初期値として設定
  const [selectedTodo, setSelectedTodo] = useState<Todos>({
    id: 0,
    title: "",
    todo_status: "",
  });
  // ステータス更新を処理する関数
  const handleStatusChange = async (newStatus: string) => {
    if (selectedTodo) {
      //もし、selectedTodoの型定義が正しいならば下に進める

      await onUpdateStatus(selectedTodo.id, newStatus);
      // 親コンポーネントのstatusInputを更新
      setStatusInput(newStatus);
      // モーダルを閉じる
      setIsOpen(false);
    }
  };
  //消去する関数
  const handleDelete = async () => {
    if (selectedTodo) {
      await onDeleteTask(selectedTodo.id);
      setIsOpen(false); // モーダルを閉じる
    }
  };

  return (
    <>
      {/* カード */}

      {todos
        // todosは配列だからtodos.titleなどの表示ができない
        // よってフィルタリングの後マッピングを行う
        .filter((todo) => todo.todo_status === todostatus)
        .map((todo) => (
          <div
            //jvascriptでは{}で囲まないと1つの式としか認識されないから｛｝で囲む
            onClick={() => {
              setSelectedTodo(todo);
              setIsOpen(true);
            }}
            key={todo.id}
            className=' justfy-center bg-white '
          >
            <div className='m-3 text-2xl text-center font-semibold'>
              <div>{todo.title}</div>
            </div>
            {/* モーダル */}
            {isOpen && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div
                  className='bg-white p-6 rounded-lg max-w-2xl w-full m-4'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='flex  items-center mx-2 mt-2 mb-10 border'>
                    <h2 className='text-xl font-bold ml-1 '>
                      {selectedTodo.title}
                    </h2>

                    <button
                      onClick={handleDelete}
                      className='bg-slate-500 text-white p-2 m-1 rounded-md ml-auto'
                    >
                      消去
                    </button>
                    {/* ml-autoは左側のマージンを自動的に最大にして、要素を右側に押し出す事ができる */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className='text-gray-500 hover:text-gray-700 font-bold text-xl ml-auto mr-1'
                    >
                      ✕
                    </button>
                  </div>
                  <div className='grid grid-cols-3'>
                    <button
                      onClick={() => handleStatusChange("Todo")}
                      className='bg-red-400 rounded-full p-3 mx-2'
                    >
                      Todoへ
                    </button>
                    <button
                      onClick={() => handleStatusChange("Progress")}
                      className='bg-green-400 rounded-full p-3 mx-2'
                    >
                      Progressへ
                    </button>
                    <button
                      onClick={() => handleStatusChange("Done")}
                      className='bg-blue-400 rounded-full p-3 mx-2'
                    >
                      Doneへ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </>
  );
}
