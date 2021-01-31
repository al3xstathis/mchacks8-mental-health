import React, { useEffect, useState } from "react";
import app from "./firebase.js";
import Loading from "./components/loading";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        app.app.auth().onAuthStateChanged(async (user) => {
            if (user && user.email) {
                const doc = app.fetchData(user.email);
                if (doc) {
                    setUserData(doc)
                }
            }
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if (pending) {
        return (
            <div className="wait-for-firebase">
                <Loading />
            </div>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userData,
                setUserData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
