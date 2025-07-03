// import { TaskFilters } from '@/types/task.types';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { Funnel, RefreshCcw } from 'lucide-react-native';
// import React from 'react';
// import { Platform, Text, TouchableOpacity, View } from 'react-native';

// // interface Props {
// //   filters: any;
// //   setFilters: React.Dispatch<React.SetStateAction<any>>;
// //   users: { username: string }[];
// //   pageType: 'myTasks' | 'assignTasks' | 'allTasks';
// // }

// interface Props {
//   filters: TaskFilters;
//   setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
//   users: { username: string }[];
//   pageType: 'myTasks' | 'assignTasks' | 'allTasks';
// }

// const TaskFilterMenu: React.FC<Props> = ({ filters, setFilters, users, pageType }) => {
//   const handleChange = (name: string, value: any) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

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

//   const renderDatePicker = (fieldName: string, label: string) => (
//     <View className="mb-4">
//       <Text className="text-black font-semibold mb-1">{label}</Text>
//       <DateTimePicker
//         value={filters[fieldName] ? new Date(filters[fieldName]) : new Date()}
//         mode="date"
//         display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//         onChange={(_, selectedDate) => {
//           if (selectedDate) {
//             const iso = selectedDate.toISOString().split('T')[0];
//             handleChange(fieldName, iso);
//           }
//         }}
//       />
//     </View>
//   );

//   return (
//     <View className="px-4 py-3">
//       <View className="flex-row justify-between items-center mb-3">
//         <View className="flex-row items-center space-x-2">
//           <Funnel size={20} color="orange" />
//           <Text className="font-bold text-lg text-black">Filter Tasks</Text>
//         </View>
//         <TouchableOpacity
//           onPress={clearFilters}
//           className="flex-row items-center px-4 py-2 border border-black rounded-md bg-white"
//         >
//           <RefreshCcw size={16} color="black" />
//           <Text className="ml-2 text-sm text-black">Clear Filters</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Assigned To */}
//       <View className="mb-4">
//         <Text className="text-black font-semibold mb-1">Assigned To</Text>
//         <Picker
//           enabled={pageType !== 'myTasks'}
//           selectedValue={filters.assigned_to}
//           onValueChange={(value) => handleChange('assigned_to', value)}
//         >
//           <Picker.Item label="All" value="" />
//           {users.map((u) => (
//             <Picker.Item key={u.username} label={u.username} value={u.username} />
//           ))}
//         </Picker>
//       </View>

//       {/* Created By */}
//       <View className="mb-4">
//         <Text className="text-black font-semibold mb-1">Assigned By</Text>
//         <Picker
//           enabled={pageType !== 'assignTasks'}
//           selectedValue={filters.created_by}
//           onValueChange={(value) => handleChange('created_by', value)}
//         >
//           <Picker.Item label="All" value="" />
//           {users.map((u) => (
//             <Picker.Item key={u.username} label={u.username} value={u.username} />
//           ))}
//         </Picker>
//       </View>

//       {/* Status */}
//       <View className="mb-4">
//         <Text className="text-black font-semibold mb-1">Status</Text>
//         <Picker
//           selectedValue={filters.status}
//           onValueChange={(value) => handleChange('status', value)}
//         >
//           <Picker.Item label="All" value="" />
//           <Picker.Item label="Pending" value="Pending" />
//           <Picker.Item label="In Progress" value="In Progress" />
//           <Picker.Item label="Completed" value="Completed" />
//         </Picker>
//       </View>

//       {/* Priority */}
//       <View className="mb-4">
//         <Text className="text-black font-semibold mb-1">Priority</Text>
//         <Picker
//           selectedValue={filters.priority}
//           onValueChange={(value) => handleChange('priority', value)}
//         >
//           <Picker.Item label="All" value="" />
//           <Picker.Item label="High" value="High" />
//           <Picker.Item label="Medium" value="Medium" />
//           <Picker.Item label="Low" value="Low" />
//         </Picker>
//       </View>

//       {/* Due Date */}
//       {renderDatePicker('due_date', 'Due Date')}

//       {/* Created Date */}
//       {renderDatePicker('created_at', 'Created Date')}

//       {/* Updated Date */}
//       {renderDatePicker('last_updated_at_date', 'Updated Date')}

//       {/* Updated Hour Range */}
//       <View className="mb-4">
//         <Text className="text-black font-semibold mb-1">Updated Hour Range</Text>
//         <Picker
//           selectedValue={filters.updated_hour_range}
//           onValueChange={(value) => handleChange('updated_hour_range', value)}
//         >
//           <Picker.Item label="All" value="" />
//           <Picker.Item label="Last 1 Hour" value="1" />
//           <Picker.Item label="Last 6 Hours" value="6" />
//           <Picker.Item label="Last 12 Hours" value="12" />
//           <Picker.Item label="Last 24 Hours" value="24" />
//         </Picker>
//       </View>
//     </View>
//   );
// };

