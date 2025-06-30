import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import { BASE_URL } from "@/utils/constants";


type FormFields = {
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    password: string;
    confirmPassword: string;
    accountType: string;
};

export default function SignupScreen() {
    const [formData, setFormData] = useState<FormFields>({
        username: "",
        email: "",
        phoneNumber: "",
        role: "",
        password: "",
        confirmPassword: "",
        accountType: "",
    });

    const [otp, setOtp] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormFields | "otp" | "inviteCode", string>>>({});

    //const baseUrl = "http://10.20.2.78:5000"; // Use proper IP for Android device

    const handleChange = (name: keyof FormFields, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Must be 10 digits";
        if (!formData.role) newErrors.role = "Role is required";
        if (!formData.accountType) newErrors.accountType = "Account type is required";
        if (!otp) newErrors.otp = "OTP is required";
        if (formData.accountType === "Super Admin" && !inviteCode) newErrors.inviteCode = "Invite code required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Min 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendOtp = async () => {
        // if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        //     Alert.alert("Invalid Email", "Enter a valid email before sending OTP.");
        //     return;
        // }
        if (!formData.email) {
            Alert.alert("Invalid Email", "Enter a valid email before sending OTP.");
            return;
        }
        try {
            console.log("📨 Sending OTP to:", formData.email);
            Alert.alert("Debug", "Sending OTP...");
            console.log(BASE_URL)
            const res = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
                email: formData.email,
            });

            console.log("✅ OTP Sent Response:", res.data);
            setOtpSent(true);
            Alert.alert("OTP Sent", "Check your email.");
        } catch (error: any) {
            console.error("❌ Error sending OTP:", error);
            Alert.alert("Error", error?.response?.data?.message || "Failed to send OTP");
        }
        // try {
        //     await axios.post(`${baseUrl}/api/auth/send-otp`, { email: formData.email });
        //     setOtpSent(true);
        //     Alert.alert("OTP Sent", "Check your email.");
        // } catch (error: any) {
        //     Alert.alert("Error", error?.response?.data?.message || "Failed to send OTP");
        // }
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/api/auth/signup`, {
                ...formData,
                otp,
                inviteCode: formData.accountType === "Super Admin" ? inviteCode : null,
            });
            Alert.alert("Success", "Registration successful!", [
                { text: "Login Now", onPress: () => router.replace("/(auth)/login") },
            ]);
        } catch (error: any) {
            Alert.alert("Error", error?.response?.data?.message || "Signup failed.");
        } finally {
            setLoading(false);
        }
    };

    const getStrength = (pwd: string) => {
        if (!pwd) return "";
        if (pwd.length < 6) return "Weak";
        if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/.test(pwd)) return "Strong";
        return "Medium";
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#FFF8DC" }}>
            <Text className="text-3xl font-bold text-yellow-800 text-center mb-6">Register for TaskApp</Text>

            {(["username", "email", "phoneNumber"] as (keyof FormFields)[]).map((field) => (
                <View key={field} className="mb-4">
                    <TextInput
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChangeText={(text) => handleChange(field, text)}
                        className="bg-white px-4 py-3 rounded-xl border border-gray-300"
                    />
                    {errors[field] && <Text className="text-red-600 text-sm">{errors[field]}</Text>}
                </View>
            ))}

            {/* <TextInput
                placeholder="Account Type (User / Super Admin)"
                value={formData.accountType}
                onChangeText={(text) => handleChange("accountType", text)}
                className="bg-white px-4 py-3 mb-4 rounded-xl border border-gray-300"
            />
            {errors.accountType && <Text className="text-red-600 text-sm">{errors.accountType}</Text>}

            <TextInput
                placeholder="Role"
                value={formData.role}
                onChangeText={(text) => handleChange("role", text)}
                className="bg-white px-4 py-3 mb-4 rounded-xl border border-gray-300"
            />
            {errors.role && <Text className="text-red-600 text-sm">{errors.role}</Text>} */}
            <View className="mb-4">
                <Text className="text-base text-yellow-700 mb-1">Account Type</Text>
                <View className="bg-white rounded-xl border border-gray-300 overflow-hidden">
                    <Picker
                        selectedValue={formData.accountType}
                        onValueChange={(itemValue) =>
                            setFormData((prev) => ({ ...prev, accountType: itemValue }))
                        }
                    >
                        <Picker.Item label="Select Account Type" value="" />
                        <Picker.Item label="User" value="User" />
                        <Picker.Item label="Super Admin" value="Super Admin" />
                    </Picker>
                </View>
                {errors.accountType && <Text className="text-red-600 mt-1 text-sm">{errors.accountType}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-base text-yellow-700 mb-1">Role</Text>
                <View className="bg-white rounded-xl border border-gray-300 overflow-hidden">
                    <Picker
                        selectedValue={formData.role}
                        onValueChange={(itemValue) =>
                            setFormData((prev) => ({ ...prev, role: itemValue }))
                        }
                    >
                        <Picker.Item label="Select Role" value="" />
                        {[
                            "Software Developer", "UI/UX Designer", "Product Designer",
                            "Marketing Specialist", "Content Writer", "Project Manager",
                            "Business Analyst", "Quality Assurance", "DevOps Engineer",
                            "Data Analyst", "Digital Marketing", "Sales Executive",
                            "HR Professional", "Founder", "Co-Founder"
                        ].map((r) => (
                            <Picker.Item key={r} label={r} value={r} />
                        ))}
                    </Picker>
                </View>
                {errors.role && <Text className="text-red-600 mt-1 text-sm">{errors.role}</Text>}
            </View>



            <TouchableOpacity
                onPress={handleSendOtp}
                className="bg-yellow-500 py-3 rounded-xl mb-4 shadow-md active:bg-yellow-600"
            >
                <Text className="text-center font-semibold">Send OTP</Text>
            </TouchableOpacity>

            {otpSent && (
                <TextInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    className="bg-white px-4 py-3 mb-4 rounded-xl border border-gray-300"
                />
            )}
            {errors.otp && <Text className="text-red-600 text-sm">{errors.otp}</Text>}

            {formData.accountType === "Super Admin" && (
                <>
                    <TextInput
                        placeholder="Invite Code"
                        value={inviteCode}
                        onChangeText={setInviteCode}
                        className="bg-white px-4 py-3 mb-4 rounded-xl border border-gray-300"
                    />
                    {errors.inviteCode && <Text className="text-red-600 text-sm">{errors.inviteCode}</Text>}
                </>
            )}

            {/* Password Inputs */}
            {(["password", "confirmPassword"] as (keyof FormFields)[]).map((field) => (
                <View key={field} className="mb-4">
                    <View className="flex-row items-center bg-white rounded-xl border border-gray-300">
                        <TextInput
                            placeholder={field === "password" ? "Password" : "Confirm Password"}
                            secureTextEntry={field === "password" ? !showPassword : !showConfirmPassword}
                            value={formData[field]}
                            onChangeText={(text) => handleChange(field, text)}
                            className="flex-1 px-4 py-3"
                        />
                        <TouchableOpacity
                            onPress={() =>
                                field === "password"
                                    ? setShowPassword(!showPassword)
                                    : setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="px-4"
                        >
                            {(field === "password" ? showPassword : showConfirmPassword) ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {errors[field] && <Text className="text-red-600 text-sm">{errors[field]}</Text>}
                </View>
            ))}

            {formData.password ? (
                <Text
                    className={`text-sm mb-4 font-semibold ${getStrength(formData.password) === "Weak"
                        ? "text-red-600"
                        : getStrength(formData.password) === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                >
                    Password Strength: {getStrength(formData.password)}
                </Text>
            ) : null}

            <TouchableOpacity
                onPress={handleSignup}
                disabled={loading}
                className="bg-black py-3 rounded-xl shadow-md active:bg-gray-800"
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-center text-yellow-400 font-bold text-lg">Register</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")} className="mt-6 items-center">
                <Text className="text-sm text-yellow-800">
                    Already have an account?{" "}
                    <Text className="font-semibold underline">Login</Text>
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
