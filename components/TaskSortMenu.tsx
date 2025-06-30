import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type TaskSortMenuProps = {
  sortConfig: any;
  setSortConfig: (val: any) => void;
  onClose: () => void;
  onSortClick?: () => void;
};

export default function TaskSortMenu({
  sortConfig,
  setSortConfig,
  onClose,
  onSortClick,
}: TaskSortMenuProps) {
  const clearSort = () => {
    setSortConfig({ field: '', order: '' });
  };

  return (
    <View className="p-4 bg-white">
      <Text className="text-xl font-bold text-yellow-800 mb-4">Sort Tasks</Text>

      <Text className="text-black mb-1">Sort By</Text>
      <Picker
        selectedValue={sortConfig.field}
        onValueChange={(value) =>
          setSortConfig((prev: any) => ({ ...prev, field: value }))
        }
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Created Date" value="created_at" />
        <Picker.Item label="Created Time" value="created_time" />
        <Picker.Item label="Due Date" value="due_date" />
        <Picker.Item label="Last Updated" value="updated_at" />
        <Picker.Item label="Priority" value="priority" />
        <Picker.Item label="Status" value="status" />
        <Picker.Item label="Assigned To" value="assigned_to" />
        <Picker.Item label="Created By" value="created_by" />
      </Picker>

      <Text className="text-black mt-4 mb-1">Order</Text>
      <Picker
        selectedValue={sortConfig.order}
        onValueChange={(value) =>
          setSortConfig((prev: any) => ({ ...prev, order: value }))
        }
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Ascending" value="ASC" />
        <Picker.Item label="Descending" value="DESC" />
      </Picker>

      <View className="flex-row justify-between mt-6">
        <TouchableOpacity
          onPress={clearSort}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          <Text className="text-black font-medium">Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onSortClick?.();
            onClose();
          }}
          className="bg-yellow-500 px-4 py-2 rounded"
        >
          <Text className="text-white font-medium">Sort & Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
