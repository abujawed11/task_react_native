// in app/index.tsx
// import { Redirect } from "expo-router";

// export default function Home() {
//   return <Redirect href="/(auth)/login" />;
// }


import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { View, ActivityIndicator } from "react-native";

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
