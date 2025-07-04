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


// import TaskCard from '@/components/TaskCard';
// import { useAuth } from '@/hooks/useAuth';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { RefreshControl, ScrollView, Text, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const MyTasksScreen = () => {
//   const { user } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
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
//       {/* <Text className="text-center text-xl font-bold text-black mb-4">My Tasks</Text> */}

//       <View className="space-y-4">
//         {tasks.length === 0 ? (
//           <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
//         ) : (
//           tasks
//             .slice()
//             .reverse()
//             .map((task) => (
//               <TaskCard
//                 key={task.task_id}
//                 task={task} // Non-null assertion because user is already checked
//                 expanded={!!expandedDescriptions[task.task_id]}
//                 toggleDescription={toggleDescription}
//                 location="myTasks"
//               />
//             ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default MyTasksScreen;


// import TaskCard from '@/components/TaskCard';
// import { useAuth } from '@/hooks/useAuth';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { RefreshControl, ScrollView, Text, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const MyTasksScreen = () => {
//   const { user } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
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
//       className="flex-1 bg-yellow-100"
//       style={{ paddingTop: insets.top }}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       contentContainerStyle={{ padding: 16 }}
//     >
//       {/* <Text className="text-center text-xl font-bold text-black mb-4">My Tasks</Text> */}

//       <View className="space-y-4">
//         {tasks.length === 0 ? (
//           <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
//         ) : (
//           tasks
//             .slice()
//             .reverse()
//             .map((task) => (
//               <TaskCard
//                 key={task.task_id}
//                 task={task}
//                 expanded={!!expandedDescriptions[task.task_id]}
//                 toggleDescription={toggleDescription}
//                 location="myTasks"
//               />
//             ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default MyTasksScreen;


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { FunnelIcon } from 'lucide-react-native';
// import React, { useEffect, useState } from 'react';
// import {
//   Modal,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import TaskCard from '@/components/TaskCard';
// import { useAuth } from '@/hooks/useAuth';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';

// const MyTasksScreen = () => {
//   const { user } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [filters, setFilters] = useState({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',
//     created_at: '',
//     last_updated_at_date: '',
//     updated_hour_range: '',
//   });

//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...tasks];

//     if (filters.assigned_to)
//       filtered = filtered.filter((t) => t.assigned_to === filters.assigned_to);

//     if (filters.created_by)
//       filtered = filtered.filter((t) => t.created_by === filters.created_by);

//     if (filters.status)
//       filtered = filtered.filter((t) => t.status === filters.status);

//     if (filters.priority)
//       filtered = filtered.filter((t) => t.priority === filters.priority);

//     if (filters.due_date)
//       filtered = filtered.filter((t) =>
//         t.due_date && new Date(t.due_date).toLocaleDateString('en-CA') === filters.due_date
//       );

//     if (filters.created_at)
//       filtered = filtered.filter((t) => t.created_at?.slice(0, 10) === filters.created_at);

//     if (filters.last_updated_at_date)
//       filtered = filtered.filter((t) => {
//         if (!t.updated_at) return false;
//         const taskDate = new Date(t.updated_at);
//         return taskDate.toLocaleDateString('en-CA') === filters.last_updated_at_date;
//       });

//     if (filters.updated_hour_range !== '') {
//       const selectedHour = parseInt(filters.updated_hour_range);
//       filtered = filtered.filter((t) => {
//         if (!t.updated_at) return false;
//         const taskHour = new Date(t.updated_at).getHours();
//         return taskHour === selectedHour;
//       });
//     }

//     setFilteredTasks(filtered);
//     setFilterVisible(false);
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchTasks();
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     if (user) fetchTasks();
//   }, [user]);

//   useEffect(() => {
//     applyFilters();
//   }, [tasks, filters]);

//   return (
//     <ScrollView
//       className="flex-1 bg-yellow-100"
//       style={{ paddingTop: insets.top }}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       contentContainerStyle={{ padding: 16 }}
//     >
//       <View className="flex-row justify-end mb-4">
//         <TouchableOpacity onPress={() => setFilterVisible(true)}>
//           <FunnelIcon size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       <View className="space-y-4">
//         {filteredTasks.length === 0 ? (
//           <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
//         ) : (
//           filteredTasks.map((task) => (
//             <TaskCard
//               key={task.task_id}
//               task={task}
//               expanded={false}
//               toggleDescription={() => {}}
//               location="myTasks"
//             />
//           ))
//         )}
//       </View>

