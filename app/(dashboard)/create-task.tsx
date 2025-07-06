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


// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import * as Audio from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

// interface Props {
//   baseUrl: string;
//   user: { username: string };
// }

// const CreateTaskScreen: React.FC<Props> = ({ user }) => {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [users, setUsers] = useState<string[]>([]);
//   const [file, setFile] = useState<any>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleFilePick = async () => {
//     const res = await DocumentPicker.getDocumentAsync({});
//     if (res.assets && res.assets[0]) setFile(res.assets[0]);
//   };

//   const handleAudioRecord = async () => {
//     const permission = await Audio.Audio.requestPermissionsAsync();
//     if (!permission.granted) return Alert.alert('Mic permission required');
//     // Audio recording logic would go here (native only or via expo-av custom UI)
//     Alert.alert('Recording feature needs to be manually handled');
//   };

//   const handleSubmit = async () => {
//     if (!title || !priority || !assignedTo || !dueDate) {
//       Alert.alert('Please fill all required fields');
//       return;
//     }
//     const token = await AsyncStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);
//     formData.append('assigned_to', assignedTo);
//     formData.append('due_date', dueDate.toISOString().split('T')[0]);
//     if (file) formData.append('file', file);
//     if (audioUri) formData.append('audio', audioUri);

//     await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     Alert.alert('Task created successfully!');
//     router.push('/(dashboard)');
//   };

//   return (
//     <ScrollView className="bg-yellow-100 min-h-screen p-4">
//       <Text className="text-2xl font-bold text-black mb-4">Create Task</Text>

//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//         className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
//       />

//       <TextInput
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//         numberOfLines={4}
//         className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
//       />

//       <Picker
//         selectedValue={priority}
//         onValueChange={(val) => setPriority(val)}
//         className="bg-white border border-gray-300 rounded-lg mb-4"
//       >
//         <Picker.Item label="Select Priority" value="" />
//         <Picker.Item label="Low" value="Low" />
//         <Picker.Item label="Medium" value="Medium" />
//         <Picker.Item label="High" value="High" />
//       </Picker>

//       <Picker
//         selectedValue={assignedTo}
//         onValueChange={(val) => setAssignedTo(val)}
//         className="bg-white border border-gray-300 rounded-lg mb-4"
//       >
//         <Picker.Item label="Assign To" value="" />
//         {users.map((u, idx) => (
//           <Picker.Item key={idx} label={u} value={u} />
//         ))}
//       </Picker>

//       {Platform.OS === 'android' || Platform.OS === 'ios' ? (
//         <TouchableOpacity onPress={() => setDueDate(new Date())} className="bg-white p-3 rounded-lg border border-gray-300 mb-4">
//           <Text>{dueDate ? dueDate.toDateString() : 'Select Due Date'}</Text>
//         </TouchableOpacity>
//       ) : (
//         <DateTimePicker
//           value={dueDate || new Date()}
//           mode="date"
//           display="default"
//           onChange={(e, date) => setDueDate(date || null)}
//         />
//       )}

//       <TouchableOpacity onPress={handleFilePick} className="bg-black p-3 rounded-lg mb-4">
//         <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//       </TouchableOpacity>
//       {file && <Text className="text-black mb-2">Selected: {file.name}</Text>}

//       <TouchableOpacity onPress={handleAudioRecord} className="bg-black p-3 rounded-lg mb-4">
//         <Text className="text-yellow-400 font-bold text-center">Record Audio</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handleSubmit} className="bg-yellow-500 p-3 rounded-lg">
//         <Text className="text-black font-bold text-center">Create Task</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default CreateTaskScreen;


// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import * as Audio from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// interface Props {
//   baseUrl: string;
//   user: { username: string };
// }

// const CreateTaskScreen: React.FC<Props> = ({ user }) => {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [users, setUsers] = useState<string[]>([]);
//   const [file, setFile] = useState<any>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleFilePick = async () => {
//     const res = await DocumentPicker.getDocumentAsync({});
//     if (res.assets && res.assets[0]) setFile(res.assets[0]);
//   };

//   const handleAudioRecord = async () => {
//     const permission = await Audio.Audio.requestPermissionsAsync();
//     if (!permission.granted) return Alert.alert('Mic permission required');
//     Alert.alert('Recording feature needs to be manually handled');
//   };

//   const handleSubmit = async () => {
//     if (!title || !priority || !assignedTo || !dueDate) {
//       Alert.alert('Please fill all required fields');
//       return;
//     }
//     const token = await AsyncStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);
//     formData.append('assigned_to', assignedTo);
//     formData.append('due_date', dueDate.toISOString().split('T')[0]);
//     if (file) formData.append('file', file);
//     if (audioUri) formData.append('audio', audioUri);

//     await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     Alert.alert('Task created successfully!');
//     router.push('/(dashboard)');
//   };

//   return (
//     <ScrollView className="bg-yellow-100 min-h-screen p-4">
//       <View className="flex-1 w-full max-w-md mx-auto">
//         <Text className="text-3xl font-bold text-black mb-6 text-center">Create Task</Text>

//         <TextInput
//           placeholder="Title"
//           value={title}
//           onChangeText={setTitle}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base"
//         />

