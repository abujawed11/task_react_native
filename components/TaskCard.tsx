// import { Task } from '@/types/task.types';
// import { User } from '@/types/user.types';
// import { useRouter } from 'expo-router';
// import { LucideArrowDown, LucideCalendar, LucideCheckCircle, LucideClock, LucideFlame, LucidePlay, LucideUser } from 'lucide-react-native';
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';

// // import { twMerge } from 'tailwind-variants';

// import { twMerge } from 'tailwind-merge';


// interface TaskCardProps {
//   task: Task & {
//     assigned_by?: string;
//   };
//   user: User;
//   location: 'myTasks' | 'adminTasks';
//   expanded: boolean;
//   toggleDescription: (taskId: string) => void;
// }

// const formatDate = (dateStr?: string | null) => {
//   if (!dateStr) return 'N/A';
//   const d = new Date(dateStr);
//   return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
// };

// const formatDateTime = (dateStr?: string | null) => {
//   if (!dateStr) return 'N/A';
//   const date = new Date(dateStr);
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   const formattedHours = hours % 12 || 12;
//   const formattedMinutes = minutes.toString().padStart(2, '0');
//   return `${formattedHours}:${formattedMinutes} ${ampm} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// };

// const isOverdue = (dueDate?: string | null) => {
//   if (!dueDate) return false;
//   return new Date(dueDate) < new Date();
// };

// const TaskCard: React.FC<TaskCardProps> = ({ task, user, location, expanded, toggleDescription }) => {
//   const router = useRouter();

//   const isAdminView = user.account_type === 'Super Admin' && location === 'adminTasks';

//   return (
//     <View className="bg-white border border-yellow-500 rounded-xl shadow p-4 space-y-3">
//       {/* Title and Buttons */}
//       <View className="flex-row justify-between items-center border-b border-yellow-500 pb-2">
//         <Text className="text-lg font-bold text-black w-2/3" numberOfLines={1}>{task.title}</Text>
//         <View className="flex-row gap-2">
//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/(dashboard)/task-progress', params: { task_id: task.task_id, from: location } })}
//             className="bg-gray-700 px-2 py-1 rounded"
//           >
//             <Text className="text-white text-xs">View Progress</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/(dashboard)/create-task', params: { task_id: task.task_id, from: location } })}
//             className="bg-yellow-500 px-2 py-1 rounded"
//           >
//             <Text className="text-white text-xs">Update</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Description */}
//       <View>
//         <Text className="text-sm text-black">
//           {expanded || (task.description || '').length <= 100
//             ? task.description || 'No description'
//             : `${task.description?.slice(0, 100)}...`}
//         </Text>
//         {task.description && task.description.length > 100 && (
//           <TouchableOpacity onPress={() => toggleDescription(task.task_id)}>
//             <Text className="text-yellow-500 font-medium">{expanded ? 'Read Less' : 'Read More'}</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Priority */}
//       <View className="flex-row items-center">
//         {task.priority === 'High' && <LucideFlame size={18} color="red" className="mr-2" />}
//         {task.priority === 'Medium' && <LucideFlame size={18} color="orange" className="mr-2" />}
//         {task.priority === 'Low' && <LucideArrowDown size={18} color="blue" className="mr-2" />}
//         <Text className="text-sm text-black">Priority: {task.priority}</Text>
//       </View>

//       {/* Status */}
//       <View className="flex-row items-center">
//         {task.status === 'Pending' && <LucideClock size={18} color="gray" className="mr-2" />}
//         {task.status === 'In Progress' && <LucidePlay size={18} color="blue" className="mr-2" />}
//         {task.status === 'Completed' && <LucideCheckCircle size={18} color="green" className="mr-2" />}
//         <Text className="text-sm text-black">Status: {task.status}</Text>
//       </View>