// export default TaskFilterMenu;


// import { TaskFilters } from '@/types/task.types';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { Funnel, RefreshCcw } from 'lucide-react-native';
// import React, { useState } from 'react';
// import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

// interface Props {
//   filters: TaskFilters;
//   setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
//   users: { username: string }[];
//   pageType: 'myTasks' | 'assignTasks' | 'allTasks';
//   visible: boolean;
//   onClose: () => void;
// }

// const TaskFilterMenu: React.FC<Props> = ({ filters, setFilters, users, pageType, visible, onClose }) => {
//   const [activeDateField, setActiveDateField] = useState<string | null>(null);
//   const [tempDate, setTempDate] = useState<Date>(new Date());

//   const handleChange = (name: keyof TaskFilters, value: any) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

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

//   const openDatePicker = (fieldName: string) => {
//     setActiveDateField(fieldName);
//     setTempDate(filters[fieldName] ? new Date(filters[fieldName]) : new Date());
//   };

//   const onDateChange = (_: any, selectedDate?: Date) => {
//     if (Platform.OS !== 'ios') setActiveDateField(null);
//     if (selectedDate) {
//       const iso = selectedDate.toISOString().split('T')[0];
//       handleChange(activeDateField as keyof TaskFilters, iso);
//     }
//   };

//   return (
//     <Modal visible={visible} animationType="slide">
//       <View className="flex-1 bg-white px-4 py-6">
//         <View className="flex-row justify-between items-center mb-4">
//           <View className="flex-row items-center">
//             <Funnel size={20} color="orange" />
//             <Text className="ml-2 font-bold text-lg text-black">Filter Tasks</Text>
//           </View>
//           <TouchableOpacity
//             onPress={clearFilters}
//             className="flex-row items-center px-4 py-2 border border-black rounded-md bg-white"
//           >
//             <RefreshCcw size={16} color="black" />
//             <Text className="ml-2 text-sm text-black">Clear Filters</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Dropdown filters */}
//         {[
//           { label: 'Assigned To', key: 'assigned_to', disabled: pageType === 'myTasks' },
//           { label: 'Assigned By', key: 'created_by', disabled: pageType === 'assignTasks' },
//           { label: 'Status', key: 'status', options: ['Pending', 'In Progress', 'Completed'] },
//           { label: 'Priority', key: 'priority', options: ['High', 'Medium', 'Low'] },
//           { label: 'Updated Hour Range', key: 'updated_hour_range', options: ['1', '6', '12', '24'] },
//         ].map((field) => (
//           <View key={field.key} className="mb-4">
//             <Text className="text-black font-semibold mb-1">{field.label}</Text>
//             <Picker
//               enabled={!field.disabled}
//               selectedValue={filters[field.key as keyof TaskFilters]}
//               onValueChange={(value) => handleChange(field.key as keyof TaskFilters, value)}
//             >
//               <Picker.Item label="All" value="" />
//               {field.options
//                 ? field.options.map((opt) => (
//                     <Picker.Item key={opt} label={opt} value={opt} />
//                   ))
//                 : users.map((u) => (
//                     <Picker.Item key={u.username} label={u.username} value={u.username} />
//                   ))}
//             </Picker>
//           </View>
//         ))}

//         {/* Date pickers */}
//         {[
//           { label: 'Due Date', key: 'due_date' },
//           { label: 'Created Date', key: 'created_at' },
//           { label: 'Updated Date', key: 'last_updated_at_date' },
//         ].map(({ label, key }) => (
//           <View key={key} className="mb-4">
//             <Text className="text-black font-semibold mb-1">{label}</Text>
//             <TouchableOpacity
//               onPress={() => openDatePicker(key)}
//               className="border p-2 rounded-md bg-gray-100"
//             >
//               <Text className="text-black">{filters[key] || 'Select Date'}</Text>
//             </TouchableOpacity>
//           </View>
//         ))}

//         <TouchableOpacity
//           onPress={onClose}
//           className="mt-6 bg-yellow-400 rounded-md py-3 items-center"
//         >
//           <Text className="text-black font-bold">Close Filter</Text>
//         </TouchableOpacity>

//         {/* Date Picker Modal */}
//         {activeDateField && (
//           <DateTimePicker
//             value={tempDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={onDateChange}
//           />
//         )}
//       </View>
//     </Modal>
//   );
// };

// export default TaskFilterMenu;

// import { TaskFilters } from '@/types/task.types';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { Funnel, RefreshCcw } from 'lucide-react-native';
// import React, { useState } from 'react';
// import {
//   Modal,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// interface Props {
//   visible: boolean;
//   // onClose: () => void;
//   filters: TaskFilters;
//   setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
//   users: { username: string }[];
//   pageType: 'myTasks' | 'assignTasks' | 'allTasks';
// }

