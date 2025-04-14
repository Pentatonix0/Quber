import React from 'react';

const CompilerSettingsBlock = ({
    compilerSettings,
    expandedSections,
    toggleSection,
    resetToDefaults,
    handleSettingChange,
    compilerSettingsConfig,
}) => {
    return (
        <div className="border border-gray-400 rounded-md overflow-hidden">
            <button
                onClick={() => toggleSection('limits')}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
            >
                <span className="text-base font-medium">
                    Параметры компиляции
                </span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${
                        expandedSections.limits ? 'rotate-180' : ''
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
            {expandedSections.limits && (
                <div className="p-4 bg-white">
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <button
                                onClick={resetToDefaults}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Настройки по умолчанию
                            </button>
                        </div>

                        {[
                            {
                                field: 'cpu_time_limit',
                                label: 'Макс. время CPU',
                                unit: 'сек',
                                step: 1,
                            },
                            {
                                field: 'memory_limit',
                                label: 'Макс. память',
                                unit: 'KB',
                                step: 100,
                            },
                            {
                                field: 'stack_limit',
                                label: 'Макс. стек',
                                unit: 'KB',
                                step: 100,
                            },
                            {
                                field: 'max_processes_and_or_threads',
                                label: 'Макс. процессов/потоков',
                                unit: '',
                                step: 1,
                            },
                        ].map(({ field, label, unit, step }) => {
                            const setting = compilerSettings[field];
                            const settingConfig = compilerSettingsConfig[field];
                            return (
                                <div key={field}>
                                    <label
                                        htmlFor={field}
                                        className="block text-xs font-base text-gray-700 mb-1"
                                    >
                                        {label} {unit && `(${unit})`}
                                        <span className="text-xs text-gray-500 ml-2">
                                            (мин: {settingConfig.min}, макс:{' '}
                                            {settingConfig.max}, шаг: {step})
                                        </span>
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="range"
                                            min={settingConfig.min}
                                            max={settingConfig.max}
                                            step={step}
                                            value={setting}
                                            onChange={(e) =>
                                                handleSettingChange(
                                                    field,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <input
                                            type="number"
                                            min={settingConfig.min}
                                            max={settingConfig.max}
                                            step={step}
                                            value={setting}
                                            onChange={(e) =>
                                                handleSettingChange(
                                                    field,
                                                    e.target.value
                                                )
                                            }
                                            className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompilerSettingsBlock;
