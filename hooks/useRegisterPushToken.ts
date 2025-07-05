import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const useRegisterPushToken = () => {
  const registerPushToken = async (jwt: string) => {
    try {
      if (!Device.isDevice) {
        Alert.alert("Must use a physical device for push notifications.");
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert("Permission for notifications not granted.");
        return;
      }

      const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();
      console.log("📦 Expo Push Token:", expoPushToken);

      // Send token to backend
      await axios.post(
        `${BASE_URL}/api/notifications/register-token`,
        {
          expo_push_token: expoPushToken,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("✅ Push token registered on backend");

    } catch (error) {
      console.error("❌ Failed to register push token:", error);
    }
  };

  return { registerPushToken };
};
