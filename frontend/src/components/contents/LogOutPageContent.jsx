import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutPageContent = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-normal text-gray-800 mb-4">
                    Добро пожаловать в Quber
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Платформа для создания и прохождения увлекательных квестов
                    по программированию. Присоединяйтесь к сообществу
                    исследователей и создателей!
                </p>
            </div>

            <div className="flex space-x-6">
                <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-md border border-gray-400 py-3 px-8 text-lg font-normal text-gray-800 shadow-sm hover:bg-gray-50 transition-colors duration-200"
                >
                    Войти
                </Link>
                <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-md border border-transparent py-3 px-8 text-lg font-normal text-white bg-gray-800 shadow-sm hover:bg-gray-700 transition-colors duration-200"
                >
                    Регистрация
                </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                <div className="text-center p-6 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-normal text-gray-800 mb-3">
                        Создавайте
                    </h3>
                    <p className="text-gray-600">
                        Разрабатывайте уникальные квесты по программированию
                    </p>
                </div>
                <div className="text-center p-6 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-normal text-gray-800 mb-3">
                        Проходите
                    </h3>
                    <p className="text-gray-600">
                        Участвуйте в квестах и открывайте новые возможности
                    </p>
                </div>
                <div className="text-center p-6 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-normal text-gray-800 mb-3">
                        Классы
                    </h3>
                    <p className="text-gray-600">
                        Организуйте учеников в классы и отслеживайте их
                        достижения.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoggedOutPageContent;
