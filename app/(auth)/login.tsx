// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { router } from "expo-router";
// import axios from "axios";
// import { useAuth } from "@/hooks/useAuth";
// import { Eye, EyeOff } from "lucide-react-native";
// import LottieView from "lottie-react-native";

// // 👇 Replace with your actual backend base URL
// const BASE_URL = "https://localhost:5000";

// export default function LoginScreen() {
//   const { login } = useAuth();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
//   const usernameRef = useRef<TextInput>(null);

//   useEffect(() => {
//     usernameRef.current?.focus();
//   }, []);

//   const validateForm = () => {
//     const newErrors: typeof errors = {};
//     if (!username.trim()) newErrors.username = "Username is required";
//     if (!password) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async () => {
//     if (!validateForm()) {
//       Alert.alert("Validation Error", "Please fix the form errors.");
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/api/auth/login`, {
//         username,
//         password,
//       });

//       const { user, token } = res.data;

//       await login(user, token); // ✅ store in AuthContext
//       router.replace("/(dashboard)"); // ✅ navigate to dashboard
//     } catch (err: any) {
//       Alert.alert("Login Failed", err.response?.data?.message || "Please check your credentials.");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       className="flex-1 bg-yellow-100 justify-center px-6"
//     >
//       <View className="mb-10 items-center">
//         <Text className="text-4xl font-bold text-yellow-800 mb-2">Welcome to TaskApp</Text>
//         <LottieView
//           source={require("@/assets/animations/mascot.json")}
//           autoPlay
//           loop
//           style={{ width: 200, height: 200 }}
//         />
//       </View>

//       {/* Username */}
//       <View className="mb-4">
//         <Text className="text-base text-yellow-700 mb-1">Username</Text>
//         <TextInput
//           ref={usernameRef}
//           placeholder="Enter your username"
//           value={username}
//           onChangeText={(text) => {
//             setUsername(text);
//             setErrors((prev) => ({ ...prev, username: undefined }));
//           }}
//           className="bg-white px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500"
//         />
//         {errors.username && <Text className="text-red-600 mt-1 text-sm">{errors.username}</Text>}
//       </View>

//       {/* Password */}
//       <View className="mb-4">
//         <Text className="text-base text-yellow-700 mb-1">Password</Text>
//         <View className="flex-row items-center bg-white rounded-xl border border-gray-300 focus:border-yellow-500">
//           <TextInput
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={(text) => {
//               setPassword(text);
//               setErrors((prev) => ({ ...prev, password: undefined }));
//             }}
//             secureTextEntry={!showPassword}
//             className="flex-1 px-4 py-3"
//           />
//           <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} className="px-4">
//             {showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
//           </TouchableOpacity>
//         </View>
//         {errors.password && <Text className="text-red-600 mt-1 text-sm">{errors.password}</Text>}
//       </View>

//       {/* Login Button */}
//       <TouchableOpacity
//         onPress={handleLogin}
//         className="bg-yellow-500 py-3 rounded-xl mt-4 shadow-md active:bg-yellow-600"
//       >
//         <Text className="text-center text-black font-bold text-lg">Login</Text>
//       </TouchableOpacity>

//       {/* Signup Link */}
//       <TouchableOpacity onPress={() => router.push("/(auth)/signup")} className="mt-6 items-center">
//         <Text className="text-sm text-yellow-800">
//           Don't have an account?{" "}
//           <Text className="font-semibold underline">Register</Text>
//         </Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// }


// import { useAuth } from "@/hooks/useAuth";
// import { BASE_URL } from "@/utils/constants";
// import { registerForPushNotificationsAsync } from "@/utils/notifications";
// import axios from "axios";
// import { router } from "expo-router";
// import { Eye, EyeOff } from "lucide-react-native";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // 👇 Replace this with your real backend URL
// //const BASE_URL = "https://localhost:5000";

// export default function LoginScreen() {
//   const { login } = useAuth();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
//   const usernameRef = useRef<TextInput>(null);

//   useEffect(() => {
//     usernameRef.current?.focus();
//   }, []);


//   const validateForm = () => {
//     const newErrors: typeof errors = {};
//     if (!username.trim()) newErrors.username = "Username is required";
//     if (!password) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async () => {
//     if (!validateForm()) {
//       Alert.alert("Validation Error", "Please fix the form errors.");
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/api/auth/login`, {
//         username,
//         password,
//       });

//       const { user, token } = res.data;

//       await login(user, token);
//       router.replace("/(dashboard)");
//     } catch (err: any) {
//       Alert.alert("Login Failed", err.response?.data?.message || "Please check your credentials.");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       className="flex-1 bg-yellow-100 justify-center px-6"
//     >
//       <View className="mb-10 items-center">
//         <Text className="text-4xl font-bold text-yellow-800 mb-2">Welcome to TaskApp</Text>
//       </View>

//       {/* Username Input */}
//       <View className="mb-4">
//         <Text className="text-base text-yellow-700 mb-1">Username</Text>
//         <TextInput
//           ref={usernameRef}
//           placeholder="Enter your username"
//           value={username}
//           onChangeText={(text) => {
//             setUsername(text);
//             setErrors((prev) => ({ ...prev, username: undefined }));
//           }}
//           className="bg-white px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500"
//         />
//         {errors.username && <Text className="text-red-600 mt-1 text-sm">{errors.username}</Text>}
//       </View>

//       {/* Password Input */}
//       <View className="mb-4">
//         <Text className="text-base text-yellow-700 mb-1">Password</Text>
//         <View className="flex-row items-center bg-white rounded-xl border border-gray-300 focus:border-yellow-500">
//           <TextInput
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={(text) => {
//               setPassword(text);
//               setErrors((prev) => ({ ...prev, password: undefined }));
//             }}
//             secureTextEntry={!showPassword}
//             className="flex-1 px-4 py-3"
//           />
//           <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} className="px-4">
//             {showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
//           </TouchableOpacity>
//         </View>
//         {errors.password && <Text className="text-red-600 mt-1 text-sm">{errors.password}</Text>}
//       </View>

//       {/* Login Button */}
//       <TouchableOpacity
//         onPress={handleLogin}
//         className="bg-yellow-500 py-3 rounded-xl mt-4 shadow-md active:bg-yellow-600"
//       >
//         <Text className="text-center text-black font-bold text-lg">Login</Text>
//       </TouchableOpacity>

//       {/* Signup Link */}
//       {/* <TouchableOpacity onPress={() => router.push("/(auth)/signup")} className="mt-6 items-center">
//         <Text className="text-sm text-yellow-800">
//           Don't have an account?{" "}
//           <Text className="font-semibold underline">Register</Text>
//         </Text>
//       </TouchableOpacity> */}
//       {/* <TouchableOpacity onPress={() => router.push("/(auth)/signup")} className="mt-6 items-center">
//         <Text className="text-sm text-yellow-800">
//           {"Don't have an account? "}
//           <Text className="font-semibold underline">Register</Text>
//         </Text>
//       </TouchableOpacity> */}
//     </KeyboardAvoidingView>
//   );
// }


import { useAuth } from "@/hooks/useAuth";
import { BASE_URL } from "@/utils/constants";
import { registerForPushNotificationsAsync } from "@/utils/notifications";
import axios from "axios";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const usernameRef = useRef<TextInput>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the form errors.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      const { user, token } = res.data;

      await login(user, token);

      // 👇 Register for push notifications and send token to backend
      const expoPushToken = await registerForPushNotificationsAsync();
      console.log(`Expo Push Token: ${expoPushToken}`);
      if (expoPushToken) {
        await axios.post(
          `${BASE_URL}/api/notifications/token`,
          {
            user_id: user.userId, // match column name in DB
            token: expoPushToken,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      router.replace("/(dashboard)");
    } catch (err: any) {
      console.error("Login error:", err);
      Alert.alert("Login Failed", err.response?.data?.message || "Please check your credentials.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-yellow-100 justify-center px-6"
    >
      <View className="mb-10 items-center">
        <Text className="text-4xl font-bold text-yellow-800 mb-2">Welcome to TaskApp</Text>
      </View>

      {/* Username Input */}
      <View className="mb-4">
        <Text className="text-base text-yellow-700 mb-1">Username</Text>
        <TextInput
          ref={usernameRef}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors((prev) => ({ ...prev, username: undefined }));
          }}
          className="bg-white px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500"
        />
        {errors.username && <Text className="text-red-600 mt-1 text-sm">{errors.username}</Text>}
      </View>

      {/* Password Input */}
      <View className="mb-4">
        <Text className="text-base text-yellow-700 mb-1">Password</Text>
        <View className="flex-row items-center bg-white rounded-xl border border-gray-300 focus:border-yellow-500">
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            secureTextEntry={!showPassword}
            className="flex-1 px-4 py-3"
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} className="px-4">
            {showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
          </TouchableOpacity>
        </View>
        {errors.password && <Text className="text-red-600 mt-1 text-sm">{errors.password}</Text>}
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-yellow-500 py-3 rounded-xl mt-4 shadow-md active:bg-yellow-600"
      >
        <Text className="text-center text-black font-bold text-lg">Login</Text>
      </TouchableOpacity>
      {/* Signup Link */}
      <TouchableOpacity onPress={() => router.push("/(auth)/signup")} className="mt-6 items-center">
        {/* <Text className="text-sm text-yellow-800"> */}
          
          <Text className="font-semibold underline">Don't have an account? Register</Text>
        {/* </Text> */}
      </TouchableOpacity>


    </KeyboardAvoidingView>
  );
}


