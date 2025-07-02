import { Picker } from '@react-native-picker/picker';
import { ArrowDownUp, RefreshCcw } from 'lucide-react-native';
import React from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type SortConfig = {
  field: string;
  order: 'ASC' | 'DESC' | '';
};

interface Props {
  visible: boolean;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  onSortClick: () => void;
  onClose: () => void;
}

const TaskSortModal: React.FC<Props> = ({
  visible,
  sortConfig,
  setSortConfig,
  onSortClick,
  onClose,
}) => {
  const handleClearSort = () => {
    setSortConfig({ field: '', order: '' });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
          <Text className="text-lg font-bold text-black">Sort Tasks</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-sm text-red-600 font-semibold">Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="px-4 py-4">
          <Text className="text-black font-medium mb-1">Sort By</Text>
          <Picker
            selectedValue={sortConfig.field}
            onValueChange={(value) =>
              setSortConfig((prev) => ({ ...prev, field: value }))
            }
          >
            <Picker.Item label="Select Field" value="" />
            <Picker.Item label="Created Date" value="created_at" />
            <Picker.Item label="Created Time" value="created_time" />
            <Picker.Item label="Due Date" value="due_date" />
            <Picker.Item label="Last Updated Time" value="updated_at" />
            <Picker.Item label="Priority" value="priority" />
            <Picker.Item label="Status" value="status" />
            <Picker.Item label="Assigned To" value="assigned_to" />
            <Picker.Item label="Created By" value="created_by" />
          </Picker>

          <Text className="text-black font-medium mt-4 mb-1">Order</Text>
          <Picker
            selectedValue={sortConfig.order}
            onValueChange={(value) =>
              setSortConfig((prev) => ({ ...prev, order: value }))
            }
          >
            <Picker.Item label="Select Order" value="" />
            <Picker.Item label="Ascending" value="ASC" />
            <Picker.Item label="Descending" value="DESC" />
          </Picker>

          {/* Buttons */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              className="bg-yellow-400 px-4 py-2 rounded-md flex-row items-center"
              onPress={onSortClick}
            >
              <ArrowDownUp size={16} color="black" />
              <Text className="ml-2 font-semibold text-black">Sort</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white border border-black px-4 py-2 rounded-md flex-row items-center"
              onPress={handleClearSort}
            >
              <RefreshCcw size={16} color="black" />
              <Text className="ml-2 text-black">Clear</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TaskSortModal;
