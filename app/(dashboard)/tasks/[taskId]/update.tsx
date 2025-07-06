// import { AuthContext } from '@/context/AuthContext';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useContext, useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// // interface Task {
// //   title: string;
// //   description: string;
// //   due_date: string;
// //   priority: string;
// //   assigned_to: string;
// //   created_by: string;
// //   status: string;
// // }

// export default function UpdateTaskScreen() {
//     // const { taskId } = useLocalSearchParams<{ taskId: string }>();
//     const { taskId, from } = useLocalSearchParams<{ taskId: string; from?: string }>();
//     const { user } = useContext(AuthContext);
//     const router = useRouter();

//     const [task, setTask] = useState<Task | null>(null);
//     const [users, setUsers] = useState<string[]>([]);
//     const [status, setStatus] = useState('');
//     const [comment, setComment] = useState('');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [priority, setPriority] = useState('Medium');
//     const [assignedTo, setAssignedTo] = useState('');

//     const [audioUri, setAudioUri] = useState<string | null>(null);
//     const [recording, setRecording] = useState<Audio.Recording | null>(null);
//     const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
//     const [loading, setLoading] = useState(true);

//     const [sound, setSound] = useState<Audio.Sound | null>(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     // let token: string | null;

//     const playAudio = async () => {
//         if (!audioUri) return;
//         if (sound) {
//             const status = await sound.getStatusAsync();
//             if (status.isLoaded && status.isPlaying) {
//                 await sound.pauseAsync();
//                 setIsPlaying(false);
//             } else {
//                 await sound.playAsync();
//                 setIsPlaying(true);
//             }
//         } else {
//             const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
//             setSound(newSound);
//             await newSound.playAsync();
//             setIsPlaying(true);
//             newSound.setOnPlaybackStatusUpdate((status) => {
//                 if ('didJustFinish' in status && status.didJustFinish) {
//                     setIsPlaying(false);
//                     newSound.unloadAsync();
//                     setSound(null);
//                 }
//             });
//         }
//     };

//     useEffect(() => {
//         return () => {
//             if (sound) {
//                 sound.unloadAsync();
//             }
//         };
//     }, [sound]);

//     const fetchTask = async () => {



//         try {
//             // console.log('Fetching task with ID:', taskId);
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             // console.log('Task data:', res.data);
//             const data = res.data;
//             setTask(data);
//             setTitle(data.title);
//             setDescription(data.description);
//             setDueDate(data.due_date?.split('T')[0]);
//             setPriority(data.priority);
//             setAssignedTo(data.assigned_to);
//             setStatus(data.status);
//         } catch (err) {
//             console.error('Fetch Task Error:', err);
//             Alert.alert('Error', 'Failed to fetch task');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setUsers(res.data);
//         } catch (err) {
//             Alert.alert('Error', 'Failed to load users');
//         }
//     };

//     useEffect(() => {
//         fetchTask();
//         fetchUsers();
//     }, [taskId,BASE_URL]);

//     const startRecording = async () => {
//         try {
//             const { granted } = await Audio.requestPermissionsAsync();
//             if (!granted) return;

//             await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
//             const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
//             setRecording(recording);
//         } catch (error) {
//             Alert.alert('Error', 'Failed to start recording');
//         }
//     };

//     const stopRecording = async () => {
//         if (recording) {
//             await recording.stopAndUnloadAsync();
//             const uri = recording.getURI();
//             setAudioUri(uri);
//             setRecording(null);
//         }
//     };

//     const pickFile = async () => {
//         // const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
//         // if (result.type === 'success') {
//         //     setFile(result.assets?.[0] || null);
//         // }
//         const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });

//         if (result.assets && result.assets.length > 0) {
//             setFile(result.assets[0]);
//         }
//     };

//     const handleUpdate = async () => {
//         const formData = new FormData();
//         formData.append('status', status);
//         formData.append('comment', comment);

//         if (user?.username === task?.created_by || user?.accountType === 'Super Admin') {
//             formData.append('title', title);
//             formData.append('description', description);
//             formData.append('due_date', dueDate);
//             formData.append('priority', priority);
//             formData.append('assigned_to', assignedTo);
//         }

//         if (audioUri) {
//             const filename = audioUri.split('/').pop()!;
//             formData.append('audio', {
//                 uri: audioUri,
//                 name: filename,
//                 type: 'audio/webm',
//             } as any);
//         }

//         if (file) {
//             formData.append('file', {
//                 uri: file.uri,
//                 name: file.name,
//                 type: file.mimeType || 'application/octet-stream',
//             } as any);
//         }

//         try {
//             const token = await AsyncStorage.getItem('token');
//             await axios.put(`${BASE_URL}/api/tasks/${taskId}/update`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             Alert.alert('Success', 'Task updated');
//             router.push('/dashboard');
//             // router.replace(`/${from || 'dashboard'}`);
//             // router.replace({ pathname: `/${from || 'dashboard'}` });
//             // router.replace(`/${from || 'dashboard'}` as any);

//         } catch {
//             Alert.alert('Error', 'Update failed');
//         }
//     };

//     if (loading || !task) return <ActivityIndicator size="large" className="mt-20" />;

//     const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
//     const isAssignee = user?.username === task.assigned_to;
//     // console.log(user?.username)
//     // console.log("Task created",task.created_by)
//     // console.log(isCreator)

//     return (
//         <ScrollView className="p-4 bg-yellow-50 min-h-screen">
//             <Text className="text-2xl font-bold text-center text-black mb-4">Update Task</Text>

//             {isCreator && (
//                 <>
//                     <TextInput className="border p-2 rounded mb-3 bg-white" value={title} onChangeText={setTitle} placeholder="Title" />
//                     <TextInput className="border p-2 rounded mb-3 bg-white" value={description} onChangeText={setDescription} placeholder="Description" multiline />
//                     <TextInput className="border p-2 rounded mb-3 bg-white" value={dueDate} onChangeText={setDueDate} placeholder="Due Date (YYYY-MM-DD)" />

//                     <View className="border rounded mb-3 bg-white">
//                         <Picker selectedValue={priority} onValueChange={setPriority}>
//                             <Picker.Item label="Select Priority" value="" />
//                             <Picker.Item label="Low" value="Low" />
//                             <Picker.Item label="Medium" value="Medium" />
//                             <Picker.Item label="High" value="High" />
//                         </Picker>
//                     </View>

//                     <View className="border rounded mb-3 bg-white">
//                         <Picker selectedValue={assignedTo} onValueChange={setAssignedTo}>
//                             <Picker.Item label="Select User" value="" />
//                             {users
//                                 .filter((u) => u !== task?.created_by)
//                                 .map((u) => (
//                                     <Picker.Item label={u} value={u} key={u} />
//                                 ))}
//                         </Picker>
//                     </View>
//                 </>
//             )}

//             {isAssignee && (
//                 <View className="border rounded mb-3 bg-white">
//                     <Picker selectedValue={status} onValueChange={setStatus}>
//                         <Picker.Item label="Select Status" value="" />
//                         <Picker.Item label="Pending" value="Pending" />
//                         <Picker.Item label="In Progress" value="In Progress" />
//                         <Picker.Item label="Completed" value="Completed" />
//                     </Picker>
//                 </View>
//             )}

//             <TextInput
//                 className="border p-2 rounded mb-3 bg-white"
//                 value={comment}
//                 onChangeText={setComment}
//                 placeholder="Comment"
//                 multiline
//             />

