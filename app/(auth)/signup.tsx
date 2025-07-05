import { BASE_URL } from "@/utils/constants";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView, Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";

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
    const colorScheme = useColorScheme();

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
            // console.log("📨 Sending OTP to:", formData.email);
            Alert.alert("Debug", "Sending OTP...");
            // console.log(BASE_URL)
            const res = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
                email: formData.email,
            });

            // console.log("✅ OTP Sent Response:", res.data);
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

    const fieldLabels: Record<keyof FormFields, string> = {
        username: "Username",
        email: "Email",
        phoneNumber: "Phone Number",
        password: "Password",
        confirmPassword: "Confirm Password",
        role: "Role",
        accountType: "Account Type",
    };

    return (
        <View style={{ flex: 1 }} className="bg-yellow-100">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 40,
                        flexGrow: 1,
                        paddingTop: 80,
                        justifyContent: 'flex-start',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 24,
                        color: colorScheme === 'dark' ? '#000' : '#000',
                    }}>Register for TaskApp</Text>

                    {(["username", "email", "phoneNumber"] as (keyof FormFields)[]).map((field) => (
                        <View key={field} className="mb-4">
                            <Text className="mb-1 text-base font-medium text-yellow-700">
                                {fieldLabels[field]}
                            </Text>
                            <TextInput
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formData[field]}
                                onChangeText={(text) => handleChange(field, text)}
                                className="bg-white px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500"
                                placeholderTextColor={colorScheme === 'dark' ? '#d4d4d8' : '#a3a3a3'}
                                style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                            />
                            {errors[field] && <Text style={{ color: '#dc2626', fontSize: 13 }}>{errors[field]}</Text>}
                        </View>
                    ))}

                    <View className="mb-4">
                        <Text className="text-base text-yellow-700 mb-1 font-medium">Account Type</Text>
                        <View className="bg-white rounded-xl border border-gray-300 overflow-hidden">
                            <Picker
                                selectedValue={formData.accountType}
                                onValueChange={(itemValue) =>
                                    setFormData((prev) => ({ ...prev, accountType: itemValue }))
                                }
                                style={{
                                    color: formData.accountType === '' ? '#d1d5db' : '#000', // gray if placeholder
                                }}
                            >
                                <Picker.Item label="Select Account Type" value="" />
                                <Picker.Item label="User" value="User" />
                                <Picker.Item label="Super Admin" value="Super Admin" />
                            </Picker>
                        </View>
                        {errors.accountType && <Text style={{ color: '#dc2626', fontSize: 13, marginTop: 4 }}>{errors.accountType}</Text>}
                    </View>

                    <View className="mb-4">
                        <Text className="text-base text-yellow-700 mb-1 font-medium">Role</Text>
                        <View className="bg-white rounded-xl border border-gray-300 overflow-hidden">
                            <Picker
                                selectedValue={formData.role}
                                onValueChange={(itemValue) =>
                                    setFormData((prev) => ({ ...prev, role: itemValue }))
                                }
                                style={{
                                    color: formData.accountType === '' ? '#d1d5db' : '#000', // gray if placeholder
                                }}
                            >
                                <Picker.Item label="Select Role" value="" />
                                {["Software Developer", "UI/UX Designer", "Product Designer",
                                    "Marketing Specialist", "Content Writer", "Project Manager",
                                    "Business Analyst", "Quality Assurance", "DevOps Engineer",
                                    "Data Analyst", "Digital Marketing", "Sales Executive",
                                    "HR Professional", "Founder", "Co-Founder"
                                ].map((r) => (
                                    <Picker.Item key={r} label={r} value={r} />
                                ))}
                            </Picker>
                        </View>
                        {errors.role && <Text style={{ color: '#dc2626', fontSize: 13, marginTop: 4 }}>{errors.role}</Text>}
                    </View>

                    <TouchableOpacity
                        onPress={handleSendOtp}
                        className="bg-yellow-500 py-3 rounded-xl mb-4 shadow-md active:bg-yellow-600"
                    >
                        <Text style={{ color: colorScheme === 'dark' ? '#18181b' : '#854d0e', textAlign: 'center', fontWeight: '600' }}>Send OTP</Text>
                    </TouchableOpacity>

                    {otpSent && (
                        <TextInput
                            placeholder="Enter OTP"
                            value={otp}
                            onChangeText={setOtp}
                            className="bg-white px-4 py-3 mb-4 rounded-xl border border-gray-300"
                            placeholderTextColor={colorScheme === 'dark' ? '#d4d4d8' : '#a3a3a3'}
                            style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                        />
                    )}
                    {errors.otp && <Text style={{ color: '#dc2626', fontSize: 13 }}>{errors.otp}</Text>}

                    {formData.accountType === "Super Admin" && (
                        <>
                            <TextInput
                                placeholder="Invite Code"
                                value={inviteCode}
                                onChangeText={setInviteCode}
                                className="bg-white px-4 py-3 mb-4 rounded-xl border border-gray-300"
                                placeholderTextColor={colorScheme === 'dark' ? '#d4d4d8' : '#a3a3a3'}
                                style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
                            />
                            {errors.inviteCode && <Text style={{ color: '#dc2626', fontSize: 13 }}>{errors.inviteCode}</Text>}
                        </>
                    )}

                    {(["password", "confirmPassword"] as (keyof FormFields)[]).map((field) => (
                        <View key={field} className="mb-4">
                            <View className="flex-row items-center bg-white rounded-xl border border-gray-300">
                                <TextInput
                                    placeholder={field === "password" ? "Password" : "Confirm Password"}
                                    secureTextEntry={field === "password" ? !showPassword : !showConfirmPassword}
                                    value={formData[field]}
                                    onChangeText={(text) => handleChange(field, text)}
                                    className="flex-1 px-4 py-3"
                                    placeholderTextColor={colorScheme === 'dark' ? '#d4d4d8' : '#a3a3a3'}
                                    style={{ color: colorScheme === 'dark' ? '#000' : '#000' }}
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
                                        <EyeOff size={20} color={colorScheme === 'dark' ? '#fde68a' : '#854d0e'} />
                                    ) : (
                                        <Eye size={20} color={colorScheme === 'dark' ? '#fde68a' : '#854d0e'} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {errors[field] && <Text style={{ color: '#dc2626', fontSize: 13 }}>{errors[field]}</Text>}
                        </View>
                    ))}

                    {formData.password ? (
                        <Text
                            style={{
                                fontSize: 14,
                                marginBottom: 16,
                                fontWeight: '600',
                                color:
                                    getStrength(formData.password) === "Weak"
                                        ? '#dc2626'
                                        : getStrength(formData.password) === "Medium"
                                            ? '#ca8a04'
                                            : '#16a34a',
                            }}
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
                            <Text style={{ color: '#fde68a', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Register</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.replace("/(auth)/login")} className="mt-6 items-center">
                        <Text className="text-sm text-yellow-800">
                            Already have an account?{' '}
                            <Text style={{ fontWeight: '600', textDecorationLine: 'underline', color: colorScheme === 'dark' ? '#facc15' : '#a16207' }}>Login</Text>
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
