// import "../global.css";
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }} />
//   );
// }


// File: app/_layout.tsx
// import "../global.css";
// import { Slot } from 'expo-router';
// import { AuthProvider } from '@/context/AuthContext';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Slot />
//     </AuthProvider>
//   );
// }

// app/_layout.tsx
// import { AuthProvider } from '@/context/AuthContext';
// import { Drawer } from 'expo-router/drawer';
// import "../global.css";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Drawer
//         screenOptions={{
//           drawerPosition: 'left',
//           headerStyle: { backgroundColor: '#facc15' },
//           headerTintColor: 'black',
//           drawerLabel: 'Dashboard'
//         }}
//       />
//     </AuthProvider>
//   );
// }

// import { AuthProvider } from '@/context/AuthContext';
// import { Drawer } from 'expo-router/drawer';
// import "../global.css";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Drawer
//         screenOptions={{
//           drawerPosition: 'left',
//           headerStyle: { backgroundColor: '#facc15' },
//           headerTintColor: 'black',
//         }}
//       >
//         {/* Fixing route labels */}
//         <Drawer.Screen
//           name="(dashboard)"
//           options={{ drawerLabel: 'Dashboard' }} // ✅ fixes "(dashboard)" label
//         />
//         <Drawer.Screen
//           name="profile"
//           options={{ drawerLabel: 'Profile' }}
//         />
//         <Drawer.Screen
//           name="notifications"
//           options={{ drawerLabel: 'Notifications' }}
//         />
//       </Drawer>
//     </AuthProvider>
//   );
// }


// import { AuthProvider } from '@/context/AuthContext';
// import { Drawer } from 'expo-router/drawer';
// import '../global.css';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Drawer
//         screenOptions={{
//           drawerPosition: 'left',
//           headerStyle: { backgroundColor: '#facc15' },
//           headerTintColor: 'black',
//         }}
//       >
//         {/* Register folder (dashboard) as screen */}
//         <Drawer.Screen
//           name="(dashboard)"
//           options={{
//             drawerLabel: 'Dashboard',
//             title: 'Dashboard', // fixes header title too
//           }}
//         />

//         {/* These are individual pages */}
//         <Drawer.Screen
//           name="notifications"
//           options={{ drawerLabel: 'Notifications',title:"Notifications" }}
//         />
//         <Drawer.Screen
//           name="profile"
//           options={{ drawerLabel: 'Profile' }}
//         />
//       </Drawer>


//       {/* 👇 These hide unwanted routes */}
//         <Drawer.Screen
//           name="index"
//           options={{ drawerItemStyle: { display: 'none' } }}
//         />
//         <Drawer.Screen
//           name="(auth)"
//           options={{ drawerItemStyle: { display: 'none' } }}
//         />
//     </AuthProvider>
//   );
// }

// import { AuthProvider } from '@/context/AuthContext';
// import { Drawer } from 'expo-router/drawer';
// import '../global.css';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Drawer
//         screenOptions={{
//           drawerPosition: 'left',
//           headerStyle: { backgroundColor: '#facc15' },
//           headerTintColor: 'black',
//         }}
//       >
//         {/* 👇 Don't show index.tsx in the drawer menu */}
//         <Drawer.Screen
//           name="index"
//           options={{ drawerItemStyle: { display: 'none' } }}
//         />

//         <Drawer.Screen
//           name="(dashboard)"
//           options={{ drawerLabel: 'Dashboard', title: 'Dashboard' }}
//         />
//         <Drawer.Screen
//           name="notifications"
//           options={{ drawerLabel: 'Notifications' }}
//         />
//         <Drawer.Screen
//           name="profile"
//           options={{ drawerLabel: 'Profile' }}
//         />
//         <Drawer.Screen
//           name="(auth)"
//           options={{ drawerItemStyle: { display: 'none' } }}
//         />
//       </Drawer>
//     </AuthProvider>
//   );
// }


// app/_layout.tsx
// import CustomDrawer from '@/components/CustomDrawer';
// import { AuthProvider } from '@/context/AuthContext';
// import { Drawer } from 'expo-router/drawer';
// import "../global.css";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Drawer
//         drawerContent={(props) => <CustomDrawer {...props} />}
//         screenOptions={{
//           drawerPosition: 'left',
//           headerStyle: { backgroundColor: '#facc15' },
//           headerTintColor: 'black',
//         }}
//       >
//         {/* 👇 Don't show index.tsx in the drawer menu */}
//         <Drawer.Screen
//           name="index"
//           options={{ drawerItemStyle: { display: 'none' } }}
//         />

//         <Drawer.Screen
//           name="(dashboard)"
//           options={{ drawerLabel: 'Dashboard', title: 'Dashboard' }}
//         />
//         <Drawer.Screen
//           name="notifications"
//           options={{ drawerLabel: 'Notifications' }}
//         />
//         <Drawer.Screen
//           name="profile"
//           options={{ drawerLabel: 'Profile' }}
//         />
//         <Drawer.Screen
//           name="(auth)"
//           options={{ drawerItemStyle: { display: 'none' } }}
//         />

//       </Drawer>
//     </AuthProvider>
//   );
// }


// app/_layout.tsx
// app/_layout.tsx
// import { AuthProvider } from '@/context/AuthContext';
// import { NotificationProvider } from '@/context/NotificationContext';
// import { Slot } from 'expo-router';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import '../global.css';

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         <NotificationProvider>
//           <Slot />
//         </NotificationProvider>
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// }

// import { AuthProvider } from '@/context/AuthContext';
// import { Slot } from 'expo-router';
// import '../global.css';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Slot />
//     </AuthProvider>
//   );
// }


// app/_layout.tsx
// import { AuthProvider, useAuth } from '@/context/AuthContext';
// import { NotificationProvider } from '@/context/NotificationContext';
// import { Slot } from 'expo-router';
// import { ActivityIndicator, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import '../global.css';

// function AppContent() {
//   const { loading } = useAuth();

//   if (loading) {
//     // ✅ While checking token, delay rendering route
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#facc15" />
//       </View>
//     );
//   }

//   return <Slot />;
// }

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         <NotificationProvider>
//           <AppContent />
//         </NotificationProvider>
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// }


// app/_layout.tsx
// import { AuthProvider } from '@/context/AuthContext';
// import { NotificationProvider } from '@/context/NotificationContext';
// import { Slot } from 'expo-router';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import '../global.css';

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         <NotificationProvider>
//           <Slot />
//         </NotificationProvider>
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// }

// app/_layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import * as Notifications from 'expo-notifications';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

// 1. Foreground Notification Handler — show alert & sound
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX, // 🔊 popup + sound
          sound: 'default',
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };

    setupNotifications();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NotificationProvider>
          <Slot />
        </NotificationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}




