// in app/index.tsx
// import { Redirect } from "expo-router";

// export default function Home() {
//   return <Redirect href="/(auth)/login" />;
// }


const OriginalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].startsWith('Warning: Text strings must be rendered')
  ) {
    console.trace('Text string warning:', ...args);
  }
  OriginalError(...args);
};

import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(dashboard)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
