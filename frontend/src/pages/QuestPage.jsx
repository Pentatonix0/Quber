import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QuestSideBar from '../components/contents/quest_page/QuestSideBar';
import TaskNavigationBar from '../components/bars/TasksNavigationBar';
import QuestPageContent from '../components/contents/quest_page/QuestPageContent';
import { languages } from '../constants/languages';
import { useRef } from 'react';

const safeAtob = (base64Str) => {
    // Декодируем Base64 и возвращаем строку в оригинальном виде
    return decodeURIComponent(escape(atob(base64Str)));
};

const safeBtoa = (str) => {
    // Преобразуем строку в UTF-8 с использованием encodeURIComponent
    return btoa(unescape(encodeURIComponent(str)));
};
const QuestPage = () => {
    const { quest_id } = useParams();
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [solutions, setSolutions] = useState([]);
    const [isAuthor, setIsAuthor] = useState(false);
    const [language, setLanguage] = useState();
    const [availableLanguages, setAvailableLanguages] = useState(languages);
    const [sourceCode, setSourceCode] = useState('');
    const [status, setStatus] = useState('default');
    const pollingRef = useRef();

    const pollSolutionStatus = (solutionId) => {
        // Очищаем предыдущий таймер
        if (pollingRef.current) {
            clearTimeout(pollingRef.current);
            pollingRef.current = null;
        }

        const checkStatus = async () => {
            try {
                const { data } = await axios.get(
                    `/api/quests/check-solution/${solutionId}/${token?.user_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token?.access_token}`,
                        },
                    }
                );

                if (data.status === 'testing') {
                    pollingRef.current = setTimeout(() => checkStatus(), 1000);
                } else {
                    setSolutions((s) =>
                        s.map((solution) =>
                            solution.id === solutionId ? data : solution
                        )
                    );
                    clearTimeout(pollingRef.current);
                }
            } catch (error) {
                console.error('Polling error:', error);
                clearTimeout(pollingRef.current);
            }
        };

        checkStatus();
    };
    const getAllTasks = async () => {
        try {
            const response = await axios.get(
                `/api/quests/${quest_id}/get-all-quest-tasks`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.access_token}`,
                    },
                }
            );
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching quests:', error);
        }
    };

    const getAllSolutions = async () => {
        try {
            const response = await axios.get(
                `/api/quests/get-solutions/${quest_id}/${token?.user_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.access_token}`,
                    },
                }
            );
            setSolutions(response.data);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const checkAuthor = async () => {
        try {
            const response = await axios.get(
                `/api/quests/${quest_id}/get-author-id`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.access_token}`,
                    },
                }
            );
            setIsAuthor(response.data.author_id === token?.user_id);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const submitSolution = async () => {
        try {
            const body = {
                participant_id: solutions[currentTaskIndex].participant_id,
                selected_language: language.id,
                source_code: safeBtoa(sourceCode),
            };
            const response = await axios.post(
                `/api/quests/submit-solution/${tasks[currentTaskIndex].id}/${token?.user_id}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.access_token}`,
                    },
                }
            );

            setSolutions((prevSolutions) =>
                prevSolutions.map((solution) =>
                    solution.task_id === response.data.task_id
                        ? {
                              ...solution,
                              ...response.data,
                              selected_language_id:
                                  response.data.selected_language_id,
                              source_code: response.data.source_code,
                              status: response.data.status,
                              submitted_at: response.data.submitted_at,
                          }
                        : solution
                )
            );

            if (response.data.status === 'testing') {
                pollSolutionStatus(response.data.id);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(
        () => () => {
            if (pollingRef.current) clearTimeout(pollingRef.current);
        },
        []
    );

    useEffect(() => {
        getAllTasks();
        getAllSolutions();
        checkAuthor();
        setLoading(false);
    }, []);

    useEffect(() => {
        if (solutions.length != 0) {
            setSourceCode(safeAtob(solutions[currentTaskIndex].source_code));
            const newAvailableLanguages = languages.filter((lang) =>
                tasks[currentTaskIndex].languages.includes(lang.id)
            );

            setAvailableLanguages(newAvailableLanguages);
            setLanguage(
                solutions[currentTaskIndex].selected_language_id
                    ? newAvailableLanguages.find(
                          (lang) =>
                              lang.id ===
                              solutions[currentTaskIndex].selected_language_id
                      )
                    : newAvailableLanguages[0]
            );
            setStatus(solutions[currentTaskIndex].status);
        }
    }, [currentTaskIndex, solutions]);

    useEffect(() => {
        if (solutions.length != 0) {
            solutions[currentTaskIndex].source_code = safeBtoa(sourceCode);
            solutions[currentTaskIndex].selected_language_id = language.id;
        }
    }, [sourceCode, language]);

    if (loading) {
        return <div className="p-6">Загрузка заданий...</div>;
    }

    if (tasks.length === 0) {
        return <div className="p-6">Задания не найдены</div>;
    }

    return (
        <div className="min-h-screen bg-[#FCFCFC]">
            <div className="flex max-w-7xl mx-auto border-r border-gray-400 min-h-screen">
                <div>
                    <QuestSideBar isAuthor={isAuthor} quest_id={quest_id} />
                </div>
                <div className="flex-1 min-w-0 bg-white flex flex-col ml-64">
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <TaskNavigationBar
                            tasks={tasks}
                            currentTaskIndex={currentTaskIndex}
                            setCurrentTaskIndex={setCurrentTaskIndex}
                        />

                        <div className="flex-grow overflow-y-auto">
                            <QuestPageContent
                                task={tasks[currentTaskIndex]}
                                language={language}
                                setLanguage={setLanguage}
                                sourceCode={sourceCode}
                                setSourceCode={setSourceCode}
                                status={status}
                                onSubmit={submitSolution}
                                solution={solutions[currentTaskIndex]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestPage;
