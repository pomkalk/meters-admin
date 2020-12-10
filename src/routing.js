import React from 'react'
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'))
const MetersPage = React.lazy(() => import('./pages/MetersPage'))
const DatabasePage = React.lazy(() => import('./pages/DatabasePage'))
const NewsPage = React.lazy(() => import('./pages/NewsPage'))
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'))
const FeedbacksPage = React.lazy(() => import('./pages/FeedbacksPage'))
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'))


export const routing = [
    { path: 'dashboard', component: <DashboardPage />, access: 'dashboard'},
    { path: 'meters', component: <MetersPage />, access: 'meters'},
    { path: 'database', component: <DatabasePage />, access: 'import'},
    { path: 'news', component: <NewsPage />, access: 'news'},
    { path: 'notifications', component: <NotificationsPage />, access: 'notify'},
    { path: 'feedbacks', component: <FeedbacksPage />, access: 'feeds'},
    { path: 'settings', component: <SettingsPage />, access: ['users', 'config']},
]