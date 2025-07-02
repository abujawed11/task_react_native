// context/NotificationContext.tsx
import { useAuth } from '@/hooks/useAuth';
import { BASE_URL } from '@/utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

interface Notification {
    notification_id: string;
    task_id: string;
    task_title?: string;
    message?: string;
    sender: string;
    receiver: string;
    type: string;
    updates?: Record<string, string>;
    is_read: number;
    created_at: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unread: number;
    fetchNotifications: () => void;
    markAsRead: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    unread: 0,
    fetchNotifications: () => { },
    markAsRead: () => { },
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user,loading } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unread, setUnread] = useState(0);

    const fetchNotifications = async () => {
        try {
            // console.log(`Fetching notifications for user: ${user?.username}`);
            const token = await AsyncStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/api/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log('Notifications fetched:', res.data);
            setNotifications(res.data);
            setUnread(res.data.filter((n: Notification) => !n.is_read).length);
        } catch (err) {
            console.error('Error fetching notifications:', err);
        }
    };

    const markAsRead = async (notificationId: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(
                `${BASE_URL}/api/notifications/mark-read`,
                { notificationId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            fetchNotifications();
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    useEffect(() => {
        if (user) {
            console.log("Fetch nOtificTions called")
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 2 * 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [user,loading]);

    return (
        <NotificationContext.Provider
            value={{ notifications, unread, fetchNotifications, markAsRead }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
