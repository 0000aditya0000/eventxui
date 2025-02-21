import apiService from '../apiService';


export const getUser = async (id, token) =>{
    try {
        const data = await apiService.get(`/user/${id}`, token);
        return data.data;
    }
    catch (error){
        console.error("Error fetching user", error);
        throw error;
    }
}


export const updateUser = async (id,user, token) =>{
    try {
        const data = await apiService.patch(`/user/${id}`,user, token);
        return data.data;
    }
    catch (error){
        console.error("Error fetching user", error);
        throw error;
    }
}


export const getAllUser = async (token) =>{
    try {
        const data = await apiService.patch('/user', token);
        return data.data;
    }
    catch (error){
        console.error("Error fetching user", error);
        throw error;
    }
}

export const getBookedEventList = async (id, token) =>{
    try {
        const data = await apiService.get(`/user-event/user/${id}`, token);
        return data.data;
    }
    catch (error){
        console.error("Error fetching user", error);
        throw error;
    }
}