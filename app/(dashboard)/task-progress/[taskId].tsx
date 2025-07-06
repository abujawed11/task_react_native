import { useLocalSearchParams, useRouter } from 'expo-router';
import { CalendarIcon, FileText, UserIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, Linking, ScrollView, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
// import { getStatusIcon, getPriorityIcon, formatDate } from '@/utils/taskUtils';
import TaskUpdateCard from '@/components/TaskUpdateCard';
import { Task, TaskUpdate } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Audio } from 'expo-av';
import { RefreshControl } from 'react-native';


const TaskProgress = () => {
    // const { taskId } = useLocalSearchParams<{ taskId: string }>();
    const { taskId } = useLocalSearchParams<{ taskId: string }>();

    // console.log('taskId from route:', taskId);
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    const [updates, setUpdates] = useState<TaskUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const colorScheme = useColorScheme();
    const [refreshing, setRefreshing] = useState(false);

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = async () => {
        try {
            if (!sound) {
                const { sound: newSound, status } = await Audio.Sound.createAsync(
                    { uri: `${BASE_URL}/${task?.audio_path}` },
                    { shouldPlay: false } // Don’t auto-play
                );

                await newSound.setIsLoopingAsync(false); // ❗ Important

                newSound.setOnPlaybackStatusUpdate((status) => {
                    if ('isLoaded' in status && status.isLoaded && status.didJustFinish) {
                        setIsPlaying(false);
                        newSound.unloadAsync(); // Unload the sound when finished
                        setSound(null); // Reset sound state
                    }
                });

                setSound(newSound);
                await newSound.playAsync();
                setIsPlaying(true);
            } else {
                const status = await sound.getStatusAsync();
                if ('isLoaded' in status && status.isLoaded) {
                    if (status.isPlaying) {
                        await sound.pauseAsync();
                        setIsPlaying(false);
                    } else {
                        await sound.playAsync();
                        setIsPlaying(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error playing/pausing audio:', error);
        }
    };


    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'High':
                return <FontAwesome5 name="fire" size={20} color="red" />;
            case 'Medium':
                return <FontAwesome5 name="fire" size={20} color="orange" />;
            case 'Low':
                return <FontAwesome5 name="fire" size={20} color="blue" />;
            default:
                return null;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending':
                return <Ionicons name="time-outline" size={20} color="gray" />;
            case 'In Progress':
                return <Ionicons name="time-outline" size={20} color="blue" />;
            case 'Completed':
                return <MaterialIcons name="check-circle" size={20} color="green" />;
            default:
                return null;
        }
    };

    // const formatDate = (ddateStr: string | null): string => {
    //     if (!dateStr) return 'N/A';
    //     return format(new Date(dateStr), 'MMM d, yyyy'); // e.g., "Jul 1, 2025"
    // };
    const formatDate = (dateStr: string | null): string => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // useEffect(() => {
    //     const fetchTaskProgress = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('token');
    //             const response = await axios.get(`${BASE_URL}/api/tasks/${taskId}/progress`, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //             setTask(response.data.task);
    //             setUpdates(response.data.updates || []);
    //         } catch (error) {
    //             console.error('Error fetching task progress:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (taskId) {
    //         fetchTaskProgress();
    //     }
    // }, [taskId]);

    const openLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Can't open this file", url);
        }
    };

    const fetchTaskProgress = async () => {
        try {
            // console.log('Fetching progress for task:', taskId); // ✅ Add here

            const token = await AsyncStorage.getItem('token');
            //console.log('Token:', token); // ✅ Add here

            const response = await axios.get(`${BASE_URL}/api/tasks/${taskId}/progress`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            //console.log('Task response:', response.data); // ✅ Log full response

            setTask(response.data.task);
            setUpdates(response.data.updates || []);
        } catch (error: any) {
            console.error('Error fetching task progress:', error?.response?.data || error?.message); // ✅ Add here
        } finally {
            setLoading(false);
            setRefreshing(false); // ✅ THIS MUST BE CALLED
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchTaskProgress();
    };


    useEffect(() => {

        if (taskId) {
            fetchTaskProgress();
        } else {
            console.warn('No taskId found from route params!'); // ✅ Additional guard
        }
    }, [taskId]);


    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-yellow-50 p-4"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#facc15']} // Android spinner color
                    tintColor="#facc15"  // iOS spinner color
                />
            }>
            {/* <Button title="← Back" color="black" onPress={() => router.back()} /> */}

            {/* <Text className="text-center text-2xl font-bold text-black mt-4 mb-6">Task Progress</Text> */}

            {task && (
                <View className="mb-6 border-l-4 border-yellow-500 pl-4">
                    <View className="bg-white border border-blue-500 rounded-lg shadow-md mb-4">
                        <View className="bg-yellow-400 p-4 rounded-t-lg border-b border-yellow-500">
                            <Text className="text-xl font-bold text-black">{task.title}</Text>
                        </View>

                        <View className="p-4 space-y-2">
                            <Text className="text-black">{task.description || 'No description'}</Text>

                            <View className="flex-row items-center space-x-2">
                                <UserIcon size={16} color="#3b82f6" />
                                <Text style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>Created By: {task.created_by}</Text>
                            </View>
                            <View className="flex-row items-center space-x-2">
                                <UserIcon size={16} color="#3b82f6" />
                                <Text style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>Assigned To: {task.assigned_to}</Text>
                            </View>
                            <View className="flex-row items-center space-x-2">
                                {getStatusIcon(task.status)}
                                <Text style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>Status: {task.status}</Text>
                            </View>
                            <View className="flex-row items-center space-x-2">
                                {getPriorityIcon(task.priority)}
                                <Text style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>Priority: {task.priority}</Text>
                            </View>
                            <View className="flex-row items-center space-x-2">
                                <CalendarIcon size={16} color="#3b82f6" />
                                <Text style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>Due: {formatDate(task.due_date)}</Text>
                            </View>
                            <View className="flex-row items-center space-x-2">
                                <CalendarIcon size={16} color="#3b82f6" />
                                <Text style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}>Created: {formatDate(task.created_at)}</Text>
                            </View>

                            {task.audio_path && (
                                // <View className="mt-2">
                                //     <Text className="text-black font-medium mb-1">Audio Note:</Text>
                                //     <Text className="text-blue-500" onPress={() => Linking.openURL(`${BASE_URL}/${task.audio_path}`)}>Play Audio</Text>
                                // </View>
                                <View className="mt-2">
                                    <Text className="text-black font-medium mb-1">Audio Note:</Text>
                                    <Button
                                        title={isPlaying ? 'Pause Audio' : 'Play Audio'}
                                        onPress={handlePlayPause}
                                        color="#facc15"
                                    />
                                </View>
                            )}

                            {task.file_path && (


                                <View className="mt-2">
                                    <Text className="text-black font-medium mb-1">Attached File:</Text>
                                    {task.file_path.match(/\.(jpg|jpeg|png)$/i) ? (

                                        // <Image source={{ uri: `${BASE_URL}/${task.file_path}` }} className="w-full h-40 rounded-md" />
                                        <TouchableOpacity
                                            onPress={() => {
                                                // console.log('Pressed image:', `${BASE_URL}/${update.file_path}`);
                                                openLink(`${BASE_URL}/${task.file_path}`);
                                            }}
                                            activeOpacity={0.7}
                                            style={{ width: '100%', height: 160, backgroundColor: 'rgba(255,255,0,0.1)' }} // Add background for debug
                                        >
                                            <Image
                                                source={{ uri: `${BASE_URL}/${task.file_path}` }}
                                                style={{ width: '100%', height: 160, borderRadius: 8 }}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>



                                    ) : (
                                        <Text className="text-yellow-600" onPress={() => Linking.openURL(`${BASE_URL}/${task.file_path}`)}>
                                            Download {task.file_path.split('/').pop()}
                                        </Text>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            )}

            {updates.length > 1 ? (
                [...updates]
                    .filter((u) => !u.is_system_generated)
                    .reverse()
                    .map((update, index) => (
                        <TaskUpdateCard
                            key={index}
                            update={update}
                            assigned_to={task?.assigned_to || ''}
                        />
                    ))
            ) : (
                <View className="items-center mt-6">
                    {/* <FileText  size={48} color="#eab308" /> */}
                    <FileText size={48} color="#facc15" className="mb-2" />
                    <Text className="text-black mt-2">No updates yet for this task.</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default TaskProgress;
