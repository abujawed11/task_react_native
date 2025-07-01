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

import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}


