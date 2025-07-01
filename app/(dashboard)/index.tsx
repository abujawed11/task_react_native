// // // app/(dashboard)/index.tsx
// // import { useAuth } from "@/hooks/useAuth";
// // import React from "react";
// // import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// // export default function DashboardHome() {
// //   const { logout } = useAuth();

// //   return (
// //     <ScrollView className="flex-1 bg-white p-4">
// //       <Text className="text-2xl font-bold text-yellow-600 mb-4">Dashboard</Text>

// //       <View className="bg-yellow-100 p-4 rounded-xl shadow mb-4">
// //         <Text className="text-lg text-yellow-900">👋 Welcome back!</Text>
// //         <Text className="text-sm text-gray-600 mt-1">
// //           Here's a quick summary of your tasks.
// //         </Text>
// //       </View>

// //       <View className="flex-row justify-between mb-6">
// //         <View className="bg-white border border-yellow-300 rounded-xl p-4 w-[48%] shadow">
// //           <Text className="text-gray-500">My Tasks</Text>
// //           <Text className="text-2xl font-bold text-yellow-700">5</Text>
// //         </View>

// //         <View className="bg-white border border-yellow-300 rounded-xl p-4 w-[48%] shadow">
// //           <Text className="text-gray-500">Assigned Tasks</Text>
// //           <Text className="text-2xl font-bold text-yellow-700">3</Text>
// //         </View>
// //       </View>

// //       {/* 🔓 Temp Logout Button */}
// //       <TouchableOpacity
// //         onPress={logout}
// //         className="bg-red-500 p-3 rounded-xl"
// //       >
// //         <Text className="text-white text-center font-semibold">Logout</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // }


// // import { useAuth } from '@/hooks/useAuth';
// // import { BASE_URL } from '@/utils/constants';
// // import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import axios from 'axios';
// // import { useRouter } from 'expo-router';
// // import React, { useEffect, useState } from 'react';
// // import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


// // export default function HomeScreen() {
// //   const { user } = useAuth();
// //   const router = useRouter();

// //   const [stats, setStats] = useState({
// //     assignedToMe: 0,
// //     assignedByMe: 0,
// //     pending: 0,
// //     completed: 0,
// //   });

// //   useEffect(() => {
// //     const fetchDashboardStats = async () => {
// //       try {
// //         const token = await AsyncStorage.getItem('token');
// //         const res = await axios.get(`${BASE_URL}/api/tasks/dashboard`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setStats(res.data.stats);
// //       } catch (err) {
// //         console.error('Dashboard stats error:', err);
// //       }
// //     };

// //     fetchDashboardStats();
// //   }, []);

// //   return (
// //     <ScrollView className="flex-1 bg-yellow-100 px-4 py-6">
// //       {/* Welcome Message */}
// //       <View className="mb-6">
// //         <Text className="text-2xl font-bold text-yellow-800">Welcome, {user?.username}!</Text>
// //         <Text className="text-lg text-gray-700">
// //           Role: <Text className="font-semibold">{user?.role}</Text> | Account Type: <Text className="font-semibold">{user?.accountType}</Text>
// //         </Text>
// //       </View>

// //       {/* Task Summary Cards */}
// //       <View className="grid grid-cols-2 gap-4">
// //         <View style={styles.card}>
// //           <UserIcon />
// //           <Text style={styles.cardTitle}>My Tasks</Text>
// //           <Text style={styles.cardCount}>{stats.assignedToMe}</Text>
// //         </View>
// //         <View style={styles.card}>
// //           <Feather name="send" size={24} color="#facc15" />
// //           <Text style={styles.cardTitle}>Assigned</Text>
// //           <Text style={styles.cardCount}>{stats.assignedByMe}</Text>
// //         </View>
// //         <View style={styles.card}>
// //           <Feather name="clock" size={24} color="#facc15" />
// //           <Text style={styles.cardTitle}>Pending</Text>
// //           <Text style={styles.cardCount}>{stats.pending}</Text>
// //         </View>
// //         <View style={styles.card}>
// //           <Feather name="check-circle" size={24} color="#22c55e" />
// //           <Text style={styles.cardTitle}>Completed</Text>
// //           <Text style={styles.cardCount}>{stats.completed}</Text>
// //         </View>
// //       </View>