//       {/* Created At */}
//       <View className="flex-row items-center">
//         <LucideCalendar size={18} color="gray" className="mr-2" />
//         <Text className="text-sm text-black">Created: {formatDateTime(task.created_at)}</Text>
//       </View>

//       {/* Due Date */}
//       <View className="flex-row items-center">
//         <LucideCalendar size={18} color="gray" className="mr-2" />
//         <Text className={twMerge('text-sm', isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black')}>
//           Due: {formatDate(task.due_date)}
//         </Text>
//       </View>

//       {/* Assignment Info */}
//       {isAdminView ? (
//         <>
//           <View className="flex-row items-center">
//             <LucideUser size={18} color="gray" className="mr-2" />
//             <Text className="text-sm text-black">Created By: {task.created_by}</Text>
//           </View>
//           {task.created_by !== task.assigned_by && task.assigned_by && (
//             <View className="flex-row items-center">
//               <LucideUser size={18} color="gray" className="mr-2" />
//               <Text className="text-sm text-black">Re-assigned By: {task.assigned_by}</Text>
//             </View>
//           )}
//           <View className="flex-row items-center">
//             <LucideUser size={18} color="gray" className="mr-2" />
//             <Text className="text-sm text-black">Assigned To: {task.assigned_to}</Text>
//           </View>
//         </>
//       ) : (
//         <View className="flex-row items-center">
//           <LucideUser size={18} color="gray" className="mr-2" />
//           <Text className="text-sm text-black">
//             {location === 'myTasks'
//               ? `Assigned By: ${task.assigned_by || task.created_by}`
//               : `Assigned To: ${task.assigned_to}`}
//           </Text>
//         </View>
//       )}

//       {/* Last Updated */}
//       <View className="flex-row items-center">
//         <LucideCalendar size={18} color="gray" className="mr-2" />
//         <Text className="text-sm text-black">
//           Last Updated: {formatDateTime(task.updated_at)}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default TaskCard;

// import { useAuth } from '@/hooks/useAuth';
// import { Task } from '@/types/task.types';
// import { useRouter } from 'expo-router';
// import {
//   LucideArrowDown,
//   LucideCalendar,
//   LucideCheckCircle,
//   LucideClock,
//   LucideFlame,
//   LucidePlay,
//   LucideUser,
// } from 'lucide-react-native';
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { twMerge } from 'tailwind-merge';

// interface TaskCardProps {
//   task: Task & {
//     assigned_by?: string;
//   };
//   location: 'myTasks' | 'adminTasks';
//   expanded: boolean;
//   toggleDescription: (taskId: string) => void;
// }

// const formatDate = (dateStr?: string | null) => {
//   if (!dateStr) return 'N/A';
//   const d = new Date(dateStr);
//   return d.toLocaleDateString('en-IN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// };

// const formatDateTime = (dateStr?: string | null) => {
//   if (!dateStr) return 'N/A';
//   const date = new Date(dateStr);
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   const formattedHours = hours % 12 || 12;
//   const formattedMinutes = minutes.toString().padStart(2, '0');
//   return `${formattedHours}:${formattedMinutes} ${ampm} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// };

// const isOverdue = (dueDate?: string | null) => {
//   if (!dueDate) return false;
//   return new Date(dueDate) < new Date();
// };

// const TaskCard: React.FC<TaskCardProps> = ({ task, location, expanded, toggleDescription }) => {
//   const router = useRouter();
//   const { user } = useAuth();

//   const isAdminView = user?.accountType === 'Super Admin' && location === 'adminTasks';