//             <View className="flex flex-row gap-3 mb-3">
//                 <TouchableOpacity
//                     onPress={recording ? stopRecording : startRecording}
//                     className={`flex-1 py-2 rounded ${recording ? 'bg-red-600' : 'bg-black'} items-center`}
//                 >
//                     <Text className="text-white font-bold">
//                         {recording ? 'Stop Recording' : 'Record Audio'}
//                     </Text>
//                 </TouchableOpacity>
//                 {/* {audioUri && (
//                     <Audio.Sound
//                         source={{ uri: audioUri }}
//                         shouldPlay={false}
//                         className="rounded w-full"
//                     />
//                 )} */}
//                 {audioUri && (
//                     <TouchableOpacity
//                         onPress={playAudio}
//                         className="flex-1 py-2 rounded bg-yellow-600 items-center ml-2"
//                     >
//                         <Text className="text-white font-bold">
//                             {isPlaying ? 'Pause Audio' : 'Play Audio'}
//                         </Text>
//                     </TouchableOpacity>
//                 )}
//             </View>

//             <TouchableOpacity
//                 onPress={pickFile}
//                 className="bg-white border p-3 rounded mb-4 items-center"
//             >
//                 <Text>{file ? file.name : 'Choose File'}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={handleUpdate}
//                 className="bg-black py-3 rounded items-center"
//             >
//                 <Text className="text-yellow-400 font-bold">Update Task</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// }

// import { AuthContext } from '@/context/AuthContext';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useContext, useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function UpdateTaskScreen() {
//     const { taskId, from } = useLocalSearchParams<{ taskId: string; from?: string }>();
//     const { user } = useContext(AuthContext);
//     const router = useRouter();

//     const [task, setTask] = useState<Task | null>(null);
//     const [users, setUsers] = useState<string[]>([]);
//     const [status, setStatus] = useState('');
//     const [comment, setComment] = useState('');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [priority, setPriority] = useState('Medium');
//     const [assignedTo, setAssignedTo] = useState('');

//     const [audioUri, setAudioUri] = useState<string | null>(null);
//     const [recording, setRecording] = useState<Audio.Recording | null>(null);
//     const [sound, setSound] = useState<Audio.Sound | null>(null);
//     const [isRecording, setIsRecording] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const navigation = useNavigation();

//     const [initialValues, setInitialValues] = useState({
//         title: '',
//         description: '',
//         dueDate: '',
//         priority: '',
//         assignedTo: '',
//         status: '',
//     });


//     useEffect(() => {
//         if (!sound) return;
//         return () => {
//             // Cleanup must not return a Promise, so use an async IIFE
//             (async () => {
//                 await sound.unloadAsync();
//             })();
//         };
//     }, [sound]);

//     useEffect(() => {
//         fetchTask();
//         fetchUsers();
//     }, [taskId, BASE_URL]);

//     const fetchTask = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const data = res.data;
//             setTask(data);
//             setTitle(data.title);
//             setDescription(data.description);
//             setDueDate(data.due_date?.split('T')[0]);
//             setPriority(data.priority);
//             setAssignedTo(data.assigned_to);
//             setStatus(data.status);

//             // Add below lines
//             setInitialValues({
//                 title: data.title,
//                 description: data.description,
//                 dueDate: data.due_date?.split('T')[0] || '',
//                 priority: data.priority,
//                 assignedTo: data.assigned_to,
//                 status: data.status,
//             });
//         } catch (err) {
//             Alert.alert('Error', 'Failed to fetch task');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setUsers(res.data);
//         } catch (err) {
//             Alert.alert('Error', 'Failed to load users');
//         }
//     };

//     const handleAudioRecord = async () => {
//         const permission = await Audio.requestPermissionsAsync();
//         if (!permission.granted) {
//             Alert.alert('Mic permission required');
//             return;
//         }

//         try {
//             if (isRecording) {
//                 await recording?.stopAndUnloadAsync();
//                 const uri = recording?.getURI();
//                 setAudioUri(uri || null);
//                 setRecording(null);
//                 setIsRecording(false);
//             } else {
//                 await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
//                 const newRecording = new Audio.Recording();
//                 await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
//                 await newRecording.startAsync();
//                 setRecording(newRecording);
//                 setIsRecording(true);
//                 setAudioUri(null);
//             }
//         } catch (err) {
//             Alert.alert('Failed to record audio.');
//         }
//     };

//     const handlePlayAudio = async () => {
//         if (!audioUri) return;
//         try {
//             if (sound) {
//                 await sound.unloadAsync();
//                 setSound(null);
//             }
//             const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
//             setSound(newSound);
//             setIsPlaying(true);
//             newSound.setOnPlaybackStatusUpdate((status) => {
//                 if (!status.isLoaded) return;
//                 if (status.didJustFinish) {
//                     setIsPlaying(false);
//                     newSound.unloadAsync();
//                     setSound(null);
//                 }
//             });
//             await newSound.playAsync();
//         } catch (err) {
//             setIsPlaying(false);
//             setSound(null);
//             Alert.alert('Failed to play audio');
//         }
//     };

//     const handleStopAudio = async () => {
//         if (sound) {
//             await sound.stopAsync();
//             await sound.unloadAsync();
//             setSound(null);
//         }
//         setIsPlaying(false);
//     };

//     const handleDeleteAudio = () => setAudioUri(null);

//     const pickFile = async () => {
//         const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
//         if (result.assets?.length) setFile(result.assets[0]);
//     };

//     const isFieldChanged =
//         title !== initialValues.title ||
//         description !== initialValues.description ||
//         dueDate !== initialValues.dueDate ||
//         priority !== initialValues.priority ||
//         assignedTo !== initialValues.assignedTo ||
//         status !== initialValues.status ||
//         !!audioUri ||
//         !!file ||
//         comment.trim().length > 0;


//     const handleUpdate = async () => {
//         const formData = new FormData();
//         formData.append('status', status);
//         formData.append('comment', comment);
//         if (user?.username === task?.created_by || user?.accountType === 'Super Admin') {
//             formData.append('title', title);
//             formData.append('description', description);
//             formData.append('due_date', dueDate);
//             formData.append('priority', priority);
//             formData.append('assigned_to', assignedTo);
//         }
//         if (audioUri) {
//             const filename = audioUri.split('/').pop()!;
//             formData.append('audio', { uri: audioUri, name: filename, type: 'audio/x-m4a' } as any);
//         }
//         if (file) {
//             formData.append('file', {
//                 uri: file.uri,
//                 name: file.name,
//                 type: file.mimeType || 'application/octet-stream',
//             } as any);
//         }

//         try {
//             const token = await AsyncStorage.getItem('token');
//             await axios.put(`${BASE_URL}/api/tasks/${taskId}/update`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             Alert.alert('Success', 'Task updated');

//             // ✅ Reset all fields here
//             setTitle('');
//             setDescription('');
//             setDueDate('');
//             setPriority('');
//             setAssignedTo('');
//             setStatus('');
//             setComment('');
//             setFile(null);
//             setAudioUri(null);
//             setRecording(null);
//             setSound(null);
//             setIsPlaying(false);


//             // router.push('/(dashboard)');
//             // router.replace(`/(dashboard)/${from || '/(dashboard)'}` as any);
//             // router.push({
//             //     pathname: '/(dashboard)',
//             //     params: { refresh: 'true' },
//             // });
//             // console.log(from)
//             if (from === 'adminTasks') {
//                 router.push({
//                     pathname: '/(dashboard)/manage-tasks',
//                     params: { refresh: Date.now().toString() },
//                 });
//             }
//             else {
//                 router.push({
//                     pathname: '/(dashboard)',
//                     params: { refresh: Date.now().toString() }, // 👈 makes it unique every time
//                 });
//             }


//             // navigation.navigate('My Tasks');
//             // router.push({
//             //     pathname: '/(dashboard)',
//             // });


//         } catch {
//             Alert.alert('Error', 'Update failed');
//         }
//     };

//     if (loading || !task) return <ActivityIndicator size="large" className="mt-20" />;

//     const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
//     const isAssignee = user?.username === task.assigned_to;

//     return (

