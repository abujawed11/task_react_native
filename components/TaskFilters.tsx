import { TaskFilters } from '@/types/task.types';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

type Props = {
  filters: TaskFilters;
  users: { username: string }[];
  onChange: (field: string, value: string) => void;
  onReset: () => void;
};

export const TaskFiltersComponent: React.FC<Props> = ({ filters, users, onChange, onReset }) => {
  return (
    <View className="bg-white border border-yellow-500 rounded-xl p-4 mb-4 space-y-4">
      {/* Assigned To */}
      <View>
        <Text className="text-black mb-1">Assigned To</Text>
        <Picker
          selectedValue={filters.assigned_to}
          onValueChange={(val) => onChange('assigned_to', val)}
          className="bg-gray-100 rounded-lg"
        >
          <Picker.Item label="All" value="" />
          {users.map((u) => (
            <Picker.Item key={u.username} label={u.username} value={u.username} />
          ))}
        </Picker>
      </View>

      {/* Created By */}
      <View>
        <Text className="text-black mb-1">Created By</Text>
        <Picker
          selectedValue={filters.created_by}
          onValueChange={(val) => onChange('created_by', val)}
          className="bg-gray-100 rounded-lg"
        >
          <Picker.Item label="All" value="" />
          {users.map((u) => (
            <Picker.Item key={u.username} label={u.username} value={u.username} />
          ))}
        </Picker>
      </View>

      {/* Status */}
      <View>
        <Text className="text-black mb-1">Status</Text>
        <Picker
          selectedValue={filters.status}
          onValueChange={(val) => onChange('status', val)}
          className="bg-gray-100 rounded-lg"
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Completed" value="Completed" />
        </Picker>
      </View>

      {/* Priority */}
      <View>
        <Text className="text-black mb-1">Priority</Text>
        <Picker
          selectedValue={filters.priority}
          onValueChange={(val) => onChange('priority', val)}
          className="bg-gray-100 rounded-lg"
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="High" value="High" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Low" value="Low" />
        </Picker>
      </View>

      {/* Due Date */}
      <View>
        <Text className="text-black mb-1">Due Date (YYYY-MM-DD)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-black"
          placeholder="2025-07-01"
          value={filters.due_date}
          onChangeText={(val) => onChange('due_date', val)}
        />
      </View>

      {/* Created Date */}
      <View>
        <Text className="text-black mb-1">Created Date (YYYY-MM-DD)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-black"
          placeholder="2025-07-01"
          value={filters.created_at}
          onChangeText={(val) => onChange('created_at', val)}
        />
      </View>

      {/* Updated Date */}
      <View>
        <Text className="text-black mb-1">Updated Date (YYYY-MM-DD)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-black"
          placeholder="2025-07-01"
          value={filters.last_updated_at_date}
          onChangeText={(val) => onChange('last_updated_at_date', val)}
        />
      </View>

      {/* Updated Hour Range */}
      <View>
        <Text className="text-black mb-1">Updated Hour Range</Text>
        <Picker
          selectedValue={filters.updated_hour_range}
          onValueChange={(val) => onChange('updated_hour_range', val)}
          className="bg-gray-100 rounded-lg"
        >
          <Picker.Item label="All" value="" />
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item
              key={i}
              label={`Between ${i % 12 || 12}${i < 12 ? 'AM' : 'PM'} - ${(i + 1) % 12 || 12}${(i + 1) < 12 || i === 23 ? 'AM' : 'PM'}`}
              value={i.toString()}
            />
          ))}
        </Picker>
      </View>

      {/* Reset Button */}
      <Text
        onPress={onReset}
        className="text-yellow-500 font-medium text-right"
      >
        Reset Filters
      </Text>
    </View>
  );
};

export default TaskFilters