//   return (
//     <View className="bg-white border border-yellow-500 rounded-xl shadow p-4 space-y-3">
//       {/* Header */}
//       <View className="flex-row justify-between items-center border-b border-yellow-500 pb-2">
//         <Text className="text-lg font-bold text-black w-2/3" numberOfLines={1}>{task.title}</Text>
//         <View className="flex-row gap-2">
//           <TouchableOpacity
//             onPress={() =>
//               router.push({
//                 pathname: '/(dashboard)/task-progress/[taskId]',
//                 params: { taskId: task.task_id, from: location },
//               })
//             }
//             className="bg-gray-700 px-2 py-1 rounded"
//           >
//             <Text className="text-white text-xs">View Progress</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() =>
//               router.push({
//                 pathname: '/(dashboard)/create-task',
//                 params: { task_id: task.task_id, from: location },
//               })
//             }
//             className="bg-yellow-500 px-2 py-1 rounded"
//           >
//             <Text className="text-white text-xs">Update</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Description */}
//       <View>
//         <Text className="text-sm text-black">
//           {expanded || (task.description || '').length <= 100
//             ? task.description || 'No description'
//             : `${task.description?.slice(0, 100)}...`}
//         </Text>
//         {task.description && task.description.length > 100 && (
//           <TouchableOpacity onPress={() => toggleDescription(task.task_id)}>
//             <Text className="text-yellow-500 font-medium">{expanded ? 'Read Less' : 'Read More'}</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Priority */}
//       <View className="flex-row items-center">
//         {task.priority === 'High' && <LucideFlame size={18} color="red" className="mr-2" />}
//         {task.priority === 'Medium' && <LucideFlame size={18} color="orange" className="mr-2" />}
//         {task.priority === 'Low' && <LucideArrowDown size={18} color="blue" className="mr-2" />}
//         <Text className="text-sm text-black">Priority: {task.priority}</Text>
//       </View>

//       {/* Status */}
//       <View className="flex-row items-center">
//         {task.status === 'Pending' && <LucideClock size={18} color="gray" className="mr-2" />}
//         {task.status === 'In Progress' && <LucidePlay size={18} color="blue" className="mr-2" />}
//         {task.status === 'Completed' && <LucideCheckCircle size={18} color="green" className="mr-2" />}
//         <Text className="text-sm text-black">Status: {task.status}</Text>
//       </View>

//       {/* Created At */}
//       <View className="flex-row items-center">
//         <LucideCalendar size={18} color="gray" className="mr-2" />
//         <Text className="text-sm text-black">Created: {formatDateTime(task.created_at)}</Text>
//       </View>

//       {/* Due Date */}
//       <View className="flex-row items-center">
//         <LucideCalendar size={18} color="gray" className="mr-2" />
//         <Text className={twMerge('text-sm', isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black')}>
//           Due: {formatDate(task.due_date)}
//         </Text>
//       </View>

//       {/* Assignment Info */}
//       {isAdminView ? (
//         <>
//           <View className="flex-row items-center">
//             <LucideUser size={18} color="gray" className="mr-2" />
//             <Text className="text-sm text-black">Created By: {task.created_by}</Text>
//           </View>
//           {task.created_by !== task.assigned_by && task.assigned_by && (
//             <View className="flex-row items-center">
//               <LucideUser size={18} color="gray" className="mr-2" />
//               <Text className="text-sm text-black">Re-assigned By: {task.assigned_by}</Text>
//             </View>
//           )}
//           <View className="flex-row items-center">
//             <LucideUser size={18} color="gray" className="mr-2" />
//             <Text className="text-sm text-black">Assigned To: {task.assigned_to}</Text>
//           </View>
//         </>
//       ) : (
//         <View className="flex-row items-center">
//           <LucideUser size={18} color="gray" className="mr-2" />
//           <Text className="text-sm text-black">
//             {location === 'myTasks'
//               ? `Assigned By: ${task.assigned_by || task.created_by}`
//               : `Assigned To: ${task.assigned_to}`}
//           </Text>
//         </View>
//       )}

//       {/* Last Updated */}
//       <View className="flex-row items-center">
//         <LucideCalendar size={18} color="gray" className="mr-2" />
//         <Text className="text-sm text-black">Last Updated: {formatDateTime(task.updated_at)}</Text>
//       </View>
//     </View>
//   );
// };

