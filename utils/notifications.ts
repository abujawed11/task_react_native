// utils/notifications.ts
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  // Check physical device
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Push notification permission not granted!');
      return null;
    }

    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId: 'your-expo-project-id', // Required if using EAS Build
    });

    token = pushTokenData.data;
    console.log('Expo Push Token:', token);
  } else {
    console.warn('Must use physical device for push notifications');
  }

  // Android: Set notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFA500',
    });
  }

  return token;
}
