// // File: app/(auth)/_layout.tsx
// import { Stack } from 'expo-router';
// import { useEffect } from 'react';
// import { BackHandler, Alert } from 'react-native';

// export default function AuthLayout() {
//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert('Exit App', 'Do you want to exit?', [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Exit', onPress: () => BackHandler.exitApp() },
//       ]);
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//     return () => backHandler.remove();
//   }, []);

//   return <Stack screenOptions={{ headerShown: false }} />;
// }


// File: app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { AuthProvider } from '@/context/AuthContext'; // ✅ Import AuthProvider

export default function AuthLayout() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Do you want to exit?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
