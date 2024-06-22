import axios from 'axios';

const API_URL = 'http://localhost:8888/api'; // Replace with your backend server URL

// Function to fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to fetch all posts
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Other API functions like updating user, creating post, etc. can be added similarly
