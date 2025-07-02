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
// import CustomDrawer from '@/components/CustomDrawer';
// import { useAuth } from '@/context/AuthContext';
// import { Redirect } from 'expo-router';
// import { Drawer } from 'expo-router/drawer';
// import { ActivityIndicator, View } from 'react-native';

// export default function DashboardLayout() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="orange" />
//       </View>
//     );
//   }

//   if (!user) {
//     return <Redirect href="/(auth)/login" />;
//   }

//   return (
//     <Drawer
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={{
//         drawerPosition: 'left',
//         headerStyle: { backgroundColor: '#facc15' },
//         headerTintColor: 'black',
//       }}
//     >
//       <Drawer.Screen name="index" options={{ drawerLabel: 'Dashboard' }} />

//       <Drawer.Screen name="assigned-tasks" options={{ drawerLabel: 'Assigned Tasks' }} />
//       <Drawer.Screen name="my-tasks" options={{ drawerLabel: 'My Tasks' }} />
//       <Drawer.Screen name="create-task" options={{ drawerItemStyle: { display: 'none' } }} />
//       <Drawer.Screen name="task-progress" options={{ drawerItemStyle: { display: 'none' } }} />
//     </Drawer>
//   );
// }

// import CustomDrawer from '@/components/CustomDrawer';
import BellWithNotification from '@/components/NotificationBell';
import { useAuth } from '@/context/AuthContext';
import { AntDesign, Entypo, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Redirect, router, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, Text, View } from 'react-native';

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

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/(auth)/login');
  };

  // const CustomDrawer = (props: any) => {
  //   const pathname = usePathname();

  //   useEffect(() => {
  //     // This effect runs when the pathname changes
  //     // You can use it to perform actions based on the current route
  //     console.log('Current route:', pathname);
  //   }, [pathname]);



  //   return (

  //     <DrawerContentScrollView {...props}>
  //       <Drawer.Screen name="index" options={{ drawerItemStyle: { display: 'none' } }} />
  //       <DrawerItem
  //         label="Logout"
  //         onPress={handleLogout}
  //         icon={({ color, size }) => (
  //           // <LogOut color={color} size={size} />
  //           <MaterialCommunityIcons name="power-settings" size={24} color="black" />
  //         )}
  //       />
  //       <DrawerItem
  //         label="Dashboard"
  //         onPress={() => {
  //           router.push('/(dashboard)');
  //         }}
  //         icon={({ color, size }) => (
  //           <Entypo name="home" size={24} color="black" />
  //         )}
  //       />
  //       <DrawerItem
  //         label="Profile"
  //         onPress={() => {
  //           router.push('/profile');
  //         }}
  //         icon={({ color, size }) => (
  //           <AntDesign name="profile" size={24} color="black" />
  //         )}
  //       />
  //       <DrawerItem
  //         label="About"
  //         onPress={() => {
  //           router.push('/about');
  //         }}
  //         icon={({ color, size }) => (
  //           <AntDesign name="infocirlce" size={24} color="black" />
  //         )}
  //       />
  //       <DrawerItem
  //         label="Settings"
  //         onPress={() => {
  //           router.push('/settings');
  //         }}
  //         icon={({ color, size }) => (
  //           <SimpleLineIcons name="settings" size={24} color="black" />
  //         )}
  //       />
  //     </DrawerContentScrollView>
  //   );
  // }

  const CustomDrawer = (props: any) => {
    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = async () => {
      await AsyncStorage.removeItem('token');
      router.replace('/(auth)/login');
    };

    return (
      <DrawerContentScrollView {...props} className="bg-black">
        <View className="items-center py-6 border-b border-yellow-400">
          <View className="w-20 h-20 rounded-full bg-yellow-400 items-center justify-center mb-3">
            <AntDesign name="user" size={40} color="black" />
          </View>
          <Text className="text-white font-bold text-lg">{user?.username}</Text>
          <Text className="text-yellow-400 text-sm mt-1">{user?.role} | {user?.accountType}</Text>
        </View>

        <View className="mt-6">
          <DrawerItem
            label="Dashboard"
            onPress={() => router.push('/(dashboard)')}
            icon={({ size }) => <Entypo name="home" size={size} color="#facc15" />}
            labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
            style={{ backgroundColor: 'transparent' }}
          />
          <DrawerItem
            label="Profile"
            onPress={() => router.push('/profile')}
            icon={({ size }) => <AntDesign name="profile" size={size} color="#facc15" />}
            labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
            style={{ backgroundColor: 'transparent' }}
          />
          <DrawerItem
            label="About"
            onPress={() => router.push('/about')}
            icon={({ size }) => <AntDesign name="infocirlce" size={size} color="#facc15" />}
            labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
            style={{ backgroundColor: 'transparent' }}
          />
          <DrawerItem
            label="Settings"
            onPress={() => router.push('/settings')}
            icon={({ size }) => <SimpleLineIcons name="settings" size={size} color="#facc15" />}
            labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>

        <View className="mt-auto border-t border-yellow-400">
          <DrawerItem
            label="Logout"
            onPress={handleLogout}
            icon={({ size }) => <MaterialCommunityIcons name="power-settings" size={size} color="red" />}
            labelStyle={{ color: 'red', fontWeight: 'bold' }}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerStyle: { backgroundColor: '#facc15' },
        headerTintColor: 'black',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' }, // ✅ hides from drawer
          headerRight: () => ( <BellWithNotification/>),
          title: 'Dashboard', // ✅ replaces "index" in app bar
          drawerLabel: 'Dashboard', // ✅ replaces "index" in drawer label
        }}
      />
    </Drawer>
    // <Drawer
    //   drawerContent={(props) => <CustomDrawer {...props} />}
    //   screenOptions={{
    //     drawerPosition: 'left',
    //     headerStyle: { backgroundColor: '#facc15' },
    //     headerTintColor: 'black',
    //   }}
    // >
    //   <Drawer.Screen
    //     name="index"
    //     options={{
    //       drawerLabel: () => <Text>Dashboard</Text>,
    //       headerRight: () => ( <BellWithNotification/>
    //         // <TouchableOpacity
    //         //   onPress={() => router.push('/notifications')}
    //         //   style={{ marginRight: 15 }}
    //         // >
    //         //   <Ionicons name="notifications-outline" size={24} color="black" />
    //         // </TouchableOpacity>
    //       ),
    //     }}
    //   />
    //   <Drawer.Screen name="assigned-tasks" options={{ drawerLabel: () => <Text>Assigned Tasks</Text> }} />
    //   <Drawer.Screen name="my-tasks" options={{ drawerLabel: () => <Text>My Tasks</Text> }} />
    //   <Drawer.Screen name="create-task" options={{ drawerItemStyle: { display: 'none' } }} />
    //   <Drawer.Screen name="task-progress" options={{ drawerItemStyle: { display: 'none' } }} />
    //   <Drawer.Screen name="notifications" options={{ drawerItemStyle: { display: 'none' } }} />
    // </Drawer>
  );
}




