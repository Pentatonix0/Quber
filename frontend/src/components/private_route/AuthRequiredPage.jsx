import React from 'react';
import { Link } from 'react-router-dom';

const AuthRequiredPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="mb-8">
                    <img
                        src="/lock.svg"
                        alt="Иконка замка"
                        className="mx-auto h-24 w-24 object-contain"
                    />
                </div>

                <h1 className="text-3xl font-normal text-gray-800 mb-4">
                    Доступ к разделу ограничен
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Авторизуйтесь, чтобы получить полный доступ ко всем
                    возможностям платформы
                </p>
            </div>

            <div className="w-full max-w-xs space-y-4 mb-12">
                <Link
                    to="/login"
                    className="block w-full py-3 px-6 text-center rounded-md border border-gray-400 text-gray-800 hover:bg-gray-50 transition-colors"
                >
                    Войти в аккаунт
                </Link>
                <Link
                    to="/register"
                    className="block w-full py-3 px-6 text-center rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                    Создать аккаунт
                </Link>
            </div>
        </div>
    );
};

export default AuthRequiredPage;