//         // <KeyboardAvoidingView
//         //     behavior={Platform.OS === 'ios' ? 'padding' : "height"}
//         //     className="flex-1"
//         //     keyboardVerticalOffset={100} // adjust based on your layout
//         // >

//         //     <ScrollView
//         //         contentContainerStyle={{ padding: 16, flexGrow: 1 }}
//         //         keyboardShouldPersistTaps="handled"
//         //         className="bg-yellow-100"
//         //     >
//         <View style={{ flex: 1, backgroundColor: '#FFF8DC' }}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // tweak if you have a header
//             >
//                 <ScrollView
//                     contentContainerStyle={{
//                         padding: 20,
//                         paddingBottom: 120, // ensure space when keyboard opens
//                         flexGrow: 1,
//                         justifyContent: 'flex-start',
//                     }}
//                     keyboardShouldPersistTaps="handled"
//                     showsVerticalScrollIndicator={false}
//                 >
//                     {/* <ScrollView className="bg-yellow-100 min-h-screen p-4"> */}
//                     {/* <Text className="text-3xl font-bold text-center text-black mb-4">Update Task</Text> */}

//                     {isCreator && (
//                         <>
//                             <TextInput value={title} onChangeText={setTitle} placeholder="Title" className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base" />
//                             <TextInput value={description} onChangeText={setDescription} placeholder="Description" multiline numberOfLines={4} className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base" />

//                             <TouchableOpacity
//                                 onPress={() => setShowDatePicker(true)}
//                                 className="flex-row items-center bg-white p-4 rounded-xl border border-gray-300 mb-4"
//                                 activeOpacity={0.8}
//                             >
//                                 <Text className={`flex-1 text-base ${dueDate ? 'text-gray-700' : 'text-gray-400'}`}>{dueDate ? new Date(dueDate).toLocaleDateString() : 'dd-mm-yyyy'}</Text>
//                                 <Ionicons name="calendar-outline" size={20} color="gray" />
//                             </TouchableOpacity>

//                             {showDatePicker && (
//                                 <DateTimePicker
//                                     value={dueDate ? new Date(dueDate) : new Date()}
//                                     mode="date"
//                                     display="default"
//                                     onChange={(e, selectedDate) => {
//                                         setShowDatePicker(false);
//                                         if (selectedDate) setDueDate(selectedDate.toISOString().split('T')[0]);
//                                     }}
//                                 />
//                             )}

//                             <View className="bg-white rounded-xl border border-gray-300 mb-4">
//                                 <Picker selectedValue={priority} onValueChange={(val) => setPriority(val)}>
//                                     <Picker.Item label="Select Priority" value="" />
//                                     <Picker.Item label="Low" value="Low" />
//                                     <Picker.Item label="Medium" value="Medium" />
//                                     <Picker.Item label="High" value="High" />
//                                 </Picker>
//                             </View>

//                             <View className="bg-white rounded-xl border border-gray-300 mb-4">
//                                 <Picker selectedValue={assignedTo} onValueChange={(val) => setAssignedTo(val)}>
//                                     <Picker.Item label="Assign To" value="" />
//                                     {users.filter((u) => u !== task?.created_by).map((u, idx) => (
//                                         <Picker.Item label={u} value={u} key={idx} />
//                                     ))}
//                                 </Picker>
//                             </View>
//                         </>
//                     )}

//                     {isAssignee && (
//                         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//                             <Picker selectedValue={status} onValueChange={(val) => setStatus(val)}>
//                                 <Picker.Item label="Select Status" value="" />
//                                 <Picker.Item label="Pending" value="Pending" />
//                                 <Picker.Item label="In Progress" value="In Progress" />
//                                 <Picker.Item label="Completed" value="Completed" />
//                             </Picker>
//                         </View>
//                     )}

//                     {/* <TextInput
//                 value={comment}
//                 onChangeText={setComment}
//                 placeholder="Comment"
//                 multiline
//                 numberOfLines={3}
//                 className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base"
//             /> */}
//                     <TextInput
//                         value={comment}
//                         onChangeText={setComment}
//                         placeholder="Comment"
//                         multiline
//                         numberOfLines={3}
//                         className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base h-32"
//                     />

//                     <View className="mb-4">
//                         <TouchableOpacity
//                             onPress={handleAudioRecord}
//                             className={`p-4 rounded-xl active:opacity-80 ${isRecording ? 'bg-red-600' : 'bg-black'}`}
//                         >
//                             <Text className="text-yellow-400 font-bold text-center">
//                                 {isRecording ? 'Stop Recording' : 'Record Audio'}
//                             </Text>
//                         </TouchableOpacity>

//                         {audioUri && (
//                             <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300">
//                                 <Text className="text-black flex-1" numberOfLines={1}>Audio Recorded</Text>
//                                 <TouchableOpacity
//                                     onPress={isPlaying ? handleStopAudio : handlePlayAudio}
//                                     className="mr-2"
//                                     disabled={isPlaying && !sound}
//                                 >
//                                     <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#22c55e" />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={handleDeleteAudio}>
//                                     <Ionicons name="trash" size={24} color="red" />
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                     </View>

//                     <TouchableOpacity onPress={pickFile} className="bg-black p-4 rounded-xl mb-4 active:opacity-80">
//                         <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//                     </TouchableOpacity>
//                     {/* {file && <Text className="text-black mb-2">Selected: {file.name}</Text>} */}
//                     {file && (
//                         <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300 mb-2">
//                             <Text className="text-black flex-1" numberOfLines={1}>
//                                 {file.name}
//                             </Text>
//                             <TouchableOpacity onPress={() => setFile(null)}>
//                                 <Ionicons name="trash" size={24} color="red" />
//                             </TouchableOpacity>
//                         </View>
//                     )}


//                     <TouchableOpacity onPress={handleUpdate} disabled={!isFieldChanged}
//                         // className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//                         className={`p-4 rounded-xl active:opacity-80 ${isFieldChanged ? 'bg-yellow-500' : 'bg-gray-300'}`}

//                     >
//                         <Text className="text-black font-bold text-center text-base">Update Task</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }


// import { AuthContext } from '@/context/AuthContext';
// import { Task } from '@/types/task.types';
// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useContext, useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
// import { FloatingLabelInput } from 'react-native-floating-label-input';
// import { COLORS } from '@/utils/color';

// export default function UpdateTaskScreen() {
//     const { taskId, from } = useLocalSearchParams<{ taskId: string; from?: string }>();
//     const { user } = useContext(AuthContext);
//     const router = useRouter();
//     const colorScheme = useColorScheme();
//     const isDarkMode = colorScheme === 'dark';

//     const [task, setTask] = useState<Task | null>(null);
//     const [users, setUsers] = useState<string[]>([]);
//     const [status, setStatus] = useState('');
//     const [comment, setComment] = useState('');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [priority, setPriority] = useState('Medium');
//     const [assignedTo, setAssignedTo] = useState('');

//     const [audioUri, setAudioUri] = useState<string | null>(null);
//     const [recording, setRecording] = useState<Audio.Recording | null>(null);
//     const [sound, setSound] = useState<Audio.Sound | null>(null);
//     const [isRecording, setIsRecording] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const navigation = useNavigation();

//     const [initialValues, setInitialValues] = useState({
//         title: '',
//         description: '',
//         dueDate: '',
//         priority: '',
//         assignedTo: '',
//         status: '',
//     });


//     useEffect(() => {
//         if (!sound) return;
//         return () => {
//             // Cleanup must not return a Promise, so use an async IIFE
//             (async () => {
//                 await sound.unloadAsync();
//             })();
//         };
//     }, [sound]);

//     useEffect(() => {
//         fetchTask();
//         fetchUsers();
//     }, [taskId, BASE_URL]);

//     const fetchTask = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const data = res.data;
//             setTask(data);
//             setTitle(data.title);
//             setDescription(data.description);
//             setDueDate(data.due_date?.split('T')[0]);
//             setPriority(data.priority);
//             setAssignedTo(data.assigned_to);
//             setStatus(data.status);

