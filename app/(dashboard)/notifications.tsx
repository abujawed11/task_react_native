import { useAuth } from '@/context/AuthContext';
import { NotificationContext } from '@/context/NotificationContext';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const formatDateTime = (dateStr?: string | null) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const NotificationScreen = () => {
  const { notifications, markAsRead,fetchNotifications } = useContext(NotificationContext);
  const [hiddenNotificationIds, setHiddenNotificationIds] = useState<string[]>([]);
  const router = useRouter();
  const { user, loading } = useAuth();


  // 👇 Fetch when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (user && !loading) {
        fetchNotifications();
      }
    }, [user, loading])
  );

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    setHiddenNotificationIds((prev) => [...prev, id]);
  };

  const handleViewTask = (taskId: string) => {
    router.push(`/(dashboard)/task-progress/${taskId}`);
    // router.push({
    //   pathname: '/(dashboard)/task-progress/[taskId]',
    //   params: { taskId: task.task_id, from: location },
    // })
  };

  //  useEffect(() => {
  //       if (user) {
  //           console.log("Fetch nOtificTions called")
  //           fetchNotifications();
  //           const interval = setInterval(fetchNotifications, 2 * 60 * 1000);
  //           return () => clearInterval(interval);
  //       }
  //   }, [user,loading]);

  const visibleNotifications = notifications.filter(
    (note) => !hiddenNotificationIds.includes(note.notification_id)
  );

  return (
    <ScrollView className="flex-1 bg-yellow-100 px-4 pt-6 pb-10">
      <View className="flex-row justify-between items-center mb-6">
        {/* <TouchableOpacity
          onPress={() => router.back()}
          className="bg-black px-4 py-2 rounded-lg"
        >
          <Text className="text-yellow-400 font-bold text-sm">← Back</Text>
        </TouchableOpacity> */}
        {/* <Text className="text-xl font-bold text-black">All Notifications</Text> */}
        <View className="w-16" />
      </View>

      {visibleNotifications.length === 0 ? (
        <Text className="text-center text-black text-base mt-10">No unread notifications.</Text>
      ) : (
        visibleNotifications.map((note, index) => (
          <View
            key={index}
            className="bg-white border border-yellow-500 rounded-xl mb-5 shadow"
          >
            <View className="bg-yellow-100 px-4 py-2 border-b border-yellow-500 flex-row justify-between items-center rounded-t-xl">
              <Text className="text-lg font-bold text-black">Task Notification</Text>
              <Text className="text-sm text-gray-700">{formatDateTime(note.created_at)}</Text>
            </View>

            <View className="p-4 space-y-2">
              {note.type === 'task_created' && (
                <Text className="text-sm text-black">
                  📌 You have been assigned a new task: <Text className="font-bold">{note.message}</Text> by <Text className="font-bold">{note.sender}</Text>.
                </Text>
              )}

              {note.type === 'task_updated_by_creator' && note.updates && (
                <>
                  <Text className="text-sm text-black">
                    ✏️ The task "<Text className="font-bold">{note.task_title}</Text>" has been updated by <Text className="font-bold">{note.sender}</Text>.
                  </Text>
                  <Text className="text-sm text-black">
                    ➡️ Changes:{" "}
                    {/* {note.updates && Object.entries(note.updates).map(([field, value], i) => (
                      <Text key={i}>
                        <Text className="font-bold">{field}</Text>: {value}
                        {i < Object.keys(note.updates).length - 1 ? ', ' : ''}
                      </Text>
                    ))} */}
                    {note.updates && Object.entries(note.updates).map(([field, value], i, arr) => (
                      <Text key={i}>
                        <Text className="font-bold">{field}</Text>: {value}
                        {i < arr.length - 1 ? ', ' : ''}
                      </Text>
                    ))}
                  </Text>
                </>
              )}

              {note.type === 'task_updated' && note.updates && (
                <>
                  <Text className="text-sm text-black">
                    ✅ Your assigned task "<Text className="font-bold">{note.task_title}</Text>" has been updated by <Text className="font-bold">{note.sender}</Text>.
                  </Text>
                  <Text className="text-sm text-black">
                    ➡️ Updates:{" "}
                    {/* {Object.entries(note.updates).map(([field, value], i) => (
                      <Text key={i}>
                        <Text className="font-bold">{field}</Text>: {value}
                        {i < Object.keys(note.updates).length - 1 ? ', ' : ''}
                      </Text>
                    ))} */}
                    {note.updates && Object.entries(note.updates).map(([field, value], i, arr) => (
                      <Text key={i}>
                        <Text className="font-bold">{field}</Text>: {value}
                        {i < arr.length - 1 ? ', ' : ''}
                      </Text>
                    ))}
                  </Text>
                </>
              )}

              {note.type === 'task_reassigned' && (
                <>
                  <Text className="text-sm text-black">
                    🔁 You have been assigned a task: "<Text className="font-bold">{note.message}</Text>"
                  </Text>
                  <Text className="text-sm text-black">
                    ➡️ Re-assigned to you by <Text className="font-bold">{note.sender}</Text>.
                  </Text>
                </>
              )}
            </View>

            <View className="flex-row justify-end gap-4 px-4 py-2 border-t border-yellow-500 rounded-b-xl">
              <TouchableOpacity
                onPress={() => handleViewTask(note.task_id)}
                className="bg-yellow-500 px-4 py-2 rounded-md"
              >
                <Text className="text-black font-semibold text-sm">View Task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleMarkAsRead(note.notification_id)}
                className="bg-black px-4 py-2 rounded-md"
              >
                <Text className="text-yellow-400 font-semibold text-sm">Mark as Read</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default NotificationScreen;
