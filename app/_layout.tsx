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
// // app/_layout.tsx
// import { AuthProvider } from '@/context/AuthContext';
// import { Slot } from 'expo-router';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import '../global.css';

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         <Slot />
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// }


// app/_layout.tsx

//🔍 Error trace for unwrapped text issues
// const OriginalError = console.error;
// console.error = (...args) => {
//   if (
//     typeof args[0] === 'string' &&
//     args[0].startsWith('Warning: Text strings must be rendered')
//   ) {

//     console.trace('Unwrapped text warning:', ...args);
//     //debugger; // 🐞 Pauses execution to inspect the stack
//     // Alternatively, use console.trace to log the stack
//     // console.trace('Unwrapped text warning:', ...args);
//   }
//   OriginalError(...args);
// };


// app/_layout.tsx or wherever your root layout is
if (__DEV__) {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].startsWith('Warning: Text strings must be rendered')
    ) {
      console.trace('🔍 <Text> warning trace'); // <- shows exact file+line in Metro log
    }
    originalConsoleError(...args);
  };
}

import { AuthProvider } from '@/context/AuthContext';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}


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




