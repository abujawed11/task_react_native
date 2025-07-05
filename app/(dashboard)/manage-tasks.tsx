// import { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import axios from 'axios';
// import { BASE_URL } from '@/utils/constants';
// import { useAuth } from '@/hooks/useAuth';
// import { ArrowLeft, Download, Filter } from 'lucide-react-native';
// import TaskCard from '@/components/TaskCard';
// import { Task } from '@/types/task.types';
// import TaskFilters from '@/components/TaskFilters';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ManageAllTasksScreen() {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [users, setUsers] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});


//   const toggleDescription = (taskId: string) => {
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   const [filters, setFilters] = useState({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//   });

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const [taskRes, userRes] = await Promise.all([
//         axios.get(`${BASE_URL}/api/tasks/all`, config),
//         axios.get(`${BASE_URL}/api/tasks/users/all`, config),
//       ]);

//       setTasks(taskRes.data);
//       setFilteredTasks(taskRes.data);
//       setUsers(userRes.data.map((u: any) => u.username));
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.accountType === 'Super Admin') fetchTasks();
//     else router.replace('/dashboard');
//   }, []);

//   useEffect(() => {
//     let filtered = [...tasks];
//     if (filters.assigned_to)
//       filtered = filtered.filter((t) => t.assigned_to === filters.assigned_to);
//     if (filters.created_by)
//       filtered = filtered.filter((t) => t.created_by === filters.created_by);
//     if (filters.status) filtered = filtered.filter((t) => t.status === filters.status);
//     if (filters.priority) filtered = filtered.filter((t) => t.priority === filters.priority);
//     setFilteredTasks(filtered);
//   }, [filters, tasks]);

//   const clearFilters = () => {
//     setFilters({
//       assigned_to: '',
//       created_by: '',
//       status: '',
//       priority: '',
//     });
//   };

//   return (
//     <View className="flex-1 bg-yellow-50">
//       <View className="flex-row justify-between items-center px-4 py-3 bg-yellow-200">
//         <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
//           <ArrowLeft size={20} color="#000" />
//           <Text className="ml-2 text-black font-semibold">Back</Text>
//         </TouchableOpacity>

//         <Text className="text-xl font-bold text-black">All Tasks</Text>

//         <TouchableOpacity onPress={() => Alert.alert('Download', 'Excel download placeholder')}>
//           <Download size={22} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Filter Toggle */}
//       <TouchableOpacity
//         onPress={() => setShowFilters(!showFilters)}
//         className="flex-row items-center justify-center my-2"
//       >
//         <Filter size={18} color="black" />
//         <Text className="ml-2 text-base font-medium text-black">Toggle Filters</Text>
//       </TouchableOpacity>

//       {showFilters && (
//         <TaskFilters
//           filters={filters}
//           setFilters={setFilters}
//           users={users}
//           onReset={clearFilters}
//         />
//       )}

//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#facc15" />
//         </View>
//       ) : filteredTasks.length === 0 ? (
//         <Text className="text-center mt-8 text-black font-semibold">No tasks found.</Text>
//       ) : (
//         <FlatList
//           data={filteredTasks.reverse()}
//           keyExtractor={(item) => item.task_id}
//           renderItem={({ item }) =>
//             <TaskCard
//               task={item}
//               location="adminTasks"
//               expanded={!!expandedDescriptions[tasks.task_id]}
//               toggleDescription={toggleDescription}
//             />}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}
//     </View>
//   );
// }


// import TaskCard from '@/components/TaskCard';
// import { TaskFiltersComponent } from '@/components/TaskFilters';
// import TaskSortMenu from '@/components/TaskSortMenu';
// import { useAuth } from '@/hooks/useAuth';
// import { SortConfig, Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useRouter } from 'expo-router';
// import { ArrowLeft, Download, Filter } from 'lucide-react-native';
// import { useEffect, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// export default function ManageAllTasksScreen() {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [users, setUsers] = useState<{ username: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});


//   const toggleDescription = (taskId: string) => {
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

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
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const [taskRes, userRes] = await Promise.all([
//         axios.get(`${BASE_URL}/api/tasks/all`, config),
//         axios.get(`${BASE_URL}/api/tasks/users/all`, config),
//       ]);

//       setTasks(taskRes.data);
//       setFilteredTasks(taskRes.data);
//       setUsers(userRes.data.map((u: any) => ({ username: u.username })));
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   //   const [sortConfig, setSortConfig] = useState({
//   //   field: 'created_at', // default field
//   //   order: 'DESC',       // 'ASC' or 'DESC'
//   // });
//   const [sortConfig, setSortConfig] = useState<SortConfig>({
//     field: 'created_at',
//     order: 'DESC',
//   });



//   useEffect(() => {
//     if (user?.accountType === 'Super Admin') fetchTasks();
//     else router.replace('/dashboard');
//   }, []);

//   // useEffect(() => {
//   //   let filtered = [...tasks];

//   //   if (filters.assigned_to)
//   //     filtered = filtered.filter((t) => t.assigned_to === filters.assigned_to);
//   //   if (filters.created_by)
//   //     filtered = filtered.filter((t) => t.created_by === filters.created_by);
//   //   if (filters.status)
//   //     filtered = filtered.filter((t) => t.status === filters.status);
//   //   if (filters.priority)
//   //     filtered = filtered.filter((t) => t.priority === filters.priority);
//   //   // if (filters.due_date)
//   //   //   filtered = filtered.filter((t) =>
//   //   //     new Date(t.due_date).toLocaleDateString('en-CA') === filters.due_date
//   //   //   );
//   //   if (filters.due_date) {
//   //     filtered = filtered.filter(
//   //       (t) =>
//   //         t.due_date &&
//   //         new Date(t.due_date).toLocaleDateString('en-CA') === filters.due_date
//   //     );
//   //   }
//   //   if (filters.created_at)
//   //     filtered = filtered.filter((t) =>
//   //       t.created_at?.slice(0, 10) === filters.created_at
//   //     );
//   //   if (filters.last_updated_at_date)
//   //     filtered = filtered.filter((t) => {
//   //       if (!t.updated_at) return false;
//   //       const taskDate = new Date(t.updated_at);
//   //       return taskDate.toLocaleDateString('en-CA') === filters.last_updated_at_date;
//   //     });
//   //   if (filters.updated_hour_range !== '') {
//   //     const selectedHour = parseInt(filters.updated_hour_range);
//   //     filtered = filtered.filter((t) => {
//   //       if (!t.last_updated_at) return false;
//   //       const taskHour = new Date(t.last_updated_at).getHours();
//   //       return taskHour === selectedHour;
//   //     });
//   //   }


//   //   // ✅ Sorting
//   //   filtered.sort((a, b) => {
//   //     const { field, order } = sortConfig;
//   //     const direction = order === 'ASC' ? 1 : -1;

//   //     if (field === 'priority') {
//   //       const priorityMap = { High: 3, Medium: 2, Low: 1 };
//   //       return (priorityMap[a.priority] - priorityMap[b.priority]) * direction;
//   //     }

//   //     if (field === 'status') {
//   //       const statusMap = { Pending: 3, 'In Progress': 2, Completed: 1 };
//   //       return (statusMap[a.status] - statusMap[b.status]) * direction;
//   //     }

//   //     if (field === 'due_date' || field === 'created_at' || field === 'updated_at' || field === 'last_updated_at') {
//   //       const aDate = new Date(a[field] || 0).getTime();
//   //       const bDate = new Date(b[field] || 0).getTime();
//   //       return (aDate - bDate) * direction;
//   //     }

//   //     return (a[field]?.localeCompare(b[field]) || 0) * direction;
//   //   });

//   //   setFilteredTasks(filtered);
//   // }, [filters, sortConfig, tasks]);

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
//         (t) =>
//           t.due_date &&
//           new Date(t.due_date).toLocaleDateString('en-CA') === filters.due_date
//       );
//     }

//     if (filters.created_at) {
//       filtered = filtered.filter(
//         (t) => t.created_at?.slice(0, 10) === filters.created_at
//       );
//     }

//     if (filters.last_updated_at_date) {
//       console.log(tasks)
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

//     // ✅ Sorting
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




//   const clearFilters = () => {
//     setFilters({
//       assigned_to: '',
//       created_by: '',
//       status: '',
//       priority: '',
//       due_date: '',
//       created_at: '',
//       last_updated_at_date: '',
//       updated_hour_range: '',
//     });
//   };

//   // console.log("Sending task:", tasks);

//   return (
//     <View className="flex-1 bg-yellow-50">
//       <View className="flex-row justify-between items-center px-4 py-3 bg-yellow-200">
//         <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
//           <ArrowLeft size={20} color="#000" />
//           <Text className="ml-2 text-black font-semibold">Back</Text>
//         </TouchableOpacity>

//         <Text className="text-xl font-bold text-black">All Tasks</Text>

//         <TouchableOpacity onPress={() => Alert.alert('Download', 'Excel download placeholder')}>
//           <Download size={22} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Filter Toggle */}
//       <TouchableOpacity
//         onPress={() => setShowFilters(!showFilters)}
//         className="flex-row items-center justify-center my-2"
//       >
//         <Filter size={18} color="black" />
//         <Text className="ml-2 text-base font-medium text-black">Toggle Filters</Text>
//       </TouchableOpacity>

//       <TaskSortMenu sortConfig={sortConfig} setSortConfig={setSortConfig} />


//       {showFilters && (
//         <TaskFiltersComponent
//           filters={filters}
//           users={users}
//           onChange={(field, value) =>
//             setFilters((prev) => ({ ...prev, [field]: value }))
//           }
//           onReset={clearFilters}
//         />
//       )}

//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#facc15" />
//         </View>
//       ) : filteredTasks.length === 0 ? (
//         <Text className="text-center mt-8 text-black font-semibold">No tasks found.</Text>
//       ) : (
//         <FlatList
//           data={[...filteredTasks].reverse()}
//           keyExtractor={(item) => item.task_id}
//           renderItem={({ item }) => (
//             <TaskCard
//               task={item}
//               location="adminTasks"
//               expanded={!!expandedDescriptions[item.task_id]}
//               toggleDescription={toggleDescription}
//             />
//           )}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}
//     </View>
//   );
// }

// import TaskCard from '@/components/TaskCard';
// import TaskFilterModal from '@/components/TaskFilterMenu';
// import TaskSortModal from '@/components/TaskSortModal';
// import { useAuth } from '@/hooks/useAuth';
// import { Task, TaskFilters } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import { downloadTaskExcel } from '@/utils/downloadExcel';
// import { FontAwesome5 } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useRouter } from 'expo-router';
// import { Funnel, SortAsc } from 'lucide-react-native';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// export default function ManageAllTasksScreen() {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [users, setUsers] = useState<{ username: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showFilter, setShowFilter] = useState(false);
//   const [showSort, setShowSort] = useState(false);
//   const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

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

//   // const [sortConfig, setSortConfig] = useState<SortConfig>({
//   //   field: 'created_at',
//   //   order: 'DESC',
//   // });
//   const [sortConfig, setSortConfig] = useState<{ field: string; order: 'ASC' | 'DESC' | '' }>({
//     field: '',
//     order: '',
//   });

//   const toggleDescription = (taskId: string) => {
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const [taskRes, userRes] = await Promise.all([
//         axios.get(`${BASE_URL}/api/tasks/all`, config),
//         axios.get(`${BASE_URL}/api/tasks/users/all`, config),
//       ]);

//       setTasks(taskRes.data);
//       setUsers(userRes.data.map((u: any) => ({ username: u.username })));
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.accountType === 'Super Admin') fetchTasks();
//     else router.replace('/dashboard');
//   }, []);

//   useEffect(() => {
//     let filtered = [...tasks];
//     if (filters.assigned_to) filtered = filtered.filter((t) => t.assigned_to === filters.assigned_to);
//     if (filters.created_by) {
//       filtered = filtered.filter((task) => task.created_by === filters.created_by);
//     }
//     if (filters.status) filtered = filtered.filter((t) => t.status === filters.status);
//     if (filters.priority) filtered = filtered.filter((t) => t.priority === filters.priority);
//     if (filters.due_date) filtered = filtered.filter((t) => t.due_date?.slice(0, 10) === filters.due_date);
//     if (filters.created_at) filtered = filtered.filter((t) => t.created_at?.slice(0, 10) === filters.created_at);
//     if (filters.last_updated_at_date)
//       filtered = filtered.filter((t) => t.updated_at?.slice(0, 10) === filters.last_updated_at_date);
//     if (filters.updated_hour_range) {
//       const hours = parseInt(filters.updated_hour_range);
//       const now = new Date();
//       filtered = filtered.filter((t) => {
//         if (!t.updated_at) return false;
//         const updatedAt = new Date(t.updated_at);
//         const diffInHours = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);
//         return diffInHours <= hours;
//       });
//     }

//     if (sortConfig.field && sortConfig.order) {
//       filtered.sort((a, b) => {
//         const aVal = a[sortConfig.field as keyof Task];
//         const bVal = b[sortConfig.field as keyof Task];

//         if (!aVal || !bVal) return 0;

//         const aDate = new Date(aVal as string).getTime();
//         const bDate = new Date(bVal as string).getTime();

//         return sortConfig.order === 'ASC' ? aDate - bDate : bDate - aDate;
//       });
//     }

//     setFilteredTasks(filtered);
//   }, [filters, tasks, sortConfig]);

//   return (
//     <View className="flex-1 bg-yellow-50">
//       {/* <View className="flex-row justify-between items-center px-4 py-3 bg-yellow-200">
//         <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
//           <ArrowLeft size={20} color="#000" />
//           <Text className="ml-2 text-black font-semibold">Back</Text>
//         </TouchableOpacity>

//         <Text className="text-xl font-bold text-black">All Tasks</Text>

//         <TouchableOpacity onPress={() => Alert.alert('Download', 'Excel download placeholder')}>
//           <Download size={22} color="black" />
//         </TouchableOpacity>
//       </View> */}

//       <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-100">
//         {/* Left Side - Filter + Sort */}
//         <View className="flex-row items-center">
//           <TouchableOpacity onPress={() => setShowFilter(true)}>
//             <Funnel size={24} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setShowSort(true)} className="ml-3">
//             <SortAsc size={24} color="black" />
//           </TouchableOpacity>
//         </View>

//         {/* Right Side - Download */}
//         <TouchableOpacity
//           onPress={() =>
//             downloadTaskExcel({
//               baseUrl: BASE_URL,
//               mode: 'all', // or 'assigned' | 'created'
//               username: user?.username,
//             })
//           }
//         >
//           <FontAwesome5 name="download" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Filter/Sort Header */}
//       {/* <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-50">
//         <TouchableOpacity onPress={() => setShowFilter(true)}>
//           <Funnel size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setShowSort(true)}>
//           <SortAsc size={24} color="black" />
//         </TouchableOpacity>
//       </View> */}

//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#facc15" />
//         </View>
//       ) : filteredTasks.length === 0 ? (
//         <Text className="text-center mt-8 text-black font-semibold">No tasks found.</Text>
//       ) : (
//         <FlatList
//           data={filteredTasks}
//           keyExtractor={(item) => item.task_id}
//           renderItem={({ item }) => (
//             <TaskCard
//               task={item}
//               location="adminTasks"
//               expanded={!!expandedDescriptions[item.task_id]}
//               toggleDescription={toggleDescription}
//             />
//           )}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}

//       <TaskFilterModal
//         visible={showFilter}
//         onClose={() => setShowFilter(false)}
//         filters={filters}
//         setFilters={setFilters}
//         users={users}
//         pageType="adminTasks"
//       />

//       {/* <TaskSortModal
//         visible={showSort}
//         onClose={() => setShowSort(false)}
//         setSortConfig={sortConfig}
//         sortConfig={setSortConfig}
//         onSortClick={() => setSortConfig({ ...sortConfig })}
//       /> */}
//       <TaskSortModal
//         onSortClick={() => {
//           setSortConfig({ ...sortConfig });
//           setShowSort(false); // 👈 closes modal after sort
//         }}
//         visible={showSort}
//         onClose={() => setShowSort(false)}
//         sortConfig={sortConfig}
//         setSortConfig={setSortConfig}
//       />
//     </View>
//   );
// }


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
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ManageAllTasksScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<{ username: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const params = useLocalSearchParams();

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

  const toggleDescription = (taskId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [taskRes, userRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/tasks/all`, config),
        axios.get(`${BASE_URL}/api/tasks/users/all`, config),
      ]);
      // console.log("Admin tasks fetched:");
      setTasks(taskRes.data);
      setUsers(userRes.data.map((u: any) => ({ username: u.username })));
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.accountType === 'Super Admin') fetchTasks();
    else router.replace('/dashboard');
  }, [user, BASE_URL]);

  useEffect(() => {
    if (params.refresh) {
      // console.log("Triggering refresh from Admin param:", params.refresh);
      fetchTasks();
      router.setParams({ refresh: undefined }); // reset to avoid infinite fetch
    }
  }, [params.refresh]);

  useEffect(() => {
    let filtered = [...tasks];
    if (filters.assigned_to) filtered = filtered.filter((t) => t.assigned_to === filters.assigned_to);
    if (filters.created_by) filtered = filtered.filter((t) => t.created_by === filters.created_by);
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

  return (
    <View className="flex-1 bg-yellow-100">
      <View className="flex-row justify-between items-center px-4 pt-2 pb-2 bg-yellow-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => setShowFilter(true)}>
            <Funnel size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSort(true)} className="ml-3">
            <SortAsc size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            downloadTaskExcel({
              baseUrl: BASE_URL,
              mode: 'all',
              username: user?.username,
            })
          }
        >
          <FontAwesome5 name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#facc15" />
        </View>
      ) : filteredTasks.length === 0 ? (
        <Text className="text-center mt-8 text-black font-semibold">No tasks found.</Text>
      ) : (
        <FlatList
          data={[...filteredTasks].reverse()} // ⬅️ reversed safely
          // data={filteredTasks}
          keyExtractor={(item) => item.task_id}
          renderItem={({ item }) => (
            <View className="px-4 mb-">
              <TaskCard
                task={item}
                location="adminTasks"
                expanded={!!expandedDescriptions[item.task_id]}
                toggleDescription={toggleDescription}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshing={loading} // 🔁 show spinner while refreshing
          onRefresh={fetchTasks} // 🔁 refresh data on pull
        />
      )}

      <TaskFilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        users={users}
        pageType="adminTasks"
      />

      <TaskSortModal
        onSortClick={() => {
          setSortConfig({ ...sortConfig });
          setShowSort(false);
        }}
        visible={showSort}
        onClose={() => setShowSort(false)}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </View>
  );
}
