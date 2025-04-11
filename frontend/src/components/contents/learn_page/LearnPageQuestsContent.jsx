import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestPreview from '../../QuestsPreview';

const LearnPageQuestsContent = () => {
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));
    const [loading, setLoading] = useState(true);
    const [quests, setQuests] = useState([]);

    const getAllQuests = async () => {
        try {
            const response = await axios.get(
                `/api/quests/get-all-user-quests/${token.user_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.access_token}`,
                    },
                }
            );
            setQuests(response.data);
        } catch (error) {
            console.error('Error fetching quests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllQuests();
    }, []);

    return (
        <div className="px-10 py-5 w-full max-w-7xl bg-white rounded-xl">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Мои квесты
                </h1>
                <p className="mt-2 text-gray-500">
                    Список доступных учебных квестов
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-14 w-14 border-4 border-t-transparent border-blue-500"></div>
                </div>
            ) : quests.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
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
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Нет доступных квестов
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Добавьте новый квест по ссылке или через панель
                        управления
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {quests.map((quest) => (
                        <div
                            key={quest.id}
                            className="transform transition-all hover:scale-[1.02] hover:shadow-lg"
                        >
                            <QuestPreview
                                title={quest.title}
                                id={quest.id}
                                invite_code={quest.invite_code}
                                isAuthor={false}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LearnPageQuestsContent;
