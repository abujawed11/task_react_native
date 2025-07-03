// // context/AuthContext.tsx
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
// import { jwtDecode } from "jwt-decode";
// import React, { createContext, useContext, useEffect, useState } from "react";

// type User = {
//   id: number;
//   username: string;
//   role: string;
//   // accountType: string
//   // Add other fields if needed
// };

// type AuthContextType = {
//   user: User | null;
//   login: (user: User, token: string) => Promise<void>;
//   logout: () => Promise<void>;
//   loading: boolean;
// };

// // const AuthContext = createContext<AuthContextType>({
// //   user: null,
// //   login: async () => {},
// //   logout: async () => {},
// //   loading: true,
// // });

// // ✅ This was missing export
// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: async () => {},
//   logout: async () => {},
//   loading: true,
// });



// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (user: User, token: string) => {
//     await AsyncStorage.setItem("token", token);
//     setUser(user);
//     router.replace("/(dashboard)");// Navigate after login
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem("token");
//     setUser(null);
//     router.replace("/login"); // Navigate after logout
//   };

// const checkToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem("token");

//     if (!token) {
//       setLoading(false); // ✅ FIX HERE
//       return;
//     }

//     const decoded: any = jwtDecode(token);
//     const isExpired = decoded.exp * 1000 < Date.now();

//     if (isExpired) {
//       await AsyncStorage.removeItem("token");
//       setUser(null);
//       setLoading(false); // ✅ FIX HERE too
//       return;
//     }

//     setUser({
//       id: decoded.id,
//       username: decoded.username,
//       role: decoded.role
//     });
//   } catch (err) {
//     console.error("Token error", err);
//     await AsyncStorage.removeItem("token");
//     setUser(null);
//   } finally {
//     setLoading(false); // ✅ Always end loading
//   }
// };


//   useEffect(() => {
//     checkToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
// import { jwtDecode } from "jwt-decode";
// import React, { createContext, useContext, useEffect, useState } from "react";

// type User = {
//   userId: string;
//   username: string;
//   email: string;
//   phoneNumber: string;
//   role: string;
//   accountType: string;
// };

// type AuthContextType = {
//   user: User | null;
//   login: (user: User, token: string) => Promise<void>;
//   logout: () => Promise<void>;
//   loading: boolean;
// };

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: async () => {},
//   logout: async () => {},
//   loading: true,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (user: User, token: string) => {
//     await AsyncStorage.setItem("token", token);
//     await AsyncStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//     router.replace("/(dashboard)");
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem("token");
//     await AsyncStorage.removeItem("user");
//     setUser(null);
//     router.replace("/login");
//   };

//   const checkToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const userData = await AsyncStorage.getItem("user");

//       if (!token || !userData) {
//         setLoading(false);
//         return;
//       }

//       const decoded: any = jwtDecode(token);
//       const isExpired = decoded.exp * 1000 < Date.now();

//       if (isExpired) {
//         await AsyncStorage.removeItem("token");
//         await AsyncStorage.removeItem("user");
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       const parsedUser: User = JSON.parse(userData);
//       setUser(parsedUser);
//     } catch (err) {
//       console.error("Token check error", err);
//       await AsyncStorage.removeItem("token");
//       await AsyncStorage.removeItem("user");
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react-native";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type User = {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  accountType: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null; // ✅ add token here
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => { },
  logout: async () => { },
  loading: true,
});



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoggingIn = useRef(false); // 🛡️ Avoid race conditions
  const [token, setToken] = useState<string | null>(null);

  const login = async (user: User, token: string) => {
    try {
      console.log("Logging IN")
      isLoggingIn.current = true; // ✅ Mark login in progress
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setToken(token); // ✅ store in context

      // const tokenAfterLogin = await AsyncStorage.getItem("token");
      // const userAfterLogin = await AsyncStorage.getItem("user");
      // console.log("🔐 Token after login:", tokenAfterLogin);
      // console.log("👤 User after login:", userAfterLogin);
      // setUser(null); // Force reset first
      // setTimeout(() => {
      //   setUser(user);  // Delay to ensure rerender happens after navigation
      // }, 100);         // A small delay to flush async state
      setUser(user);
      setTimeout(() => {
        console.log("logging...........")
        router.replace("/(dashboard)");
      }, 200);
      // console.log( "Token set:", token);
      // console.log("User set:", user);
      // console.log("Logging IN")
      // router.replace("/(dashboard)");
      // router.replace("/(dashboard)/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      isLoggingIn.current = false; // ✅ Reset login flag
    }
  };

  // const logout = async () => {
  //   console.log("Logging OUT")
  //   await AsyncStorage.removeItem("token");
  //   await AsyncStorage.removeItem("user");

  //   setUser(null);
  //   router.replace("/login");
  // };

  // const logout = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     const user = await AsyncStorage.getItem("user");

  //     console.log("🔐 Token before logout:", token);
  //     console.log("👤 User before logout:", user);

  //     // await AsyncStorage.removeItem("token");
  //     // await AsyncStorage.removeItem("user");
  //     await AsyncStorage.clear(); // Clear ALL keys

  //     console.log("🔐 Token after clear:", token);
  //     console.log("👤 User after clear:", user);

  //     console.log("✅ AsyncStorage cleared");

  //     setUser(null);
  //     router.replace("/(auth)/login");
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };

  const logout = async () => {
    try {
      // const tokenBefore = await AsyncStorage.getItem("token");
      // const userBefore = await AsyncStorage.getItem("user");

      // console.log("🔐 Token before logout:", tokenBefore);
      // console.log("👤 User before logout:", userBefore);

      await AsyncStorage.clear(); // Clear ALL keys

      // const tokenAfter = await AsyncStorage.getItem("token");
      // const userAfter = await AsyncStorage.getItem("user");

      // console.log("🔐 Token after clear:", tokenAfter);
      // console.log("👤 User after clear:", userAfter);
      setToken(null); // ✅ clear token too
      setUser(null);
      router.replace("/(auth)/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const checkToken = async () => {
    setToken(token);
    try {
      if (isLoggingIn.current) return; // 🛡️ Skip if login in progress

      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      if (!token || !userData) {
        setUser(null);
        return;
      }

      const decoded: any = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        await logout();
        return;
      }

      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
    } catch (err) {
      console.error("Token check error", err);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


