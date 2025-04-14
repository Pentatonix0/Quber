import React from 'react';

const TeachingPageMainContent = () => {
    return (
        <div className="px-10 py-5 w-full max-w-7xl bg-white rounded-xl">
            <div className="mb-8">
                <h1 className="text-2xl font-normal text-gray-800">
                    Учебный портал
                </h1>
                <p className="mt-2 text-gray-500">
                    Панель управления учебными процессами
                </p>
                <div className="mt-6 border-b border-gray-200"></div>
            </div>

            <div className="space-y-8">
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-8 w-8 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-indigo-900">
                                Новые возможности в разработке
                            </h3>
                            <div className="mt-2 text-indigo-800">
                                <p className="text-sm">
                                    Мы активно работаем над расширением
                                    функционала:
                                    <br />
                                    • Система аналитики успеваемости
                                    <br />
                                    • Система классов
                                    <br />• Расширенные настройки квестов
                                </p>

                                <p className="mt-4 text-xs font-medium">
                                    Ожидайте обновлений в ближайшее время!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Аналитическая панель
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Здесь будет отображаться статистика успеваемости
                        студентов и прогресс выполнения квестов
                    </p>
                </div>
            </div>
            <div
                className="mt-4 p-6 bg-white"
                style={{ height: '200px' }}
            ></div>
        </div>
    );
};

export default TeachingPageMainContent;