// export default TaskCard;

// import { useAuth } from '@/hooks/useAuth';
// import { Task } from '@/types/task.types';
// import { useRouter } from 'expo-router';
// import {
//   LucideArrowDown,
//   LucideCalendar,
//   LucideCheckCircle,
//   LucideClock,
//   LucideFlame,
//   LucidePlay,
//   LucideUser,
// } from 'lucide-react-native';
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { twMerge } from 'tailwind-merge';


// interface TaskCardProps {
//   task: Task & {
//     assigned_by?: string;
//   };
//   location: 'myTasks' | 'adminTasks' | 'assignTasks';
//   expanded: boolean;
//   toggleDescription: (taskId: string) => void;
// }

// const formatDate = (dateStr?: string | null) => {
//   if (!dateStr) return 'N/A';
//   const d = new Date(dateStr);
//   return d.toLocaleDateString('en-IN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// };

// const formatDateTime = (dateStr?: string | null) => {
//   if (!dateStr) return 'N/A';
//   const date = new Date(dateStr);
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   const formattedHours = hours % 12 || 12;
//   const formattedMinutes = minutes.toString().padStart(2, '0');
//   return `${formattedHours}:${formattedMinutes} ${ampm} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// };

// const isOverdue = (dueDate?: string | null) => {
//   if (!dueDate) return false;
//   return new Date(dueDate) < new Date();
// };

// const TaskCard: React.FC<TaskCardProps> = ({ task, location, expanded, toggleDescription }) => {
//   const router = useRouter();
//   const { user } = useAuth();

//   const isAdminView = user?.accountType === 'Super Admin' && location === 'adminTasks';

//   return (
//     <View className="bg-white border border-yellow-500 rounded-xl shadow p-4 space-y-4 mb-4">
//       {/* Header */}
//       <View className="flex-row justify-between items-start border-b border-yellow-500 pb-2">
//         <Text className="text-lg font-bold text-black w-1/2" numberOfLines={1}>
//           {task.title}
//         </Text>

//         <View className="flex-row items-center">
//           <TouchableOpacity
//             // onPress={() =>
//             //   router.push({
//             //     pathname: '/(dashboard)/task-progress',
//             //     params: { task_id: task.task_id, from: location },
//             //   })
//             // }
//             onPress={() =>
//               router.push({
//                 pathname: '/(dashboard)/task-progress/[taskId]',
//                 params: { taskId: task.task_id, from: location },
//               })
//             }
//             className="bg-gray-700 px-2 py-1 rounded"
//           >
//             <Text className="text-white text-xs">View Progress</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() =>
//               router.push({
//                 pathname: '/tasks/[taskId]/update',
//                 params: { taskId: task.task_id, from: location },
//               })
//             }
//             className="bg-yellow-500 px-2 py-1 rounded ml-3"
//           >
//             <Text className="text-white text-xs">Update</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Description */}
//       <View>
//         <Text className="text-sm text-black mb-1">
//           {expanded || (task.description || '').length <= 100
//             ? task.description || 'No description'
//             : `${task.description?.slice(0, 100)}...`}
//         </Text>
//         {task.description && task.description.length > 100 && (
//           <TouchableOpacity onPress={() => toggleDescription(task.task_id)}>
//             <Text className="text-yellow-500 font-medium">
//               {expanded ? 'Read Less' : 'Read More'}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Info Rows - now spaced more with space-y-3 */}
//       <View className="space-y-3">
//         {/* Priority */}
//         <View className="flex-row items-center">
//           {task.priority === 'High' && <LucideFlame size={18} color="red" className="mr-2" />}
//           {task.priority === 'Medium' && <LucideFlame size={18} color="orange" className="mr-2" />}
//           {task.priority === 'Low' && <LucideArrowDown size={18} color="blue" className="mr-2" />}
//           <Text className="text-sm text-black">Priority: {task.priority}</Text>
//         </View>

