// components/TaskUpdateCard.tsx

// import { TaskUpdate } from '@/types/task.types';
// import { Feather, MaterialIcons } from '@expo/vector-icons';
// import { Audio } from 'expo-av';
// import React from 'react';
// import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

// type Props = {
//   update: TaskUpdate;
//   assigned_to: string;
// };

// const formatDate = (dateStr: string) => {
//   if (!dateStr) return 'N/A';
//   return new Date(dateStr).toLocaleString();
// };

// const getFileExtension = (filePath: string | undefined) =>
//   filePath?.split('.').pop()?.toLowerCase();

// const getFileEmoji = (ext: string | undefined) => {
//   const map: Record<string, string> = {
//     pdf: '📄',
//     dwg: '📐',
//     xls: '📊',
//     xlsx: '📊',
//     skp: '🏗️',
//     sldprt: '⚙️',
//     sldasm: '🛠️',
//     ipt: '🧩',
//     iam: '🔩',
//     msg: '✉️',
//     jpg: '🖼️',
//     jpeg: '🖼️',
//     png: '🖼️',
//     bmp: '🖼️',
//     gif: '🖼️',
//     svg: '🖼️',
//     tif: '🖼️',
//     tiff: '🖼️',
//   };
//   return map[ext || ''] || '📁';
// };

// const TaskUpdateCard: React.FC<Props> = ({ update, BASE_URL }) => {
//   const openLink = async (url: string) => {
//     await Linking.openURL(url);
//   };

//   return (
//     <View className="mb-6 border border-yellow-500 rounded-lg bg-white shadow-md">
//       {/* Header */}
//       <View className="flex flex-row justify-between items-center bg-yellow-100 p-4 rounded-t-lg border-b border-yellow-500">
//         <Text className="text-sm text-black font-semibold">
//           <Feather name="user" size={16} color="orange" /> {update.updated_by}
//         </Text>
//         <Text className="text-xs text-black">
//           <Feather name="calendar" size={14} color="orange" /> {formatDate(update.updated_at)}
//         </Text>
//       </View>

//       <View className="p-4 space-y-2">
//         {update.status && (
//           <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
//             <Text className="text-black font-medium">Status Changed: {update.status}</Text>
//           </View>
//         )}

//         {update.title && (
//           <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
//             <Text className="text-black font-medium">Title Changed: {update.title}</Text>
//           </View>
//         )}

//         {update.description && (
//           <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
//             <Text className="text-black font-medium">Description Changed: {update.description}</Text>
//           </View>
//         )}

//         {update.priority && (
//           <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded flex-row items-center">
//             <MaterialIcons name="priority-high" size={16} color="orange" />
//             <Text className="text-black ml-2">Priority Changed: {update.priority}</Text>
//           </View>
//         )}

//         {update.due_date && (
//           <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded flex-row items-center">
//             <Feather name="calendar" size={16} color="orange" />
//             <Text className="text-black ml-2">Due Date: {formatDate(update.due_date)}</Text>
//           </View>
//         )}

//         {update.comment && (
//           <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
//             <Text className="text-black">Comment: {update.comment}</Text>
//           </View>
//         )}

//         {update.assigned_by && update.assigned_to && (
//           <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
//             <Text className="text-black">
//               🔁 <Text className="font-bold">{update.assigned_by_username}</Text> reassigned the task to{' '}
//               <Text className="font-bold">{update.assigned_to_username}</Text>{' '}
//             </Text>
//             <Text className="text-black">
//               🕓 Previous Assignee: <Text className="font-bold">{update.previous_assigned_to}</Text>
//             </Text>
//           </View>
//         )}

//         {update.audio_path && (
//           <View className="mt-2">
//             <Text className="text-black font-medium mb-1">Audio Note:</Text>
//             <Audio.Sound
//               source={{ uri: `${BASE_URL}/${update.audio_path}` }}
//               shouldPlay={false}
//               useNativeControls
//               style={{ width: '100%' }}
//             />
//           </View>
//         )}

//         {update.file_path && (
//           <View className="mt-2">
//             <Text className="text-black font-medium mb-1">Attached File:</Text>
//             {update.file_path.match(/\.(jpg|jpeg|png)$/i) ? (
//               <Image
//                 source={{ uri: `${BASE_URL}/${update.file_path}` }}
//                 className="w-full h-40 rounded"
//                 resizeMode="cover"
//               />
//             ) : (
//               <TouchableOpacity onPress={() => openLink(`${BASE_URL}/${update.file_path}`)}>
//                 <Text className="text-yellow-500">
//                   {getFileEmoji(getFileExtension(update.file_path))}{' '}
//                   {update.file_path.split('/').pop()}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default TaskUpdateCard;

import { TaskUpdate } from '@/types/task.types';
import { BASE_URL } from '@/utils/constants';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { JSX, useEffect, useState } from 'react';
import {
    Alert, Button,
    Image,
    Linking,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Props = {
    update: TaskUpdate;
    assigned_to: string;
};

const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString();
};

const getFileExtension = (filePath: string | undefined) =>
    filePath?.split('.').pop()?.toLowerCase();

const getFileEmoji = (ext: string | undefined) => {
    const map: Record<string, string> = {
        pdf: '📄',
        dwg: '📐',
        xls: '📊',
        xlsx: '📊',
        skp: '🏗️',
        sldprt: '⚙️',
        sldasm: '🛠️',
        ipt: '🧩',
        iam: '🔩',
        msg: '✉️',
        jpg: '🖼️',
        jpeg: '🖼️',
        png: '🖼️',
        bmp: '🖼️',
        gif: '🖼️',
        svg: '🖼️',
        tif: '🖼️',
        tiff: '🖼️',
    };
    return map[ext || ''] || '📁';
};

