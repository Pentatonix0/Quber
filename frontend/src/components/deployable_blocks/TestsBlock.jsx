import React from 'react';

const safeAtob = (base64Str) => {
    return decodeURIComponent(escape(atob(base64Str)));
};

const TestsBlock = ({
    expandedSections,
    toggleSection,
    tests,
    addTest,
    removeTest,
    handleTestChange,
    sampleCount,
    onSampleCountChange,
}) => {
    return (
        <div className="border border-gray-400 rounded-md overflow-hidden">
            <button
                onClick={() => toggleSection('tests')}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
            >
                <span className="text-base font-medium">Тесты</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${
                        expandedSections.tests ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {expandedSections.tests && (
                <div className="p-4 bg-white space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Количество примеров (максимум 5)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max={Math.min(tests.length, 5)}
                                value={sampleCount}
                                onChange={(e) => {
                                    let value =
                                        parseInt(e.target.value, 10) || 1;
                                    value = Math.max(1, value);
                                    value = Math.min(
                                        value,
                                        Math.min(tests.length, 5)
                                    );

                                    onSampleCountChange(value);
                                }}
                                className="p-2 border border-gray-300 rounded-md"
                                disabled={tests.length === 0}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Первые n тестов будут показаны как примеры
                            </p>
                        </div>

                        {tests.map((test, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-md p-4 space-y-3"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium">
                                        {index < sampleCount
                                            ? `Пример #${index + 1}`
                                            : `Скрытый тест #${index + 1}`}
                                    </h4>
                                    {index > 0 && (
                                        <button
                                            onClick={() => removeTest(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Удалить
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ввод
                                        </label>
                                        <textarea
                                            value={safeAtob(test.stdin)}
                                            onChange={(e) =>
                                                handleTestChange(
                                                    index,
                                                    'stdin',
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            rows="1"
                                            style={{ minHeight: '2.5rem' }}
                                            onInput={(e) => {
                                                e.target.style.height = 'auto';
                                                e.target.style.height =
                                                    e.target.scrollHeight +
                                                    'px';
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Вывод
                                        </label>
                                        <textarea
                                            value={safeAtob(test.stdout)}
                                            onChange={(e) =>
                                                handleTestChange(
                                                    index,
                                                    'stdout',
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            rows="1"
                                            style={{ minHeight: '2.5rem' }}
                                            onInput={(e) => {
                                                e.target.style.height = 'auto';
                                                e.target.style.height =
                                                    e.target.scrollHeight +
                                                    'px';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addTest}
                            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Добавить тест
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestsBlock;
