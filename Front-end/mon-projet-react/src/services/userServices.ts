import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // ⚠️ à adapter selon votre backend

const getAllUsers = () => {
  return axios.get(API_URL);
};

const userService = {
  getAllUsers,
};

export default userService;