const TaskUpdateCard: React.FC<Props> = ({ update }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handlePlayPause = async () => {
        try {
            if (!sound) {
                const { sound: newSound, status } = await Audio.Sound.createAsync(
                    { uri: `${BASE_URL}/${update.audio_path}` },
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

    const getStatusIcon = (status: string): JSX.Element | null => {
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

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    // const openLink = async (url: string) => {
    //     await Linking.openURL(url);
    // };
    const openLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Can't open this file", url);
        }
    };

    const inputClass: string =
        isDark
            ? 'text-black'
            : 'text-black';

    // console.log('Image URL:', `${BASE_URL}/${update.file_path}`);
    return (
        <View className="mb-6 border border-yellow-500 rounded-lg bg-white shadow-md">
            {/* Header */}
            <View className="flex flex-row justify-between items-center bg-yellow-100 p-4 rounded-t-lg border-b border-yellow-500">
                <Text className={`text-sm  font-semibold ${inputClass}`}>
                    <Feather name="user" size={16} color="orange" /> {update.updated_by}
                </Text>
                <Text className={`text-xs ${inputClass}`}>
                    <Feather name="calendar" size={14} color="orange" /> {formatDate(update.updated_at)}
                </Text>
            </View>

            <View className="p-4 space-y-2">
                {update.status && (
                    <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                        {/* <Text className="text-black font-medium">Status Changed: {update.status}</Text> */}
                        
                        <Text className={`${inputClass} ml-2`}>
                            <Text className={`${inputClass} font-bold`}>Status Changed: </Text> {update.status} 
                             {getStatusIcon(update.status)}
                            
                        </Text>
                    </View>
                )}

                {update.title && (
                    <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                        {/* <Text className="text-black font-medium">Title Changed: {update.title}</Text> */}
                        <Text className={`${inputClass} ml-2`}>
                            <Text className={`${inputClass} font-bold`}>Title Changed: </Text> {update.title}
                        </Text>
                    </View>
                )}

                {update.description && (
                    <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                        {/* <Text className="text-black font-medium">Description Changed: {update.description}</Text> */}
                        <Text className={`${inputClass} ml-2`}>
                            <Text className={`${inputClass} font-bold`}>Description Changed:</Text> {update.description}
                        </Text>
                    </View>
                )}

                {update.priority && (
                    <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded flex-row items-center">
                        <MaterialIcons name="priority-high" size={16} color="orange" />
                        {/* <Text className="text-black ml-2">Priority Changed: {update.priority}</Text> */}
                        <Text className={`${inputClass} ml-2`}>
                            <Text className={`${inputClass} font-bold`}>Priority Changed:</Text> {update.priority}
                        </Text>
                    </View>
                )}

                {update.due_date && (
                    // <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded flex-row items-center">
                    //     <Feather name="calendar" size={16} color="orange" />
                    //     <Text className="text-black ml-2">Due Date: {formatDate(update.due_date)}</Text>
                    // </View>
                    <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded flex-row items-center">
                        <Feather name="calendar" size={16} color="orange" />
                        <Text className={`${inputClass} ml-2`}>
                            <Text className={`${inputClass} font-bold`}>Due Date Changed:</Text> {formatDate(update.due_date)}
                        </Text>
                    </View>

                )}

                {update.comment && (
                    // <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                    //     <Text className="text-black">Comment: {update.comment}</Text>
                    // </View>
                    <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                        <Text className={inputClass}>
                            <Text className={`${inputClass} font-bold`}>Comment:</Text> {update.comment}
                        </Text>
                    </View>

                )}

                {update.assigned_by && update.assigned_to && (
                    <View className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                        <Text className={inputClass}>
                            🔁 <Text className="font-bold">{update.assigned_by_username}</Text> reassigned the task to{' '}
                            <Text className="font-bold">{update.assigned_to_username}</Text>{' '}
                        </Text>
                        <Text className={inputClass}>
                            🕓 Previous Assignee: <Text className="font-bold">{update.previous_assigned_to}</Text>
                        </Text>
                    </View>
                )}

                {update.audio_path && (
                    <View className="mt-2">
                        <Text className="text-black font-medium mb-1">Audio Note:</Text>
                        <Button
                            title={isPlaying ? 'Pause Audio' : 'Play Audio'}
                            onPress={handlePlayPause}
                            color="#facc15"
                        />
                    </View>
                )}


                {update.file_path && (
                    <View className="mt-2">
                        <Text className="text-black font-medium mb-1">Attached File:</Text>
                        {update.file_path.match(/\.(jpg|jpeg|png)$/i) ? (
                            // <TouchableOpacity onPress={() => {
                            //     console.log('Pressed image:', `${BASE_URL}/${update.file_path}`);
                            //     openLink(`${BASE_URL}/${update.file_path}`)
                            // }

                            // }>
                            //     <Image
                            //         source={{ uri: `${BASE_URL}/${update.file_path}` }}
                            //         className="w-full h-40 rounded"
                            //         resizeMode="cover"
                            //     />
                            // </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    // console.log('Pressed image:', `${BASE_URL}/${update.file_path}`);
                                    openLink(`${BASE_URL}/${update.file_path}`);
                                }}
                                activeOpacity={0.7}
                                style={{ width: '100%', height: 160, backgroundColor: 'rgba(255,255,0,0.1)' }} // Add background for debug
                            >
                                <Image
                                    source={{ uri: `${BASE_URL}/${update.file_path}` }}
                                    style={{ width: '100%', height: 160, borderRadius: 8 }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => openLink(`${BASE_URL}/${update.file_path}`)}>
                                <Text className="text-yellow-500">
                                    {getFileEmoji(getFileExtension(update.file_path))}{' '}
                                    {update.file_path.split('/').pop()}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default TaskUpdateCard;

