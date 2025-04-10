import React from 'react';

const LearnPageMainContent = () => {
    return (
        <div className="px-10 py-5 w-full max-w-7xl bg-white">
            <div className="space-y-8">
                {/* Заголовок секции */}
                <h1 className="text-2xl font-normal">Учебный портал</h1>

                {/* Блок с приглашением */}
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="invite-link"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Присоединиться к квесту
                        </label>
                        <input
                            id="invite-link"
                            type="text"
                            placeholder="Введите ссылку-приглашение"
                            className="w-full rounded-md border border-gray-400 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                    </div>
                    <p className="text-sm text-gray-600">
                        Получили ссылку-приглашение от преподавателя? Введите её
                        в поле выше, чтобы присоединиться к учебному квесту и
                        начать выполнение заданий.
                    </p>
                </div>

                {/* Информационный баннер */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Система в разработке
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>
                                    В данный момент мы активно работаем над
                                    внедрением системы персональных рекомендаций
                                    и подробной статистики успеваемости.
                                    Обещаем, что скоро здесь появится много
                                    полезных возможностей!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Заглушка для будущего контента */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Здесь скоро появится ваша персональная учебная
                        статистика и рекомендации по обучению
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LearnPageMainContent;
