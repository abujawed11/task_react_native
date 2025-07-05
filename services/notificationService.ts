import { BASE_URL } from '@/utils/constants';
import axios from 'axios';

export const sendPushTokenToBackend = async (user_id: string, token: string, jwt: string) => {
  try {
    await axios.post(
      `${BASE_URL}/api/notifications/register-token`,
      { user_id, expo_push_token: token },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    // console.log("✅ Push token sent to backend");
  } catch (err) {
    console.error("❌ Error sending push token:", err);
  }
};
