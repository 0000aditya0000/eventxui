import apiService from '../apiService';

export const createEvent = async (event, token) => {
  try {
    const data = await apiService.post('/events/create_event', event, token);
    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const fetchEvents = async (id,token) => {
  try {
    const data = await apiService.get(`/events/userEventList/${id}`, token);
    return data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, event, token) => {
  try {
    const data = await apiService.patch(`/events/${eventId}`, event, token);
    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId, token) => {
  try {
    const data = await apiService.delete(`/events/${eventId}`, token);
    return data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const registerUserEvent = async (payload, token) => {
  try {
    const data = await apiService.post('/user-event/register', payload, token);
    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}; 

export const getGenre = async (token) => {
  try {
    const data = await apiService.get('/events/types/genre', token);
    return data.data;
  } catch (error) {
    console.error('Error fetching genre:', error);
    throw error;
  }
};

export const getSingleEvent = async (id,userId,token) => {
  try {
    const data = await apiService.get(`/events/${id}?user_id=${userId}`, token);
    return data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};