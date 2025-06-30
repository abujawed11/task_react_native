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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (user: User, token: string) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    router.replace("/(dashboard)");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      if (!token || !userData) {
        setLoading(false);
        return;
      }

      const decoded: any = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        return;
      }

      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
    } catch (err) {
      console.error("Token check error", err);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

