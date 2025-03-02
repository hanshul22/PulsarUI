import React, { createContext, useState, useEffect, useContext } from "react";
import { getJWTAdmin } from "./LoggedAdmin";
import { getJWTUser } from "./LoggedUser";
import { getAdminCodes } from "./AdminCodes";
import { getUserCodes } from "./UserCodes";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adminCodes, setAdminCodes] = useState([]);
    const [userCodes, setUserCodes] = useState([]);

    useEffect(() => {

    const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            await getJWTAdmin(token);
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                console.log(userData.data);
                setUser(userData.data);
            }

          }
          
        } catch (error) {
          setError("Failed to fetch user data");
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    },[])

    useEffect(() => {
      const getAllUsers = async () => {
        try {
          await getJWTUser
        } catch (error) {
          
        }
      }

    },[user])

    useEffect(() => {
        const fetchAdminCodes = async () => {
          try {
            const codes = await getAdminCodes();
            await setAdminCodes(codes); 
            console.log(adminCodes);
          } catch (error) {
            console.error("Failed to fetch admin codes:", error);
          }
        };
        fetchAdminCodes();
      }, []);

      useEffect(() => {
        const fetchUserCodes = async () => {
          try {
            const codes = await getUserCodes();
            setUserCodes(codes);
          } catch (error) {
            console.error("Failed to fetch user codes:", error);
          }
        };
        fetchUserCodes();
      }, []);

    const updateAdminCodes = (updatedCode) => {
        setAdminCodes((prevCodes) =>
            prevCodes.map((code) =>
                code._id === updatedCode._id ? updatedCode : code
            )
        );
    };

    const removeAdminCode = (codeId) => {
        setAdminCodes((prevCodes) =>
            prevCodes.filter((code) => code._id !== codeId)
        );
    };

    return (
        <UserContext.Provider
            value={{
                user,
                adminCodes,
                userCodes,
                updateAdminCodes,
                removeAdminCode,
            }}
        >
            {children}
        </UserContext.Provider>
    )

};

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};