//       <Modal visible={filterVisible} animationType="slide">
//         <ScrollView className="flex-1 bg-white p-4">
//           <Text className="text-lg font-bold text-black mb-4">Filter Tasks</Text>

//           {Object.keys(filters).map((key) => (
//             <View className="mb-4" key={key}>
//               <Text className="text-black mb-1 capitalize">{key.replace(/_/g, ' ')}</Text>
//               <TextInput
//                 className="border border-gray-300 rounded px-3 py-2"
//                 placeholder={`Enter ${key}`}
//                 value={filters[key as keyof typeof filters]}
//                 onChangeText={(text) => setFilters({ ...filters, [key]: text })}
//               />
//             </View>
//           ))}

//           <View className="flex-row justify-between">
//             <TouchableOpacity
//               className="bg-yellow-400 px-4 py-2 rounded"
//               onPress={applyFilters}
//             >
//               <Text className="text-black font-bold">Apply</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               className="bg-gray-200 px-4 py-2 rounded"
//               onPress={() => setFilterVisible(false)}
//             >
//               <Text className="text-black">Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default MyTasksScreen;

// import TaskCard from '@/components/TaskCard';
// import { useAuth } from '@/hooks/useAuth';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { Funnel, SortAsc } from 'lucide-react-native';
// import React, { useEffect, useState } from 'react';
// import { Modal, Pressable, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const MyTasksScreen = () => {
//   const { user } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   const [filters, setFilters] = useState({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',
//     created_at: '',
//     last_updated_at_date: '',
//     updated_hour_range: '',
//   });

//   const [sortConfig, setSortConfig] = useState({ field: 'due_date', order: 'ASC' });

//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchTasks();
//   }, [user]);

//   useEffect(() => {
//     let filtered = [...tasks];

//     if (filters.assigned_to)
//       filtered = filtered.filter((t) => t.assigned_to === filters.assigned_to);

//     if (filters.created_by)
//       filtered = filtered.filter((t) => t.created_by === filters.created_by);

//     if (filters.status)
//       filtered = filtered.filter((t) => t.status === filters.status);

//     if (filters.priority)
//       filtered = filtered.filter((t) => t.priority === filters.priority);

//     if (filters.due_date) {
//       filtered = filtered.filter(
//         (t) => t.due_date && new Date(t.due_date).toLocaleDateString('en-CA') === filters.due_date
//       );
//     }

//     if (filters.created_at) {
//       filtered = filtered.filter(
//         (t) => t.created_at?.slice(0, 10) === filters.created_at
//       );
//     }

//     if (filters.last_updated_at_date) {
//       filtered = filtered.filter((t) => {
//         if (!t.updated_at) return false;
//         const taskDate = new Date(t.updated_at);
//         return taskDate.toLocaleDateString('en-CA') === filters.last_updated_at_date;
//       });
//     }

//     if (filters.updated_hour_range !== '') {
//       const selectedHour = parseInt(filters.updated_hour_range);
//       filtered = filtered.filter((t) => {
//         if (!t.updated_at) return false;
//         const taskHour = new Date(t.updated_at).getHours();
//         return taskHour === selectedHour;
//       });
//     }

//     filtered.sort((a, b) => {
//       const { field, order } = sortConfig;
//       const direction = order === 'ASC' ? 1 : -1;

//       if (field === 'priority') {
//         const priorityMap = { High: 3, Medium: 2, Low: 1 };
//         return (
//           (priorityMap[a.priority as keyof typeof priorityMap] -
//             priorityMap[b.priority as keyof typeof priorityMap]) * direction
//         );
//       }

//       if (field === 'status') {
//         const statusMap = { Pending: 3, 'In Progress': 2, Completed: 1 };
//         return (
//           (statusMap[a.status as keyof typeof statusMap] -
//             statusMap[b.status as keyof typeof statusMap]) * direction
//         );
//       }

