import React from 'react';
import { languages } from '../../constants/languages';

const LanguadesBlock = ({
    selectedLanguages,
    setSelectedLanguages,
    expandedSections,
    toggleSection,
    handleLanguageToggle,
}) => {
    // Сортируем языки по name (алфавиту) перед отображением
    const sortedLanguages = [...languages].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    console.log(sortedLanguages);

    const selectAllLanguages = () => {
        setSelectedLanguages(sortedLanguages.map((lang) => lang.id));
    };

    const deselectAllLanguages = () => {
        setSelectedLanguages([]);
    };

    return (
        <div className="border border-gray-400 rounded-md overflow-hidden">
            <button
                onClick={() => toggleSection('compiler')}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
            >
                <span className="text-base font-medium">Допустимые языки</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${
                        expandedSections.compiler ? 'rotate-180' : ''
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
            {expandedSections.compiler && (
                <div className="p-4 bg-white">
                    <div className="space-y-3">
                        <div className="flex space-x-2 mb-2">
                            <button
                                onClick={selectAllLanguages}
                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50"
                            >
                                Выделить всё
                            </button>
                            <button
                                onClick={deselectAllLanguages}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Сбросить
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-1">
                            {sortedLanguages.map((language) => (
                                <div
                                    key={language.id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id={`lang-${language.id}`}
                                        checked={selectedLanguages.includes(
                                            language.id
                                        )}
                                        onChange={() =>
                                            handleLanguageToggle(language.id)
                                        }
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={`lang-${language.id}`}
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        {language.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguadesBlock;
