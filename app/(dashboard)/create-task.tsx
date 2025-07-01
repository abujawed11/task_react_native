// import { useEffect, useRef, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { Trash2, Paperclip, Mic } from 'lucide-react-native';
// import { useRouter } from 'expo-router';
// import { useAuth } from '@/context/AuthContext';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import { BASE_URL } from '@/utils/constants';
// import { User } from '@/types/user.types';

// export default function CreateTaskScreen() {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     priority: '',
//     assigned_to: '',
//     due_date: '',
//   });

//   const [users, setUsers] = useState<User[]>([]);
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);
//   const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     //if (!token) return;

//     const token = await AsyncStorage.getItem('token');

//     axios.get(`${BASE_URL}/api/tasks/list`, {
//       headers: { Authorization: `Bearer ${token}` },
//     }).then(res => setUsers(res.data))
//       .catch(() => Alert.alert('Error', 'Failed to load users.'));
//   }, [token]);

//   const handleInputChange = (name: string, value: string) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const startRecording = async () => {
//     try {
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );

//       setRecording(recording);
//       setRecordingTime(0);

//       const interval = setInterval(() => {
//         setRecordingTime(prev => prev + 1);
//       }, 1000);
//       recording.setOnRecordingStatusUpdate(status => {
//         if (!status.isRecording) clearInterval(interval);
//       });

//     } catch (err) {
//       Alert.alert('Error', 'Microphone access denied or failed to record.');
//     }
//   };

//   const stopRecording = async () => {
//     if (!recording) return;
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();
//     setAudioUri(uri || null);
//     setRecording(null);
//   };

//   const handleFileSelect = async () => {
//     const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
//     if (result.assets && result.assets.length > 0) {
//       setFile(result.assets[0]);
//     }
//   };

//   const handleDeleteFile = () => {
//     Alert.alert('Confirm', 'Delete attached file?', [
//       { text: 'Cancel' },
//       { text: 'Delete', onPress: () => setFile(null) },
//     ]);
//   };

//   const handleDeleteAudio = () => {
//     Alert.alert('Confirm', 'Delete recorded audio?', [
//       { text: 'Cancel' },
//       { text: 'Delete', onPress: () => setAudioUri(null) },
//     ]);
//   };

//   const handleSubmit = async () => {
//     if (!formData.title || !formData.assigned_to || !formData.priority || !formData.due_date) {
//       Alert.alert('Error', 'Please fill all required fields.');
//       return;
//     }

//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     if (audioUri) {
//       const fileName = audioUri.split('/').pop()!;
//       data.append('audio', {
//         uri: audioUri,
//         name: fileName,
//         type: 'audio/mpeg',
//       } as any);
//     }

//     if (file) {
//       data.append('file', {
//         uri: file.uri,
//         name: file.name,
//         type: file.mimeType || 'application/octet-stream',
//       } as any);
//     }

//     try {
//       await axios.post(`${baseUrl}/api/tasks/create`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       Alert.alert('Success', 'Task created successfully!');
//       setFormData({ title: '', description: '', priority: '', assigned_to: '', due_date: '' });
//       setAudioUri(null);
//       setFile(null);
//       router.push('/dashboard');
//     } catch (error: any) {
//       Alert.alert('Error', error.response?.data?.message || 'Failed to create task.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <ScrollView className="flex-1 bg-yellow-50 p-4">
//       <Text className="text-2xl font-bold text-center text-yellow-700 mb-4">Create Task</Text>

//       <TextInput
//         placeholder="Title"
//         value={formData.title}
//         onChangeText={(val) => handleInputChange('title', val)}
//         className="bg-white rounded-lg px-4 py-2 mb-3 border border-yellow-300"
//       />
//       <TextInput
//         placeholder="Description"
//         value={formData.description}
//         multiline
//         onChangeText={(val) => handleInputChange('description', val)}
//         className="bg-white rounded-lg px-4 py-2 mb-3 border border-yellow-300"
//       />
//       <TextInput
//         placeholder="Due Date (YYYY-MM-DD)"
//         value={formData.due_date}
//         onChangeText={(val) => handleInputChange('due_date', val)}
//         className="bg-white rounded-lg px-4 py-2 mb-3 border border-yellow-300"
//       />

//       <Picker
//         selectedValue={formData.priority}
//         onValueChange={(val) => handleInputChange('priority', val)}
//         className="bg-white mb-3 border border-yellow-300 rounded-lg"
//       >
//         <Picker.Item label="Select Priority" value="" />
//         <Picker.Item label="Low" value="Low" />
//         <Picker.Item label="Medium" value="Medium" />
//         <Picker.Item label="High" value="High" />
//       </Picker>