//       if (
//         field === 'due_date' ||
//         field === 'created_at' ||
//         field === 'updated_at' ||
//         field === 'last_updated_at'
//       ) {
//         const aDate = new Date((a as any)[field] || 0).getTime();
//         const bDate = new Date((b as any)[field] || 0).getTime();
//         return (aDate - bDate) * direction;
//       }

//       const aVal = (a as any)[field];
//       const bVal = (b as any)[field];
//       return (aVal?.localeCompare?.(bVal) || 0) * direction;
//     });

//     setFilteredTasks(filtered);
//   }, [filters, sortConfig, tasks]);

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
//     <View className="flex-1 bg-yellow-100" style={{ paddingTop: insets.top }}>
//       <View className="flex-row justify-between items-center px-4 py-2">
//         <Pressable onPress={() => setModalVisible(true)}>
//           <Funnel size={22} color="black" />
//         </Pressable>
//         <Pressable onPress={() => setSortConfig((prev) => ({ ...prev, order: prev.order === 'ASC' ? 'DESC' : 'ASC' }))}>
//           <SortAsc size={22} color="black" />
//         </Pressable>
//       </View>

//       <ScrollView
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={{ padding: 16 }}>
//         <View className="space-y-4">
//           {filteredTasks.length === 0 ? (
//             <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
//           ) : (
//             filteredTasks
//               .slice()
//               .reverse()
//               .map((task) => (
//                 <TaskCard
//                   key={task.task_id}
//                   task={task}
//                   expanded={!!expandedDescriptions[task.task_id]}
//                   toggleDescription={toggleDescription}
//                   location="myTasks"
//                 />
//               ))
//           )}
//         </View>
//       </ScrollView>

//       <Modal visible={modalVisible} animationType="slide">
//         <View className="flex-1 bg-white p-4">
//           <Text className="text-xl font-bold mb-4">Filter Tasks</Text>

//           <Text className="text-black font-medium">Status</Text>
//           <Picker selectedValue={filters.status} onValueChange={(val) => setFilters((f) => ({ ...f, status: val }))}>
//             <Picker.Item label="All" value="" />
//             <Picker.Item label="Pending" value="Pending" />
//             <Picker.Item label="In Progress" value="In Progress" />
//             <Picker.Item label="Completed" value="Completed" />
//           </Picker>

//           <Text className="text-black font-medium mt-2">Priority</Text>
//           <Picker selectedValue={filters.priority} onValueChange={(val) => setFilters((f) => ({ ...f, priority: val }))}>
//             <Picker.Item label="All" value="" />
//             <Picker.Item label="High" value="High" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="Low" value="Low" />
//           </Picker>

//           <Text className="text-black font-medium mt-2">Due Date</Text>
//           <TextInput
//             className="border p-2 rounded"
//             placeholder="YYYY-MM-DD"
//             value={filters.due_date}
//             onChangeText={(text) => setFilters((f) => ({ ...f, due_date: text }))}
//           />

//           <Text className="text-black font-medium mt-2">Created Date</Text>
//           <TextInput
//             className="border p-2 rounded"
//             placeholder="YYYY-MM-DD"
//             value={filters.created_at}
//             onChangeText={(text) => setFilters((f) => ({ ...f, created_at: text }))}
//           />

//           <Pressable className="mt-4 bg-yellow-500 px-4 py-2 rounded" onPress={() => setModalVisible(false)}>
//             <Text className="text-center text-black font-bold">Apply Filters</Text>
//           </Pressable>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default MyTasksScreen;


// import TaskCard from '@/components/TaskCard';
// import TaskFilterMenu from '@/components/TaskFilterMenu';
// import { useAuth } from '@/hooks/useAuth';
// import { Task, TaskFilters } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { Funnel, SortAsc } from 'lucide-react-native';
// import React, { useEffect, useState } from 'react';
// import { Modal, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const MyTasksScreen = () => {
//   const { user } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
//   const [showFilter, setShowFilter] = useState(false);
//   const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
//   const [users, setUsers] = useState([]);
//   const [filters, setFilters] = useState<TaskFilters>({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',
//     created_at: '',
//     last_updated_at_date: '',
//     updated_hour_range: '',
//   });

