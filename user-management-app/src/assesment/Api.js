import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => axios.get(API_URL);
export const addUser = async (userData) => axios.post(API_URL, userData);
export const updateUser = async (userId, userData) =>
  axios.put(`${API_URL}/${userId}`, userData);
export const deleteUser = async (userId) => axios.delete(`${API_URL}/${userId}`);
