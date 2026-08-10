import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; //app.listen(process.env.PORT || 3000, ...)

const getAllUsers = () => {
  return axios.get(API_URL);
};

const userService = {
  getAllUsers,
};

export default userService;