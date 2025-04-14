import React, { useEffect, useState } from 'react';
import QuestDescription from '../../editors/QuestDescription';
import CodeEditorWindow from '../../editors/CodeEditorWindow';
import { defineTheme } from '../../../lib/defineTheme';
import SampleTests from './SampleTests';
import LanguagesDropdown from './LanguagesDropdown';
import Limits from './Limits';
import CodeRunner from './CodeRunner';
import OutputWindow from '../../../pages/OutputWindow';

const QuestPageContent = ({
    task,
    language,
    setLanguage,
    sourceCode,
    setSourceCode,
    status,
    onSubmit,
    solution,
}) => {
    const [isShowCodeRunner, setIsShowCodeRunner] = useState(false);
    const theme = {
        value: 'iplastic',
        label: 'iPlastic',
    };
    const onSourceCodeChange = (code) => {
        setSourceCode(code);
    };

    useEffect(() => {
        defineTheme(theme.value)
            .then(() => {})
            .catch((error) => {
                console.error('Ошибка при загрузке темы:', error);
            });
    }, [theme.value]);

    const onSelectChange = (sl) => {
        setLanguage(sl);
    };
    const onClickCodeRunner = () => {
        setIsShowCodeRunner(true);
    };
    const getBackGround = (code_status) => {
        switch (code_status) {
            case 'testing':
                return 'bg-blue-50';
            case 'accepted':
                return 'bg-green-100';
            case 'default':
                return '';
            default:
                return 'bg-red-100';
        }
    };

    if (task.is_blank_page) {
        return (
            <div className="px-4 space-y-4 mb-4">
                <div className="pr-8">
                    <QuestDescription description={task.description} />
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="px-4 space-y-4 mb-4">
                <div className="pr-8">
                    <QuestDescription description={task.description} />
                </div>
                <div className="pl-4 pr-12">
                    <SampleTests
                        tests={task.tests}
                        sampleCount={task.sample_count}
                    />
                </div>
            </div>
            <div className="pl-8 pr-16 mb-4">
                <h2 className="text-lg font-semibold">Напишите программу</h2>
            </div>
            {status === 'accepted' && (
                <div className="pl-8 pr-16 mb-1">
                    <h2 className="text-sm font-base text-green-600">
                        ✅ Задача решена верно
                    </h2>
                </div>
            )}
            {status === 'fail' && (
                <div className="pl-8 pr-16 mb-1">
                    <h2 className="text-sm font-base text-red-500">
                        ❌ Пока неправильно
                    </h2>
                </div>
            )}
            {status === 'fail' && (
                <div className="pl-8 pr-16 mb-4">
                    <OutputWindow
                        outputDetails={solution.test_details}
                        failed_test_number={solution.failed_test_number}
                    />
                </div>
            )}
            <div className={`flex flex-col ${getBackGround(status)}`}>
                <div className="pl-8 pr-16 pt-2 mb-2 flex justify-between items-end">
                    <div>
                        <Limits compileSettings={task.compiler_settings} />
                    </div>
                    <div>
                        <LanguagesDropdown
                            onSelectChange={onSelectChange}
                            allowedLanguagesIds={task.languages}
                            language={language}
                        />
                    </div>
                </div>
                <div className="pl-8 pr-16 pt-4">
                    <CodeEditorWindow
                        code={sourceCode}
                        onChange={onSourceCodeChange}
                        language={'python'}
                        theme={theme.value}
                    />
                    {isShowCodeRunner ? (
                        <CodeRunner
                            test={task.tests[0]}
                            setIsShow={setIsShowCodeRunner}
                            language={language}
                            compilerSettings={task.compiler_settings}
                            sourceCode={sourceCode}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                {status != 'testing' ? (
                    <div className="pl-8 pr-16 pt-8 flex justify-between items-center mb-8">
                        <div className="bg-green-200 rounded-md border border-gray-500 hover:bg-green-300">
                            <button
                                className="px-6 py-2 text-sm font-medium"
                                onClick={onSubmit}
                            >
                                Отправить
                            </button>
                        </div>
                        {isShowCodeRunner ? (
                            <></>
                        ) : (
                            <div className="bg-gray-300 rounded-md border border-gray-500 hover:bg-gray-400">
                                <button
                                    className="px-6 py-2 text-sm font-medium"
                                    onClick={onClickCodeRunner}
                                >
                                    Запустить
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="pl-8 pr-16 pt-8 flex justify-between items-center mb-8">
                        <div className="bg-blue-50 rounded-md border border-gray-500">
                            <div className="px-6 py-2 text-sm font-medium">
                                Решение тестируется
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div
                className="mt-4 p-6 bg-white"
                style={{ height: '200px' }}
            ></div>
        </>
    );
};

export default QuestPageContent;
