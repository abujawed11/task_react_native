// import "../global.css";
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }} />
//   );
// }


// File: app/_layout.tsx
import "../global.css";
import { Slot } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