//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const usersResponse = await axios.get(`${BASE_URL}/api/tasks/users/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(usersResponse.data);
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchTasks();
//   }, [user]);

//   useEffect(() => {
//     let filtered = [...tasks];

//     if (filters.status) filtered = filtered.filter(t => t.status === filters.status);
//     if (filters.priority) filtered = filtered.filter(t => t.priority === filters.priority);
//     if (filters.due_date) filtered = filtered.filter(t => t.due_date?.slice(0, 10) === filters.due_date);
//     if (filters.created_at) filtered = filtered.filter(t => t.created_at?.slice(0, 10) === filters.created_at);
//     if (filters.last_updated_at_date) filtered = filtered.filter(t => t.updated_at?.slice(0, 10) === filters.last_updated_at_date);
//     if (filters.updated_hour_range) {
//       const selectedHour = parseInt(filters.updated_hour_range);
//       filtered = filtered.filter(t => {
//         if (!t.updated_at) return false;
//         const taskHour = new Date(t.updated_at).getHours();
//         return taskHour === selectedHour;
//       });
//     }

//     filtered.sort((a, b) => {
//       const aDate = new Date(a.updated_at || 0).getTime();
//       const bDate = new Date(b.updated_at || 0).getTime();
//       return sortOrder === 'ASC' ? aDate - bDate : bDate - aDate;
//     });

//     setFilteredTasks(filtered);
//   }, [filters, tasks, sortOrder]);

//   console.log(users)

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
//     <View className="flex-1 bg-yellow-100" style={{ paddingTop: insets.top }}>
//       <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-100">
//         <TouchableOpacity onPress={() => setShowFilter(true)}>
//           <Funnel size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC')}>
//           <SortAsc size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         contentContainerStyle={{ padding: 16 }}
//       >
//         <View className="space-y-4">
//           {filteredTasks.length === 0 ? (
//             <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
//           ) : (
//             filteredTasks.map((task) => (
//               <TaskCard
//                 key={task.task_id}
//                 task={task}
//                 expanded={!!expandedDescriptions[task.task_id]}
//                 toggleDescription={toggleDescription}
//                 location="myTasks"
//               />
//             ))
//           )}
//         </View>
//       </ScrollView>

//       <Modal visible={showFilter} animationType="slide">
//         <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
//           <TaskFilterMenu
//             visible={true}
//             filters={filters}
//             setFilters={setFilters}
//             users={users}
//             pageType='myTasks' />
//           <TouchableOpacity
//             className="bg-black p-3 mx-4 mt-4 rounded-lg"
//             onPress={() => setShowFilter(false)}
//           >
//             <Text className="text-center text-white font-semibold">Apply Filters</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </Modal>
//     </View>
//   );
// };

// export default MyTasksScreen;

