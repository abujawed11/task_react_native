import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Home, ClipboardList, Send } from "lucide-react-native";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function DashboardTabsNavigator() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#facc15",
      tabBarInactiveTintColor: "#9ca3af",
      tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      tabBarStyle: { paddingVertical: 5, height: 60 },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="my-tasks"
        options={{
          title: "My Tasks",
          tabBarIcon: ({ color, size }) => (
            <ClipboardList color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="assigned-tasks"
        options={{
          title: "Assigned",
          tabBarIcon: ({ color, size }) => <Send color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
