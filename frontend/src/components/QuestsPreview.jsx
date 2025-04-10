import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestPreview = ({ title, id, invite_code, isAuthor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const copyInviteLink = async () => {
        const link = `${window.location.origin}/invite/${invite_code}`;
        try {
            await navigator.clipboard.writeText(link);
            toast.success('Ссылка скопирована в буфер обмена', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            console.log(err);
            toast.error('Не удалось скопировать ссылку', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const toggleModal = (e) => {
        e.stopPropagation();
        const allModals = document.querySelectorAll('.modal-overlay');
        allModals.forEach((modal) => modal.remove());
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isModalOpen) {
                const modalContent = document.querySelector('.modal-content');
                if (modalContent && !modalContent.contains(e.target)) {
                    closeModal();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isModalOpen]);

    return (
        <div className="bg-white border border-gray-400 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative isolate">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3
                        className="text-sm font-normal text-gray-800 mb-2 truncate"
                        style={{
                            maxWidth: 'calc(100% - 40px)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        title={title}
                    >
                        {title}
                    </h3>
                    <div className="relative">
                        <button
                            onClick={toggleModal}
                            className="focus:outline-none"
                        >
                            <img
                                src="/more.png"
                                className="w-5 h-5"
                                alt="More options"
                            />
                        </button>

                        {isModalOpen && (
                            <>
                                <div className="fixed inset-0 z-40 modal-overlay" />

                                <div
                                    className="fixed z-50 modal-content"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <div className="w-48 bg-white rounded-md shadow-xl py-1 border border-gray-200">
                                        {isAuthor && (
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log(id);
                                                    closeModal();
                                                }}
                                            >
                                                Удалить
                                            </button>
                                        )}
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyInviteLink();
                                                closeModal();
                                            }}
                                        >
                                            Поделиться
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Link
                to={`/quest/${id}`}
                className="block w-full py-2 text-center bg-gray-50 rounded-b-lg text-base text-gray-800 font-base hover:bg-gray-100 transition-colors border-t border-gray-200"
            >
                Продолжить
            </Link>
        </div>
    );
};

export default QuestPreview;