//         <TextInput
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           numberOfLines={6}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base h-32"
//         />

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={priority}
//             onValueChange={(val) => setPriority(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Select Priority" value="" />
//             <Picker.Item label="Low" value="Low" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="High" value="High" />
//           </Picker>
//         </View>

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={assignedTo}
//             onValueChange={(val) => setAssignedTo(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Assign To" value="" />
//             {users.map((u, idx) => (
//               <Picker.Item key={idx} label={u} value={u} />
//             ))}
//           </Picker>
//         </View>

//         <View className="relative mb-4">
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             className="flex-row items-center bg-white p-4 rounded-xl border border-gray-300"
//             activeOpacity={0.8}
//           >
//             <Text className={`flex-1 text-base ${dueDate ? 'text-gray-700' : 'text-gray-400'}`}>
//               {dueDate ? dueDate.toLocaleDateString() : 'dd-mm-yyyy'}
//             </Text>
//             <Ionicons name="calendar-outline" size={20} color="gray" />
//           </TouchableOpacity>
//         </View>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={(e, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) setDueDate(selectedDate);
//             }}
//           />
//         )}

//         <TouchableOpacity
//           onPress={handleFilePick}
//           className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//         </TouchableOpacity>
//         {file && <Text className="text-black mb-2">Selected: {file.name}</Text>}

//         <TouchableOpacity
//           onPress={handleAudioRecord}
//           className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Record Audio</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleSubmit}
//           className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//         >
//           <Text className="text-black font-bold text-center text-base">Create Task</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default CreateTaskScreen;

// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import * as Audio from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// interface Props {
//   baseUrl: string;
//   user: { username: string };
// }

// const CreateTaskScreen: React.FC<Props> = ({ user }) => {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [users, setUsers] = useState<string[]>([]);
//   const [file, setFile] = useState<any>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleFilePick = async () => {
//     const res = await DocumentPicker.getDocumentAsync({});
//     if (res.assets && res.assets[0]) setFile(res.assets[0]);
//   };

//   const handleAudioRecord = async () => {
//     const permission = await Audio.Audio.requestPermissionsAsync();
//     if (!permission.granted) return Alert.alert('Mic permission required');
//     Alert.alert('Recording feature needs to be manually handled');
//   };

//   // const handleSubmit = async () => {
//   //   if (!title || !priority || !assignedTo || !dueDate) {
//   //     Alert.alert('Please fill all required fields');
//   //     return;
//   //   }
//   //   const token = await AsyncStorage.getItem('token');
//   //   const formData = new FormData();
//   //   formData.append('title', title);
//   //   formData.append('description', description);
//   //   formData.append('priority', priority);
//   //   formData.append('assigned_to', assignedTo);
//   //   formData.append('due_date', dueDate.toISOString().split('T')[0]);
//   //   if (file) formData.append('file', file);
//   //   if (audioUri) formData.append('audio', audioUri);

//   //   await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`,
//   //       'Content-Type': 'multipart/form-data',
//   //     },
//   //   });
//   //   Alert.alert('Task created successfully!');
//   //   router.push('/(dashboard)');
//   // };

//   const handleSubmit = async () => {
//     try {
//       console.log('🔄 handleSubmit called');

//       if (!title || !priority || !assignedTo || !dueDate) {
//         console.warn('⚠️ Missing required fields:', { title, priority, assignedTo, dueDate });
//         Alert.alert('Please fill all required fields');
//         return;
//       }

//       const token = await AsyncStorage.getItem('token');
//       console.log('🔐 Token:', token);

//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('description', description);
//       formData.append('priority', priority);
//       formData.append('assigned_to', assignedTo);
//       formData.append('due_date', dueDate.toISOString().split('T')[0]);

//       if (file) {
//         console.log('📎 Attaching file:', file);
//         formData.append('file', {
//           uri: file.uri,
//           name: file.name || 'uploaded_file',
//           type: file.type || 'application/octet-stream',
//         } as any);
//       }

//       if (audioUri) {
//         console.log('🎤 Attaching audio:', audioUri);
//         formData.append('audio', {
//           uri: audioUri,
//           name: 'audio.m4a',
//           type: 'audio/x-m4a',
//         } as any);
//       }

//       console.log('📤 Sending POST request to:', `${BASE_URL}/api/tasks/create`);

//       const response = await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('✅ Task created successfully:', response.data);
//       Alert.alert('Task created successfully!');
//       router.push('/(dashboard)');
//     } catch (error: any) {
//       console.error('❌ Error creating task:', error);
//       Alert.alert('Failed to create task', error?.response?.data?.message || error.message);
//     }
//   };


//   return (
//     <ScrollView className="bg-yellow-100 min-h-screen p-4">
//       <View className="flex-1 w-full max-w-md mx-auto">
//         <Text className="text-3xl font-bold text-black mb-6 text-center">Create Task</Text>

//         <TextInput
//           placeholder="Title"
//           value={title}
//           onChangeText={setTitle}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base"
//         />

//         <TextInput
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           numberOfLines={6}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base h-32"
//         />

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={priority}
//             onValueChange={(val) => setPriority(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Select Priority" value="" />
//             <Picker.Item label="Low" value="Low" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="High" value="High" />
//           </Picker>
//         </View>

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={assignedTo}
//             onValueChange={(val) => setAssignedTo(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Assign To" value="" />
//             {users.map((u, idx) => (
//               <Picker.Item key={idx} label={u} value={u} />
//             ))}
//           </Picker>
//         </View>

