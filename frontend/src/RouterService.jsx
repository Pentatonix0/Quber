import React from 'react';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import TeachigPage from './pages/TeachingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/private_route/PrivateRoute';
import LoginPage from './pages/LoginPage';
import LearnPageMainContent from './components/contents/learn_page/LearnPageMainContent';
import LearnPageQuestsContent from './components/contents/learn_page/LearnPageQuestsContent';
import LearnPageClassesContent from './components/contents/learn_page/LearnPageClassesContent';
import TeachingPageMainContent from './components/contents/teaching_page/TeachingPageMainContent';
import TeachingPageQuestsContent from './components/contents/teaching_page/TeachingPageQuestsContent';
import TeachingPageClassesContent from './components/contents/teaching_page/TeachingPageClassesContent';
import TeachingPageNewQuestContent from './components/contents/teaching_page/TeachingPageNewQuestContent';
import QuestPage from './pages/QuestPage';
import Layout from './components/layouts/Layout';
import EditQuestPage from './pages/EditQuestPage';
import RegistrationPage from './pages/RegistrationPage';
import Error404 from './pages/Error404';
import InvitePage from './pages/InvitePage';

const RouterService = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="/learn"
                        element={
                            <PrivateRoute>
                                <LearnPage />
                            </PrivateRoute>
                        }
                    >
                        <Route
                            index
                            element={
                                <PrivateRoute>
                                    <LearnPageMainContent />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="quests"
                            element={
                                <PrivateRoute>
                                    <LearnPageQuestsContent />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="classes"
                            element={
                                <PrivateRoute>
                                    <LearnPageClassesContent />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                    <Route
                        path="/teach"
                        element={
                            <PrivateRoute>
                                <TeachigPage />
                            </PrivateRoute>
                        }
                    >
                        <Route
                            index
                            element={
                                <PrivateRoute>
                                    <TeachingPageMainContent />
                                </PrivateRoute>
                            }
                        />
                        <Route path="quests">
                            <Route
                                index
                                element={
                                    <PrivateRoute>
                                        <TeachingPageQuestsContent />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                        <Route
                            path="classes"
                            element={
                                <PrivateRoute>
                                    <TeachingPageClassesContent />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="new"
                            element={
                                <PrivateRoute>
                                    <TeachingPageNewQuestContent />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                    <Route
                        path="quest/:quest_id"
                        element={
                            <PrivateRoute>
                                <QuestPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="edit-quest/:quest_id"
                        element={
                            <PrivateRoute>
                                <EditQuestPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="invite/:invite_code"
                        element={
                            <PrivateRoute>
                                <InvitePage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    );
};

export default RouterService;
