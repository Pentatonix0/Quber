import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import OutputWindow from '../../../pages/OutputWindow';

const safeBtoa = (str) => {
    // Преобразуем строку в UTF-8 с использованием encodeURIComponent
    return btoa(unescape(encodeURIComponent(str)));
};

const safeAtob = (base64Str) => {
    // Декодируем Base64 и возвращаем строку в оригинальном виде
    return decodeURIComponent(escape(atob(base64Str)));
};
const CodeRunner = ({
    test,
    setIsShow,
    language,
    compilerSettings,
    sourceCode,
}) => {
    const [input, setInput] = useState(safeAtob(test.stdin));
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
        if (outputRef.current) {
            outputRef.current.style.height = 'auto';
            outputRef.current.style.height = `${outputRef.current.scrollHeight}px`;
        }
    }, [input, output]);

    const handleRunCode = async () => {
        setIsRunning(true);
        const body = {
            source_code: safeBtoa(sourceCode),
            language_id: language.id,
            stdin: safeBtoa(input),
            cpu_time_limit: compilerSettings.cpu_time_limit,
            memory_limit: compilerSettings.memory_limit,
            stack_limit: compilerSettings.stack_limit,
            max_processes_and_or_threads:
                compilerSettings.max_processes_and_or_threads,
        };
        console.log(body);
        try {
            const response = await axios.post('/api/code/run-code', body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.access_token}`,
                },
            });
            console.log(response.data);
            setOutput(response.data);
        } catch (error) {
            console.error('There was an error in code runner:', error);
        } finally {
            setIsRunning(false);
        }
    };

    const onClose = () => {
        setIsShow(false);
    };

    return (
        <div className="p-4 bg-gray-200 border-1 border-x border-b border-gray-500 space-y-4">
            <div className="flex gap-2 w-full">
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-md resize-y min-h-[20px] text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Введите данные..."
                />
                <div className="flex flex-col items-center">
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className={`h-fit px-6 py-2 rounded-md border border-gray-500 text-sm text-gray-800 font-medium ${
                            isRunning || sourceCode.length === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-orange-200 hover:bg-orange-300'
                        }`}
                    >
                        Запустить
                    </button>
                    <button
                        className="text-xs font-medium mt-2 hover:underline"
                        onClick={onClose}
                    >
                        Cкрыть
                    </button>
                </div>
            </div>

            <OutputWindow outputDetails={output} />
        </div>
    );
};

export default CodeRunner;