//         <View className="relative mb-4">
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             className="flex-row items-center bg-white p-4 rounded-xl border border-gray-300"
//             activeOpacity={0.8}
//           >
//             <Text className={`flex-1 text-base ${dueDate ? 'text-gray-700' : 'text-gray-400'}`}>
//               {dueDate ? dueDate.toLocaleDateString() : 'dd-mm-yyyy'}
//             </Text>
//             <Ionicons name="calendar-outline" size={20} color="gray" />
//           </TouchableOpacity>
//         </View>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={(e, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) setDueDate(selectedDate);
//             }}
//           />
//         )}

//         <TouchableOpacity
//           onPress={handleFilePick}
//           className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//         </TouchableOpacity>
//         {file && <Text className="text-black mb-2">Selected: {file.name}</Text>}

//         <TouchableOpacity
//           onPress={handleAudioRecord}
//           className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Record Audio</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleSubmit}
//           className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//         >
//           <Text className="text-black font-bold text-center text-base">Create Task</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default CreateTaskScreen;


// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import * as Audio from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// interface Props {
//   baseUrl: string;
//   user: { username: string };
// }

// const CreateTaskScreen: React.FC<Props> = ({ user }) => {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [users, setUsers] = useState<string[]>([]);
//   const [file, setFile] = useState<any>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleFilePick = async () => {
//     const res = await DocumentPicker.getDocumentAsync({});
//     if (res.assets && res.assets[0]) {
//       const picked = res.assets[0];
//       setFile({
//         uri: picked.uri,
//         name: picked.name,
//         type: picked.mimeType || 'application/octet-stream',
//       });
//     }
//   };

//   // const handleAudioRecord = async () => {
//   //   const permission = await Audio.Audio.requestPermissionsAsync();
//   //   if (!permission.granted) return Alert.alert('Mic permission required');
//   //   Alert.alert('Recording feature needs to be manually handled');
//   // };

// const [recording, setRecording] = useState<InstanceType<typeof Audio.Recording> | null>(null);
// const [isRecording, setIsRecording] = useState(false);


//   const handleAudioRecord = async () => {
//   const permission = await Audio.Audio.requestPermissionsAsync();
//   if (!permission.granted) return Alert.alert('Mic permission required');

//   try {
//     if (isRecording) {
//       // Stop recording
//       await recording?.stopAndUnloadAsync();
//       const uri = recording?.getURI();
//       setAudioUri(uri || null);
//       setRecording(null);
//       setIsRecording(false);
//     } else {
//       // Start recording
//       await Audio.Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const newRecording = new Audio.Audio.Recording();
//       await newRecording.prepareToRecordAsync(
//         Audio.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );
//       await newRecording.startAsync();

//       setRecording(newRecording);
//       setIsRecording(true);
//       setAudioUri(null); // Reset old audio if any
//     }
//   } catch (err) {
//     console.error('Recording error:', err);
//     Alert.alert('Failed to start recording');
//   }
// };


//   const handleSubmit = async () => {
//     if (!title || !priority || !assignedTo || !dueDate) {
//       Alert.alert('Please fill all required fields');
//       return;
//     }

//     const token = await AsyncStorage.getItem('token');
//     const formData = new FormData();

//     // Append task data
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);
//     formData.append('assigned_to', assignedTo);
//     formData.append('due_date', dueDate.toISOString().split('T')[0]);

//     // If file is selected, append the file
//     if (file) {
//       formData.append('file', {
//         uri: file.uri,
//         name: file.name,
//         type: file.type || 'application/octet-stream',
//       } as any); // Cast to `any` for TypeScript compatibility
//     }

//     // If audio URI is set, append the audio file
//     if (audioUri) {
//       formData.append('audio', audioUri);
//     }

//     try {
//       // Send POST request to create task
//       await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Show success alert and navigate back
//       Alert.alert('Task created successfully!');
//       router.push('/(dashboard)');
//     } catch (error) {
//       Alert.alert('Error creating task. Please try again.');
//     }
//   };

//   return (
//     <ScrollView className="bg-yellow-100 min-h-screen p-4">
//       <View className="flex-1 w-full max-w-md mx-auto">
//         <Text className="text-3xl font-bold text-black mb-6 text-center">Create Task</Text>

//         <TextInput
//           placeholder="Title"
//           value={title}
//           onChangeText={setTitle}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base"
//         />

//         <TextInput
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           numberOfLines={6}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base h-32"
//         />

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={priority}
//             onValueChange={(val) => setPriority(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Select Priority" value="" />
//             <Picker.Item label="Low" value="Low" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="High" value="High" />
//           </Picker>
//         </View>

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={assignedTo}
//             onValueChange={(val) => setAssignedTo(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Assign To" value="" />
//             {users.map((u, idx) => (
//               <Picker.Item key={idx} label={u} value={u} />
//             ))}
//           </Picker>
//         </View>

//         <View className="relative mb-4">
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             className="flex-row items-center bg-white p-4 rounded-xl border border-gray-300"
//             activeOpacity={0.8}
//           >
//             <Text className={`flex-1 text-base ${dueDate ? 'text-gray-700' : 'text-gray-400'}`}>
//               {dueDate ? dueDate.toLocaleDateString() : 'dd-mm-yyyy'}
//             </Text>
//             <Ionicons name="calendar-outline" size={20} color="gray" />
//           </TouchableOpacity>
//         </View>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={(e, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) setDueDate(selectedDate);
//             }}
//           />
//         )}

//         <TouchableOpacity
//           onPress={handleFilePick}
//           className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//         </TouchableOpacity>
//         {file && <Text className="text-black mb-2">Selected: {file.name}</Text>}