//             // Add below lines
//             setInitialValues({
//                 title: data.title,
//                 description: data.description,
//                 dueDate: data.due_date?.split('T')[0] || '',
//                 priority: data.priority,
//                 assignedTo: data.assigned_to,
//                 status: data.status,
//             });
//         } catch (err) {
//             Alert.alert('Error', 'Failed to fetch task');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setUsers(res.data);
//         } catch (err) {
//             Alert.alert('Error', 'Failed to load users');
//         }
//     };

//     const handleAudioRecord = async () => {
//         const permission = await Audio.requestPermissionsAsync();
//         if (!permission.granted) {
//             Alert.alert('Mic permission required');
//             return;
//         }

//         try {
//             if (isRecording) {
//                 await recording?.stopAndUnloadAsync();
//                 const uri = recording?.getURI();
//                 setAudioUri(uri || null);
//                 setRecording(null);
//                 setIsRecording(false);
//             } else {
//                 await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
//                 const newRecording = new Audio.Recording();
//                 await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
//                 await newRecording.startAsync();
//                 setRecording(newRecording);
//                 setIsRecording(true);
//                 setAudioUri(null);
//             }
//         } catch (err) {
//             Alert.alert('Failed to record audio.');
//         }
//     };

//     const handlePlayAudio = async () => {
//         if (!audioUri) return;
//         try {
//             if (sound) {
//                 await sound.unloadAsync();
//                 setSound(null);
//             }
//             const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
//             setSound(newSound);
//             setIsPlaying(true);
//             newSound.setOnPlaybackStatusUpdate((status) => {
//                 if (!status.isLoaded) return;
//                 if (status.didJustFinish) {
//                     setIsPlaying(false);
//                     newSound.unloadAsync();
//                     setSound(null);
//                 }
//             });
//             await newSound.playAsync();
//         } catch (err) {
//             setIsPlaying(false);
//             setSound(null);
//             Alert.alert('Failed to play audio');
//         }
//     };

//     const handleStopAudio = async () => {
//         if (sound) {
//             await sound.stopAsync();
//             await sound.unloadAsync();
//             setSound(null);
//         }
//         setIsPlaying(false);
//     };

//     const handleDeleteAudio = () => setAudioUri(null);

//     const pickFile = async () => {
//         const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
//         if (result.assets?.length) setFile(result.assets[0]);
//     };

//     const isFieldChanged =
//         title !== initialValues.title ||
//         description !== initialValues.description ||
//         dueDate !== initialValues.dueDate ||
//         priority !== initialValues.priority ||
//         assignedTo !== initialValues.assignedTo ||
//         status !== initialValues.status ||
//         !!audioUri ||
//         !!file ||
//         comment.trim().length > 0;


//     const handleUpdate = async () => {
//         const formData = new FormData();
//         formData.append('status', status);
//         formData.append('comment', comment);
//         if (user?.username === task?.created_by || user?.accountType === 'Super Admin') {
//             formData.append('title', title);
//             formData.append('description', description);
//             formData.append('due_date', dueDate);
//             formData.append('priority', priority);
//             formData.append('assigned_to', assignedTo);
//         }
//         if (audioUri) {
//             const filename = audioUri.split('/').pop()!;
//             formData.append('audio', { uri: audioUri, name: filename, type: 'audio/x-m4a' } as any);
//         }
//         if (file) {
//             formData.append('file', {
//                 uri: file.uri,
//                 name: file.name,
//                 type: file.mimeType || 'application/octet-stream',
//             } as any);
//         }

//         try {
//             const token = await AsyncStorage.getItem('token');
//             await axios.put(`${BASE_URL}/api/tasks/${taskId}/update`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             Alert.alert('Success', 'Task updated');

//             // ✅ Reset all fields here
//             setTitle('');
//             setDescription('');
//             setDueDate('');
//             setPriority('');
//             setAssignedTo('');
//             setStatus('');
//             setComment('');
//             setFile(null);
//             setAudioUri(null);
//             setRecording(null);
//             setSound(null);
//             setIsPlaying(false);


//             // router.push('/(dashboard)');
//             // router.replace(`/(dashboard)/${from || '/(dashboard)'}` as any);
//             // router.push({
//             //     pathname: '/(dashboard)',
//             //     params: { refresh: 'true' },
//             // });
//             // console.log(from)
//             if (from === 'adminTasks') {
//                 router.push({
//                     pathname: '/(dashboard)/manage-tasks',
//                     params: { refresh: Date.now().toString() },
//                 });
//             }
//             else {
//                 router.push({
//                     pathname: '/(dashboard)',
//                     params: { refresh: Date.now().toString() }, // 👈 makes it unique every time
//                 });
//             }


//             // navigation.navigate('My Tasks');
//             // router.push({
//             //     pathname: '/(dashboard)',
//             // });


//         } catch {
//             Alert.alert('Error', 'Update failed');
//         }
//     };

//     if (loading || !task) return <ActivityIndicator size="large" className="mt-20" />;

//     const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
//     const isAssignee = user?.username === task.assigned_to;

//     return (

//         // <KeyboardAvoidingView
//         //     behavior={Platform.OS === 'ios' ? 'padding' : "height"}
//         //     className="flex-1"
//         //     keyboardVerticalOffset={100} // adjust based on your layout
//         // >

//         //     <ScrollView
//         //         contentContainerStyle={{ padding: 16, flexGrow: 1 }}
//         //         keyboardShouldPersistTaps="handled"
//         //         className="bg-yellow-100"
//         //     >
//         <View style={{ flex: 1, backgroundColor: '#FFF8DC' }}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // tweak if you have a header
//             >
//                 <ScrollView
//                     contentContainerStyle={{
//                         padding: 20,
//                         paddingBottom: 120, // ensure space when keyboard opens
//                         flexGrow: 1,
//                         justifyContent: 'flex-start',
//                     }}
//                     keyboardShouldPersistTaps="handled"
//                     showsVerticalScrollIndicator={false}
//                 >
//                     {/* <ScrollView className="bg-yellow-100 min-h-screen p-4"> */}
//                     {/* <Text className="text-3xl font-bold text-center text-black mb-4">Update Task</Text> */}

//                     {isCreator && (
//                         <>
//                             <TextInput
//                                 value={title}
//                                 onChangeText={setTitle}
//                                 placeholder="Title"
//                                 className={`bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base ${isDarkMode ? 'text-black' : 'text-black'}`}
//                             />
//                             <TextInput
//                                 value={description}
//                                 onChangeText={setDescription}
//                                 placeholder="Description"
//                                 multiline
//                                 numberOfLines={4}
//                                 className={`bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base ${isDarkMode ? 'text-black' : 'text-black'}`}
//                             />

//                             <TouchableOpacity
//                                 onPress={() => setShowDatePicker(true)}
//                                 className="flex-row items-center bg-white p-4 rounded-xl border border-gray-300 mb-4"
//                                 activeOpacity={0.8}
//                             >
//                                 <Text
//                                     className={`flex-1 text-base ${dueDate ? (isDarkMode ? 'text-black' : 'text-gray-700') : (isDarkMode ? 'text-gray-500' : 'text-gray-400')}`}
//                                 >
//                                     {dueDate ? new Date(dueDate).toLocaleDateString() : 'dd-mm-yyyy'}
//                                 </Text>
//                                 <Ionicons name="calendar-outline" size={20} color={isDarkMode ? '#FFFF00' : 'gray'} />
//                             </TouchableOpacity>

//                             {showDatePicker && (
//                                 <DateTimePicker
//                                     value={dueDate ? new Date(dueDate) : new Date()}
//                                     mode="date"
//                                     display="default"
//                                     onChange={(e, selectedDate) => {
//                                         setShowDatePicker(false);
//                                         if (selectedDate) setDueDate(selectedDate.toISOString().split('T')[0]);
//                                     }}
//                                 />
//                             )}

