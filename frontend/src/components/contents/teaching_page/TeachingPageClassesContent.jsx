import React from 'react';

const TeachingPageClassesContent = () => {
    return (
        <div className="px-10 py-5 w-full max-w-7xl bg-white rounded-xl">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Классы</h1>
                <p className="mt-2 text-gray-500">
                    Управление учебными группами и классами
                </p>
                <div className="mt-6 border-b border-gray-200"></div>
            </div>

            <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-indigo-600 mb-6"></div>

                <div className="text-center max-w-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Раздел в активной разработке
                    </h3>
                    <p className="text-sm text-gray-500">
                        Мы работаем над созданием удобной системы управления
                        классами. Здесь скоро появится возможность создавать
                        учебные группы, назначать задания и отслеживать прогресс
                        студентов.
                    </p>
                </div>

                <div className="mt-8 bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center gap-3">
                        <svg
                            className="h-5 w-5 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-sm text-indigo-800">
                            Ожидайте обновления в ближайшие недели
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="mt-4 p-6 bg-white"
                style={{ height: '200px' }}
            ></div>
        </div>
    );
};

export default TeachingPageClassesContent;
