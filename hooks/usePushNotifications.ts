import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';

export function usePushNotifications() {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        // console.log("Notification received:", notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // console.log("Notification response:", response);
      });

      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(notificationListener.current);
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(responseListener.current);
        }
      };
    }
  }, []);

  const registerForPushToken = async (): Promise<string | null> => {
    if (!Device.isDevice) {
      Alert.alert("Must use physical device for Push Notifications");
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert("Permission denied for notifications");
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  };

  return { registerForPushToken };
}
