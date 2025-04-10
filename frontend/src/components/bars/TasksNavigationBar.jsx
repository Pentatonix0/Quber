import React from 'react';

const TaskNavigationBar = ({
    tasks,
    currentTaskIndex,
    setCurrentTaskIndex,
}) => {
    return (
        <div className="flex py-2 px-8 bg-white border-b border-gray-200">
            <div className="flex space-x-2">
                {tasks.map((task, index) => (
                    <button
                        key={task.id}
                        onClick={() => setCurrentTaskIndex(index)}
                        className={`
                            w-10 h-10 flex items-center justify-center
                            border-2 rounded-md text-md font-base
                            transition-colors duration-200
                            hover:bg-gray-200
                            ${
                                index === currentTaskIndex
                                    ? 'border-gray-800 bg-gray-200 text-gray-800'
                                    : 'border-gray-300 bg-gray-100 text-gray-800'
                            }
                        `}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaskNavigationBar;
