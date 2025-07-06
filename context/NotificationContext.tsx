// // context/NotificationContext.tsx
// import { useAuth } from '@/hooks/useAuth';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';

// interface Notification {
//     notification_id: string;
//     task_id: string;
//     task_title?: string;
//     message?: string;
//     sender: string;
//     receiver: string;
//     type: string;
//     updates?: Record<string, string>;
//     is_read: number;
//     created_at: string;
// }

// interface NotificationContextType {
//     notifications: Notification[];
//     unread: number;
//     fetchNotifications: () => void;
//     markAsRead: (id: string) => void;
// }

// export const NotificationContext = createContext<NotificationContextType>({
//     notifications: [],
//     unread: 0,
//     fetchNotifications: () => { },
//     markAsRead: () => { },
// });

// export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const { user,loading } = useAuth();
//     const [notifications, setNotifications] = useState<Notification[]>([]);
//     const [unread, setUnread] = useState(0);

//     const fetchNotifications = async () => {
//         try {
//             // console.log(`Fetching notifications for user: ${user?.username}`);
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/notifications`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             // console.log('Notifications fetched:', res.data);
//             setNotifications(res.data);
//             setUnread(res.data.filter((n: Notification) => !n.is_read).length);
//         } catch (err) {
//             console.error('Error fetching notifications:', err);
//         }
//     };

//     const markAsRead = async (notificationId: string) => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             await axios.post(
//                 `${BASE_URL}/api/notifications/mark-read`,
//                 { notificationId },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             fetchNotifications();
//         } catch (err) {
//             console.error('Error marking notification as read:', err);
//         }
//     };

//     useEffect(() => {
//         if (user) {
//             console.log("Fetch nOtificTions called")
//             fetchNotifications();
//             const interval = setInterval(fetchNotifications, 2 * 60 * 1000);
//             return () => clearInterval(interval);
//         }
//     }, [user,loading]);

//     return (
//         <NotificationContext.Provider
//             value={{ notifications, unread, fetchNotifications, markAsRead }}
//         >
//             {children}
//         </NotificationContext.Provider>
//     );
// };

// context/NotificationContext.tsx

import { useAuth } from '@/hooks/useAuth';
import { BASE_URL } from '@/utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

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
    setRefreshing: (val: boolean) => void;
    //refreshing: (val: boolean) => void;
    refreshing: boolean; // ✅ ADD THIS
}

export const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    unread: 0,
    fetchNotifications: () => { },
    markAsRead: () => { },
    setRefreshing: (val: boolean) => false,
    //refreshing: (val: boolean) => false,
    refreshing: false // ✅ ADD THIS
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user, loading } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unread, setUnread] = useState(0);
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
    const [refreshing, setRefreshing] = useState(false);
    //   const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [intervalId, setIntervalId] = useState<number | null>(null); // ✅ Correct

    let retryCount = 0;
    const MAX_RETRY = 5;

    const fetchNotifications = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;

            const res = await axios.get(`${BASE_URL}/api/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = Array.isArray(res.data) ? res.data : [];
            setNotifications(data);
            setUnread(data.filter((n: Notification) => !n.is_read).length);
            setRefreshing(false); // ✅ THIS MUST BE CALLED

            retryCount = 0; // reset on success
        } catch (err) {
            if (__DEV__) console.error('Error fetching notifications:', err);

            if (retryCount < MAX_RETRY) {
                retryCount++;
                setTimeout(fetchNotifications, retryCount * 10000); // exponential backoff
            }
        }
    };

    const markAsRead = async (notificationId: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;

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
            if (__DEV__) console.error('Error marking notification as read:', err);
        }
    };

    useEffect(() => {
        if (!user || loading) return;

        const startPolling = () => {
            fetchNotifications();
            const id = setInterval(fetchNotifications, 2 * 60 * 1000);
            setIntervalId(id);
        };

        const stopPolling = () => {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        };

        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            setAppState(nextAppState);
            if (nextAppState === 'active') {
                startPolling();
            } else {
                stopPolling();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        startPolling();

        return () => {
            subscription.remove();
            stopPolling();
        };
    }, [user, loading]);

    return (
        <NotificationContext.Provider
            value={{ notifications, unread, fetchNotifications, markAsRead, setRefreshing, refreshing }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