//         <TouchableOpacity
//           onPress={handleAudioRecord}
//           className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Record Audio</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleSubmit}
//           className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//         >
//           <Text className="text-black font-bold text-center text-base">Create Task</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default CreateTaskScreen;

// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// // import * as Audio from 'expo-av';
// import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const CreateTaskScreen: React.FC = () => {
//   const router = useRouter();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [users, setUsers] = useState<string[]>([]);
//   const [file, setFile] = useState<any>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   // Play recorded audio
//   const handlePlayAudio = async () => {
//     if (!audioUri) return;
//     try {
//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }
//       const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
//       setSound(newSound);
//       setIsPlaying(true);
//       newSound.setOnPlaybackStatusUpdate((status) => {
//         if (!status.isLoaded) return;
//         if (status.didJustFinish) {
//           setIsPlaying(false);
//           newSound.unloadAsync();
//           setSound(null);
//         }
//       });
//       await newSound.playAsync();
//     } catch (err) {
//       setIsPlaying(false);
//       setSound(null);
//       Alert.alert('Failed to play audio');
//     }
//   };

//   // Stop audio playback
//   const handleStopAudio = async () => {
//     if (sound) {
//       await sound.stopAsync();
//       await sound.unloadAsync();
//       setSound(null);
//     }
//     setIsPlaying(false);
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleFilePick = async () => {
//     const res = await DocumentPicker.getDocumentAsync({});
//     if (res.assets && res.assets[0]) {
//       const picked = res.assets[0];
//       setFile({
//         uri: picked.uri,
//         name: picked.name,
//         type: picked.mimeType || 'application/octet-stream',
//       });
//     }
//   };

//   const handleAudioRecord = async () => {
//     const permission = await Audio.requestPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Mic permission required');
//       return;
//     }

//     try {
//       if (isRecording) {
//         await recording?.stopAndUnloadAsync();
//         const uri = recording?.getURI();
//         setAudioUri(uri || null);
//         setRecording(null);
//         setIsRecording(false);
//       } else {
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           playsInSilentModeIOS: true,
//         });

//         const newRecording = new Audio.Recording();
//         await newRecording.prepareToRecordAsync({
//           isMeteringEnabled: false,
//           android: {
//             extension: '.m4a',
//             outputFormat: 2, // 2 = MPEG_4, see https://docs.expo.dev/versions/latest/sdk/audio/#android
//             audioEncoder: 3, // 3 = AAC, see https://docs.expo.dev/versions/latest/sdk/audio/#android
//             sampleRate: 44100,
//             numberOfChannels: 2,
//             bitRate: 128000,
//           },
//           ios: {
//             extension: '.m4a',
//             audioQuality: 2, // 2 = AVAudioQuality.High
//             sampleRate: 44100,
//             numberOfChannels: 2,
//             bitRate: 128000,
//             linearPCMBitDepth: 16,
//             linearPCMIsBigEndian: false,
//             linearPCMIsFloat: false,
//           },
//           web: {
//             mimeType: undefined,
//             bitsPerSecond: undefined
//           }
//         });

//         await newRecording.startAsync();
//         setRecording(newRecording);
//         setIsRecording(true);
//         setAudioUri(null); // reset any previous recording
//       }
//     } catch (err) {
//       console.error('Recording Error:', err);
//       Alert.alert('Failed to record audio.');
//     }
//   };

//   const handleDeleteAudio = () => {
//     setAudioUri(null);
//   };

//   const handleSubmit = async () => {
//     if (!title || !priority || !assignedTo || !dueDate) {
//       Alert.alert('Please fill all required fields');
//       return;
//     }

//     const token = await AsyncStorage.getItem('token');
//     const formData = new FormData();

//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);
//     formData.append('assigned_to', assignedTo);
//     formData.append('due_date', dueDate.toISOString().split('T')[0]);

//     if (file) {
//       formData.append('file', {
//         uri: file.uri,
//         name: file.name,
//         type: file.type || 'application/octet-stream',
//       } as any);
//     }

//     if (audioUri) {
//       formData.append('audio', {
//         uri: audioUri,
//         name: 'recording.m4a',
//         type: 'audio/x-m4a',
//       } as any);
//     }

//     try {
//       await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Alert.alert('Task created successfully!');

//       // Reset all fields
//       setTitle('');
//       setDescription('');
//       setPriority('');
//       setAssignedTo('');
//       setDueDate(null);
//       setFile(null);
//       setAudioUri(null);
//       setRecording(null);
//       setIsRecording(false);
//       setSound(null);
//       setIsPlaying(false);

//       router.push('/(dashboard)');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error creating task. Please try again.');
//     }
//   };

//   return (
//     <ScrollView className="bg-yellow-100 min-h-screen p-4">
//       <View className="flex-1 w-full max-w-md mx-auto">
//         {/* <Text className="text-3xl font-bold text-black mb-6 text-center">Create Task</Text> */}

//         <TextInput
//           placeholder="Title"
//           value={title}
//           onChangeText={setTitle}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base"
//         />

//         <TextInput
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           numberOfLines={6}
//           className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base h-32"
//         />

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={priority}
//             onValueChange={(val) => setPriority(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Select Priority" value="" />
//             <Picker.Item label="Low" value="Low" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="High" value="High" />
//           </Picker>
//         </View>

//         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//           <Picker
//             selectedValue={assignedTo}
//             onValueChange={(val) => setAssignedTo(val)}
//             className="text-base"
//           >
//             <Picker.Item label="Assign To" value="" />
//             {users.map((u, idx) => (
//               <Picker.Item key={idx} label={u} value={u} />
//             ))}
//           </Picker>
//         </View>

//         <View className="relative mb-4">
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             className="flex-row items-center bg-white p-4 rounded-xl border border-gray-300"
//             activeOpacity={0.8}
//           >
//             <Text className={`flex-1 text-base ${dueDate ? 'text-gray-700' : 'text-gray-400'}`}>
//               {dueDate ? dueDate.toLocaleDateString() : 'dd-mm-yyyy'}
//             </Text>
//             <Ionicons name="calendar-outline" size={20} color="gray" />
//           </TouchableOpacity>
//         </View>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={(e, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) setDueDate(selectedDate);
//             }}
//           />
//         )}

//         <TouchableOpacity
//           onPress={handleFilePick}
//           className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//         </TouchableOpacity>
//         {/* {file && <Text className="text-black mb-2">Selected: {file.name}</Text>} */}
//         {file && (
//           <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300 mb-2">
//             <Text className="text-black flex-1" numberOfLines={1}>
//               {file.name}
//             </Text>
//             <TouchableOpacity onPress={() => setFile(null)}>
//               <Ionicons name="trash" size={24} color="red" />
//             </TouchableOpacity>
//           </View>
//         )}

//         <View className="mb-4">
//           <TouchableOpacity
//             onPress={handleAudioRecord}
//             className={`p-4 rounded-xl active:opacity-80 ${isRecording ? 'bg-red-600' : 'bg-black'
//               }`}
//           >
//             <Text className="text-yellow-400 font-bold text-center">
//               {isRecording ? 'Stop Recording' : 'Record Audio'}
//             </Text>
//           </TouchableOpacity>

//           {audioUri && (
//             <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300">
//               <Text className="text-black flex-1" numberOfLines={1}>
//                 Audio Recorded
//               </Text>
//               <TouchableOpacity
//                 onPress={isPlaying ? handleStopAudio : handlePlayAudio}
//                 className="mr-2"
//                 disabled={isPlaying && !sound}
//               >
//                 <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#22c55e" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleDeleteAudio}>
//                 <Ionicons name="trash" size={24} color="red" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         <TouchableOpacity
//           onPress={handleSubmit}
//           className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//         >
//           <Text className="text-black font-bold text-center text-base">Create Task</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default CreateTaskScreen;



// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// // import * as Audio from 'expo-av';
// import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   useColorScheme,
// } from 'react-native';

// const CreateTaskScreen: React.FC = () => {
//   const scheme = useColorScheme();
//   const isDark = scheme === 'dark';
//   const router = useRouter();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [users, setUsers] = useState<string[]>([]);
//   const [file, setFile] = useState<any>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   // Play recorded audio
//   const handlePlayAudio = async () => {
//     if (!audioUri) return;
//     try {
//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }
//       const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
//       setSound(newSound);
//       setIsPlaying(true);
//       newSound.setOnPlaybackStatusUpdate((status) => {
//         if (!status.isLoaded) return;
//         if (status.didJustFinish) {
//           setIsPlaying(false);
//           newSound.unloadAsync();
//           setSound(null);
//         }
//       });
//       await newSound.playAsync();
//     } catch (err) {
//       setIsPlaying(false);
//       setSound(null);
//       Alert.alert('Failed to play audio');
//     }
//   };

//   // Stop audio playback
//   const handleStopAudio = async () => {
//     if (sound) {
//       await sound.stopAsync();
//       await sound.unloadAsync();
//       setSound(null);
//     }
//     setIsPlaying(false);
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleFilePick = async () => {
//     const res = await DocumentPicker.getDocumentAsync({});
//     if (res.assets && res.assets[0]) {
//       const picked = res.assets[0];
//       setFile({
//         uri: picked.uri,
//         name: picked.name,
//         type: picked.mimeType || 'application/octet-stream',
//       });
//     }
//   };

//   const handleAudioRecord = async () => {
//     const permission = await Audio.requestPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Mic permission required');
//       return;
//     }

//     try {
//       if (isRecording) {
//         await recording?.stopAndUnloadAsync();
//         const uri = recording?.getURI();
//         setAudioUri(uri || null);
//         setRecording(null);
//         setIsRecording(false);
//       } else {
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           playsInSilentModeIOS: true,
//         });

//         const newRecording = new Audio.Recording();
//         await newRecording.prepareToRecordAsync({
//           isMeteringEnabled: false,
//           android: {
//             extension: '.m4a',
//             outputFormat: 2, // 2 = MPEG_4, see https://docs.expo.dev/versions/latest/sdk/audio/#android
//             audioEncoder: 3, // 3 = AAC, see https://docs.expo.dev/versions/latest/sdk/audio/#android
//             sampleRate: 44100,
//             numberOfChannels: 2,
//             bitRate: 128000,
//           },
//           ios: {
//             extension: '.m4a',
//             audioQuality: 2, // 2 = AVAudioQuality.High
//             sampleRate: 44100,
//             numberOfChannels: 2,
//             bitRate: 128000,
//             linearPCMBitDepth: 16,
//             linearPCMIsBigEndian: false,
//             linearPCMIsFloat: false,
//           },
//           web: {
//             mimeType: undefined,
//             bitsPerSecond: undefined
//           }
//         });

//         await newRecording.startAsync();
//         setRecording(newRecording);
//         setIsRecording(true);
//         setAudioUri(null); // reset any previous recording
//       }
//     } catch (err) {
//       console.error('Recording Error:', err);
//       Alert.alert('Failed to record audio.');
//     }
//   };

//   const handleDeleteAudio = () => {
//     setAudioUri(null);
//   };

//   const handleSubmit = async () => {
//     if (!title || !priority || !assignedTo || !dueDate) {
//       Alert.alert('Please fill all required fields');
//       return;
//     }

//     const token = await AsyncStorage.getItem('token');
//     const formData = new FormData();

//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);
//     formData.append('assigned_to', assignedTo);
//     formData.append('due_date', dueDate.toISOString().split('T')[0]);

//     if (file) {
//       formData.append('file', {
//         uri: file.uri,
//         name: file.name,
//         type: file.type || 'application/octet-stream',
//       } as any);
//     }

//     if (audioUri) {
//       formData.append('audio', {
//         uri: audioUri,
//         name: 'recording.m4a',
//         type: 'audio/x-m4a',
//       } as any);
//     }

//     try {
//       await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Alert.alert('Task created successfully!');

//       // Reset all fields
//       setTitle('');
//       setDescription('');
//       setPriority('');
//       setAssignedTo('');
//       setDueDate(null);
//       setFile(null);
//       setAudioUri(null);
//       setRecording(null);
//       setIsRecording(false);
//       setSound(null);
//       setIsPlaying(false);

//       router.push('/(dashboard)');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error creating task. Please try again.');
//     }
//   };

//   const inputBg = isDark ? 'bg-white' : 'bg-white border-gray-300';
//   const textColor = isDark ? 'text-black' : 'text-black';
//   const placeholderTextColor = isDark ? '#d1d5db' : '#555';

//   return (
//     <ScrollView className="bg-yellow-100 min-h-screen p-4">
//       <View className="flex-1 w-full max-w-md mx-auto">
//         {/* <Text className="text-3xl font-bold text-black mb-6 text-center">Create Task</Text> */}

//         <TextInput
//           placeholder="Title"
//           placeholderTextColor={placeholderTextColor}
//           value={title}
//           onChangeText={setTitle}
//           className={`${inputBg} ${textColor} p-4 rounded-xl border mb-4 text-base`}
//         />

//         <TextInput
//           placeholder="Description"
//           placeholderTextColor={placeholderTextColor}
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           numberOfLines={6}
//           className={`${inputBg} ${textColor} p-4 rounded-xl border mb-4 text-base h-32`}
//         />

//         <View className={`${inputBg} rounded-xl border mb-4`}>
//           <Picker
//             selectedValue={priority}
//             onValueChange={setPriority}
//             dropdownIconColor={isDark ? '#000' : '#000'}
//             style={{ color: isDark ? '#000' : '#000' }}
//           >
//             <Picker.Item label="Select Priority" value="" />
//             <Picker.Item label="Low" value="Low" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="High" value="High" />
//           </Picker>
//         </View>

//         <View className={`${inputBg} rounded-xl border mb-4`}>
//           <Picker
//             selectedValue={assignedTo}
//             onValueChange={setAssignedTo}
//             dropdownIconColor={isDark ? '#000' : '#000'}
//             style={{ color: isDark ? '#000' : '#000' }}
//           >
//             <Picker.Item label="Assign To" value="" />
//             {users.map((u, idx) => (
//               <Picker.Item key={idx} label={u} value={u} />
//             ))}
//           </Picker>
//         </View>

//         <TouchableOpacity
//           onPress={() => setShowDatePicker(true)}
//           className={`${inputBg} flex-row items-center p-4 rounded-xl border mb-4`}
//         >
//           <Text className={`flex-1 text-base ${dueDate ? textColor : 'text-gray-400'}`}>
//             {dueDate ? dueDate.toLocaleDateString() : 'dd-mm-yyyy'}
//           </Text>
//           <Ionicons name="calendar-outline" size={20} color={isDark ? '#fff' : 'gray'} />
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={(e, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) setDueDate(selectedDate);
//             }}
//           />
//         )}

//         <TouchableOpacity
//           onPress={handleFilePick}
//           className="bg-black p-4 rounded-xl mb-4"
//         >
//           <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//         </TouchableOpacity>
//         {/* {file && <Text className="text-black mb-2">Selected: {file.name}</Text>} */}
//         {file && (
//           <View className={`${inputBg} flex-row justify-between items-center p-3 rounded-lg border mb-2`}>
//             <Text className={`${textColor} flex-1`} numberOfLines={1}>
//               {file.name}
//             </Text>
//             <TouchableOpacity onPress={() => setFile(null)}>
//               <Ionicons name="trash" size={24} color="red" />
//             </TouchableOpacity>
//           </View>
//         )}

//         <View className="mb-4">
//           <TouchableOpacity
//             onPress={handleAudioRecord}
//             className={`p-4 rounded-xl active:opacity-80 ${isRecording ? 'bg-red-600' : 'bg-black'
//               }`}
//           >
//             <Text className="text-yellow-400 font-bold text-center">
//               {isRecording ? 'Stop Recording' : 'Record Audio'}
//             </Text>
//           </TouchableOpacity>

//           {audioUri && (
//             <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300">
//               <Text className="text-black flex-1" numberOfLines={1}>
//                 Audio Recorded
//               </Text>
//               <TouchableOpacity
//                 onPress={isPlaying ? handleStopAudio : handlePlayAudio}
//                 className="mr-2"
//                 disabled={isPlaying && !sound}
//               >
//                 <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#22c55e" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleDeleteAudio}>
//                 <Ionicons name="trash" size={24} color="red" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         <TouchableOpacity
//           onPress={handleSubmit}
//           className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//         >
//           <Text className="text-black font-bold text-center text-base">Create Task</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default CreateTaskScreen;


import { BASE_URL } from '@/utils/constants';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const CreateTaskScreen: React.FC = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [file, setFile] = useState<any>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation states for floating labels
  const [titleAnim] = useState(new Animated.Value(0));
  const [descAnim] = useState(new Animated.Value(0));
  const [dueDateAnim] = useState(new Animated.Value(0));
  const [priorityAnim] = useState(new Animated.Value(0));
  const [assignedToAnim] = useState(new Animated.Value(0));

  // Play recorded audio
  const handlePlayAudio = async () => {
    if (!audioUri) return;
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          setIsPlaying(false);
          newSound.unloadAsync();
          setSound(null);
        }
      });
      await newSound.playAsync();
    } catch (err) {
      setIsPlaying(false);
      setSound(null);
      Alert.alert('Failed to play audio');
    }
  };

  // Stop audio playback
  const handleStopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        Alert.alert('Error', 'Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  const handleFilePick = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    if (res.assets && res.assets[0]) {
      const picked = res.assets[0];
      setFile({
        uri: picked.uri,
        name: picked.name,
        type: picked.mimeType || 'application/octet-stream',
      });
    }
  };

  const handleAudioRecord = async () => {
    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Mic permission required');
      return;
    }

    try {
      if (isRecording) {
        await recording?.stopAndUnloadAsync();
        const uri = recording?.getURI();
        setAudioUri(uri || null);
        setRecording(null);
        setIsRecording(false);
      } else {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync({
          isMeteringEnabled: false,
          android: {
            extension: '.m4a',
            outputFormat: 2, // 2 = MPEG_4
            audioEncoder: 3, // 3 = AAC
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.m4a',
            audioQuality: 2, // 2 = AVAudioQuality.High
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
          web: {
            mimeType: undefined,
            bitsPerSecond: undefined
          }
        });

        await newRecording.startAsync();
        setRecording(newRecording);
        setIsRecording(true);
        setAudioUri(null); // reset any previous recording
      }
    } catch (err) {
      console.error('Recording Error:', err);
      Alert.alert('Failed to record audio.');
    }
  };

  const handleDeleteAudio = () => {
    setAudioUri(null);
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

    if (file) {
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type || 'application/octet-stream',
      } as any);
    }

    if (audioUri) {
      formData.append('audio', {
        uri: audioUri,
        name: 'recording.m4a',
        type: 'audio/x-m4a',
      } as any);
    }

    try {
      await axios.post(`${BASE_URL}/api/tasks/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Task created successfully!');

      // Reset all fields
      setTitle('');
      setDescription('');
      setPriority('');
      setAssignedTo('');
      setDueDate(null);
      setFile(null);
      setAudioUri(null);
      setRecording(null);
      setIsRecording(false);
      setSound(null);
      setIsPlaying(false);

      // Reset animation states
      Animated.timing(titleAnim, { toValue: 0, duration: 0, useNativeDriver: true }).start();
      Animated.timing(descAnim, { toValue: 0, duration: 0, useNativeDriver: true }).start();
      Animated.timing(dueDateAnim, { toValue: 0, duration: 0, useNativeDriver: true }).start();
      Animated.timing(priorityAnim, { toValue: 0, duration: 0, useNativeDriver: true }).start();
      Animated.timing(assignedToAnim, { toValue: 0, duration: 0, useNativeDriver: true }).start();

      // router.push('/(dashboard)');
      router.push({
        pathname: '/(dashboard)',
        params: { refresh: Date.now().toString() },
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error creating task. Please try again.');
    }
  };

  // Animation for floating labels
  const animateLabel = (anim: Animated.Value, toValue: number) => {
    Animated.timing(anim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const inputClass: string =
    isDark
      ? 'absolute left-3 text-gray-500 text-base text-yellow-700 font-semibold'
      : 'absolute left-3 text-gray-500 text-base text-yellow-700 font-semibold';

  return (

    <View style={{ flex: 1 }} className="bg-yellow-100">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
          flexGrow: 1,
          paddingTop: 30,
          justifyContent: 'flex-start',
        }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="flex-1 w-full max-w-md mx-auto">
            <View className="mb-4 relative">
              <TextInput
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  animateLabel(titleAnim, text ? 1 : 0);
                }}
                onFocus={() => animateLabel(titleAnim, 1)}
                onBlur={() => animateLabel(titleAnim, title ? 1 : 0)}
                className="bg-white p-4 pt-6 rounded-xl border border-gray-300 text-base"
                style={{ color: isDark ? '#000' : '#000' }}
              />
              <Animated.Text
                className={inputClass}
                style={{
                  transform: [
                    {
                      translateY: titleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 0],
                      }),
                    },
                    {
                      scale: titleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.8],
                      }),
                    },
                  ],
                }}
              >
                Title
              </Animated.Text>
            </View>

            <View className="mb-4 relative">
              <TextInput
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  animateLabel(descAnim, text ? 1 : 0);
                }}
                onFocus={() => animateLabel(descAnim, 1)}
                onBlur={() => animateLabel(descAnim, description ? 1 : 0)}
                multiline
                numberOfLines={6}
                className="bg-white p-4 pt-6 rounded-xl border border-gray-300 text-base h-32"
                style={{ color: isDark ? '#000' : '#000' }}
              />
              <Animated.Text
                className={inputClass}
                style={{
                  transform: [
                    {
                      translateY: descAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 0],
                      }),
                    },
                    {
                      scale: descAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.8],
                      }),
                    },
                  ],
                }}
              >
                Description
              </Animated.Text>
            </View>

            <View className="mb-4 relative">
              <View className="bg-white rounded-xl border border-gray-300 pt-4">
                <Picker
                  selectedValue={priority}
                  onValueChange={(val) => {
                    setPriority(val);
                    animateLabel(priorityAnim, val ? 1 : 0);
                  }}
                  dropdownIconColor={isDark ? '#000' : '#000'}
                  // style={{ color: isDark ? '#000' : '#000' }}
                  style={{ color: priority ? (isDark ? '#000' : '#000') : (isDark ? '#999' : '#999') }}
                >
                  <Picker.Item label="Select Priority" value="" />
                  <Picker.Item label="Low" value="Low" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="High" value="High" />
                </Picker>
              </View>
              <Animated.Text
                className={inputClass}
                style={{
                  transform: [
                    {
                      translateY: priorityAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 0],
                      }),
                    },
                    {
                      scale: priorityAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.8],
                      }),
                    },
                  ],
                }}
              >
                Priority
              </Animated.Text>
            </View>

            <View className="mb-4 relative">
              <View className="bg-white rounded-xl border border-gray-300 pt-4">
                <Picker
                  selectedValue={assignedTo}
                  onValueChange={(val) => {
                    setAssignedTo(val);
                    animateLabel(assignedToAnim, val ? 1 : 0);
                  }}
                  dropdownIconColor={isDark ? '#000' : '#000'}
                  // style={{ color: isDark ? '#000' : '#000' }}
                  style={{
                    color: assignedTo ? (isDark ? '#000' : '#000') : (isDark ? '#999' : '#999'), // 👈 Gray if not selected
                  }}
                >
                  <Picker.Item label="Select Assignee" value="" />
                  {users.map((u, idx) => (
                    <Picker.Item key={idx} label={u} value={u} />
                  ))}
                </Picker>
              </View>
              <Animated.Text
                className={inputClass}
                style={{
                  transform: [
                    {
                      translateY: assignedToAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 0],
                      }),
                    },
                    {
                      scale: assignedToAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.8],
                      }),
                    },
                  ],
                }}
              >
                Assign To
              </Animated.Text>
            </View>

            <View className="mb-4 relative">
              {/* <View className="bg-white rounded-xl border border-gray-300 pt-4"> */}
              <TouchableOpacity
                onPress={() => {
                  setShowDatePicker(true);
                  animateLabel(dueDateAnim, 1);
                }}
                className="flex-row items-center bg-white p-4 pt-8 rounded-xl border border-gray-300"
                activeOpacity={0.8}
              >
                <Text
                  className="flex-1 text-base"
                  style={{ color: dueDate ? (isDark ? '#000' : '#000') : (isDark ? '#999' : '#999') }}
                >
                  {dueDate ? dueDate.toLocaleDateString() : 'Select Due Date'}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={isDark ? '#000' : '#000'} />
              </TouchableOpacity>
              {/* </View> */}
              <Animated.Text
                // className={inputClass}
                className={`${inputClass}`}
                style={{
                  transform: [
                    {
                      translateY: dueDateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 0],
                      }),
                    },
                    {
                      scale: dueDateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.8],
                      }),
                    },
                  ],
                }}
              >
                Due Date
              </Animated.Text>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDueDate(selectedDate);
                    animateLabel(dueDateAnim, 1);
                  } else {
                    animateLabel(dueDateAnim, dueDate ? 1 : 0);
                  }
                }}
              />
            )}

            <TouchableOpacity
              onPress={handleFilePick}
              className="bg-black p-4 rounded-xl mb-4 active:opacity-80"
            >
              <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
            </TouchableOpacity>

            {file && (
              <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300 mb-2">
                <Text className="flex-1" style={{ color: isDark ? '#000' : '#000' }} numberOfLines={1}>
                  {file.name}
                </Text>
                <TouchableOpacity onPress={() => setFile(null)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}

            <View className="mb-4">
              <TouchableOpacity
                onPress={handleAudioRecord}
                className={`p-4 rounded-xl active:opacity-80 ${isRecording ? 'bg-red-600' : 'bg-black'}`}
              >
                <Text className="text-yellow-400 font-bold text-center">
                  {isRecording ? 'Stop Recording' : 'Record Audio'}
                </Text>
              </TouchableOpacity>

              {audioUri && (
                <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300">
                  <Text className="flex-1" style={{ color: isDark ? '#000' : '#000' }} numberOfLines={1}>
                    Audio Recorded
                  </Text>
                  <TouchableOpacity
                    onPress={isPlaying ? handleStopAudio : handlePlayAudio}
                    className="mr-2"
                    disabled={isPlaying && !sound}
                  >
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#22c55e" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDeleteAudio}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
            >
              <Text className="text-black font-bold text-center text-base">Create Task</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateTaskScreen;