//         {/* Status */}
//         <View className="flex-row items-center">
//           {task.status === 'Pending' && <LucideClock size={18} color="gray" className="mr-2" />}
//           {task.status === 'In Progress' && <LucidePlay size={18} color="blue" className="mr-2" />}
//           {task.status === 'Completed' && <LucideCheckCircle size={18} color="green" className="mr-2" />}
//           <Text className="text-sm text-black">Status: {task.status}</Text>
//         </View>

//         {/* Created At */}
//         <View className="flex-row items-center">
//           <LucideCalendar size={18} color="gray" className="mr-2" />
//           <Text className="text-sm text-black">Created: {formatDateTime(task.created_at)}</Text>
//         </View>

//         {/* Due Date */}
//         <View className="flex-row items-center">
//           <LucideCalendar size={18} color="gray" className="mr-2" />
//           <Text
//             className={twMerge(
//               'text-sm',
//               isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black'
//             )}
//           >
//             Due: {formatDate(task.due_date)}
//           </Text>
//         </View>

//         {/* Assignment Info */}
//         {isAdminView ? (
//           <>
//             <View className="flex-row items-center">
//               <LucideUser size={18} color="gray" className="mr-2" />
//               <Text className="text-sm text-black">Created By: {task.created_by}</Text>
//             </View>
//             {task.created_by !== task.assigned_by && task.assigned_by && (
//               <View className="flex-row items-center">
//                 <LucideUser size={18} color="gray" className="mr-2" />
//                 <Text className="text-sm text-black">Re-assigned By: {task.assigned_by}</Text>
//               </View>
//             )}
//             <View className="flex-row items-center">
//               <LucideUser size={18} color="gray" className="mr-2" />
//               <Text className="text-sm text-black">Assigned To: {task.assigned_to}</Text>
//             </View>
//           </>
//         ) : (
//           <View className="flex-row items-center">
//             <LucideUser size={18} color="gray" className="mr-2" />
//             <Text className="text-sm text-black">
//               {location === 'myTasks'
//                 ? `Assigned By: ${task.assigned_by || task.created_by}`
//                 : `Assigned To: ${task.assigned_to}`}
//             </Text>
//           </View>
//         )}

//         {/* Last Updated */}
//         <View className="flex-row items-center">
//           <LucideCalendar size={18} color="gray" className="mr-2" />
          
//           <Text className="text-sm text-black">Last Updated: {formatDateTime(task.last_updated_at ?? task.updated_at)}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default TaskCard;


import { useAuth } from '@/hooks/useAuth';
import { Task } from '@/types/task.types';
import { useRouter } from 'expo-router';
import {
  LucideArrowDown,
  LucideCalendar,
  LucideCheckCircle,
  LucideClock,
  LucideFlame,
  LucidePlay,
  LucideUser,
} from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { twMerge } from 'tailwind-merge';


interface TaskCardProps {
  task: Task & {
    assigned_by?: string;
  };
  location: 'myTasks' | 'adminTasks' | 'assignTasks';
  expanded: boolean;
  toggleDescription: (taskId: string) => void;
}

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatDateTime = (dateStr?: string | null) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const isOverdue = (dueDate?: string | null) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

