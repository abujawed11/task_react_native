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
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UpdateTaskScreen() {
    const { taskId, from } = useLocalSearchParams<{ taskId: string; from?: string }>();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [task, setTask] = useState<Task | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [assignedTo, setAssignedTo] = useState('');

    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [loading, setLoading] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();

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
            // Cleanup must not return a Promise, so use an async IIFE
            (async () => {
                await sound.unloadAsync();
            })();
        };
    }, [sound]);

    useEffect(() => {
        fetchTask();
        fetchUsers();
    }, [taskId, BASE_URL]);

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
            setDueDate(data.due_date?.split('T')[0]);
            setPriority(data.priority);
            setAssignedTo(data.assigned_to);
            setStatus(data.status);

            // Add below lines
            setInitialValues({
                title: data.title,
                description: data.description,
                dueDate: data.due_date?.split('T')[0] || '',
                priority: data.priority,
                assignedTo: data.assigned_to,
                status: data.status,
            });
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
        comment.trim().length > 0;


    const handleUpdate = async () => {
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

            // ✅ Reset all fields here
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


            // router.push('/(dashboard)');
            // router.replace(`/(dashboard)/${from || '/(dashboard)'}` as any);
            // router.push({
            //     pathname: '/(dashboard)',
            //     params: { refresh: 'true' },
            // });
            // console.log(from)
            if (from === 'adminTasks') {
                router.push({
                    pathname: '/(dashboard)/manage-tasks',
                    params: { refresh: Date.now().toString() },
                });
            }
            else {
                router.push({
                    pathname: '/(dashboard)',
                    params: { refresh: Date.now().toString() }, // 👈 makes it unique every time
                });
            }


            // navigation.navigate('My Tasks');
            // router.push({
            //     pathname: '/(dashboard)',
            // });


        } catch {
            Alert.alert('Error', 'Update failed');
        }
    };

    if (loading || !task) return <ActivityIndicator size="large" className="mt-20" />;

    const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
    const isAssignee = user?.username === task.assigned_to;

    return (

        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : "height"}
        //     className="flex-1"
        //     keyboardVerticalOffset={100} // adjust based on your layout
        // >

        //     <ScrollView
        //         contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        //         keyboardShouldPersistTaps="handled"
        //         className="bg-yellow-100"
        //     >
        <View style={{ flex: 1, backgroundColor: '#FFF8DC' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // tweak if you have a header
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 120, // ensure space when keyboard opens
                        flexGrow: 1,
                        justifyContent: 'flex-start',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* <ScrollView className="bg-yellow-100 min-h-screen p-4"> */}
                    {/* <Text className="text-3xl font-bold text-center text-black mb-4">Update Task</Text> */}

                    {isCreator && (
                        <>
                            <TextInput value={title} onChangeText={setTitle} placeholder="Title" className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base" />
                            <TextInput value={description} onChangeText={setDescription} placeholder="Description" multiline numberOfLines={4} className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base" />

                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="flex-row items-center bg-white p-4 rounded-xl border border-gray-300 mb-4"
                                activeOpacity={0.8}
                            >
                                <Text className={`flex-1 text-base ${dueDate ? 'text-gray-700' : 'text-gray-400'}`}>{dueDate ? new Date(dueDate).toLocaleDateString() : 'dd-mm-yyyy'}</Text>
                                <Ionicons name="calendar-outline" size={20} color="gray" />
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={dueDate ? new Date(dueDate) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(e, selectedDate) => {
                                        setShowDatePicker(false);
                                        if (selectedDate) setDueDate(selectedDate.toISOString().split('T')[0]);
                                    }}
                                />
                            )}

                            <View className="bg-white rounded-xl border border-gray-300 mb-4">
                                <Picker selectedValue={priority} onValueChange={(val) => setPriority(val)}>
                                    <Picker.Item label="Select Priority" value="" />
                                    <Picker.Item label="Low" value="Low" />
                                    <Picker.Item label="Medium" value="Medium" />
                                    <Picker.Item label="High" value="High" />
                                </Picker>
                            </View>

                            <View className="bg-white rounded-xl border border-gray-300 mb-4">
                                <Picker selectedValue={assignedTo} onValueChange={(val) => setAssignedTo(val)}>
                                    <Picker.Item label="Assign To" value="" />
                                    {users.filter((u) => u !== task?.created_by).map((u, idx) => (
                                        <Picker.Item label={u} value={u} key={idx} />
                                    ))}
                                </Picker>
                            </View>
                        </>
                    )}

                    {isAssignee && (
                        <View className="bg-white rounded-xl border border-gray-300 mb-4">
                            <Picker selectedValue={status} onValueChange={(val) => setStatus(val)}>
                                <Picker.Item label="Select Status" value="" />
                                <Picker.Item label="Pending" value="Pending" />
                                <Picker.Item label="In Progress" value="In Progress" />
                                <Picker.Item label="Completed" value="Completed" />
                            </Picker>
                        </View>
                    )}

                    {/* <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Comment"
                multiline
                numberOfLines={3}
                className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base"
            /> */}
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Comment"
                        multiline
                        numberOfLines={3}
                        className="bg-white p-4 rounded-xl border border-gray-300 mb-4 text-base h-32"
                    />

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
                                <Text className="text-black flex-1" numberOfLines={1}>Audio Recorded</Text>
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
                    {/* {file && <Text className="text-black mb-2">Selected: {file.name}</Text>} */}
                    {file && (
                        <View className="flex-row justify-between items-center mt-2 bg-white p-3 rounded-lg border border-gray-300 mb-2">
                            <Text className="text-black flex-1" numberOfLines={1}>
                                {file.name}
                            </Text>
                            <TouchableOpacity onPress={() => setFile(null)}>
                                <Ionicons name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}


                    <TouchableOpacity onPress={handleUpdate} disabled={!isFieldChanged}
                        // className="bg-yellow-500 p-4 rounded-xl active:opacity-80"
                        className={`p-4 rounded-xl active:opacity-80 ${isFieldChanged ? 'bg-yellow-500' : 'bg-gray-300'}`}

                    >
                        <Text className="text-black font-bold text-center text-base">Update Task</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
