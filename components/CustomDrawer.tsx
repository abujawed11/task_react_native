// components/CustomDrawer.tsx
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function CustomDrawer(props: any) {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/(auth)/login');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header with Logout */}
      <View className="flex-row justify-between items-center px-4 pt-10 pb-4 bg-yellow-300">
        <Text className="text-lg font-bold text-black">Menu</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Entypo name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