//                             <View className="bg-white rounded-xl border border-gray-300 mb-4">
//                                 <Picker selectedValue={priority} onValueChange={(val) => setPriority(val)}
//                                     style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>
//                                     <Picker.Item label="Select Priority" value="" />
//                                     <Picker.Item label="Low" value="Low" />
//                                     <Picker.Item label="Medium" value="Medium" />
//                                     <Picker.Item label="High" value="High" />
//                                 </Picker>
//                             </View>

//                             <View className="bg-white rounded-xl border border-gray-300 mb-4">
//                                 <Picker selectedValue={assignedTo} onValueChange={(val) => setAssignedTo(val)}
//                                     style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>
//                                     <Picker.Item label="Assign To" value="" />
//                                     {users.filter((u) => u !== task?.created_by).map((u, idx) => (
//                                         <Picker.Item label={u} value={u} key={idx} />
//                                     ))}
//                                 </Picker>
//                             </View>
//                         </>
//                     )}

//                     {isAssignee && (
//                         <View className="bg-white rounded-xl border border-gray-300 mb-4">
//                             <Picker selectedValue={status} onValueChange={(val) => setStatus(val)}
//                                 style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>
//                                 <Picker.Item label="Select Status" value="" />
//                                 <Picker.Item label="Pending" value="Pending" />
//                                 <Picker.Item label="In Progress" value="In Progress" />
//                                 <Picker.Item label="Completed" value="Completed" />
//                             </Picker>
//                         </View>
//                     )}

//                     {/* <TextInput
//                 value={comment}
//                 onChangeText={setComment}
//                 placeholder="Comment"
//                 multiline
//                 numberOfLines={3}
//                 className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base"
//             /> */}
//                     <TextInput
//                         value={comment}
//                         onChangeText={setComment}
//                         placeholder="Comment"
//                         multiline
//                         numberOfLines={3}
//                         className={`bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base h-32 ${isDarkMode ? 'text-black' : 'text-black'}`}
//                         style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
//                     />

//                     <View className="mb-4">
//                         <TouchableOpacity
//                             onPress={handleAudioRecord}
//                             className={`p-4 rounded-xl active:opacity-80 ${isRecording ? 'bg-red-600' : 'bg-black'}`}
//                         >
//                             <Text className="text-yellow-400 font-bold text-center">
//                                 {isRecording ? 'Stop Recording' : 'Record Audio'}
//                             </Text>
//                         </TouchableOpacity>

//                         {audioUri && (
//                             <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300">
//                                 <Text className="text-black flex-1" numberOfLines={1}>Audio Recorded</Text>
//                                 <TouchableOpacity
//                                     onPress={isPlaying ? handleStopAudio : handlePlayAudio}
//                                     className="mr-2"
//                                     disabled={isPlaying && !sound}
//                                 >
//                                     <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#22c55e" />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={handleDeleteAudio}>
//                                     <Ionicons name="trash" size={24} color="red" />
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                     </View>

//                     <TouchableOpacity onPress={pickFile} className="bg-black p-4 rounded-xl mb-4 active:opacity-80">
//                         <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//                     </TouchableOpacity>
//                     {/* {file && <Text className="text-black mb-2">Selected: {file.name}</Text>} */}
//                     {file && (
//                         <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300 mb-2">
//                             <Text className="text-black flex-1" numberOfLines={1}>
//                                 {file.name}
//                             </Text>
//                             <TouchableOpacity onPress={() => setFile(null)}>
//                                 <Ionicons name="trash" size={24} color="red" />
//                             </TouchableOpacity>
//                         </View>
//                     )}


//                     <TouchableOpacity onPress={handleUpdate} disabled={!isFieldChanged}
//                         // className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//                         className={`p-4 rounded-xl active:opacity-80 ${isFieldChanged ? 'bg-yellow-500' : 'bg-gray-300'}`}

//                     >
//                         <Text className="text-black font-bold text-center text-base">Update Task</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }

// import { AuthContext } from '@/context/AuthContext';
// import { Task } from '@/types/task.types';
// import { COLORS } from '@/utils/color';
// import { BASE_URL } from '@/utils/constants';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useContext, useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
// import { FloatingLabelInput } from 'react-native-floating-label-input';

// export default function UpdateTaskScreen() {
//     const { taskId, from } = useLocalSearchParams<{ taskId: string; from?: string }>();
//     const { user } = useContext(AuthContext);
//     const router = useRouter();
//     const colorScheme = useColorScheme();
//     const isDarkMode = colorScheme === 'dark';

//     const [task, setTask] = useState<Task | null>(null);
//     const [users, setUsers] = useState<string[]>([]);
//     const [status, setStatus] = useState('');
//     const [comment, setComment] = useState('');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [priority, setPriority] = useState('Medium');
//     const [assignedTo, setAssignedTo] = useState('');

//     const [audioUri, setAudioUri] = useState<string | null>(null);
//     const [recording, setRecording] = useState<Audio.Recording | null>(null);
//     const [sound, setSound] = useState<Audio.Sound | null>(null);
//     const [isRecording, setIsRecording] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const navigation = useNavigation();

//     const [initialValues, setInitialValues] = useState({
//         title: '',
//         description: '',
//         dueDate: '',
//         priority: '',
//         assignedTo: '',
//         status: '',
//     });


//     useEffect(() => {
//         if (!sound) return;
//         return () => {
//             // Cleanup must not return a Promise, so use an async IIFE
//             (async () => {
//                 await sound.unloadAsync();
//             })();
//         };
//     }, [sound]);

//     useEffect(() => {
//         fetchTask();
//         fetchUsers();
//     }, [taskId, BASE_URL]);

//     const fetchTask = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const data = res.data;
//             setTask(data);
//             setTitle(data.title);
//             setDescription(data.description);
//             setDueDate(data.due_date?.split('T')[0]);
//             setPriority(data.priority);
//             setAssignedTo(data.assigned_to);
//             setStatus(data.status);

//             // Add below lines
//             setInitialValues({
//                 title: data.title,
//                 description: data.description,
//                 dueDate: data.due_date?.split('T')[0] || '',
//                 priority: data.priority,
//                 assignedTo: data.assigned_to,
//                 status: data.status,
//             });
//         } catch (err) {
//             Alert.alert('Error', 'Failed to fetch task');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setUsers(res.data);
//         } catch (err) {
//             Alert.alert('Error', 'Failed to load users');
//         }
//     };

//     const handleAudioRecord = async () => {
//         const permission = await Audio.requestPermissionsAsync();
//         if (!permission.granted) {
//             Alert.alert('Mic permission required');
//             return;
//         }

//         try {
//             if (isRecording) {
//                 await recording?.stopAndUnloadAsync();
//                 const uri = recording?.getURI();
//                 setAudioUri(uri || null);
//                 setRecording(null);
//                 setIsRecording(false);
//             } else {
//                 await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
//                 const newRecording = new Audio.Recording();
//                 await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
//                 await newRecording.startAsync();
//                 setRecording(newRecording);
//                 setIsRecording(true);
//                 setAudioUri(null);
//             }
//         } catch (err) {
//             Alert.alert('Failed to record audio.');
//         }
//     };

//     const handlePlayAudio = async () => {
//         if (!audioUri) return;
//         try {
//             if (sound) {
//                 await sound.unloadAsync();
//                 setSound(null);
//             }
//             const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
//             setSound(newSound);
//             setIsPlaying(true);
//             newSound.setOnPlaybackStatusUpdate((status) => {
//                 if (!status.isLoaded) return;
//                 if (status.didJustFinish) {
//                     setIsPlaying(false);
//                     newSound.unloadAsync();
//                     setSound(null);
//                 }
//             });
//             await newSound.playAsync();
//         } catch (err) {
//             setIsPlaying(false);
//             setSound(null);
//             Alert.alert('Failed to play audio');
//         }
//     };

