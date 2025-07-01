// import React from 'react';
// import { Text, View } from 'react-native';

// export default function AssignTaskScreen() {
//   return (
//     <View className="flex-1 bg-white justify-center items-center">
//       <Text className="text-xl text-black font-bold">Assigned Task Screen</Text>
//     </View>
//   );
// }

// import axios from 'axios';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   RefreshControl,
//   ScrollView,
//   Text,
//   View
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import TaskCard from '@/components/TaskCard';
// import { useAuth } from '@/hooks/useAuth';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AssignedTasksScreen: React.FC = () => {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { user } = useAuth();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/tasks/created-by-me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Failed to fetch assigned tasks:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchTasks();
//   }, [user]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchTasks();
//     setRefreshing(false);
//   };

//   const toggleDescription = (taskId: string) => {
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   return (
//     <ScrollView
//       style={{ flex: 1, paddingTop: insets.top }}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       contentContainerStyle={{ padding: 16 }}
//     >
//       {/* <TouchableOpacity
//         onPress={() => router.push('/(dashboard)')}
//         className="flex-row items-center bg-black px-4 py-2 rounded-lg mb-4"
//       >
//         <ArrowLeft color="yellow" size={20} />
//         <Text className="ml-2 text-yellow-400 font-semibold">Back to Dashboard</Text>
//       </TouchableOpacity> */}

//       {/* <Text className="text-2xl font-bold text-center text-black mb-6">Assigned Tasks</Text> */}

//       {tasks.length === 0 ? (
//         <Text className="text-center text-gray-500 mt-10">No assigned tasks.</Text>
//       ) : (
//         <View className="space-y-4">
//           {[...tasks].reverse().map((task) => (
//             <TaskCard
//               key={task.task_id}
//               task={task}
//               expanded={!!expandedDescriptions[task.task_id]}
//               toggleDescription={toggleDescription}
//               location="adminTasks"
//             />
//           ))}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default AssignedTasksScreen;


import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TaskCard from '@/components/TaskCard';
import { useAuth } from '@/hooks/useAuth';
import { Task } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssignedTasksScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/tasks/created-by-me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch assigned tasks:', error);
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  const toggleDescription = (taskId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
        <ScrollView
          className="flex-1 bg-yellow-100"
          style={{ paddingTop: insets.top }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: 16 }}
    >
      {/* <TouchableOpacity
        onPress={() => router.push('/(dashboard)')}
        className="flex-row items-center bg-black px-4 py-2 rounded-lg mb-4"
      >
        <ArrowLeft color="yellow" size={20} />
        <Text className="ml-2 text-yellow-400 font-semibold">Back to Dashboard</Text>
      </TouchableOpacity> */}

      {/* <Text className="text-2xl font-bold text-center text-black mb-6">Assigned Tasks</Text> */}

      {tasks.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">No assigned tasks.</Text>
      ) : (
        <View className="space-y-4">
          {[...tasks].reverse().map((task) => (
            <TaskCard
              key={task.task_id}
              task={task}
              expanded={!!expandedDescriptions[task.task_id]}
              toggleDescription={toggleDescription}
              location="adminTasks"
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default AssignedTasksScreen;