//       <Picker
//         selectedValue={formData.assigned_to}
//         onValueChange={(val) => handleInputChange('assigned_to', val)}
//         className="bg-white mb-3 border border-yellow-300 rounded-lg"
//       >
//         <Picker.Item label="Assign To" value="" />
//         {users.map((u, i) => (
//           <Picker.Item key={i} label={u} value={u} />
//         ))}
//       </Picker>

//       <View className="flex-row items-center justify-between mb-4">
//         <TouchableOpacity
//           onPress={recording ? stopRecording : startRecording}
//           className={`flex-row items-center px-4 py-2 rounded-lg ${recording ? 'bg-red-600' : 'bg-black'}`}
//         >
//           <Mic color="white" size={20} />
//           <Text className="ml-2 text-white font-semibold">
//             {recording ? `Stop (${recordingTime}s)` : 'Record Audio'}
//           </Text>
//         </TouchableOpacity>

//         {audioUri && (
//           <TouchableOpacity onPress={handleDeleteAudio} className="p-2">
//             <Trash2 color="red" />
//           </TouchableOpacity>
//         )}
//       </View>

//       {audioUri && (
//         <Text className="text-sm text-gray-600 mb-2">Audio saved</Text>
//       )}

//       <TouchableOpacity onPress={handleFileSelect} className="flex-row items-center px-4 py-2 bg-white border border-yellow-300 rounded-lg mb-2">
//         <Paperclip color="black" />
//         <Text className="ml-2">{file ? file.name : 'Attach File'}</Text>
//       </TouchableOpacity>

//       {file && (
//         <TouchableOpacity onPress={handleDeleteFile} className="self-start p-2">
//           <Trash2 color="red" />
//         </TouchableOpacity>
//       )}

//       <TouchableOpacity
//         onPress={handleSubmit}
//         disabled={isSubmitting}
//         className="mt-6 bg-black py-3 rounded-lg"
//       >
//         <Text className="text-yellow-400 text-center font-bold">
//           {isSubmitting ? 'Creating...' : 'Create Task'}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }


import { BASE_URL } from '@/utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as Audio from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

interface Props {
  baseUrl: string;
  user: { username: string };
}

const CreateTaskScreen: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [file, setFile] = useState<any>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleFilePick = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    if (res.assets && res.assets[0]) setFile(res.assets[0]);
  };

  const handleAudioRecord = async () => {
    const permission = await Audio.Audio.requestPermissionsAsync();
    if (!permission.granted) return Alert.alert('Mic permission required');
    // Audio recording logic would go here (native only or via expo-av custom UI)
    Alert.alert('Recording feature needs to be manually handled');
  };

  const handleSubmit = async () => {
    if (!title || !priority || !assignedTo || !dueDate) {
      Alert.alert('Please fill all required fields');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('priority', priority);
    formData.append('assigned_to', assignedTo);
    formData.append('due_date', dueDate.toISOString().split('T')[0]);
    if (file) formData.append('file', file);
    if (audioUri) formData.append('audio', audioUri);

    await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    Alert.alert('Task created successfully!');
    router.push('/(dashboard)');
  };

  return (
    <ScrollView className="bg-yellow-100 min-h-screen p-4">
      <Text className="text-2xl font-bold text-black mb-4">Create Task</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Picker
        selectedValue={priority}
        onValueChange={(val) => setPriority(val)}
        className="bg-white border border-gray-300 rounded-lg mb-4"
      >
        <Picker.Item label="Select Priority" value="" />
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>

      <Picker
        selectedValue={assignedTo}
        onValueChange={(val) => setAssignedTo(val)}
        className="bg-white border border-gray-300 rounded-lg mb-4"
      >
        <Picker.Item label="Assign To" value="" />
        {users.map((u, idx) => (
          <Picker.Item key={idx} label={u} value={u} />
        ))}
      </Picker>

      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={() => setDueDate(new Date())} className="bg-white p-3 rounded-lg border border-gray-300 mb-4">
          <Text>{dueDate ? dueDate.toDateString() : 'Select Due Date'}</Text>
        </TouchableOpacity>
      ) : (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => setDueDate(date || null)}
        />
      )}

      <TouchableOpacity onPress={handleFilePick} className="bg-black p-3 rounded-lg mb-4">
        <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
      </TouchableOpacity>
      {file && <Text className="text-black mb-2">Selected: {file.name}</Text>}

      <TouchableOpacity onPress={handleAudioRecord} className="bg-black p-3 rounded-lg mb-4">
        <Text className="text-yellow-400 font-bold text-center">Record Audio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} className="bg-yellow-500 p-3 rounded-lg">
        <Text className="text-black font-bold text-center">Create Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateTaskScreen;

