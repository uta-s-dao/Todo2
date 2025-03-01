"use client";
import React, { useState, useEffect } from "react";
import Task from "./ui/task";
export type Todos = {
  id: number;
  title: string;
  todo_status: string;
};

export default function Home() {
  const [isModal, setIsModal] = useState(false);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  useEffect(() => {
    async function showTodo() {
      //ブラウザ標準のAPIで、HTTPリクエストを送信するための関数
      const response = await fetch("/api/todos");
      // console.log(response);
      const data: Todos[] = await response.json();
      // console.log(data);
      setTodos(data);
    }
    showTodo();
  }, []);
  //  POST
  const handleClick = async () => {
    try {
      const response: Response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskInput,
          todo_status: statusInput, // stateの値を使用
        }),
      });

      if (!response.ok) {
        throw new Error("タスクの追加に失敗しました");
      }

      const updatedResponse = await fetch("/api/todos");
      const updatedData = await updatedResponse.json();
      setTodos(updatedData);

      console.log("タスクが追加されました");
      setTaskInput(""); // 入力をクリア
      setIsModal(false); // モーダルを閉じる
    } catch (error: unknown) {
      console.error("エラーが発生しました:", error);
    }
  };

  //PUT
  const updateTaskStatus = async (id: number, newStatus: string) => {
    try {
      //${id}の部分でデータベース中のAUTO_INCREMENTであるidと一致させている
      //それをAPIリクエストとして送信し
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo_status: newStatus,
        }),
      });
      console.log("Update response:", await response.json());
      if (!response.ok) {
        throw new Error("タスクの更新に失敗しました");
      }

      // データを再取得して状態を更新
      const updatedResponse = await fetch("/api/todos");
      const updatedData = await updatedResponse.json();
      console.log("Updated todos:", updatedData); // 新しいデータを確認
      setTodos(updatedData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  //DELETE
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("タスクの削除に失敗しました");
      }

      // データを再取得して状態を更新
      const updatedResponse = await fetch("/api/todos");
      const updatedData = await updatedResponse.json();
      setTodos(updatedData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <>
      <div>
        <div className='grid grid-cols-3 gap-2 p-4 rounded-lg h-screen'>
          <div className='p-4 rounded-md bg-slate-100'>
            <div className='font-weight text-5xl text-center rounded-lg p-1 bg-red-400'>
              Todo
            </div>
            <div className='flex justify-center'>
              <button
                onClick={() => {
                  setIsModal(true);
                  setStatusInput("Todo");
                }}
                className='text-center mt-6 bg-slate-600 hover:bg-black text-white rounded-full m-3 p-2'
              >
                タスクを追加
              </button>
            </div>
            <Task
              todostatus='Todo'
              todos={todos}
              setStatusInput={setStatusInput}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={deleteTask} 
            />
          </div>
          <div className='p-4 rounded-md bg-slate-100'>
            <div className='font-weight text-5xl text-center rounded-lg p-1 bg-green-400'>
              Progress
            </div>
            <div className='flex justify-center'>
              <button
                onClick={() => {
                  setIsModal(true);
                  setStatusInput("Progress");
                }}
                className='text-center mt-6   bg-slate-600 hover:bg-black text-white rounded-full m-3 p-2'
              >
                タスクを追加
              </button>
            </div>
            <Task
              todostatus='Progress'
              todos={todos}
              setStatusInput={setStatusInput}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={deleteTask} 
            />
          </div>
          <div className='p-4 rounded-md bg-slate-100'>
            <div className='font-weight text-5xl text-center rounded-lg p-1 bg-blue-400'>
              Done
            </div>
            <div className='flex justify-center'>
              <button
                onClick={() => {
                  setIsModal(true);
                  setStatusInput("Done");
                }}
                className='text-center mt-6   bg-slate-600 hover:bg-black text-white rounded-full m-3 p-2'
              >
                タスクを追加
              </button>
            </div>
            <Task
              todostatus='Done'
              todos={todos}
              setStatusInput={setStatusInput}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={deleteTask} 
            />
          </div>
        </div>
      </div>

      {/* // modal */}
      {isModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div
            className='bg-white p-6 rounded-lg max-w-2xl w-full m-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <label className='block text-2xl font-semibold text-gray-700 mb-1'>
                タスク
              </label>
              <button
                onClick={() => setIsModal(false)}
                className='text-gray-500 hover:text-gray-700 font-bold text-xl '
              >
                ✕
              </button>
            </div>

            <div className='flex'>
              {/* JSX で波括弧が必要なのは、HTML的な記法の中に JavaScript の式を埋め込む必要があるため */}
              {/* データベースのtodo_statuはNOT NULLとしていたのでこのインプットから送られる情報は
              todo_statusを含むようにしなければならない */}
              <input
                type='text'
                placeholder='入力してください'
                value={taskInput}
                onChange={handleInputChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-blue-500  focus:border-blue-500 outline-none transition-all
                 bg-white text-gray-900 placeholder-gray-400'
              />

              <button
                onClick={handleClick}
                className='bg-slate-700 text-white p-2 rounded-full ml-4'
              >
                タスクを追加
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
