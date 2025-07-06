import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Title */}
        <Text className="text-2xl font-bold text-black dark:text-white mb-4">🚀 About Sun-Rack Task Management App</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-6">
          An all-in-one productivity platform built to simplify task management and improve team collaboration across departments and roles.
        </Text>

        {/* Section: Secure Role-Based Access */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">🔐 Secure Role-Based Access</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">👤 User & Admin Roles: Admins get full visibility, while users see only their created and assigned tasks.</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">📝 Seamless registration and login with hashed password security.</Text>

        {/* Section: Smart Task Creation */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">🧠 Smart Task Creation</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">🗂️ Add title, description, priority, and due date</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">📎 Attach files and 🎤 voice notes for detailed communication</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">👥 Assign tasks to team members in seconds</Text>

        {/* Section: Real-Time Notifications */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">🔔 Real-Time Notifications</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">📲 Instant push & in-app alerts for task assignments and updates</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">🔄 Keeps assignees and assigners always in sync</Text>

        {/* Section: Two-Way Task Collaboration */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">🔄 Two-Way Task Collaboration</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">🔄 Update task status: Pending, In Progress, or Completed</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">🗣️ Send voice replies for updates, clarifications, or delays</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">📊 Adjust task priority as needs evolve</Text>

        {/* Section: Dashboard Overview */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">📊 Dashboard Overview</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">📌 View tasks by category: Active, Pending, Completed, Snoozed</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">📁 My Tasks and Assigned Tasks sections for organized tracking</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">🔍 Powerful filter & sort options for better task visibility</Text>

        {/* Section: Export to Excel */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">📤 Export to Excel</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">📄 Download all task data in Excel format</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">✅ Useful for offline access, reporting, and project summaries</Text>

        {/* ✅ NEW SECTION: Task History Tracking */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">🕓 Task History Tracking</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">📝 Every task update is tracked in detail.</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">👤 See who made the change, what was updated, and when it occurred.</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">📜 Promotes transparency and accountability across teams.</Text>

        {/* ✅ NEW SECTION: Task Reassignment */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">🔁 Task Reassignment Tracking</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">👥 Assigner can reassign a task to a different team member.</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">📌 The system logs every reassignment for future reference.</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">🧾 Ensures clear responsibility and a complete task audit trail.</Text>

        {/* Section: Built For Professionals */}
        <Text className="text-xl font-semibold text-black dark:text-white mb-2">👨‍💻 Built For Professionals</Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">🧑‍💼 Perfect for developers, designers, marketers, analysts, HR, QA, and more</Text>

        {/* Outro */}
        <Text className="text-base text-gray-700 dark:text-gray-300 mt-6">
          With <Text className="font-semibold text-black dark:text-white">Sun-Rack Task</Text>, productivity meets clarity. Stay organized, communicate clearly, and manage work effortlessly—no matter your role.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;