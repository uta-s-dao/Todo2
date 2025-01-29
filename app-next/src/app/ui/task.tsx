"use client";
import React, { useState } from "react";

export default function Task() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* カード */}
      <div onClick={() => setIsOpen(true)} className=' justfy-center bg-white'>
        <div className='m-4 text-2xl text-center font-semibold'>洗たく</div>
      </div>
      {/* モーダル */}
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div
            className='bg-white p-6 rounded-lg max-w-2xl w-full m-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex  items-center mx-2 mt-2 mb-10 border'>
              <h2 className='text-xl font-bold ml-1 '>詳細内容</h2>

              <button
                className='bg-slate-500 text-white p-2 my-1 ml-10 rounded-md 
              '
              >
                更新
              </button>
              <button className='bg-slate-500 text-white p-2 m-1 rounded-md'>
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
              <button className='bg-red-400 rounded-full p-3 mx-2'>
                Todoへ
              </button>
              <button className='bg-green-400 rounded-full p-3 mx-2'>
                Progressへ
              </button>
              <button className='bg-blue-400 rounded-full p-3 mx-2'>
                Doneへ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
