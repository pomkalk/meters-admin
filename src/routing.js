import React from 'react'
import DashboardPage from './pages/DashboardPage'
import MetersPage from './pages/MetersPage'
import DatabasePage from './pages/DatabasePage'
import NewsPage from './pages/NewsPage'
import NotificationsPage from './pages/NotificationsPage'
import FeedbacksPage from './pages/FeedbacksPage'
import SettingsPage from './pages/SettingsPage'


export const routing = [
    { path: 'dashboard', component: <DashboardPage /> },
    { path: 'meters', component: <MetersPage /> },
    { path: 'database', component: <DatabasePage /> },
    { path: 'news', component: <NewsPage /> },
    { path: 'notifications', component: <NotificationsPage /> },
    { path: 'feedbacks', component: <FeedbacksPage /> },
    { path: 'settings', component: <SettingsPage /> },
]