const TaskCard: React.FC<TaskCardProps> = ({ task, location, expanded, toggleDescription }) => {
  const router = useRouter();
  const { user } = useAuth();
  const colorScheme = useColorScheme(); // Detect current theme (light or dark)

  const isAdminView = user?.accountType === 'Super Admin' && location === 'adminTasks';

  return (
    <View className={`bg-white dark:bg-black border border-yellow-500 rounded-xl shadow p-4 space-y-4 mb-4`}>
      {/* Header */}
      <View className="flex-row justify-between items-start border-b border-yellow-500 pb-2">
        <Text className={`text-lg font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'} w-1/2`} numberOfLines={1}>
          {task.title}
        </Text>

        <View className="flex-row items-center">
          <TouchableOpacity
            // onPress={() =>
            //   router.push({
            //     pathname: '/(dashboard)/task-progress',
            //     params: { task_id: task.task_id, from: location },
            //   })
            // }
            onPress={() =>
              router.push({
                pathname: '/(dashboard)/task-progress/[taskId]',
                params: { taskId: task.task_id, from: location },
              })
            }
            className="bg-gray-700 px-2 py-1 rounded"
          >
            <Text className="text-white text-xs">View Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/tasks/[taskId]/update',
                params: { taskId: task.task_id, from: location },
              })
            }
            className="bg-yellow-500 px-2 py-1 rounded ml-3"
          >
            <Text className="text-white text-xs">Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Description */}
      <View>
        <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'} mb-1`}>
          {expanded || (task.description || '').length <= 100
            ? task.description || 'No description'
            : `${task.description?.slice(0, 100)}...`}
        </Text>
        {task.description && task.description.length > 100 && (
          <TouchableOpacity onPress={() => toggleDescription(task.task_id)}>
            <Text className="text-yellow-500 font-medium">
              {expanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Info Rows - now spaced more with space-y-3 */}
      <View className="space-y-3">
        {/* Priority */}
        <View className="flex-row items-center">
          {task.priority === 'High' && <LucideFlame size={18} color="red" className="mr-2" />}
          {task.priority === 'Medium' && <LucideFlame size={18} color="orange" className="mr-2" />}
          {task.priority === 'Low' && <LucideArrowDown size={18} color="blue" className="mr-2" />}
          <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Priority: {task.priority}</Text>
        </View>

        {/* Status */}
        <View className="flex-row items-center">
          {task.status === 'Pending' && <LucideClock size={18} color="gray" className="mr-2" />}
          {task.status === 'In Progress' && <LucidePlay size={18} color="blue" className="mr-2" />}
          {task.status === 'Completed' && <LucideCheckCircle size={18} color="green" className="mr-2" />}
          <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Status: {task.status}</Text>
        </View>

        {/* Created At */}
        <View className="flex-row items-center">
          <LucideCalendar size={18} color="gray" className="mr-2" />
          <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Created: {formatDateTime(task.created_at)}</Text>
        </View>

        {/* Due Date */}
        <View className="flex-row items-center">
          <LucideCalendar size={18} color="gray" className="mr-2" />
          <Text
            className={twMerge(
              'text-sm',
              isOverdue(task.due_date) ? 'text-red-600 font-semibold' : colorScheme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            Due: {formatDate(task.due_date)}
          </Text>
        </View>

        {/* Assignment Info */}
        {isAdminView ? (
          <>
            <View className="flex-row items-center">
              <LucideUser size={18} color="gray" className="mr-2" />
              <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Created By: {task.created_by}</Text>
            </View>
            {task.created_by !== task.assigned_by && task.assigned_by && (
              <View className="flex-row items-center">
                <LucideUser size={18} color="gray" className="mr-2" />
                <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Re-assigned By: {task.assigned_by}</Text>
              </View>
            )}
            <View className="flex-row items-center">
              <LucideUser size={18} color="gray" className="mr-2" />
              <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Assigned To: {task.assigned_to}</Text>
            </View>
          </>
        ) : (
          <View className="flex-row items-center">
            <LucideUser size={18} color="gray" className="mr-2" />
            <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
              {location === 'myTasks'
                ? `Assigned By: ${task.assigned_by || task.created_by}`
                : `Assigned To: ${task.assigned_to}`}
            </Text>
          </View>
        )}

        {/* Last Updated */}
        <View className="flex-row items-center">
          <LucideCalendar size={18} color="gray" className="mr-2" />
          
          <Text className={`text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Last Updated: {formatDateTime(task.last_updated_at ?? task.updated_at)}</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;