//     const handleStopAudio = async () => {
//         if (sound) {
//             await sound.stopAsync();
//             await sound.unloadAsync();
//             setSound(null);
//         }
//         setIsPlaying(false);
//     };

//     const handleDeleteAudio = () => setAudioUri(null);

//     const pickFile = async () => {
//         const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
//         if (result.assets?.length) setFile(result.assets[0]);
//     };

//     const isFieldChanged =
//         title !== initialValues.title ||
//         description !== initialValues.description ||
//         dueDate !== initialValues.dueDate ||
//         priority !== initialValues.priority ||
//         assignedTo !== initialValues.assignedTo ||
//         status !== initialValues.status ||
//         !!audioUri ||
//         !!file ||
//         comment.trim().length > 0;


//     const handleUpdate = async () => {
//         const formData = new FormData();
//         formData.append('status', status);
//         formData.append('comment', comment);
//         if (user?.username === task?.created_by || user?.accountType === 'Super Admin') {
//             formData.append('title', title);
//             formData.append('description', description);
//             formData.append('due_date', dueDate);
//             formData.append('priority', priority);
//             formData.append('assigned_to', assignedTo);
//         }
//         if (audioUri) {
//             const filename = audioUri.split('/').pop()!;
//             formData.append('audio', { uri: audioUri, name: filename, type: 'audio/x-m4a' } as any);
//         }
//         if (file) {
//             formData.append('file', {
//                 uri: file.uri,
//                 name: file.name,
//                 type: file.mimeType || 'application/octet-stream',
//             } as any);
//         }

//         try {
//             const token = await AsyncStorage.getItem('token');
//             await axios.put(`${BASE_URL}/api/tasks/${taskId}/update`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             Alert.alert('Success', 'Task updated');

//             // ✅ Reset all fields here
//             setTitle('');
//             setDescription('');
//             setDueDate('');
//             setPriority('');
//             setAssignedTo('');
//             setStatus('');
//             setComment('');
//             setFile(null);
//             setAudioUri(null);
//             setRecording(null);
//             setSound(null);
//             setIsPlaying(false);


//             // router.push('/(dashboard)');
//             // router.replace(`/(dashboard)/${from || '/(dashboard)'}` as any);
//             // router.push({
//             //     pathname: '/(dashboard)',
//             //     params: { refresh: 'true' },
//             // });
//             // console.log(from)
//             if (from === 'adminTasks') {
//                 router.push({
//                     pathname: '/(dashboard)/manage-tasks',
//                     params: { refresh: Date.now().toString() },
//                 });
//             }
//             else {
//                 router.push({
//                     pathname: '/(dashboard)',
//                     params: { refresh: Date.now().toString() }, // 👈 makes it unique every time
//                 });
//             }


//             // navigation.navigate('My Tasks');
//             // router.push({
//             //     pathname: '/(dashboard)',
//             // });


//         } catch {
//             Alert.alert('Error', 'Update failed');
//         }
//     };

//     if (loading || !task) return <ActivityIndicator size="large" className="mt-20" />;

//     const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
//     const isAssignee = user?.username === task.assigned_to;

//     return (

//         // <KeyboardAvoidingView
//         //     behavior={Platform.OS === 'ios' ? 'padding' : "height"}
//         //     className="flex-1"
//         //     keyboardVerticalOffset={100} // adjust based on your layout
//         // >

//         //     <ScrollView
//         //         contentContainerStyle={{ padding: 16, flexGrow: 1 }}
//         //         keyboardShouldPersistTaps="handled"
//         //         className="bg-yellow-100"
//         //     >
//         <View style={{ flex: 1, backgroundColor: '#FFF8DC' }}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // tweak if you have a header
//             >
//                 <ScrollView
//                     contentContainerStyle={{
//                         padding: 20,
//                         paddingBottom: 120, // ensure space when keyboard opens
//                         flexGrow: 1,
//                         justifyContent: 'flex-start',
//                     }}
//                     keyboardShouldPersistTaps="handled"
//                     showsVerticalScrollIndicator={false}
//                 >
//                     {/* <ScrollView className="bg-yellow-100 min-h-screen p-4"> */}
//                     {/* <Text className="text-3xl font-bold text-center text-black mb-4">Update Task</Text> */}

//                     {isCreator && (
//                         <>
//                             <FloatingLabelInput
//                                 value={title}
//                                 onChangeText={setTitle}
//                                 label="Title"
//                                 // staticLabel
//                                 isFocused={!!title}
//                                 labelStyles={{ color: COLORS.label, fontSize: 14 }}
//                                 inputStyles={{ color: COLORS.text, fontSize: 16 }}
//                                 containerStyles={{ backgroundColor: COLORS.fieldBg, borderColor: COLORS.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16 }}
//                                 customLabelStyles={{ topFocused: -20, leftFocused: 1, fontSizeFocused: 12 }}
//                                 placeholder='Enter task title'
//                             // placeholderTextColor={COLORS.placeholder}
//                             />

//                             <FloatingLabelInput
//                                 value={description}
//                                 onChangeText={setDescription}
//                                 label="Description"
//                                 // staticLabel
//                                 multiline
//                                 isFocused={!!description}
//                                 labelStyles={{ color: COLORS.label, fontSize: 14 }}
//                                 inputStyles={{ color: COLORS.text, fontSize: 16, minHeight: 80 }}
//                                 containerStyles={{ backgroundColor: COLORS.fieldBg, borderColor: COLORS.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16 }}
//                                 // customLabelStyles={{ topFocused: -14, leftFocused: 10, fontSizeFocused: 12 }}
//                                 customLabelStyles={{
//                                     topFocused: -35,       // 👈 pushes label much higher
//                                     leftFocused: 1,        // 👈 shift left for "top-left" effect
//                                     fontSizeFocused: 12,   // 👈 shrink label a bit
//                                 }}
//                             />

//                             <TouchableOpacity
//                                 onPress={() => setShowDatePicker(true)}
//                                 activeOpacity={0.8}
//                                 style={{
//                                     flexDirection: 'row',                    // 👈 Align children horizontally
//                                     alignItems: 'center',                    // 👈 Vertically align text and icon
//                                     // justifyContent: 'space-between',         // 👈 Push icon to far right
//                                     backgroundColor: COLORS.fieldBg,
//                                     borderColor: COLORS.border,
//                                     borderWidth: 1,
//                                     borderRadius: 12,
//                                     paddingHorizontal: 14,
//                                     paddingVertical: 14,
//                                     marginBottom: 16,
//                                 }}
//                             >
//                                 <Text
//                                     style={{
//                                         color: dueDate ? COLORS.text : COLORS.placeholder,
//                                         fontSize: 16,
//                                     }}
//                                 >
//                                     {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date'}
//                                 </Text>

//                             </TouchableOpacity>


//                             {showDatePicker && (
//                                 <DateTimePicker
//                                     value={dueDate ? new Date(dueDate) : new Date()}
//                                     mode="date"
//                                     display="default"
//                                     onChange={(e, selectedDate) => {
//                                         setShowDatePicker(false);
//                                         if (selectedDate) setDueDate(selectedDate.toISOString().split('T')[0]);
//                                     }}
//                                 />
//                             )}

//                             <View style={{ backgroundColor: COLORS.fieldBg, borderColor: COLORS.border, borderWidth: 1, borderRadius: 12, marginBottom: 16 }}>
//                                 <Picker selectedValue={priority} onValueChange={setPriority} style={{ color: COLORS.text }}>
//                                     <Picker.Item label="Select Priority" value="" />
//                                     <Picker.Item label="Low" value="Low" />
//                                     <Picker.Item label="Medium" value="Medium" />
//                                     <Picker.Item label="High" value="High" />
//                                 </Picker>
//                             </View>

