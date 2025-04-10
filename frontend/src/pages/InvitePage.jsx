import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const InvitePage = () => {
    const { invite_code } = useParams();
    const navigate = useNavigate();
    const isExecuted = useRef(false); // Флаг выполнения запроса
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));

    useEffect(() => {
        // Проверяем что запрос еще не выполнялся и есть код приглашения
        if (isExecuted.current || !invite_code) return;

        const controller = new AbortController(); // Для отмены запроса
        isExecuted.current = true;

        const sendInviteCode = async () => {
            try {
                console.log(token);
                const response = await axios.post(
                    `/api/quests/add-participant/${invite_code}/${token.user_id}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token?.access_token}`,
                        },
                    }
                );
                if (response.data.status === 'success') {
                    toast.success('Квест добавлен', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                } else if (response.data.status === 'warn') {
                    toast.warn('Вы уже участвуете', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error(error);
                toast.error(
                    error.response?.data?.message || 'Ошибка добавления',
                    {
                        position: 'top-right',
                        autoClose: 3000,
                    }
                );
            } finally {
                navigate('/learn/quests');
            }
        };

        sendInviteCode();

        // Очистка эффекта - отмена запроса при размонтировании
        return () => controller.abort();
    }, [invite_code]); // Зависимости только от invite_code

    return null;
};

export default InvitePage;
