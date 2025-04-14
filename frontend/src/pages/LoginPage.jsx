import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../Auth';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const body = {
            username: data.login,
            password: data.password,
        };

        try {
            const response = await axios.post('/api/auth/login', body, {
                headers: { 'Content-Type': 'application/json' },
            });
            login(response.data);
            navigate('/learn');
        } catch (error) {
            console.error('There was an error logging in:', error);
            setLoginError('Неверный логин или пароль');
        }

        reset();
    };

    return (
        <>
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-normal text-gray-800 mb-2">
                            Добро пожаловать в Quber
                        </h1>
                        <p className="text-gray-600">
                            Введите данные для входа
                        </p>
                        {loginError && (
                            <p className="text-red-500 text-sm text-center mt-4">
                                {loginError}
                            </p>
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-6"
                    >
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="login"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Логин
                                </label>
                                <input
                                    id="login"
                                    {...register('login', {
                                        required: 'Обязательное поле',
                                    })}
                                    className={`mt-1 block w-full rounded-md border-gray-400 shadow-sm sm:text-sm p-2 border focus:outline-none focus:ring-1 ${
                                        errors.login
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'focus:ring-gray-500'
                                    }`}
                                    placeholder="Введите логин"
                                />
                                {errors.login && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.login.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Пароль
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register('password', {
                                        required: 'Обязательное поле',
                                        minLength: {
                                            value: 6,
                                            message: 'Минимум 6 символов',
                                        },
                                    })}
                                    className={`mt-1 block w-full rounded-md border-gray-400 shadow-sm sm:text-sm p-2 border focus:outline-none focus:ring-1 ${
                                        errors.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'focus:ring-gray-500'
                                    }`}
                                    placeholder="Введите пароль"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Войти
                        </button>

                        <div className="text-center text-sm text-gray-600 font-medium">
                            <div>
                                Нет аккаунта?{' '}
                                <Link
                                    to="/register"
                                    className="font-medium text-indigo-500 hover:underline"
                                >
                                    Зарегистрироваться
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
