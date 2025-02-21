import apiService from '../apiService';

export const filterEvent = async (eventType, token) => {
    try {
        const data = await apiService.get(`/admin/events?type=${eventType}`, token);
        return data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

export const fetchEvents = async (id, token) => {
    try {
        const data = await apiService.get(`/events/userEventList/${id}`, token);
        return data.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};
