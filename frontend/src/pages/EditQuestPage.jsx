import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditQuestSideBar from '../components/contents/edit_quest_page/EditSideBar';
import EditPageContent from '../components/contents/edit_quest_page/EditPageContent';
import EditTaskNavigationBar from '../components/bars/EditTasksNavigationBar';

const EditQuestPage = () => {
    const [isBlankPage, setIsBlankPage] = useState(false);
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [compilerSettings, setCompilerSettings] = useState({});
    const [tests, setTests] = useState([{}]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [points, setPoints] = useState(1);
    const [sampleCount, setSampleCount] = useState(1);

    const { quest_id } = useParams();
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));

    const getRequestConfig = () => ({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.access_token}`,
        },
    });

    const getAllTasks = async () => {
        try {
            const response = await axios.get(
                `/api/quests/${quest_id}/get-all-quest-tasks`,
                getRequestConfig()
            );
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching quests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async () => {
        try {
            const response = await axios.post(
                `/api/quests/${quest_id}/create-task`,
                {},
                getRequestConfig()
            );
            setTasks([...tasks, response.data]);
            setCurrentTaskIndex(tasks.length);
        } catch (error) {
            console.error('Error adding new task:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post(
                `/api/quests/${quest_id}/update-task`,
                {
                    description: taskDescription,
                    is_blank_page: isBlankPage,
                    task_id: tasks[currentTaskIndex].id,
                    languages: selectedLanguages,
                    compiler_settings: compilerSettings,
                    tests: tests,
                    sample_count: sampleCount,
                    points: points,
                },
                getRequestConfig()
            );
            console.log(response);
            updateTasks();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    // Инициализация данных при загрузке
    useEffect(() => {
        getAllTasks();
    }, []);

    const updateTasks = () => {
        if (tasks.length > 0 && currentTaskIndex >= 0) {
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks];
                updatedTasks[currentTaskIndex] = {
                    ...updatedTasks[currentTaskIndex],
                    description: taskDescription,
                    is_blank_page: isBlankPage,
                    languages: selectedLanguages,
                    compiler_settings: compilerSettings,
                    tests: tests,
                    sample_count: sampleCount,
                    points: points,
                };
                return updatedTasks;
            });
        }
    };
    // Обновление tasks при изменении полей
    useEffect(() => {
        updateTasks();
    }, [taskDescription]);

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
                    <EditQuestSideBar
                        isAuthor={true}
                        handleSaveChanges={handleSaveChanges}
                        quest_id={quest_id}
                    />
                </div>
                <div className="flex-1 min-w-0 bg-white flex flex-col ml-64">
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <EditTaskNavigationBar
                            tasks={tasks}
                            currentTaskIndex={currentTaskIndex}
                            setCurrentTaskIndex={setCurrentTaskIndex}
                            onAddTask={handleAddTask}
                        />

                        <div className="flex-grow overflow-y-auto">
                            <EditPageContent
                                task={tasks[currentTaskIndex]}
                                currentTaskIndex={currentTaskIndex}
                                isBlankPage={isBlankPage}
                                setIsBlankPage={setIsBlankPage}
                                taskDescription={taskDescription}
                                setTaskDescription={setTaskDescription}
                                selectedLanguages={selectedLanguages}
                                setSelectedLanguages={setSelectedLanguages}
                                compilerSettings={compilerSettings}
                                setCompilerSettings={setCompilerSettings}
                                tests={tests}
                                setTests={setTests}
                                points={points}
                                setPoints={setPoints}
                                sampleCount={sampleCount}
                                setSampleCount={setSampleCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuestPage;
