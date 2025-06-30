// import TaskCard from '@/components/TaskCard';
// import TaskFilterMenu from '@/components/TaskFilterMenu';
// import { useAuth } from '@/hooks/useAuth';
// import { getAllUsers } from '@/services/authService';
// import { getFilteredTasks } from '@/services/taskService';
// import { Task, TaskFilters } from '@/types/task.types';
// import { User } from '@/types/user.types';
// import React, { useEffect, useState } from 'react';
// import { RefreshControl, ScrollView, Text, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const MyTasksScreen = () => {
//   const { user } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [filters, setFilters] = useState<TaskFilters>({
//     assigned_to: user?.username || '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',
//     created_at: '',
//     last_updated_at_date: '',
//     updated_hour_range: '',
//   });

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

//   const fetchTasks = async () => {
//     try {
//       const res = await getFilteredTasks(filters);
//       setTasks(res);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await getAllUsers();
//       setUsers(res);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchTasks();
//       fetchUsers();
//     }
//   }, [filters, user]);

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

//   if (!user) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-gray-500">Please log in to view your tasks.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={{ flex: 1, paddingTop: insets.top }}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       contentContainerStyle={{ padding: 16 }}
//     >
//       <TaskFilterMenu
//         filters={filters}
//         setFilters={setFilters}
//         users={users}
//         pageType="myTasks"
//       />

//       <View className="mt-4 space-y-4">
//         {tasks.length === 0 ? (
//           <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
//         ) : (
//           tasks.map((task) => (
//             <TaskCard
//               key={task.task_id}
//               task={task}
//               user={user}
//               expanded={!!expandedDescriptions[task.task_id]}
//               toggleDescription={toggleDescription}
//               location="myTasks"
//             />
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default MyTasksScreen;


import TaskCard from '@/components/TaskCard';
import { useAuth } from '@/hooks/useAuth';
import { Task } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyTasksScreen = () => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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
      style={{ flex: 1, paddingTop: insets.top }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text className="text-center text-xl font-bold text-black mb-4">My Tasks</Text>

      <View className="space-y-4">
        {tasks.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
        ) : (
          tasks
            .slice()
            .reverse()
            .map((task) => (
              <TaskCard
                key={task.task_id}
                task={task} // Non-null assertion because user is already checked
                expanded={!!expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="myTasks"
              />
            ))
        )}
      </View>
    </ScrollView>
  );
};

export default MyTasksScreen;


