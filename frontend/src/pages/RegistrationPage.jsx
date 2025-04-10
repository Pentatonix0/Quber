import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../Auth';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const body = {
            username: data.login,
            name: data.fullName,
            password: data.password,
        };

        try {
            const response = await axios.post('/api/auth/signup', body, {
                headers: { 'Content-Type': 'application/json' },
            });
            login(response.data);
            navigate('/learn');
        } catch (error) {
            console.error('Registration error:', error);
            setRegistrationError(
                'Ошибка регистрации. Возможно, логин уже занят'
            );
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-normal text-gray-800 mb-2">
                        Регистрация в Quber
                    </h1>
                    <p className="text-gray-600">
                        Заполните данные для создания аккаунта
                    </p>
                    {registrationError && (
                        <p className="text-red-500 text-sm text-center mt-4">
                            {registrationError}
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
                                placeholder="Придумайте логин"
                            />
                            {errors.login && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.login.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                ФИО
                            </label>
                            <input
                                id="fullName"
                                {...register('fullName', {
                                    required: 'Обязательное поле',
                                    pattern: {
                                        value: /^[а-яА-ЯёЁ\s]+$/,
                                        message: 'Введите корректное ФИО',
                                    },
                                })}
                                className={`mt-1 block w-full rounded-md border-gray-400 shadow-sm sm:text-sm p-2 border focus:outline-none focus:ring-1 ${
                                    errors.fullName
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'focus:ring-gray-500'
                                }`}
                                placeholder="Введите ваше полное имя"
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.fullName.message}
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
                                placeholder="Придумайте пароль"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Повторите пароль
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: 'Обязательное поле',
                                    validate: (value) =>
                                        value === watch('password') ||
                                        'Пароли не совпадают',
                                })}
                                className={`mt-1 block w-full rounded-md border-gray-400 shadow-sm sm:text-sm p-2 border focus:outline-none focus:ring-1 ${
                                    errors.confirmPassword
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'focus:ring-gray-500'
                                }`}
                                placeholder="Повторите пароль"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Зарегистрироваться
                    </button>

                    <div className="text-center text-sm text-gray-600 font-medium">
                        <div>
                            Уже есть аккаунт?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-indigo-500 hover:underline"
                            >
                                Войти
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
