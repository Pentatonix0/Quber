import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TeachingPageNewQuestContent = () => {
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const body = {
            title: data.title,
            author_id: token.user_id,
        };

        try {
            await axios.post('/api/quests/create-quest', body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.access_token}`,
                },
            });
            toast.success('Квест успешно создан', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/teach/quests');
        } catch (error) {
            toast.error('Не удалось создать квест', {
                position: 'top-right',
                autoClose: 3000,
            });
            console.error(error);
        }

        reset();
    };

    return (
        <div className="h-screen w-full max-w-7xl bg-white">
            <h1 className="px-10 py-5 text-2xl font-normal">
                Создание нового квеста
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-10 py-5 space-y-6"
            >
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Название квеста*
                    </label>
                    <input
                        id="title"
                        {...register('title', {
                            required: 'Это поле обязательно',
                            maxLength: {
                                value: 64,
                                message:
                                    'Описание не может быть длиннее 64 символов',
                            },
                        })}
                        className={`mt-1 block w-full rounded-md border-gray-400 shadow-sm sm:text-sm p-2 border focus:outline-none focus:ring-1 ${
                            errors.title
                                ? 'border-red-500 focus:ring-red-500'
                                : 'focus:ring-gray-500'
                        }`}
                        placeholder="Введите название квеста"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-gray-400 py-2 px-4 text-base font-base text-gray-800 shadow-sm hover:bg-green-100"
                    >
                        Создать квест
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeachingPageNewQuestContent;
