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

  useEffect(() => {
    async function showTodo() {
      const response = await fetch("http://localhost:3000/api/todos");
      const data: Todos[] = await response.json();
      setTodos(data);
    }
    showTodo();
  }, []);
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
                onClick={() => setIsModal(true)}
                className='text-center mt-6 bg-slate-600 hover:bg-black text-white rounded-full m-3 p-2'
              >
                タスクの新規作成
              </button>
            </div>
            <Task todostatus='Todo' todos={todos} />
            <ul>
              {todos.map(
                (todo) =>
                  todo.todo_status === "Todo" && (
                    <li key={todo.id}>
                      <span>{todo.title}</span>
                      <span>{todo.todo_status}</span>
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className='p-4 rounded-md bg-slate-100'>
            <div className='font-weight text-5xl text-center rounded-lg p-1 bg-green-400'>
              Progress
            </div>
            <div className='flex justify-center'>
              <button
                onClick={() => setIsModal(true)}
                className='text-center mt-6   bg-slate-600 hover:bg-black text-white rounded-full m-3 p-2'
              >
                タスクの新規作成
              </button>
            </div>
            <Task todostatus='Progress' todos={todos} />
            <ul>
              {todos.map(
                (todo) =>
                  todo.todo_status === "Progress" && (
                    <li key={todo.id}>
                      <span>{todo.title}</span>
                      <span>{todo.todo_status}</span>
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className='p-4 rounded-md bg-slate-100'>
            <div className='font-weight text-5xl text-center rounded-lg p-1 bg-blue-400'>
              Done
            </div>
            <div className='flex justify-center'>
              <button
                onClick={() => setIsModal(true)}
                className='text-center mt-6   bg-slate-600 hover:bg-black text-white rounded-full m-3 p-2'
              >
                タスクの新規作成
              </button>
            </div>
            <Task todostatus='Done' todos={todos} />
            <ul>
              {todos.map(
                (todo) =>
                  todo.todo_status === "Done" && (
                    <li key={todo.id}>
                      <span>{todo.title}</span>
                      <span>{todo.todo_status}</span>
                    </li>
                  )
              )}
            </ul>
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
              <input
                type='text'
                placeholder='入力してください'
                className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400'
              />

              <button className='bg-slate-700 text-white p-2 rounded-full ml-4'>
                タスクを追加
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