//                             <View style={{ backgroundColor: COLORS.fieldBg, borderColor: COLORS.border, borderWidth: 1, borderRadius: 12, marginBottom: 16 }}>
//                                 <Picker selectedValue={assignedTo} onValueChange={setAssignedTo} style={{ color: COLORS.text }}>
//                                     <Picker.Item label="Assign To" value="" />
//                                     {users.filter((u) => u !== task?.created_by).map((u, idx) => (
//                                         <Picker.Item label={u} value={u} key={idx} />
//                                     ))}
//                                 </Picker>
//                             </View>
//                         </>
//                     )}

//                     {isAssignee && (
//                         <View style={{ backgroundColor: COLORS.fieldBg, borderColor: COLORS.border, borderWidth: 1, borderRadius: 12, marginBottom: 16 }}>
//                             <Picker selectedValue={status} onValueChange={setStatus} style={{ color: COLORS.text }}>
//                                 <Picker.Item label="Select Status" value="" />
//                                 <Picker.Item label="Pending" value="Pending" />
//                                 <Picker.Item label="In Progress" value="In Progress" />
//                                 <Picker.Item label="Completed" value="Completed" />
//                             </Picker>
//                         </View>
//                     )}

//                     <FloatingLabelInput
//                         value={comment}
//                         onChangeText={setComment}
//                         label="Comment"
//                         staticLabel
//                         multiline
//                         isFocused={!!comment}
//                         labelStyles={{ color: COLORS.label, fontSize: 14 }}
//                         inputStyles={{ color: COLORS.text, fontSize: 16, minHeight: 80 }}
//                         containerStyles={{ backgroundColor: COLORS.fieldBg, borderColor: COLORS.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16 }}
//                         customLabelStyles={{ topFocused: -14, leftFocused: 10, fontSizeFocused: 12 }}
//                     />

//                     <View className="mb-4">
//                         <TouchableOpacity
//                             onPress={handleAudioRecord}
//                             className={`p-4 rounded-xl active:opacity-80 ${isRecording ? 'bg-red-600' : 'bg-black'}`}
//                         >
//                             <Text className="text-yellow-400 font-bold text-center">
//                                 {isRecording ? 'Stop Recording' : 'Record Audio'}
//                             </Text>
//                         </TouchableOpacity>

//                         {audioUri && (
//                             <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300">
//                                 <Text className="text-black flex-1" numberOfLines={1}>Audio Recorded</Text>
//                                 <TouchableOpacity
//                                     onPress={isPlaying ? handleStopAudio : handlePlayAudio}
//                                     className="mr-2"
//                                     disabled={isPlaying && !sound}
//                                 >
//                                     <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#22c55e" />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={handleDeleteAudio}>
//                                     <Ionicons name="trash" size={24} color="red" />
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                     </View>

//                     <TouchableOpacity onPress={pickFile} className="bg-black p-4 rounded-xl mb-4 active:opacity-80">
//                         <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
//                     </TouchableOpacity>
//                     {/* {file && <Text className="text-black mb-2">Selected: {file.name}</Text>} */}
//                     {file && (
//                         <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300 mb-2">
//                             <Text className="text-black flex-1" numberOfLines={1}>
//                                 {file.name}
//                             </Text>
//                             <TouchableOpacity onPress={() => setFile(null)}>
//                                 <Ionicons name="trash" size={24} color="red" />
//                             </TouchableOpacity>
//                         </View>
//                     )}


//                     <TouchableOpacity onPress={handleUpdate} disabled={!isFieldChanged}
//                         // className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
//                         className={`p-4 rounded-xl active:opacity-80 ${isFieldChanged ? 'bg-yellow-500' : 'bg-gray-300'}`}

//                     >
//                         <Text className="text-black font-bold text-center text-base">Update Task</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }


