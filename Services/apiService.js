const BASE_URL = 'https://eventxbackendlatest.onrender.com';

const apiService = {
  get: async (endpoint,token) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error( errorData.message );
    }
    return response.json();
    
  },

  post: async (endpoint, data, token) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      // debugger
      const errorData = await response.json();
      throw new Error( errorData.message );
    }
    return response.json();
  },

  patch: async (endpoint, data, token) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error( errorData.message );
    }
    return response.json();
  },

  delete: async (endpoint, token) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error( errorData.message );
    }
    return response.json();
  }
};

export default apiService;