// const TaskFilterModal: React.FC<Props> = ({
//   visible,
//   // onClose,
//   filters,
//   setFilters,
//   users,
//   pageType,
// }) => {
//   const [dateField, setDateField] = useState<null | keyof TaskFilters>(null);

//   const handleChange = (name: keyof TaskFilters, value: any) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

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
//     setDateField(null);
//   };

//   const showDatePicker = (field: keyof TaskFilters) => setDateField(field);

//   const handleDateChange = (
//     event: any,
//     selectedDate: Date | undefined
//   ) => {
//     if (selectedDate && dateField) {
//       const isoDate = selectedDate.toISOString().split('T')[0];
//       handleChange(dateField, isoDate);
//     }
//     setDateField(null);
//   };

//   return (
//     <Modal visible={visible} animationType="slide">
//       <View className="flex-1 bg-white">
//         {/* Header */}
//         <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
//           <View className="flex-row items-center space-x-2">
//             <Funnel size={20} color="orange" />
//             <Text className="text-black font-bold text-lg">Filter Tasks</Text>
//           </View>
//           {/* <TouchableOpacity onPress={onClose}>
//             <X size={24} color="black" />
//           </TouchableOpacity> */}
//         </View>

//         {/* Content */}
//         <ScrollView className="px-4 py-2">
//           {/* Assigned To */}
//           <Text className="font-medium text-black mb-1">Assigned To</Text>
//           <Picker
//             enabled={pageType !== 'myTasks'}
//             selectedValue={filters.assigned_to}
//             onValueChange={(v) => handleChange('assigned_to', v)}
//           >
//             <Picker.Item label="All" value="" />
//             {users.map((u) => (
//               <Picker.Item key={u.username} label={u.username} value={u.username} />
//             ))}
//           </Picker>

//           {/* Created By */}
//           <Text className="font-medium text-black mb-1 mt-4">Assigned By</Text>
//           <Picker
//             enabled={pageType !== 'assignTasks'}
//             selectedValue={filters.created_by}
//             onValueChange={(v) => handleChange('created_by', v)}
//           >
//             <Picker.Item label="All" value="" />
//             {users.map((u) => (
//               <Picker.Item key={u.username} label={u.username} value={u.username} />
//             ))}
//           </Picker>

//           {/* Status */}
//           <Text className="font-medium text-black mb-1 mt-4">Status</Text>
//           <Picker
//             selectedValue={filters.status}
//             onValueChange={(v) => handleChange('status', v)}
//           >
//             <Picker.Item label="All" value="" />
//             <Picker.Item label="Pending" value="Pending" />
//             <Picker.Item label="In Progress" value="In Progress" />
//             <Picker.Item label="Completed" value="Completed" />
//           </Picker>

//           {/* Priority */}
//           <Text className="font-medium text-black mb-1 mt-4">Priority</Text>
//           <Picker
//             selectedValue={filters.priority}
//             onValueChange={(v) => handleChange('priority', v)}
//           >
//             <Picker.Item label="All" value="" />
//             <Picker.Item label="High" value="High" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="Low" value="Low" />
//           </Picker>

//           {/* Dates */}
//           {[
//             ['due_date', 'Due Date'],
//             ['created_at', 'Created Date'],
//             ['last_updated_at_date', 'Updated Date'],
//           ].map(([field, label]) => (
//             <TouchableOpacity
//               key={field}
//               onPress={() => showDatePicker(field as keyof TaskFilters)}
//               className="mt-4"
//             >
//               <Text className="font-medium text-black mb-1">{label}</Text>
//               <View className="p-3 border border-gray-300 rounded-md">
//                 <Text className="text-black">
//                   {filters[field as keyof TaskFilters] || 'Select Date'}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}

//           {dateField && (
//             <DateTimePicker
//               value={
//                 filters[dateField]
//                   ? new Date(filters[dateField] as string)
//                   : new Date()
//               }
//               mode="date"
//               display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//               onChange={handleDateChange}
//             />
//           )}

//           {/* Updated Hour Range */}
//           <Text className="font-medium text-black mb-1 mt-4">Updated Hour Range</Text>
//           <Picker
//             selectedValue={filters.updated_hour_range}
//             onValueChange={(v) => handleChange('updated_hour_range', v)}
//           >
//             <Picker.Item label="All" value="" />
//             <Picker.Item label="Last 1 Hour" value="1" />
//             <Picker.Item label="Last 6 Hours" value="6" />
//             <Picker.Item label="Last 12 Hours" value="12" />
//             <Picker.Item label="Last 24 Hours" value="24" />
//           </Picker>
//         </ScrollView>

