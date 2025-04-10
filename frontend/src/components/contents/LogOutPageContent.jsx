import React from 'react';
import { Link } from 'react-router-dom';

const AuthRequiredPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-normal text-gray-800 mb-4">
                    Требуется авторизация
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Для доступа к этому разделу необходимо войти в систему.
                    Присоединяйтесь к сообществу разработчиков и преподавателей!
                </p>
            </div>

            <div className="flex space-x-6 mb-16">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
                <div className="text-center p-6 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-normal text-gray-800 mb-3">
                        Персональный доступ
                    </h3>
                    <p className="text-gray-600">
                        Сохраняйте прогресс и настройки вашего обучения
                    </p>
                </div>

                <div className="text-center p-6 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-normal text-gray-800 mb-3">
                        Создание контента
                    </h3>
                    <p className="text-gray-600">
                        Разрабатывайте собственные квесты и задания
                    </p>
                </div>

                <div className="text-center p-6 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-normal text-gray-800 mb-3">
                        Управление классами
                    </h3>
                    <p className="text-gray-600">
                        Организуйте студентов и отслеживайте их успехи
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthRequiredPage;