import { AuthContext } from '@/context/AuthContext';
import { Task } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Animated, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function UpdateTaskScreen() {
    const { taskId, from } = useLocalSearchParams<{ taskId: string; from?: string }>();
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const navigation = useNavigation();

    const [task, setTask] = useState<Task | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [loading, setLoading] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Animation states for floating labels
    const [titleAnim] = useState(new Animated.Value(0));
    const [descAnim] = useState(new Animated.Value(0));
    const [commentAnim] = useState(new Animated.Value(0));
    const [dueDateAnim] = useState(new Animated.Value(0));
    const [priorityAnim] = useState(new Animated.Value(0));
    const [statusAnim] = useState(new Animated.Value(0));
    const [assignedToAnim] = useState(new Animated.Value(0));

    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        assignedTo: '',
        status: '',
    });

    useEffect(() => {
        if (!sound) return;
        return () => {
            (async () => {
                await sound.unloadAsync();
            })();
        };
    }, [sound]);

    useEffect(() => {
        // fetchTask();
        fetchUsers();
    }, [taskId]);

    // useFocusEffect(
    //     useCallback(() => {
    //         fetchTask();
    //         fetchUsers();
    //     }, [taskId])
    // );
    // Called automatically on screen focus
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchTask();
        }, [taskId])
    );

    const fetchTask = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = res.data;
            setTask(data);
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.due_date?.split('T')[0] || '');
            setPriority(data.priority || '');
            setAssignedTo(data.assigned_to || '');
            setStatus(data.status || '');

            setInitialValues({
                title: data.title,
                description: data.description,
                dueDate: data.due_date?.split('T')[0] || '',
                priority: data.priority || '',
                assignedTo: data.assigned_to || '',
                status: data.status || '',
            });

            // Initialize animation states
            Animated.timing(titleAnim, { toValue: data.title ? 1 : 0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(descAnim, { toValue: data.description ? 1 : 0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(commentAnim, { toValue: data.comment ? 1 : 0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(dueDateAnim, { toValue: data.due_date ? 1 : 0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(priorityAnim, { toValue: data.priority ? 1 : 0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(assignedToAnim, { toValue: data.assigned_to ? 1 : 0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(statusAnim, { toValue: data.status ? 1 : 0, duration: 0, useNativeDriver: true }).start();
        } catch (err) {
            Alert.alert('Error', 'Failed to fetch task');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/api/tasks/list`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log(res.data);
            setUsers(res.data);
        } catch (err) {
            Alert.alert('Error', 'Failed to load users');
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
                await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
                const newRecording = new Audio.Recording();
                await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
                await newRecording.startAsync();
                setRecording(newRecording);
                setIsRecording(true);
                setAudioUri(null);
            }
        } catch (err) {
            Alert.alert('Failed to record audio.');
        }
    };

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

    const handleStopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
        setIsPlaying(false);
    };

    const handleDeleteAudio = () => setAudioUri(null);

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
        if (result.assets?.length) setFile(result.assets[0]);
    };

    const isFieldChanged =
        title !== initialValues.title ||
        description !== initialValues.description ||
        dueDate !== initialValues.dueDate ||
        priority !== initialValues.priority ||
        assignedTo !== initialValues.assignedTo ||
        status !== initialValues.status ||
        !!audioUri ||
        !!file ||
        comment.trim().length > 0 || !title || !priority || !assignedTo || !dueDate;

    const handleUpdate = async () => {


        if (!title || !priority || !assignedTo || !dueDate) {
            Alert.alert('Please fill all required fields');
            return;
        }
        const formData = new FormData();
        formData.append('status', status);
        formData.append('comment', comment);
        if (user?.username === task?.created_by || user?.accountType === 'Super Admin') {
            formData.append('title', title);
            formData.append('description', description);
            formData.append('due_date', dueDate);
            formData.append('priority', priority);
            formData.append('assigned_to', assignedTo);
        }
        if (audioUri) {
            const filename = audioUri.split('/').pop()!;
            formData.append('audio', { uri: audioUri, name: filename, type: 'audio/x-m4a' } as any);
        }
        if (file) {
            formData.append('file', {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || 'application/octet-stream',
            } as any);
        }

        try {
            const token = await AsyncStorage.getItem('token');
            await axios.put(`${BASE_URL}/api/tasks/${taskId}/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', 'Task updated');

            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('');
            setAssignedTo('');
            setStatus('');
            setComment('');
            setFile(null);
            setAudioUri(null);
            setRecording(null);
            setSound(null);
            setIsPlaying(false);

            if (from === 'adminTasks') {
                router.push({
                    pathname: '/(dashboard)/manage-tasks',
                    params: { refresh: Date.now().toString() },
                });
            } else {
                router.push({
                    pathname: '/(dashboard)',
                    params: { refresh: Date.now().toString() },
                });
            }
        } catch {
            Alert.alert('Error', 'Update failed');
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

    if (loading || !task) return <ActivityIndicator size="large" className="mt-20" color="#000" />;

    const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
    const isAssignee = user?.username === task.assigned_to;

    // const themeColor = 'absolute left-3 text-gray-500 text-base text-yellow-700 font-semibold';
    const inputClass: string =
        colorScheme === 'dark'
            ? 'absolute left-3 text-gray-500 text-base text-yellow-700 font-semibold'
            : 'absolute left-3 text-gray-500 text-base text-yellow-700 font-semibold';

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF8DC' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 120,
                        flexGrow: 1,
                        justifyContent: 'flex-start',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {isCreator && (
                        <>
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
                                    // style={{ color: '#000' }}
                                    style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                                />
                                <Animated.Text
                                    className={`${inputClass}`}
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
                                        //color: 'text-yellow-700',
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
                                    numberOfLines={4}
                                    className="bg-white p-4 pt-6 rounded-xl border border-gray-300 text-base h-32"
                                    style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                                />
                                <Animated.Text
                                    // className="absolute left-3 text-gray-500 text-base"
                                    className={`${inputClass}`}
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
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowDatePicker(true);
                                        animateLabel(dueDateAnim, 1);
                                    }}
                                    className="flex-row items-center bg-white p-4 pt-6 rounded-xl border border-gray-300"
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        className="flex-1 text-base"
                                        // style={{ color: dueDate ? '#000' : '#000' }}
                                        // style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                                        style={{ color: dueDate ? (isDark ? '#000' : '#000') : (isDark ? '#999' : '#999') }}
                                    >
                                        {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select Due Date'}
                                    </Text>
                                    <Ionicons name="calendar-outline" size={20} color="#000" />
                                </TouchableOpacity>
                                <Animated.Text
                                    // className="absolute left-3 text-gray-500 text-base"
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
                                        // color: '#000',
                                    }}
                                >
                                    Due Date
                                </Animated.Text>
                            </View>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={dueDate ? new Date(dueDate) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(e, selectedDate) => {
                                        setShowDatePicker(false);
                                        if (selectedDate) {
                                            setDueDate(selectedDate.toISOString().split('T')[0]);
                                            animateLabel(dueDateAnim, 1);
                                        } else {
                                            animateLabel(dueDateAnim, dueDate ? 1 : 0);
                                        }
                                    }}
                                />
                            )}

                            <View className="mb-4 relative">
                                <View className="bg-white rounded-xl border border-gray-300 pt-4">
                                    <Picker
                                        selectedValue={priority}
                                        onValueChange={(val) => {
                                            setPriority(val);
                                            animateLabel(priorityAnim, val ? 1 : 0);
                                        }}
                                        // style={{ color: '#000' }}
                                        // style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                                        style={{ color: priority ? (isDark ? '#000' : '#000') : (isDark ? '#999' : '#999') }}
                                    >
                                        <Picker.Item label="Select Priority" value="" />
                                        <Picker.Item label="Low" value="Low" />
                                        <Picker.Item label="Medium" value="Medium" />
                                        <Picker.Item label="High" value="High" />
                                    </Picker>
                                </View>
                                <Animated.Text
                                    // className="absolute left-3 text-gray-500 text-base"
                                    className={`${inputClass}`}
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
                                        // color: '#000',
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
                                        // style={{ color: '#000' }}
                                        // style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                                        style={{
                                            color: assignedTo ? (isDark ? '#000' : '#000') : (isDark ? '#999' : '#999'), // 👈 Gray if not selected
                                        }}
                                    >
                                        <Picker.Item label="Select Assignee" value="" />
                                        {users.filter((u) => u !== task?.created_by).map((u, idx) => (
                                            <Picker.Item label={u} value={u} key={idx} />
                                        ))}
                                    </Picker>
                                </View>
                                <Animated.Text
                                    // className="absolute left-3 text-gray-500 text-base"
                                    className={`${inputClass}`}
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
                                        // color: '#000',
                                    }}
                                >
                                    Assign To
                                </Animated.Text>
                            </View>
                        </>
                    )}

                    {isAssignee && (
                        <View className="mb-4 relative">
                            <View className="bg-white rounded-xl border border-gray-300 pt-4">
                                <Picker
                                    selectedValue={status}
                                    onValueChange={(val) => {
                                        setStatus(val);
                                        animateLabel(statusAnim, val ? 1 : 0);
                                    }}
                                    // style={{ color: '#000' }}
                                    style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                                >
                                    <Picker.Item label="Select Status" value="" />
                                    <Picker.Item label="Pending" value="Pending" />
                                    <Picker.Item label="In Progress" value="In Progress" />
                                    <Picker.Item label="Completed" value="Completed" />
                                </Picker>
                            </View>
                            <Animated.Text
                                // className="absolute left-4 text-gray-500 text-base"
                                className={`${inputClass}`}
                                style={{
                                    transform: [
                                        {
                                            translateY: statusAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [16, 0],
                                            }),
                                        },
                                        {
                                            scale: statusAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 0.8],
                                            }),
                                        },
                                    ],
                                    // color: '#000',
                                }}
                            >
                                Status
                            </Animated.Text>
                        </View>
                    )}

                    <View className="mb-4 relative">
                        <TextInput
                            value={comment}
                            onChangeText={(text) => {
                                setComment(text);
                                animateLabel(commentAnim, text ? 1 : 0);
                            }}
                            onFocus={() => animateLabel(commentAnim, 1)}
                            onBlur={() => animateLabel(commentAnim, comment ? 1 : 0)}
                            multiline
                            numberOfLines={3}
                            className="bg-white p-4 pt-6 rounded-xl border border-gray-300 text-base h-32"
                            // style={{ color: '#000' }}
                            style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                        />
                        <Animated.Text
                            // className="absolute left-3 text-gray-500 text-base"
                            className={`${inputClass}`}
                            style={{
                                transform: [
                                    {
                                        translateY: commentAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [16, 0],
                                        }),
                                    },
                                    {
                                        scale: commentAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.8],
                                        }),
                                    },
                                ],
                                // color: '#000',
                            }}
                        >
                            Comment
                        </Animated.Text>
                    </View>

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
                                <Text className="flex-1" style={{ color: '#000' }} numberOfLines={1}>
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

                    <TouchableOpacity onPress={pickFile} className="bg-black p-4 rounded-xl mb-4 active:opacity-80">
                        <Text className="text-yellow-400 font-bold text-center">Attach File</Text>
                    </TouchableOpacity>

                    {file && (
                        <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300 mb-2">
                            <Text className="flex-1" style={{ color: '#000' }} numberOfLines={1}>
                                {file.name}
                            </Text>
                            <TouchableOpacity onPress={() => setFile(null)}>
                                <Ionicons name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={handleUpdate}
                        disabled={!isFieldChanged}
                        className={`p-4 rounded-xl active:opacity-80 ${isFieldChanged ? 'bg-yellow-500' : 'bg-gray-300'}`}
                    >
                        <Text className="font-bold text-center text-base" style={{ color: '#000' }}>
                            Update Task
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}