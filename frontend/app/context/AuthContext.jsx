// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const getCurrentUser = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
//         {
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         setUser(null);
//         return;
//       }

//       const data = await response.json();
//       setUser(data.user);
//     } catch (error) {
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCurrentUser();
//   }, []);
  
//  const Logout = async () => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
//       {
//         method: "POST",
//         credentials: "include",
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Logout failed");
//     }

//     setUser(null);

//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };

//   return (
//     <AuthContext.Provider
//       value={{
//     user,
//     setUser,
//     isLoading,
//     Logout,
//     getCurrentUser,
//   }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401) {
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();

      setUser(data.user);
    } catch (error) {
      console.error("Get current user failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const Logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        Logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}