import { TaskFilters } from '@/types/task.types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Funnel, RefreshCcw } from 'lucide-react-native';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

// interface Props {
//   filters: any;
//   setFilters: React.Dispatch<React.SetStateAction<any>>;
//   users: { username: string }[];
//   pageType: 'myTasks' | 'assignTasks' | 'allTasks';
// }

interface Props {
  filters: TaskFilters;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
  users: { username: string }[];
  pageType: 'myTasks' | 'assignTasks' | 'allTasks';
}

const TaskFilterMenu: React.FC<Props> = ({ filters, setFilters, users, pageType }) => {
  const handleChange = (name: string, value: any) => {
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
  };

  const renderDatePicker = (fieldName: string, label: string) => (
    <View className="mb-4">
      <Text className="text-black font-semibold mb-1">{label}</Text>
      <DateTimePicker
        value={filters[fieldName] ? new Date(filters[fieldName]) : new Date()}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={(_, selectedDate) => {
          if (selectedDate) {
            const iso = selectedDate.toISOString().split('T')[0];
            handleChange(fieldName, iso);
          }
        }}
      />
    </View>
  );

  return (
    <View className="px-4 py-3">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center space-x-2">
          <Funnel size={20} color="orange" />
          <Text className="font-bold text-lg text-black">Filter Tasks</Text>
        </View>
        <TouchableOpacity
          onPress={clearFilters}
          className="flex-row items-center px-4 py-2 border border-black rounded-md bg-white"
        >
          <RefreshCcw size={16} color="black" />
          <Text className="ml-2 text-sm text-black">Clear Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Assigned To */}
      <View className="mb-4">
        <Text className="text-black font-semibold mb-1">Assigned To</Text>
        <Picker
          enabled={pageType !== 'myTasks'}
          selectedValue={filters.assigned_to}
          onValueChange={(value) => handleChange('assigned_to', value)}
        >
          <Picker.Item label="All" value="" />
          {users.map((u) => (
            <Picker.Item key={u.username} label={u.username} value={u.username} />
          ))}
        </Picker>
      </View>

      {/* Created By */}
      <View className="mb-4">
        <Text className="text-black font-semibold mb-1">Assigned By</Text>
        <Picker
          enabled={pageType !== 'assignTasks'}
          selectedValue={filters.created_by}
          onValueChange={(value) => handleChange('created_by', value)}
        >
          <Picker.Item label="All" value="" />
          {users.map((u) => (
            <Picker.Item key={u.username} label={u.username} value={u.username} />
          ))}
        </Picker>
      </View>

      {/* Status */}
      <View className="mb-4">
        <Text className="text-black font-semibold mb-1">Status</Text>
        <Picker
          selectedValue={filters.status}
          onValueChange={(value) => handleChange('status', value)}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Completed" value="Completed" />
        </Picker>
      </View>

      {/* Priority */}
      <View className="mb-4">
        <Text className="text-black font-semibold mb-1">Priority</Text>
        <Picker
          selectedValue={filters.priority}
          onValueChange={(value) => handleChange('priority', value)}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="High" value="High" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Low" value="Low" />
        </Picker>
      </View>

      {/* Due Date */}
      {renderDatePicker('due_date', 'Due Date')}

      {/* Created Date */}
      {renderDatePicker('created_at', 'Created Date')}

      {/* Updated Date */}
      {renderDatePicker('last_updated_at_date', 'Updated Date')}

      {/* Updated Hour Range */}
      <View className="mb-4">
        <Text className="text-black font-semibold mb-1">Updated Hour Range</Text>
        <Picker
          selectedValue={filters.updated_hour_range}
          onValueChange={(value) => handleChange('updated_hour_range', value)}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Last 1 Hour" value="1" />
          <Picker.Item label="Last 6 Hours" value="6" />
          <Picker.Item label="Last 12 Hours" value="12" />
          <Picker.Item label="Last 24 Hours" value="24" />
        </Picker>
      </View>
    </View>
  );
};

export default TaskFilterMenu;
