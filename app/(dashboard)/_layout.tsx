// import { Tabs } from "expo-router";
// import DashboardTabsNavigator from "@/navigation/DashboardTabsNavigator";

// export default function DashboardLayout() {
//   return <DashboardTabsNavigator />;
// }

// app/(dashboard)/_layout.tsx
// import { MaterialIcons } from '@expo/vector-icons';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Tabs } from 'expo-router';

// const Tab = createMaterialTopTabNavigator();

// export default function DashboardTabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//         tabBarIndicatorStyle: { backgroundColor: 'orange' },
//         tabBarActiveTintColor: 'orange',
//         tabBarInactiveTintColor: 'gray',
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <MaterialIcons name="home" size={20} color={color} />,
//         }}
//       />
//       <Tabs.Screen name="mytask" options={{ title: 'My Task' }} />
//       <Tabs.Screen name="assigntask" options={{ title: 'Assign Task' }} />
//     </Tabs>
//   );
// }

// app/(dashboard)/_layout.tsx
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import AssignTaskScreen from './assigned-tasks';
// import DashboardHome from './index';
// import MyTaskScreen from './my-tasks';

// const Tab = createMaterialTopTabNavigator();

// export default function DashboardLayout() {
//   return (
//     // <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//           tabBarIndicatorStyle: { backgroundColor: 'orange' },
//           tabBarActiveTintColor: 'orange',
//           tabBarInactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="Home" component={DashboardHome} />
//         <Tab.Screen name="My Task" component={MyTaskScreen} />
//         <Tab.Screen name="Assign Task" component={AssignTaskScreen} />
//       </Tab.Navigator>
//     // </NavigationContainer>
//   );
// }

// app/(dashboard)/_layout.tsx
// import { Stack } from 'expo-router';

// export default function DashboardLayout() {
//   return <Stack />;
// }

// import { Stack } from 'expo-router';

// export default function DashboardLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// import { Stack } from 'expo-router';

// export default function DashboardLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="create-task" options={{ headerShown: false }} />
//       <Stack.Screen name="assigned-tasks" options={{ title: 'Assigned Tasks' }} />
//       <Stack.Screen name="my-tasks" options={{ title: 'My Tasks' }} />
//       <Stack.Screen name="task-progress" options={{ title: 'Task Progress' }} />
//     </Stack>
//   );
// }

// app/(dashboard)/_layout.tsx
import CustomDrawer from '@/components/CustomDrawer';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, View } from 'react-native';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerStyle: { backgroundColor: '#facc15' },
        headerTintColor: 'black',
      }}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: 'Dashboard' }} />
      
      <Drawer.Screen name="assigned-tasks" options={{ drawerLabel: 'Assigned Tasks' }} />
      <Drawer.Screen name="my-tasks" options={{ drawerLabel: 'My Tasks' }} />
      <Drawer.Screen name="create-task" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="task-progress" options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  );
}



