import React from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const QuestSideBar = memo(({ isAuthor = false, quest_id }) => {
    return (
        <div className="flex flex-col h-screen w-64 border-r border-gray-400 fixed top-100">
            {' '}
            {/* Добавлен margin-left */}
            {/* Блок с логотипом */}
            <div className="p-4 border-b border-gray-200">
                <img
                    src="/img3.png"
                    alt="Логотип"
                    className="w-full h-auto rounded-lg"
                />
            </div>
            {/* Основной контент с прокруткой */}
            <div className="flex-1 overflow-y-auto">
                {isAuthor && (
                    <div className="px-6 py-2">
                        <Link to={`/edit-quest/${quest_id}`}>
                            <button className="w-full border border-gray-400 rounded-md px-4 py-2 text-base text-gray-800 font-normal hover:bg-green-100 transition-colors">
                                Редактировать
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
});

export default QuestSideBar;