//         {/* Footer Buttons */}
//         <View className="flex-row justify-between p-4 border-t border-gray-300">
//           <TouchableOpacity
//             className="bg-white border border-black px-4 py-2 rounded-md flex-row items-center"
//             onPress={clearFilters}
//           >
//             <RefreshCcw size={16} color="black" />
//             <Text className="ml-2 text-black">Clear</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className="bg-yellow-500 px-4 py-2 rounded-md"
//             // onPress={onClose}
//           >
//             <Text className="text-black font-semibold">Apply</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default TaskFilterModal;

import { TaskFilters } from '@/types/task.types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Funnel, RefreshCcw, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  filters: TaskFilters;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
  users: { username: string }[];
  pageType: 'myTasks' | 'assignTasks' | 'allTasks'| 'adminTasks';
}

const TaskFilterModal: React.FC<Props> = ({
  visible,
  onClose,
  filters,
  setFilters,
  users,
  pageType,
}) => {
  const [dateField, setDateField] = useState<null | keyof TaskFilters>(null);

  const handleChange = (name: keyof TaskFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      assigned_to: '',
      created_by: '',
      status: '',
      priority: '',
      due_date: '',
      created_at: '',
      last_updated_at_date: '',
      updated_hour_range: '',
    });
    setDateField(null);
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (selectedDate && dateField) {
      const iso = selectedDate.toISOString().split('T')[0];
      handleChange(dateField, iso);
    }
    setDateField(null);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
          <View className="flex-row items-center space-x-2">
            <Funnel size={20} color="orange" />
            <Text className="text-black font-bold text-lg">Filter Tasks</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <X size={22} color="red" />
          </TouchableOpacity>
        </View>

        {/* Scrollable filter content */}
        <ScrollView className="px-4 py-2">

          {/* Assigned To */}
          <Text className="text-black font-semibold mt-3 mb-1">Assigned To</Text>
          <Picker
            enabled={pageType !== 'myTasks'}
            selectedValue={filters.assigned_to}
            onValueChange={(v) => handleChange('assigned_to', v)}
          >
            <Picker.Item label="All" value="" />
            {users.map((u) => (
              <Picker.Item key={u.username} label={u.username} value={u.username} />
            ))}
          </Picker>

          {/* Created By */}
          <Text className="text-black font-semibold mt-3 mb-1">Assigned By</Text>
          <Picker
            enabled={pageType !== 'assignTasks'}
            selectedValue={filters.created_by}
            onValueChange={(v) => handleChange('created_by', v)}
          >
            <Picker.Item label="All" value="" />
            {users.map((u) => (
              <Picker.Item key={u.username} label={u.username} value={u.username} />
            ))}
          </Picker>

          {/* Status */}
          <Text className="text-black font-semibold mt-3 mb-1">Status</Text>
          <Picker
            selectedValue={filters.status}
            onValueChange={(v) => handleChange('status', v)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>

          {/* Priority */}
          <Text className="text-black font-semibold mt-3 mb-1">Priority</Text>
          <Picker
            selectedValue={filters.priority}
            onValueChange={(v) => handleChange('priority', v)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>

          {/* Date fields */}
          {[
            { label: 'Due Date', key: 'due_date' },
            { label: 'Created Date', key: 'created_at' },
            { label: 'Updated Date', key: 'last_updated_at_date' },
          ].map(({ label, key }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setDateField(key as keyof TaskFilters)}
              className="mt-4"
            >
              <Text className="text-black font-semibold mb-1">{label}</Text>
              <View className="border border-gray-300 p-3 rounded-md">
                <Text className="text-black">
                  {filters[key as keyof TaskFilters] || 'Select Date'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Hour Range */}
          <Text className="text-black font-semibold mt-4 mb-1">Updated Hour Range</Text>
          <Picker
            selectedValue={filters.updated_hour_range}
            onValueChange={(v) => handleChange('updated_hour_range', v)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Last 1 Hour" value="1" />
            <Picker.Item label="Last 6 Hours" value="6" />
            <Picker.Item label="Last 12 Hours" value="12" />
            <Picker.Item label="Last 24 Hours" value="24" />
          </Picker>

          {/* Active DateTimePicker */}
          {dateField && (
            <DateTimePicker
              value={
                filters[dateField]
                  ? new Date(filters[dateField] as string)
                  : new Date()
              }
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}
        </ScrollView>

        {/* Footer Actions */}
        <View className="flex-row justify-between p-4 border-t border-gray-300">
          <TouchableOpacity
            className="flex-row items-center bg-white px-4 py-2 border border-black rounded-md"
            onPress={clearFilters}
          >
            <RefreshCcw size={16} color="black" />
            <Text className="ml-2 text-black font-medium">Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-yellow-500 px-4 py-2 rounded-md"
            onPress={onClose}
          >
            <Text className="text-black font-semibold">Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaskFilterModal;
