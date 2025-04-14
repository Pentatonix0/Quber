import React from 'react';
import { Link } from 'react-router-dom';

const LogInPageContent = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="py-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl font-normal text-gray-800 mb-6">
                    Добро пожаловать в Quber
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Платформа для создания и прохождения интерактивных квестов
                    по программированию. Совершенствуйте навыки в увлекательном
                    формате!
                </p>

                <div className="flex justify-center gap-4 mb-16">
                    <Link
                        to="/learn"
                        className="inline-flex items-center justify-center rounded-md py-3 px-8 text-lg font-normal text-white bg-gray-800 shadow-sm hover:bg-gray-700 transition-colors"
                    >
                        Перейти к квестам
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <div className="p-6 border border-gray-300 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-blue-600 text-4xl mb-4">👨💻</div>
                        <h3 className="text-xl font-normal text-gray-800 mb-3">
                            Интерактивные задания
                        </h3>
                        <p className="text-gray-600">
                            Решайте реальные задачи программирования с
                            мгновенной проверкой кода
                        </p>
                    </div>

                    <div className="p-6 border border-gray-300 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-yellow-500 text-4xl mb-4">🧩</div>
                        <h3 className="text-xl font-normal text-gray-800 mb-3">
                            Создавайте собственные квесты
                        </h3>
                        <p className="text-gray-600">
                            Создавайте квесты по программированию с задачами,
                            тестами и автоматической проверкой.
                        </p>
                    </div>

                    <div className="p-6 border border-gray-300 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-blue-600 text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-normal text-gray-800 mb-3">
                            Работа в классах
                        </h3>
                        <p className="text-gray-600">
                            Организуйте учебные группы и отслеживайте прогресс
                            студентов
                        </p>
                    </div>
                </div>

                <div className="py-12 border-t border-gray-200">
                    <h2 className="text-3xl font-normal text-gray-800 mb-8">
                        Создайте свой квест за 3 шага
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="text-blue-600 text-2xl font-semibold mb-4">
                                1
                            </div>
                            <h3 className="text-lg font-normal text-gray-800 mb-2">
                                Конструктор заданий
                            </h3>
                            <p className="text-gray-600">
                                Используйте встроенный редактор для создания
                                цепочек задач
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="text-blue-600 text-2xl font-semibold mb-4">
                                2
                            </div>
                            <h3 className="text-lg font-normal text-gray-800 mb-2">
                                Настройка проверки
                            </h3>
                            <p className="text-gray-600">
                                Добавляйте тесты и проверочные сценарии для
                                автоматической проверки
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="text-blue-600 text-2xl font-semibold mb-4">
                                3
                            </div>
                            <h3 className="text-lg font-normal text-gray-800 mb-2">
                                Публикация
                            </h3>
                            <p className="text-gray-600">
                                Открывайте доступ студентам или делитесь в
                                сообществе
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-200">
                    <h2 className="text-2xl font-normal text-gray-800 mb-4">
                        Начните прямо сейчас!
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                        Присоединяйтесь к сообществу разработчиков и
                        преподавателей
                    </p>
                    <Link
                        to="/teach/new"
                        className="inline-flex items-center justify-center rounded-md py-3 px-8 text-lg font-normal text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        Создать квест
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LogInPageContent;
