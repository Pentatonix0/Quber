import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Error404 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="mb-12"
                >
                    <svg
                        className="mx-auto h-48 text-purple-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path
                            d="M15.5 8.5L8.5 15.5M8.5 8.5l7 7"
                            strokeLinecap="round"
                        />
                        <circle cx="12" cy="12" r="9" fill="none" />
                        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                    </svg>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-bold text-gray-800 mb-6"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-semibold text-gray-700 mb-8"
                >
                    Страница не найдена
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-gray-600 mb-4"
                >
                    Возможно, запрашиваемая страница была перемещена или больше
                    не существует.
                </motion.p>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Link
                        to="/"
                        className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl 
                                 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-200"
                    >
                        На главную
                    </Link>
                </motion.div>

                <div className="mt-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-gray-500 text-sm"
                    ></motion.div>
                </div>
            </div>
        </div>
    );
};

export default Error404;
