// components/BellWithNotification.tsx

import { NotificationContext } from '@/context/NotificationContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';

const BellWithNotification = () => {
    const { unread } = useContext(NotificationContext);
    const router = useRouter();

    return (

        <TouchableOpacity
            onPress={() => router.push('/notifications')}
            style={{ marginRight: 15 }}
        >
            <Ionicons name="notifications-outline" size={24} color="black" />
            {unread > 0 && (
                <View className="absolute top-0 right-0.5 w-2.5 h-2.5 rounded-full bg-red-500" />
            )}
        </TouchableOpacity>
        // <TouchableOpacity onPress={() => router.push('/(dashboard)/notifications')}>
        //   <View>
        //     <Bell size={24} color="black" style={{marginRight:"15"}} />
        //     {unread > 0 && (
        //       <View className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500" />
        //     )}
        //   </View>
        // </TouchableOpacity>
    );
};

export default BellWithNotification;
