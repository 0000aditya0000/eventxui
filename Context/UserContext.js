import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);

    const updateProfileImage = (newImage) => {
        setProfileImage(newImage);
    };

    return (
        <UserContext.Provider value={{ profileImage, updateProfileImage }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserContext);