// import TaskCard from '@/components/TaskCard';
// import TaskFilterModal from '@/components/TaskFilterMenu';
// import { useAuth } from '@/hooks/useAuth';
// import { Task, TaskFilters } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { Funnel, SortAsc } from 'lucide-react-native';
// import React, { useEffect, useState } from 'react';
// import {
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const MyTasksScreen = () => {
//   const { user } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
//   const [showFilter, setShowFilter] = useState(false);
//   const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
//   const [users, setUsers] = useState([]);
//   const [filters, setFilters] = useState<TaskFilters>({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',
//     created_at: '',
//     last_updated_at_date: '',
//     updated_hour_range: '',
//   });

//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const usersResponse = await axios.get(`${BASE_URL}/api/tasks/users/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(usersResponse.data);
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchTasks();
//   }, [user]);

//   useEffect(() => {
//     let filtered = [...tasks];

//     if (filters.status) {
//       filtered = filtered.filter((t) => t.status === filters.status);
//     }
//     if (filters.priority) {
//       filtered = filtered.filter((t) => t.priority === filters.priority);
//     }
//     if (filters.due_date) {
//       filtered = filtered.filter((t) =>
//         t.due_date?.slice(0, 10) === filters.due_date
//       );
//     }
//     if (filters.created_at) {
//       filtered = filtered.filter((t) =>
//         t.created_at?.slice(0, 10) === filters.created_at
//       );
//     }
//     if (filters.last_updated_at_date) {
//       filtered = filtered.filter((t) =>
//         t.updated_at?.slice(0, 10) === filters.last_updated_at_date
//       );
//     }
//     if (filters.updated_hour_range) {
//       const hours = parseInt(filters.updated_hour_range);
//       const now = new Date();
//       filtered = filtered.filter((t) => {
//         if (!t.updated_at) return false;
//         const updatedAt = new Date(t.updated_at);
//         const diffInMs = now.getTime() - updatedAt.getTime();
//         const diffInHours = diffInMs / (1000 * 60 * 60);
//         return diffInHours <= hours;
//       });
//     }

//     // Sorting
//     filtered.sort((a, b) => {
//       const aTime = new Date(a.updated_at || 0).getTime();
//       const bTime = new Date(b.updated_at || 0).getTime();
//       return sortOrder === 'ASC' ? aTime - bTime : bTime - aTime;
//     });

//     setFilteredTasks(filtered);
//   }, [filters, tasks, sortOrder]);

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
//     <View className="flex-1 bg-yellow-100" style={{ paddingTop: insets.top }}>
//       {/* Top Bar */}
//       <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-100">
//         <TouchableOpacity onPress={() => setShowFilter(true)}>
//           <Funnel size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() =>
//             setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'))
//           }
//         >
//           <SortAsc size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Task List */}
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={{ padding: 16 }}
//       >
//         <View className="space-y-4">
//           {filteredTasks.length === 0 ? (
//             <Text className="text-center text-gray-500 mt-10">
//               No tasks found.
//             </Text>
//           ) : (
//             filteredTasks.map((task) => (
//               <TaskCard
//                 key={task.task_id}
//                 task={task}
//                 expanded={!!expandedDescriptions[task.task_id]}
//                 toggleDescription={toggleDescription}
//                 location="myTasks"
//               />
//             ))
//           )}
//         </View>
//       </ScrollView>

//       {/* Filter Modal */}
//       <TaskFilterModal
//         visible={showFilter}
//         onClose={() => setShowFilter(false)}
//         filters={filters}
//         setFilters={setFilters}
//         users={users}
//         pageType="myTasks"
//       />
//     </View>
//   );
// };

// export default MyTasksScreen;

import TaskCard from '@/components/TaskCard';
import TaskFilterModal from '@/components/TaskFilterMenu';
import TaskSortModal from '@/components/TaskSortModal';
import { useAuth } from '@/hooks/useAuth';
import { Task, TaskFilters } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import { downloadTaskExcel } from '@/utils/downloadExcel';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Funnel, SortAsc } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyTasksScreen = () => {
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [users, setUsers] = useState([]);
  const params = useLocalSearchParams();
  const router = useRouter();


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
      console.log("Intial Task Fetch")
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/tasks/assigned`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersResponse = await axios.get(`${BASE_URL}/api/tasks/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersResponse.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // useEffect(() => {
  //   if (params.refresh === 'true') {

  //     fetchTasks(); // ✅ refetch updated task list
  //     console.log("Task Fetched")

  //     // 👇 Clear the param so it doesn't refetch again on next mount
  //     router.setParams({ refresh: undefined });
  //   }
  // }, [params.refresh]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (user) fetchTasks();
  //   }, [user])
  // );

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, BASE_URL, loading]);

  useEffect(() => {
    let filtered = [...tasks];

    // Filters
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

    // Sort
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
    <View className="flex-1 bg-yellow-100" >
      {/* Header */}
      {/* <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-100">
        <TouchableOpacity onPress={() => downloadTaskExcel({
          baseUrl: BASE_URL, mode: 'my', // or 'assigned' | 'created'
          username: user?.username,
        })}>
          <FontAwesome5 name="download" size={24} color="black" />
        </TouchableOpacity>
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
              mode: 'my', // or 'assigned' | 'created'
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
        <View className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">No tasks found.</Text>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                expanded={!!expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="myTasks"
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <TaskFilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        users={users}
        pageType="myTasks"
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

export default MyTasksScreen;

