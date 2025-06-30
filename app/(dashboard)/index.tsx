// app/(dashboard)/index.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardHome() {
  const { logout } = useAuth();

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-yellow-600 mb-4">Dashboard</Text>

      <View className="bg-yellow-100 p-4 rounded-xl shadow mb-4">
        <Text className="text-lg text-yellow-900">👋 Welcome back!</Text>
        <Text className="text-sm text-gray-600 mt-1">
          Here's a quick summary of your tasks.
        </Text>
      </View>

      <View className="flex-row justify-between mb-6">
        <View className="bg-white border border-yellow-300 rounded-xl p-4 w-[48%] shadow">
          <Text className="text-gray-500">My Tasks</Text>
          <Text className="text-2xl font-bold text-yellow-700">5</Text>
        </View>

        <View className="bg-white border border-yellow-300 rounded-xl p-4 w-[48%] shadow">
          <Text className="text-gray-500">Assigned Tasks</Text>
          <Text className="text-2xl font-bold text-yellow-700">3</Text>
        </View>
      </View>

      {/* 🔓 Temp Logout Button */}
      <TouchableOpacity
        onPress={logout}
        className="bg-red-500 p-3 rounded-xl"
      >
        <Text className="text-white text-center font-semibold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
