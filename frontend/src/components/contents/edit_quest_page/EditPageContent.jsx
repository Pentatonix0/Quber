import React, { useEffect, useState } from 'react';
import QuestDescriptionEditor from '../../editors/QuestDescriptionEditor';
import LanguadesBlock from '../../deployable_blocks/LanguagesBlock';
import CompilerSettingsBlock from '../../deployable_blocks/CompilerSettingsBlock';
import TestsBlock from '../../deployable_blocks/TestsBlock';

const defaultCompilerSettings = {
    cpu_time_limit: { value: 5, min: 1, max: 15 },
    memory_limit: { value: 128000, min: 64000, max: 512000 },
    stack_limit: { value: 64000, min: 32000, max: 128000 },
    max_processes_and_or_threads: { value: 60, min: 10, max: 120 },
};

const defaultTest = { stdin: '', stdout: '' };

const safeBtoa = (str) => {
    // Преобразуем строку в UTF-8 с использованием encodeURIComponent
    return btoa(unescape(encodeURIComponent(str)));
};

const EditPageContent = ({
    task,
    currentTaskIndex,
    isBlankPage,
    setIsBlankPage,
    taskDescription,
    setTaskDescription,
    selectedLanguages,
    setSelectedLanguages,
    compilerSettings,
    setCompilerSettings,
    tests,
    setTests,
    points,
    setPoints,
    sampleCount,
    setSampleCount,
}) => {
    const [expandedSections, setExpandedSections] = useState({
        compiler: false,
        limits: false,
        tests: false,
    });

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleChangeContents = (description) => {
        setTaskDescription(description);
    };

    const handleLanguageToggle = (languageId) => {
        setSelectedLanguages((prev) =>
            prev.includes(languageId)
                ? prev.filter((id) => id !== languageId)
                : [...prev, languageId]
        );
    };

    const handleSettingChange = (field, value) => {
        const numValue = Number(value);
        const { min, max } = defaultCompilerSettings[field];

        let validatedValue = numValue;
        if (numValue < min) validatedValue = min;
        if (numValue > max) validatedValue = max;

        setCompilerSettings((prev) => ({
            ...prev,
            [field]: validatedValue,
        }));
    };

    const resetToDefaults = () => {
        setCompilerSettings({
            cpu_time_limit: 5,
            memory_limit: 128000,
            stack_limit: 64000,
            max_processes_and_or_threads: 60,
        });
    };

    const handleTestChange = (index, field, value) => {
        const updatedTests = [...tests];
        updatedTests[index][field] = safeBtoa(value);
        setTests(updatedTests);
    };

    const addTest = () => {
        setTests([...tests, { ...defaultTest }]);
    };

    const removeTest = (index) => {
        if (tests.length > 1) {
            const updatedTests = [...tests];
            updatedTests.splice(index, 1);
            setTests(updatedTests);
            if (updatedTests.length < sampleCount) {
                setSampleCount(sampleCount - 1);
            }
        }
    };

    const handlePointsChange = (e) => {
        let value = parseInt(e.target.value, 10) || 1;
        value = Math.max(1, value); // Минимум 1 балл
        value = Math.min(value, 10); // Максимум 10 баллов
        setPoints(value);
    };

    useEffect(() => {
        setExpandedSections({
            compiler: false,
            limits: false,
            tests: false,
        });
        setIsBlankPage(task.is_blank_page);
        setTaskDescription(task.description);
        setSelectedLanguages(task.languages);
        setCompilerSettings(task.compiler_settings);
        setTests(task.tests);
        setSampleCount(task.sample_count);
        setPoints(task.points || 1);
    }, [currentTaskIndex]);

    return (
        <div className="p-6 space-y-4">
            <div>
                <QuestDescriptionEditor
                    description={taskDescription}
                    handleChangeContents={handleChangeContents}
                />
            </div>
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="blank-page"
                        checked={isBlankPage}
                        onChange={(e) => setIsBlankPage(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor="blank-page"
                        className="ml-2 block text-sm text-gray-700"
                    >
                        Blank page
                    </label>
                </div>
            </div>
            {!isBlankPage && (
                <>
                    <div className="flex items-center">
                        <label
                            htmlFor="task-points"
                            className="mr-2 block text-sm text-gray-700"
                        >
                            Баллы за задание:
                        </label>
                        <input
                            type="number"
                            id="task-points"
                            min="1"
                            max="10"
                            value={points}
                            onChange={handlePointsChange}
                            className="w-16 p-1 border border-gray-300 rounded-md text-sm"
                        />
                    </div>
                    <LanguadesBlock
                        selectedLanguages={selectedLanguages}
                        setSelectedLanguages={setSelectedLanguages}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        handleLanguageToggle={handleLanguageToggle}
                    />
                    <CompilerSettingsBlock
                        compilerSettings={compilerSettings}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        resetToDefaults={resetToDefaults}
                        handleSettingChange={handleSettingChange}
                        compilerSettingsConfig={defaultCompilerSettings}
                    />
                    <TestsBlock
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        tests={tests}
                        addTest={addTest}
                        removeTest={removeTest}
                        handleTestChange={handleTestChange}
                        sampleCount={sampleCount}
                        onSampleCountChange={setSampleCount}
                    />
                </>
            )}
        </div>
    );
};

export default EditPageContent;
