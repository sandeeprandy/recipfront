
import axiosInstance from '../axiosInstance';

export const fetchUserFeed = async () => {
  const response = await axiosInstance.get("/api/user/feed");
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get("/api/user/profile");
  return response.data;
};