// //       {/* Create Task Button */}
// //       <View className="items-center mt-40">
// //         <TouchableOpacity
// //           className="w-16 h-16 rounded-full bg-yellow-500 shadow-lg items-center justify-center"
// //           onPress={() => router.push('/create-task')}
// //         >
// //           <Entypo name="plus" size={30} color="black" />
// //         </TouchableOpacity>
// //       </View>
      
// //     </ScrollView>
// //   );
// // }

// // function UserIcon() {
// //   return <FontAwesome name="user" size={24} color="#facc15" />;
// // }

// // const styles = StyleSheet.create({
// //   card: {
// //     backgroundColor: '#fff',
// //     padding: 16,
// //     borderRadius: 16,
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     shadowOffset: { width: 0, height: 2 },
// //     elevation: 3,
// //   },
// //   cardTitle: {
// //     fontSize: 14,
// //     color: '#374151',
// //     marginTop: 6,
// //   },
// //   cardCount: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#000',
// //     marginTop: 2,
// //   },
// // });

// import { useAuth } from '@/hooks/useAuth';
// import { BASE_URL } from '@/utils/constants';
// import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function HomeScreen() {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [stats, setStats] = useState({
//     assignedToMe: 0,
//     assignedByMe: 0,
//     pending: 0,
//     completed: 0,
//   });

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('token');
//     router.replace('/(auth)/login'); // redirect to login
//   };

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const res = await axios.get(`${BASE_URL}/api/tasks/dashboard`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStats(res.data.stats);
//       } catch (err) {
//         console.error('Dashboard stats error:', err);
//       }
//     };

//     fetchDashboardStats();
//   }, []);

//   return (
//     <View className="flex-1 bg-yellow-100">
//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         {/* Top section with Logout */}
//         <View className="mb-6 flex-row justify-between items-center">
//           <View>
//             <Text className="text-2xl font-bold text-yellow-800">Welcome, {user?.username}!</Text>
//             <Text className="text-lg text-gray-700">
//               Role: <Text className="font-semibold">{user?.role}</Text> | Account Type: <Text className="font-semibold">{user?.accountType}</Text>
//             </Text>
//           </View>
//           <TouchableOpacity
//             onPress={handleLogout}
//             className="bg-black px-3 py-2 rounded-lg"
//           >
//             <Text className="text-yellow-400 font-bold">Logout</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Cards */}
//         <View className="grid grid-cols-2 gap-4">
//           <View style={styles.card}>
//             <UserIcon />
//             <Text style={styles.cardTitle}>My Tasks</Text>
//             <Text style={styles.cardCount}>{stats.assignedToMe}</Text>
//           </View>
//           <View style={styles.card}>
//             <Feather name="send" size={24} color="#facc15" />
//             <Text style={styles.cardTitle}>Assigned</Text>
//             <Text style={styles.cardCount}>{stats.assignedByMe}</Text>
//           </View>
//           <View style={styles.card}>
//             <Feather name="clock" size={24} color="#facc15" />
//             <Text style={styles.cardTitle}>Pending</Text>
//             <Text style={styles.cardCount}>{stats.pending}</Text>
//           </View>
//           <View style={styles.card}>
//             <Feather name="check-circle" size={24} color="#22c55e" />
//             <Text style={styles.cardTitle}>Completed</Text>
//             <Text style={styles.cardCount}>{stats.completed}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Floating Create Button */}
//       <View style={styles.fabContainer}>
//         <TouchableOpacity
//           className="w-16 h-16 rounded-full bg-yellow-500 shadow-lg items-center justify-center"
//           onPress={() => router.push('/(dashboard)/create-task')}
//         >
//           <Entypo name="plus" size={30} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }


// // export default function HomeScreen() {
// //   const { user } = useAuth();
// //   const router = useRouter();

// //   const [stats, setStats] = useState({
// //     assignedToMe: 0,
// //     assignedByMe: 0,
// //     pending: 0,
// //     completed: 0,
// //   });

// //   useEffect(() => {
// //     const fetchDashboardStats = async () => {
// //       try {
// //         const token = await AsyncStorage.getItem('token');
// //         const res = await axios.get(`${BASE_URL}/api/tasks/dashboard`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setStats(res.data.stats);
// //       } catch (err) {
// //         console.error('Dashboard stats error:', err);
// //       }
// //     };

// //     fetchDashboardStats();
// //   }, []);

// //   return (
// //     <View className="flex-1 bg-yellow-100">
// //       {/* Scrollable Content */}
// //       <ScrollView contentContainerStyle={{ padding: 16 }}>
// //         <View className="mb-6">
// //           <Text className="text-2xl font-bold text-yellow-800">Welcome, {user?.username}!</Text>
// //           <Text className="text-lg text-gray-700">
// //             Role: <Text className="font-semibold">{user?.role}</Text> | Account Type: <Text className="font-semibold">{user?.accountType}</Text>
// //           </Text>
// //         </View>

// //         <View className="grid grid-cols-2 gap-4">
// //           <View style={styles.card}>
// //             <UserIcon />
// //             <Text style={styles.cardTitle}>My Tasks</Text>
// //             <Text style={styles.cardCount}>{stats.assignedToMe}</Text>
// //           </View>
// //           <View style={styles.card}>
// //             <Feather name="send" size={24} color="#facc15" />
// //             <Text style={styles.cardTitle}>Assigned</Text>
// //             <Text style={styles.cardCount}>{stats.assignedByMe}</Text>
// //           </View>
// //           <View style={styles.card}>
// //             <Feather name="clock" size={24} color="#facc15" />
// //             <Text style={styles.cardTitle}>Pending</Text>
// //             <Text style={styles.cardCount}>{stats.pending}</Text>
// //           </View>
// //           <View style={styles.card}>
// //             <Feather name="check-circle" size={24} color="#22c55e" />
// //             <Text style={styles.cardTitle}>Completed</Text>
// //             <Text style={styles.cardCount}>{stats.completed}</Text>
// //           </View>
// //         </View>
// //       </ScrollView>

// //       {/* Floating Create Button */}
// //       <View style={styles.fabContainer}>
// //         <TouchableOpacity
// //           className="w-16 h-16 rounded-full bg-yellow-500 shadow-lg items-center justify-center"
// //           // onPress={() => router.push('/create-task')}
// //           onPress={() => router.push('/(dashboard)/create-task')}

// //         >
// //           <Entypo name="plus" size={30} color="black" />
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// function UserIcon() {
//   return <FontAwesome name="user" size={24} color="#facc15" />;
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 14,
//     color: '#374151',
//     marginTop: 6,
//   },
//   cardCount: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     marginTop: 2,
//   },
//   fabContainer: {
//     position: 'absolute',
//     bottom: 35,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
// });

// app/(dashboard)/index.tsx
// import { Redirect } from 'expo-router';

// export default function DashboardRedirect() {
//   return <Redirect href="/(dashboard)/tabs" />;
// }

// app/(dashboard)/index.tsx
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import AssignTaskScreen from './assigned-tasks';
// import Dashboard from './dashboard';
// import MyTaskScreen from './my-tasks';

// const Tab = createMaterialTopTabNavigator();

// export default function DashboardTabs() {
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//                 tabBarIndicatorStyle: { backgroundColor: 'orange' },
//                 tabBarActiveTintColor: 'orange',
//                 tabBarInactiveTintColor: 'gray',
//             }}
//         >
//             <Tab.Screen name="Dashboard" component={Dashboard} />
//             {/* <Tab.Screen name="Home" component={DashboardHome} /> */}
//             <Tab.Screen name="My Task" component={MyTaskScreen} />
//             <Tab.Screen name="Assign Task" component={AssignTaskScreen} />
//         </Tab.Navigator>
//     );
// }

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import AssignTaskScreen from './assigned-tasks';
import Dashboard from './dashboard';
import MyTaskScreen from './my-tasks';

const Tab = createMaterialTopTabNavigator();

export default function DashboardTabs() {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   const unsubscribe = navigation.addListener('state', (e: any) => {
  //     const route = e.data.state.routes[e.data.state.index];
  //     const tabName = route.name;

  //     navigation.setOptions({
  //       headerTitle: tabName,
  //     });
  //   });

  //   return unsubscribe;
  // }, [navigation]);
    useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('state', (e: any) => {
      const state = e.data?.state || e.target?.state;

      if (!state) return;

      const index = state.index;
      const tabRoute = state.routes[index];
      const title = tabRoute.name;

      navigation.setOptions({ headerTitle: title });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: 'orange' },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="My Task" component={MyTaskScreen} />
      <Tab.Screen name="Assign Task" component={AssignTaskScreen} />
    </Tab.Navigator>
  );
}




