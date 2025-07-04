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
//         <ScrollView
//           className="flex-1 bg-yellow-100"
//           style={{ paddingTop: insets.top }}
//           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//           contentContainerStyle={{ padding: 16 }}
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
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TaskCard from '@/components/TaskCard';
import TaskFilterModal from '@/components/TaskFilterMenu';
import TaskSortModal from '@/components/TaskSortModal';
import { useAuth } from '@/hooks/useAuth';
import { Task, TaskFilters } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import { downloadTaskExcel } from '@/utils/downloadExcel';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Funnel, SortAsc } from 'lucide-react-native';

const AssignedTasksScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState<TaskFilters>({
    assigned_to: '',
    created_by: '',
    status: '',
    priority: '',
    due_date: '',
    created_at: '',
    last_updated_at_date: '',
    updated_hour_range: '',
  });

  const [sortConfig, setSortConfig] = useState<{ field: string; order: 'ASC' | 'DESC' | '' }>({
    field: '',
    order: '',
  });

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/tasks/created-by-me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersResponse = await axios.get(`${BASE_URL}/api/tasks/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersResponse.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch assigned tasks:', error);
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  useEffect(() => {
    let filtered = [...tasks];

    // Apply filters
    if (filters.assigned_to) filtered = filtered.filter((t) => t.assigned_to === filters.assigned_to);
    if (filters.created_by) {
      filtered = filtered.filter((task) => task.created_by === filters.created_by);
    }
    if (filters.status) filtered = filtered.filter((t) => t.status === filters.status);
    if (filters.priority) filtered = filtered.filter((t) => t.priority === filters.priority);
    if (filters.due_date) filtered = filtered.filter((t) => t.due_date?.slice(0, 10) === filters.due_date);
    if (filters.created_at) filtered = filtered.filter((t) => t.created_at?.slice(0, 10) === filters.created_at);
    if (filters.last_updated_at_date)
      filtered = filtered.filter((t) => t.updated_at?.slice(0, 10) === filters.last_updated_at_date);
    if (filters.updated_hour_range) {
      const hours = parseInt(filters.updated_hour_range);
      const now = new Date();
      filtered = filtered.filter((t) => {
        if (!t.updated_at) return false;
        const updatedAt = new Date(t.updated_at);
        const diffInHours = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);
        return diffInHours <= hours;
      });
    }

    // Apply sorting
    if (sortConfig.field && sortConfig.order) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.field as keyof Task];
        const bVal = b[sortConfig.field as keyof Task];

        if (!aVal || !bVal) return 0;

        const aDate = new Date(aVal as string).getTime();
        const bDate = new Date(bVal as string).getTime();

        return sortConfig.order === 'ASC' ? aDate - bDate : bDate - aDate;
      });
    }

    setFilteredTasks(filtered);
  }, [filters, tasks, sortConfig]);

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
    <View className="flex-1 bg-yellow-100" style={{ paddingTop: insets.top }}>
      {/* Header with filter/sort */}
      {/* <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-100">
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Funnel size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowSort(true)}>
          <SortAsc size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-100">
        {/* Left Side - Filter + Sort */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => setShowFilter(true)}>
            <Funnel size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSort(true)} className="ml-3">
            <SortAsc size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Right Side - Download */}
        <TouchableOpacity
          onPress={() =>
            downloadTaskExcel({
              baseUrl: BASE_URL,
              mode: 'assign', // or 'assigned' | 'created'
              username: user?.username,
            })
          }
        >
          <FontAwesome5 name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 16 }}
      >
        {filteredTasks.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">No assigned tasks.</Text>
        ) : (
          <View className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                expanded={!!expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="assignTasks"
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <TaskFilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        users={users}
        pageType="assignTasks"
      />

      {/* Sort Modal */}
      <TaskSortModal
        onSortClick={() => {
          setSortConfig({ ...sortConfig });
          setShowSort(false); // 👈 closes modal after sort
        }}
        visible={showSort}
        onClose={() => setShowSort(false)}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </View>
  );
};

export default AssignedTasksScreen;
