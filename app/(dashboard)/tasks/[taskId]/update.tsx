import { AuthContext } from '@/context/AuthContext';
import { Task } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// interface Task {
//   title: string;
//   description: string;
//   due_date: string;
//   priority: string;
//   assigned_to: string;
//   created_by: string;
//   status: string;
// }

export default function UpdateTaskScreen() {
    // const { taskId } = useLocalSearchParams<{ taskId: string }>();
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
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [loading, setLoading] = useState(true);

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // let token: string | null;

    const playAudio = async () => {
        if (!audioUri) return;
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        } else {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);
            newSound.setOnPlaybackStatusUpdate((status) => {
                if ('didJustFinish' in status && status.didJustFinish) {
                    setIsPlaying(false);
                    newSound.unloadAsync();
                    setSound(null);
                }
            });
        }
    };

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const fetchTask = async () => {



        try {
            // console.log('Fetching task with ID:', taskId);
            const token = await AsyncStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log('Task data:', res.data);
            const data = res.data;
            setTask(data);
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.due_date?.split('T')[0]);
            setPriority(data.priority);
            setAssignedTo(data.assigned_to);
            setStatus(data.status);
        } catch (err) {
            console.error('Fetch Task Error:', err);
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

    useEffect(() => {
        fetchTask();
        fetchUsers();
    }, [taskId,BASE_URL]);

    const startRecording = async () => {
        try {
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) return;

            await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
        } catch (error) {
            Alert.alert('Error', 'Failed to start recording');
        }
    };

    const stopRecording = async () => {
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setAudioUri(uri);
            setRecording(null);
        }
    };

    const pickFile = async () => {
        // const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
        // if (result.type === 'success') {
        //     setFile(result.assets?.[0] || null);
        // }
        const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });

        if (result.assets && result.assets.length > 0) {
            setFile(result.assets[0]);
        }
    };

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
            formData.append('audio', {
                uri: audioUri,
                name: filename,
                type: 'audio/webm',
            } as any);
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
            router.push('/dashboard');
            // router.replace(`/${from || 'dashboard'}`);
            // router.replace({ pathname: `/${from || 'dashboard'}` });
            // router.replace(`/${from || 'dashboard'}` as any);

        } catch {
            Alert.alert('Error', 'Update failed');
        }
    };

    if (loading || !task) return <ActivityIndicator size="large" className="mt-20" />;

    const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
    const isAssignee = user?.username === task.assigned_to;
    // console.log(user?.username)
    // console.log("Task created",task.created_by)
    // console.log(isCreator)

    return (
        <ScrollView className="p-4 bg-yellow-50 min-h-screen">
            <Text className="text-2xl font-bold text-center text-black mb-4">Update Task</Text>

            {isCreator && (
                <>
                    <TextInput className="border p-2 rounded mb-3 bg-white" value={title} onChangeText={setTitle} placeholder="Title" />
                    <TextInput className="border p-2 rounded mb-3 bg-white" value={description} onChangeText={setDescription} placeholder="Description" multiline />
                    <TextInput className="border p-2 rounded mb-3 bg-white" value={dueDate} onChangeText={setDueDate} placeholder="Due Date (YYYY-MM-DD)" />

                    <View className="border rounded mb-3 bg-white">
                        <Picker selectedValue={priority} onValueChange={setPriority}>
                            <Picker.Item label="Select Priority" value="" />
                            <Picker.Item label="Low" value="Low" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="High" value="High" />
                        </Picker>
                    </View>

                    <View className="border rounded mb-3 bg-white">
                        <Picker selectedValue={assignedTo} onValueChange={setAssignedTo}>
                            <Picker.Item label="Select User" value="" />
                            {users
                                .filter((u) => u !== task?.created_by)
                                .map((u) => (
                                    <Picker.Item label={u} value={u} key={u} />
                                ))}
                        </Picker>
                    </View>
                </>
            )}

            {isAssignee && (
                <View className="border rounded mb-3 bg-white">
                    <Picker selectedValue={status} onValueChange={setStatus}>
                        <Picker.Item label="Select Status" value="" />
                        <Picker.Item label="Pending" value="Pending" />
                        <Picker.Item label="In Progress" value="In Progress" />
                        <Picker.Item label="Completed" value="Completed" />
                    </Picker>
                </View>
            )}

            <TextInput
                className="border p-2 rounded mb-3 bg-white"
                value={comment}
                onChangeText={setComment}
                placeholder="Comment"
                multiline
            />

            <View className="flex flex-row gap-3 mb-3">
                <TouchableOpacity
                    onPress={recording ? stopRecording : startRecording}
                    className={`flex-1 py-2 rounded ${recording ? 'bg-red-600' : 'bg-black'} items-center`}
                >
                    <Text className="text-white font-bold">
                        {recording ? 'Stop Recording' : 'Record Audio'}
                    </Text>
                </TouchableOpacity>
                {/* {audioUri && (
                    <Audio.Sound
                        source={{ uri: audioUri }}
                        shouldPlay={false}
                        className="rounded w-full"
                    />
                )} */}
                {audioUri && (
                    <TouchableOpacity
                        onPress={playAudio}
                        className="flex-1 py-2 rounded bg-yellow-600 items-center ml-2"
                    >
                        <Text className="text-white font-bold">
                            {isPlaying ? 'Pause Audio' : 'Play Audio'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                onPress={pickFile}
                className="bg-white border p-3 rounded mb-4 items-center"
            >
                <Text>{file ? file.name : 'Choose File'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleUpdate}
                className="bg-black py-3 rounded items-center"
            >
                <Text className="text-yellow-400 font-bold">Update Task</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
